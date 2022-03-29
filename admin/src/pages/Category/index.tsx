import React, { useCallback, useEffect, useMemo } from "react";
import { Button, ButtonWithInput, createCategory, destroyCategory, getCategoryList, Input, Message, Modal, Table, updateCategory, useHttpListData } from "react-blog-library/lib";


const FunctionComponent: React.FC = () => {
  /**
   * @description: states
   */
  const {
    list,
    loading,
    run,
    error,
    page,
    pageSize,
    total,
    search,
    setSearchAndRun,
  } = useHttpListData<Category, CategorySearchParams>(getCategoryList);

  const columns: Column<Category>[] = [
    {
      field: "name",
      name: "名称",
    },
    {
      field: "articleCount",
      name: "文章数量",
    },
    {
      name: "操作",
      render(_, r) {
        return (
          <>
            <Button onClick={() => handleUpdate(r)}>修改</Button>
            <Button onClick={() => handleDeleteClick(r._id)} type="danger">
              删除
            </Button>
          </>
        );
      },
    },
  ];

  /**
   * @description: functions
   */
  useEffect(() => {
    run();
  }, []);

  const handleUpdate = useCallback(async (tag: Category) => {
    let name = "";

    Modal.confirm({
      content: (
        <Input
          onChange={(v) => {
            name = v;
          }}
          defaultValue={tag.name}
        />
      ),
      async onOk() {
        if (!name) return Message.error("名称不能为空");
        await updateCategory(tag._id, { name } as Category);
        await run();
      },
    });
  }, []);

  const handleDeleteClick = useCallback((id) => {
    Modal.confirm({
      content: "确定要删除吗？",
      onOk: async () => {
        await destroyCategory(id);
        await run();
      },
    });
  }, []);

  const handleCreate = useCallback(() => {
    let name = "";

    Modal.confirm({
      content: (
        <Input
          onChange={(v) => {
            name = v;
          }}
        />
      ),
      async onOk() {
        if (!name) return Message.error("名称不能为空");
        await createCategory({ name } as Category);
        await run();
      },
    });
  }, []);

  /**
   * @description: conditions
   */
  if (error) {
    Message.error(error);
  }

  return (
    <>
      <section>
        <ButtonWithInput
          onButtonClick={(_, name) => setSearchAndRun({ name })}
          buttonPos="right"
        >
          搜索
        </ButtonWithInput>
        <Button type="success" onClick={handleCreate}>
          新建
        </Button>
      </section>
      {list && (
        <Table
          records={list}
          page={page}
          columns={columns}
          trKey={"_id"}
          pageSize={pageSize}
          total={total}
          onPageChange={(page) => setSearchAndRun({ page })}
        />
      )}
    </>
  );
};
export default React.memo(FunctionComponent);
