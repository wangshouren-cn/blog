import { useRouter } from "next/router";
import React, { HTMLAttributes, useEffect } from "react";
import { getArticleList } from "react-blog-library/lib";
import ArticleList from "../components/ArticleList";
import Loading from "../components/Loading";
import useHttpListData from "../utils/useHttpListData";
import styles from "./index.module.css";
export interface CollectProps extends HTMLAttributes<any> { }
const Collect: React.FC<CollectProps> = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <ArticleList api={(params) =>
        getArticleList({ ...params, userId: router.query.userId as string })} />
    </div>
  );
};
export default Collect;
