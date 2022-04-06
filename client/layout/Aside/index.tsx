import React, { HTMLAttributes, useCallback } from "react";
import styles from "./index.module.css";
import classnames from "classnames";
import { useRouter } from "next/router";
import Icon from "../../components/Icon";
export interface AsideProps extends HTMLAttributes<any> {
  categories: Category[];
  onSearch: (search: ArticleSearchParams) => any;
  tags: Tag[];
}
const Aside: React.FC<AsideProps> = ({
  categories,
  tags,
  onSearch,
  ...props
}) => {
  const router = useRouter();

  const queryTags = router.query.tags
    ? (router.query.tags as string).split(",")
    : [];

  const onTagClick = useCallback(
    (name: string) => {
      let index;
      if ((index = queryTags.indexOf(name)) === -1) {
        queryTags.push(name);
      } else {
        queryTags.splice(index, 1);
      }

      onSearch({
        tags: queryTags.join(","),
      });
    },
    [router, queryTags]
  );

  return (
    <>
      <aside className={styles.aside}>
        <h3 className={styles.title}>
          <Icon className={styles.icon} type="icon-category" />
          分类目录</h3>
        <ul className={styles.ul}>

          {categories &&
            categories.map((c) => (
              <li
                onClick={() => onSearch({ category: c.name })}
                key={c.name}
                className={classnames(styles.li, {
                  "color-black": router.query.category === c.name,
                })}
              >
                {`${c.name}(${c.articleCount})`}
              </li>
            ))}
        </ul>
      </aside>

      <aside className={styles.aside}>
        <h3 className={styles.title}><Icon className={styles.icon} type="icon-tags" />标签目录</h3>
        <ul className={styles.ul}>
          {tags &&
            tags.map((t) => (
              <li
                onClick={() => onTagClick(t.name)}
                key={t.name}
                className={classnames(styles.li, {
                  "color-black": queryTags.includes(t.name),
                })}
              >
                {`${t.name}(${t.articleCount})`}
              </li>
            ))}
        </ul>
      </aside>
    </>
  );
};
export default Aside;
