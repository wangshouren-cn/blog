import React, { HTMLAttributes, useCallback } from "react";
import { formatTimeStrap, Message, Tip, useForceUpdate } from "react-blog-library/lib";
import useUser from "../../utils/useUser";
import Icon from "../Icon";
import styles from "./index.module.css";
import classnames from "classnames";
import { updateUser } from "../../api";

export interface ArticleDetailProps extends HTMLAttributes<any> {
  article: Article;
}
const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
}) => {
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
  } = article;
  const forceUpdate = useForceUpdate();

  const { user, setUser } = useUser();

  const isLiked = user?.articleIds?.includes(_id);

  const handleLike = useCallback(
    async () => {
      if (!user) return;

      const { articleIds } = user;

      const index = articleIds.indexOf(_id);

      if (index === -1) {
        articleIds.push(_id);

        await updateUser(user._id, { articleIds } as User);

        Message.success("收藏成功");
      } else {
        articleIds.splice(index, 1);

        await updateUser(user._id, { articleIds } as User);

        Message.success("已取消收藏");
      }

      forceUpdate();

      setUser(user);
    },
    [user, _id]
  );

  return (
    <ul className={styles.detail}>
      <li>
        <Icon type="icon-category" />{" "}
        <span className={styles.category}>{category}</span>
      </li>
      <li>
        <Icon type="icon-tags" />
        {tags &&
          tags.map((t) => (
            <span className={styles.tag} key={t}>
              {t}
            </span>
          ))}
      </li>
      <li>
        <Icon type="icon-ico-date" />
        <span className={styles.date}>{formatTimeStrap(createTime)}</span>
      </li>
      <li>
        {/* @ts-ignore */}
        <Tip msg={isLiked ? "已收藏" : "收藏该文章"} when="hover">
          <Icon
            onClick={handleLike}
            className={classnames(styles.like, {
              "color-red": isLiked,
            })}
            type="icon-like"
          />
        </Tip>
        <span className={styles.likeNum}>{likeNum}</span>
      </li>
    </ul>
  );
};
export default ArticleDetail;
