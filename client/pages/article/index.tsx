import { useRouter } from "next/router";
import React, { HTMLAttributes, useCallback, useEffect, useRef } from "react";
import {
  ButtonWithInput,
  formatTimeStrap,
  getArticleById,
  Img,
  Loading,
  useHttpData,
  Message,
  Tip,
  useForceUpdate,
} from "react-blog-library";
import { createComment, updateUser } from "../../api";
import Comment from "../../components/Comment";
import Icon from "../../components/Icon";
import Layout from "../../layout";
import useUser from "../../utils/useUser";
import styles from "./index.module.css";
import classnames from "classnames";
import ArticleDetail from "../../components/ArticleDetail";

export interface ArticleProps extends HTMLAttributes<any> {}
const Article: React.FC<ArticleProps> = (props) => {
  const router = useRouter();

  const { data, loading, run } = useHttpData<Article>((id: string) => {
    return getArticleById(id);
  });

  const { user, setUser } = useUser();

  const forceUpdate = useForceUpdate();

  const ref = useRef<any>();

  useEffect(() => {
    if (!router.query.id) return;
    run(router.query.id);
  }, [router.query.id]);

  const {
    title,
    tags,
    content,
    category,
    createTime,
    likeNum,
    cover,
    comments,
    _id,
  } = data;

  useEffect(() => {
    if (ref.current) {
      ref.current.appendChild(
        document.createRange().createContextualFragment(content)
      );
    }
  }, [content]);


  const handleReply = useCallback(
    async (
      targetCommentId: string | null,
      content: string,
      targetComment?: ArticleComment
    ) => {
      if (!user) return Message.error("您还没有登录");

      content = content.trim();

      if (content.length > 200) return Message.error("评论内容最多200个字");

      if (content.length == 0) return Message.error("您还没有输入内容");

      const newComment: any = await createComment({
        content,
        targetCommentId,
        auditStatus: 1,
        articleId: router.query.id as string,
        userId: user._id,
      });

      newComment.username = user.username;

      if (targetComment) {
        newComment.forUsername = targetComment.username;
        (targetComment.children || (targetComment.children = [])).push(
          newComment
        );
      } else {
        comments.push(newComment);
      }

      forceUpdate();

      Message.success("回复成功");
    },
    [router, user, comments]
  );

  

  const isLiked = user && user?.articleIds?.includes(_id);

  return (
    // @ts-ignore
    <Loading className={ styles.loading} loading={loading}>
      <div className={styles.container}>
        <div className={styles.articleContainer}>
          <h1 className={styles.title}>{title}</h1>
          <ArticleDetail article={data} />
          {cover && cover.url ? (
            <Img className={styles.cover} src={cover.url} />
          ) : null}
          <article ref={ref}></article>
          <div className={styles.operation}>
            <span className={styles["operation-like"]}></span>
          </div>
        </div>

        <div className={styles.commentContainer}>
          <h3 className={styles.commentTitle}>评论</h3>
          <div>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <Comment
                  onReply={handleReply}
                  key={comment._id}
                  articleComment={comment}
                />
              ))
            ) : (
              <div className={styles.empty}>暂无评论</div>
            )}
          </div>
        </div>

        <div className={styles.replyContainer}>
          <ButtonWithInput
            onButtonClick={(e, content) => handleReply(null, content)}
            //@ts-ignore
            placeholder="说点什么..."
            buttonPos="right"
          >
            评论
          </ButtonWithInput>
        </div>
      </div>
    </Loading>
  );
};
export default Article;
