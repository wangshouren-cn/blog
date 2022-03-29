import React, { useCallback, useLayoutEffect, useMemo, useState } from "react";
import {
  Button,
  ButtonWithInput,
  getArticleList,
  getCategoryList,
  getTagList,
  Img,
  Loading,
  Message,
  Modal,
  parseSearch,
  Table,
  Tag,
  TagBox,
  useHttpDataAll,
  useSearch,
  destroyArticle,
} from "react-blog-library";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

import styles from "./index.module.less";
const FunctionComponent: React.FC = () => {
  /**
   * @description:states
   */

  const navigate = useNavigate();

  const { dataMap, errors, loading, run } = useHttpDataAll<{
    article?: ListData<Article>;
    tag?: ListData<Tag>;
    category?: ListData<Category>;
  }>({
    article: () => getArticleList(parseSearch(window.location.search)),
    tag: getTagList,
    category: getCategoryList,
    // error: () => Promise.reject("测试错误"),
  });

  const [search, setSearch] = useSearch<{
    page?: number;
    pageSize?: number;
    title?: string;
  }>({ page: 1, pageSize: 20 });

  useLayoutEffect(() => {
    run();
  }, []);

  /**
   * @description:callbacks
   * @param {*}
   * @return {*}
   */

  const handleSearch = useCallback(
    (searchPartial: ArticleSearchParams) => {
      Object.assign(search, searchPartial);
      setSearch(search);
      run(["article"]);
    },
    [search]
  );

  const onSearch = useCallback((e, title) => {
    handleSearch({ title, page: 1 });
  }, []);

  const handlePageChange = useCallback((page) => {
    handleSearch({ page });
  }, []);

  const onLook = useCallback((id) => {
    navigate("/Article/Look?id=" + id);
  }, []);

  const handleTagActiveChange = useCallback((activeTags) => {
    handleSearch({ tags: activeTags.join(",") });
  }, []);

  const handleCategoryActiveChange = useCallback((activeCategories) => {
    handleSearch({ category: activeCategories[0] });
  }, []);

  const columns: Column<Article>[] = useMemo(
    () => [
      {
        field: "title",
        name: "标题",
      },
      {
        field: "content",
        name: "内容",
        render: (_, r) => <Button onClick={() => onLook(r._id)}>查看</Button>,
      },
      {
        field: "introduction",
        name: "介绍",
      },
      {
        field: "tags",
        name: "标签",
        render: (ts: string[]) => ts?.map((t) => <Tag key={t} value={t} />),
      },
      {
        field: "category",
        name: "分类",
        render: (c) => c && <Tag value={c} />,
      },

      {
        field: "likeNum",
        name: "点赞数",
      },
      {
        field: "collectNum",
        name: "收藏数",
      },

      {
        field: "cover",
        name: "封面",
        render(imgFile: ImgFile | null) {
          return imgFile ? <Img src={imgFile.url} /> : null;
        },
      },

      {
        name: "操作",
        render: (_, record: Article) => {
          return (
            <>
              <Button onClick={() => onDestroy(record._id)} type="danger">
                删除
              </Button>
              <Button onClick={() => onModify(record._id)}>编辑</Button>
            </>
          );
        },
      },
    ],
    []
  );

  const onModify = useCallback((id: string) => {
    navigate(`/Article/Edit?id=${id}`);
  }, []);

  const onDestroy = useCallback(async (id) => {

    // Modal.open({
    //   content:<Tag value="123"/>
    // })
    Modal.confirm({
      content: "确定要删除这篇文章吗?",
      onOk: async () => {
        await destroyArticle(id);

        await run();
      },
    });
  }, []);

  if (errors.length > 0) {
    Message.error(errors.join("；"));
  }

  const { article, category, tag } = dataMap;

  return (
    <>
      <section>
        <div className={styles["search-item"]}>
          <Button onClick={() => navigate("/article/create")} type="success">
            创建文章
          </Button>
        </div>

        <div className={styles["search-item"]}>
          <ButtonWithInput onButtonClick={onSearch} buttonPos="right">
            搜索
          </ButtonWithInput>
        </div>
        {tag && (
          <div className={styles["search-item"]}>
            标签
            <TagBox
              style={{ marginLeft: ".5rem" }}
              onActiveChange={handleTagActiveChange}
              defaultValue={tag.list.map(({ name }) => name)}
              // value={tag.list.map(({ name }) => name)}
            />
          </div>
        )}
        {category && (
          <div className={styles["search-item"]}>
            分类
            <TagBox
              style={{ marginLeft: ".5rem" }}
              single
              onActiveChange={handleCategoryActiveChange}
              value={category.list.map(({ name }) => name)}
            />
          </div>
        )}
      </section>
      <Loading loading={loading}>
        {article && (
          <Table
            onPageChange={handlePageChange}
            page={article.page}
            pageSize={article.pageSize}
            trKey={"_id"}
            columns={columns}
            records={article.list}
            total={article.total}
          />
        )}
      </Loading>
    </>
  );
};
export default React.memo(FunctionComponent);
