import { useRouter } from "next/router";
import React, { HTMLAttributes,  useEffect } from "react";
import { getArticleList, Loading } from "react-blog-library/lib";
import ArticleList from "../components/ArticleList";
import useHttpListData from "../utils/useHttpListData";
export interface CollectProps extends HTMLAttributes<any> {}
const Collect: React.FC<CollectProps> = () => {
  const router = useRouter();

  const {
    run,
    list: articleList,
    loading,
  } = useHttpListData<Article, ArticleSearchParams>((params) =>
    getArticleList({ ...params, userId: router.query.userId as string })
  );

  useEffect(() => {
    run();
  }, [run]);

  return (
      <Loading loading={loading}>
        <ArticleList articles={articleList} />
      </Loading>
  );
};
export default Collect;
