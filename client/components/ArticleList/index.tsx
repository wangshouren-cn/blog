import React, { HTMLAttributes, MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { formatTimeStrap, Img, Message, stringifySearch, Tag, useForceUpdate } from "react-blog-library";
import styles from "./index.module.css";
import classnames from "classnames";
import Link from "next/link";
import ArticleDetail from "../ArticleDetail";
import Empty from "../Empty";
import { useRouter } from "next/router";
import Loading from "../Loading";
import useHttpListData from "../../utils/useHttpListData";
import clearHtmlTag from "../../utils/clearHtmlTag";

export interface ArticleProps extends HTMLAttributes<any> {
  api: (params: ArticleSearchParams) => Promise<ListData<Article>>
}
const Article: React.FC<ArticleProps> = ({ api }) => {

  const {
    run,
    list: fetchList,
    loading,
    page,
    total,
    pageSize,
    setSearchAndRun,
  } = useHttpListData<Article, ArticleSearchParams>(api);

  const [first, setFirst] = useState(true);

  const router = useRouter();

  const refresh = useCallback(async () => {
    await run();
  }, [run]);


  useEffect(() => {
    refresh();

  }, [stringifySearch(router.query as any), refresh]);

  useEffect(() => {
    if (loading) return;
    window.scrollTo({
      top: Number(sessionStorage.getItem("scrollTop") || 0)
    })
  }, [loading]);

  const handleLink = useCallback(
    (id: string) => {
      sessionStorage.setItem("scrollTop", window.pageYOffset.toString());
      router.push(`/article?id=${id}`);
    },
    [router],
  );

  const ref = useRef<any>();

  useEffect(() => {

    let timer: any = null;

    if (ref.current) {
      timer = setTimeout(() => {
        const observer = new IntersectionObserver((changes) => {
          changes.forEach((change) => {

            const hasMore = page < Math.ceil(total / pageSize);

            if (change.isIntersecting && hasMore) {
              setFirst(false)
              sessionStorage.setItem("scrollTop", window.pageYOffset.toString());
              setSearchAndRun({ pageSize: pageSize + 20 })
            }
          });
        });
        observer.observe(ref.current);
      }, 2000)

      return () => {
        clearTimeout(timer);
      }
    }

  }, [ref.current, page, pageSize, total]);


  return (
    <Loading loading={loading} >
      <ul className={styles.ul}>
        {fetchList.length > 0 ? (
          <>
            {fetchList.map((article: Article) => {
              const { _id, title, content, cover, category, tags, createTime } =
                article;
              return (
                <li key={_id} className={styles.li}>
                  <div className={styles.content}>
                    <div>
                      <h2 onClick={() => handleLink(_id)} className={styles.title}>
                        {title}
                      </h2>
                      <span>
                        {content.length > 200
                          ? clearHtmlTag(content.substring(0, 50)) + "[...]"
                          : clearHtmlTag(content)}
                      </span>
                    </div>
                    {cover && cover.url ? (
                      <Img className={classnames(styles.img)} src={cover.url} />
                    ) : null}
                  </div>

                  <ArticleDetail article={article} />
                </li>
              );
            })}
            {page < Math.ceil(total / pageSize) && <div className={styles.loadMore} ref={ref} >...</div>}

          </>
        ) : (
          <Empty />
        )}
      </ul>
    </Loading>
  );
};
export default Article;
