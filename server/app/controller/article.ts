import { ErrDataResult, ErrListResult } from "../../typings";
import BaseController from "./base";

export default class extends BaseController {
  name = "Article";
  serviceName = "article";

  /**
   * @description: /article/:id 获取指定id的文章
   * @param {*}
   * @return {*}
   */
  async getOneArticle() {
    const { id } = this.ctx.params;
    if (!id) return this.paramsValidateFailed();

    const { err, data } = await this.service.article.findById(id);

    if (data) {
      //加一个comments字段
      const res = await this.mountCommentsForArticle(data);
      this.handleErrData(res);
    } else {
      await this.error(err);
    }
  }

  /**
   * @description: 查询文章的评论，并生成前端能够直接渲染的数据结构
   * @param {*} article
   * @return {*}
   */
  async mountCommentsForArticle(article): Promise<ErrDataResult> {
    const { service } = this,
      data = article;

    let { err, list: comments } = await service.comment.find({
      articleId: article._id,
      targetCommentId: null,
    });

    article.comments = comments;

    if (err || comments.length == 0) {
      return { err, data };
    }

    try {
      for (const comment of comments) {
        await this.mountUsernameInComment(comment, null);
        await this.mountCommentsForComment(comment._id, comment);
      }
    } catch (e) {
      console.log("e", e);
      err = e;
    } finally {
      return { data, err };
    }
  }

  /**
   * @description: 为评论增加一个username和forUsername字段
   * @param {*} comment
   * @param {*} forUsername  目标user
   * @return {*}
   */
  async mountUsernameInComment(comment, forUsername) {
    comment.forUsername = forUsername;

    if (!comment.userId) {
      comment.username = null;
      return;
    }

    let { err, data } = await this.service.user.findById(comment.userId);

    if (err) throw err;

    if (!data) {
      let res = await this.service.admin.findById(comment.userId);
      data = res.data;
      err = res.err;
    }

    if (err) throw err;

    if (data) {
      comment.username = data.username;
    }
  }

  /**
   * @description: 根据回复目标评论查询评论，挂载到一级评论上面
   * @param {*} targetCommentId
   * @param {*} mountComment
   * @return {*}
   */
  async mountCommentsForComment(targetCommentId, mountComment) {
    const { err, list } = await this.service.comment.find({ targetCommentId });

    if (err || !list || list.length === 0) return;

    //加一个目标回复user字段
    for (const comment of list) {
      const { _id } = comment;

      this.mountUsernameInComment(comment, mountComment.username);

      //递归挂载
      await this.mountCommentsForComment(_id, mountComment);
    }

    mountComment.children = (mountComment.children || []).concat(list);
  }

  async getFilterQuery(query) {
    let filterQuery: any = {};

    if (query.userId) {
      let { data } = await this.service.user.findById(query.userId);
      if (!data) {
        let res = await this.service.admin.findById(query.userId);

        data = res.data;
      }

      console.log("data", data);

      if (data.articleIds.length > 0) {
        filterQuery.$or = data.articleIds.map((_id) => ({ _id }));
      } else {
        return { likeNum: -100 };
      }
    }

    if (query["category"]) {
      filterQuery["category"] = query["category"];
    }

    if (query.tags) {
      filterQuery.tags = { $all: query.tags.split(",") };
    }

    if (query.title) {
      const condition = {
        $regex: decodeURIComponent(query.title),
        $options: "i",
      };
      filterQuery.$or = [
        { title: condition },
        { content: condition },
        { introduction: condition },
      ];
    }

    [
      "createStartTime",
      "createEndTime",
      "updateStartTime",
      "updateEndTime",
    ].forEach((key: string) => {
      const timeValue = query[key];
      if (timeValue) {
        const isStart = key.includes("Start");
        key = key.replace(/(Start|End)/, "");
        const timeCondition = (filterQuery[key] = filterQuery[key] || {});

        if (isStart) {
          timeCondition.$gte = timeValue;
        } else {
          timeCondition.$lte = timeValue;
        }
      }
    });

    console.log("filterQuery", filterQuery);

    return filterQuery;
  }

  async onDestroyed({ _id: articleId }: any): Promise<void> {
    const { service } = this;

    //文章删除后 1、删除底下的评论
    await service.comment.deleteMany({ articleId });

    //2、删除用户的收藏
    const { err, list } = await service.user.find({ articleIds: articleId });

    if (err) return;

    for (const { _id, articleIds } of list) {
      const index = articleIds.indexOf(articleId);
      articleIds.splice(index, 1);
      await service.user.update(_id, { articleIds });
    }
  }
  async onQueried({ list }: ErrListResult): Promise<void> {
    if (!list) return;

    //挂载评论
    for (const article of list) {
      await this.mountCommentsForArticle(article);
    }
  }

}
