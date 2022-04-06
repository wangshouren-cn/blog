import { useRouter } from "next/router";
import React, { HTMLAttributes, useEffect } from "react";
import {
  ButtonWithInput,
  getArticleById,
  Img,
  useHttpData,
  Message,
  useForceUpdate,
  MdLook,
} from "react-blog-library";
import { createComment } from "../../api";
import Comment from "../../components/Comment";
import useUser from "../../utils/useUser";
import styles from "./index.module.css";
import ArticleDetail from "../../components/ArticleDetail";
import Back from "../../components/Back";
import Loading from "../../components/Loading";
import 'highlight.js/styles/a11y-light.css'
import 'highlight.js/styles/default.css'
export interface ArticleProps extends HTMLAttributes<any> { }
const Article: React.FC<ArticleProps> = (props) => {
  const router = useRouter();

  const { data, loading, run } = useHttpData<Article>((id: string) => {
    return getArticleById(id);
  });

  const { user, setUser } = useUser();

  const forceUpdate = useForceUpdate();


  useEffect(() => {
    if (!router.query.id) return;
    run(router.query.id);
  }, [router.query.id]);

  const {
    title,
    content,
    cover,
    comments,
    _id,
  } = data;

  const hash = router.asPath.split("#")[1];

  useEffect(() => {

    if (!hash || loading) return;

    router.push(router.asPath);


  }, [hash, loading]);



  const handleReply =
    async (
      targetCommentId: string | null,
      content: string,
      targetComment?: ArticleComment
    ) => {

      if (!user) return Message.error("动动手指登录下吧~");

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
    }


  return (
    <Loading loading={loading}>
      <div className={styles.container}>
        <div className={styles.articleContainer}>
          <Back className={styles.back} />
          <h1 className={styles.title}>{title}</h1>
          <ArticleDetail article={data} />
          {cover && cover.url ? (
            <Img className={styles.cover} src={cover.url} />
          ) : null}
          <article ><MdLook markdown={content} /></article>
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
            //@ts-ignore
            autoClear={true}
          >
            评论
          </ButtonWithInput>
        </div>
      </div>
    </Loading>
  );
};
export default Article;
