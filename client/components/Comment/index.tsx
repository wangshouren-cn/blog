import React, {
  HTMLAttributes,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import {
  ButtonWithInput,
  formatTimeStrap,
  Message,
} from "react-blog-library/lib";
import { createComment } from "../../api";
import useUser from "../../utils/useUser";
import Icon from "../Icon";
import styles from "./index.module.css";
export interface CommentProps extends HTMLAttributes<any> {
  articleComment: ArticleComment;
  fatherComment?: ArticleComment;
  onReply: (
    targetCommentId: string,
    content: string,
    articleComment?: ArticleComment
  ) => any;
}
const Comment: React.FC<CommentProps> = ({
  articleComment,
  fatherComment,
  onReply,
  ...props
}) => {
  const {
    username,
    children,
    content,
    createTime,
    forUsername,
    _id,
    articleId,
  } = articleComment;

  const { user } = useUser();

  const [showReplyInput, setShowReplyInput] = useState(false);

  const ref: MutableRefObject<any> = useRef();

  const handleReplyClick = useCallback(() => {
    if (!user) return Message.error("动动手指登录下吧~");

    if (showReplyInput) return;
    setShowReplyInput(true);

    setTimeout(() => {
      const handler = (e: any) => {
        let target = e.target;

        while (target && target !== ref.current) {
          target = target.parentNode;
        }

        if (!target) {
          setShowReplyInput(false);
          document.body.removeEventListener("click", handler);
        }
      };

      document.body.addEventListener("click", handler);
    });
  }, [user, showReplyInput]);

  const handleReply = useCallback(async (e, content: string) => {
    await onReply(_id, content, fatherComment || articleComment);
    setShowReplyInput(false);
  }, [onReply]);

  return (
    <div id={_id} className={styles.container} {...props}>
      <div className={styles.body}>
        <div className={styles.left}>
          <Icon className={styles.avatar} type="icon-user-avatar-full-fill" />
        </div>

        <div className={styles.right}>
          <div className={styles.username}>
            {username || "空空空空空空"}{" "}
            {typeof forUsername === "string"
              ? <span className={styles.usernameAddition} >{`回复了 ${forUsername || "空空空空空空"}`}</span>
              : null}
          </div>

          <div>
            <span className={styles.time}>{formatTimeStrap(createTime)}</span>
            <span className={styles.reply} onClick={handleReplyClick}>
              回复
            </span>
          </div>

          <div className={styles.content}>{content || "空空空空空空"}</div>

          {showReplyInput ? (
            <div ref={ref} className={styles.replyBox}>
              <ButtonWithInput
                onButtonClick={handleReply}
                // @ts-ignore
                placeholder="请输入评论内容"
                buttonPos="right"
              >
                确定
              </ButtonWithInput>
            </div>
          ) : null}
        </div>
      </div>

      {children && children.length > 0
        ? <div className={styles.children} >{children.map((comment) => (
          <Comment
            fatherComment={articleComment}
            onReply={onReply}
            style={{
              backgroundColor: "rgba(193,193,193,0.1)",
              // marginBottom: "1rem",
              borderBottom: "none",
            }}
            key={comment._id}
            articleComment={comment}
          />
        ))}
        </div> : null}
    </div>
  );
};
export default Comment;
