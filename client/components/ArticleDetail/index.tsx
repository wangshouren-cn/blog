import React, { HTMLAttributes, useCallback, useEffect } from "react";
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
      if (!user) return Message.error("动动手指登录下吧~");

      const { articleIds } = user;

      const index = articleIds.indexOf(_id);

      if (index === -1) {
        articleIds.push(_id);

        await updateUser(user._id, { articleIds } as User);

        article.likeNum++;

        Message.success("收藏成功");
      } else {
        articleIds.splice(index, 1);

        await updateUser(user._id, { articleIds } as User);

        article.likeNum--;

        Message.success("已取消收藏");
      }

      forceUpdate();

      setUser(user);
    },
    [user, _id]
  );

  return (
    <ul className={styles.detail}>
      <li className={styles.categoryBox}>
        <Icon type="icon-category" />{" "}
        <span className={styles.category}>{category}</span>
      </li>
      <li className={styles.tagBox}>
        <Icon type="icon-tags" />
        {tags && tags.length > 0 &&
          tags.map((t) => (
            <span className={styles.tag} key={t}>
              {t}
            </span>
          ))}
      </li>
      <li className={styles.dateBox}>
        <Icon type="icon-ico-date" />
        <span className={styles.date}>{formatTimeStrap(createTime)}</span>
      </li>
      <li>
        <Icon
          onClick={handleLike}
          className={classnames(styles.like, {
            "color-red": isLiked,
          })}
          type="icon-like"
        />
        <span className={styles.likeNum}>{likeNum}</span>
      </li>
    </ul>
  );
};
export default ArticleDetail;
