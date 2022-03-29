import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, getArticleList, stringifySearch } from "react-blog-library";
import Context, { defaultContextValue } from "../context";
import Layout from "../layout";
import dynamic from "next/dynamic";
import useHttpListData from "../utils/useHttpListData";
import ArticleList from "../components/ArticleList";
import { useRouter } from "next/router";
import styles from "./index.module.css";
const Home: NextPage = () => {
  const {
    run,
    list: articleList,
    loading,
    search,
    page,
    total,
    pageSize,
    setSearchAndRun,
  } = useHttpListData<Article, ArticleSearchParams>(getArticleList);

  const router = useRouter();

  //callbacks hooks

  const ref = useRef<any>();

  const refresh = useCallback(() => {
    run();
  }, [run]);

  useEffect(() => {
    refresh();

  }, [stringifySearch(router.query), refresh]);

  return (
    <div ref={ref}>
      <ArticleList articles={articleList} />
      <div className={styles.pageOperations}>
        {page < Math.ceil(total / pageSize) ? (
          <Button onClick={() => setSearchAndRun({ page: page + 1 })}>
            下一页
          </Button>
        ) : (
          "已经到底了..."
        )}
      </div>
    </div>
  );
};

export default Home;
