import { ErrListResult } from "../../typings";
import BaseController from "./base";

export default class extends BaseController {
  name = "Comment";
  serviceName = "comment";

  async getFilterQuery(query) {
    let filterQuery: any = {};

    if (query.auditStatus && Number(query.auditStatus) !== 0) {
      filterQuery.auditStatus = query.auditStatus;
    }

    if (query.articleId ) {
      filterQuery.articleId = query.articleId;
    }

    if (query.content) {
      const condition = {
        $regex: decodeURIComponent(query.content),
        $options: "i",
      };
      filterQuery.content = condition;
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

  /**
   * @description: 加一条目标回复内容,和user信息
   * @param {ErrListResult} res
   * @return {*}
   */
  onQueried(res: ErrListResult): Promise<any> {
    const { list } = res;

    if (!list) return Promise.resolve();

    console.log("list");

    const promises = [] as Promise<any>[];

    for (const comment of list) {
      const { targetCommentId, userId } = comment;

      if (targetCommentId) {
        promises.push(
          this.service.comment.findById(targetCommentId).then(({ data }) => {
            if (data) comment.targetContent = data.content;
          })
        );
      } else if (userId) {
        promises.push(
          this.service.user.findById(userId).then(async ({ data }) => {
            if (data) {
              comment.user = data;
              comment.user.isAdmin = await this.service.base.isAdmin(data);
            } else {
              comment.user = null;
            }
          })
        );
      }
    }

    return Promise.all(promises);
  }

  /**
   * @description: 递归删除评论
   * @param {any} destroyedData
   * @return {*}
   */
  async onDestroyed(destroyedData: any): Promise<void> {
    const commentId = destroyedData._id;
    destroyedData.effect = { number: 0 };
    await this.walkDelete(commentId, destroyedData.effect);
  }

  async walkDelete(targetCommentId, effect = { number: 0 }) {
    const { err, list } = await this.service.comment.find({
      targetCommentId,
    });

    if (err || list.length === 0) return;

    effect.number += list.length;

    await this.service.comment.deleteMany({
      targetCommentId,
    });

    const promises = [] as Promise<any>[];

    for (const { _id } of list) {
      //并行执行
      promises.push(this.walkDelete(_id, effect));
    }

    return Promise.all(promises);
  }

}
