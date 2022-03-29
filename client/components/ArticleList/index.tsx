import React, { HTMLAttributes } from "react";
import { formatTimeStrap, Img, Loading, Tag } from "react-blog-library";
import styles from "./index.module.css";
import classnames from "classnames";
import Link from "next/link";
import ArticleDetail from "../ArticleDetail";

export interface ArticleProps extends HTMLAttributes<any> {
  articles: Article[];
}
const Article: React.FC<ArticleProps> = ({ articles }) => {
  return (
    //@ts-ignore
    <Loading className={ styles.loading} loading={ !articles}>
      <ul className={styles.ul}>
      {articles.length > 0 ? (
        articles.map((article) => {
          const { _id, title, content, cover, category, tags, createTime } =
            article;
          return (
            <li key={_id} className={styles.li}>
              <div className={styles.content}>
                <div>
                  <h2 className={styles.title}>
                    <Link href={`/article?id=${_id}`}>{title}</Link>
                  </h2>
                  <span>
                    {content.length > 200
                      ? content.substring(0, 50) + "[...]"
                      : content}
                  </span>
                </div>
                {cover && cover.url ? (
                  <Img className={classnames(styles.img)} src={cover.url} />
                ) : null}
              </div>

              <ArticleDetail article={article} />
            </li>
          );
        })
      ) : (
        <div className={styles.empty}>无</div>
      )}
    </ul>
    </Loading>
  );
};
export default Article;
