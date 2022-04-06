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
import BackTop from "../components/BackTop";
import Loading from "../components/Loading";

const Layout: NextPage<{
  onSearch: (search: ArticleSearchParams) => any;
  onCollect: (userId: string) => any
}> = ({ children, onSearch, onCollect }) => {
  const { list: categories, run, loading: categoriesLoading } = useHttpListData(getCategoryList);

  const { list: tags, run: runTags, loading: tagsLoading } = useHttpListData(getTagList);

  useEffect(() => {
    run();
    runTags();
  }, []);

  return (
    <div>
      <Head>
        <title>首人小寨</title>
        <meta name="description" content="博客文章" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={classnames(styles.container)}>
          <div className={styles["layout-nav"]}>
            <Nav onCollect={onCollect} style={{ display: "inline-block" }} onSearch={onSearch} />
          </div>
          <div className={classnames(styles.second)}>
            <div className={styles["layout-main"]}><Main >{children}</Main></div>
            <div className={styles["layout-aside"]}>
              <Loading loading={categoriesLoading || tagsLoading}>
                <Aside
                  onSearch={onSearch}
                  style={{ display: "inline-block" }}
                  categories={categories}
                  tags={tags}
                />
              </Loading>
            </div>
          </div>
        </div>
        <BackTop />
      </div>
    </div>
  );
};

export default Layout;
