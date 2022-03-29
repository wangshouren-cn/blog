import type { NextPage } from "next";

import Head from "next/head";
import Main from "./Main";
import Nav from "./Nav";
import styles from "./index.module.css";
import classnames from "classnames";
import Aside from "./Aside";
import useHttpListData from "../utils/useHttpListData";
import { getCategoryList, getTagList } from "react-blog-library/lib";
import { useEffect } from "react";

const Layout: NextPage<{
  onSearch: (search: ArticleSearchParams) => any;
  onCollect:(userId:string)=>any
}> = ({ children, onSearch,onCollect }) => {
  const { list: categories, run } = useHttpListData(getCategoryList);

  const { list: tags, run:runTags } = useHttpListData(getTagList);

  useEffect(() => {
    run();
    runTags();
  }, []);

  return (
    <div>
      <Head>
        <title>博客</title>
        <meta name="description" content="博客文章" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={classnames(styles.container)}>
          <div>
            <Nav onCollect={ onCollect} style={{ display: "inline-block" }} onSearch={onSearch} />
          </div>
          <Main style={{ display: "inline-block" }}>{children}</Main>
          <div>
            <Aside
              onSearch={onSearch}
              style={{ display: "inline-block" }}
              categories={categories}
              tags={ tags}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
