import React, { useCallback, useEffect, useMemo } from "react";
import { Button, ButtonWithInput, destroyComment, getCommentList, Message, Modal, parseSearch, Select, Table, updateComment, useHttpListData } from "react-blog-library";


const Comment: React.FC = () => {
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
  } = useHttpListData<Comment, CommentSearchParams>(() =>
    getCommentList(parseSearch(window.location.search))
  );

  const columns: Column<Comment>[] = [
    {
      field: "content",
      name: "评论",
    },
    {
      field: "auditStatus",
      name: "审核状态",
      render: (status) => {
        switch (status) {
          case 1:
            return <span>未审核</span>;
          case 2:
            return <span>已审核</span>;
          default:
            return <span>已驳回</span>;
        }
      },
    },
    {
      field: "targetContent",
      name: "目标评论",
    },
    {
      field: "articleId",
      name: "文章id",
    },
    {
      name: "操作",
      render(_, { auditStatus, _id }) {
        const shBtn = (
          <Button
            onClick={() => {
              update(_id, { auditStatus: 2 } as any);
            }}
          >
            审核
          </Button>
        );
        const bhBtn = (
          <Button
            onClick={() => {
              update(_id, { auditStatus: 3 } as any);
            }}
          >
            驳回
          </Button>
        );

        let auditButton;

        switch (auditStatus) {
          case 1:
            auditButton = (
              <>
                {shBtn}
                {bhBtn}
              </>
            );
            break;

          case 2:
            auditButton = <>{bhBtn}</>;
            break;

          default:
            auditButton = <>{shBtn}</>;
            break;
        }

        return (
          <>
            {auditButton}
            <Button onClick={() => handleDeleteClick(_id)} type="danger">
              删除
            </Button>
          </>
        );
      },
    },
  ];

  const options = useMemo<{
    label?: string;
    value?: number;
  }[]>(
    () => [
      {
        label: "全部",
        value: 0,
      },
      {
        label: "未审核",
        value: 1,
      },
      {
        label: "已审核",
        value: 2,
      },
      {
        label: "已驳回",
        value: 3,
      },
    ],
    []
  );

  /**
   * @description: functions
   */
  useEffect(() => {
    run();
  }, []);

  const update = useCallback(async (id, payload) => {
    await updateComment(id, payload);
    await run();
  }, []);

  const handleDeleteClick = useCallback((id) => {
    Modal.confirm({
      content: "确定要删除吗？",
      onOk: async () => {
        await destroyComment(id);
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
          onButtonClick={(_, content) => setSearchAndRun({ content })}
          buttonPos="right"
        >
          搜索
        </ButtonWithInput>
        <Select
          onChange={(auditStatus:number) => setSearchAndRun({ auditStatus })}
          options={options}
        />
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
export default React.memo(Comment);
