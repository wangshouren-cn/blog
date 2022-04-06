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
import Loading from "../components/Loading";
const Home: NextPage = () => {

  return (
    <div className={styles.container}>
      <ArticleList api={getArticleList} />
    </div>
  );
};

export default Home;
