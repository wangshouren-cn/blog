import React, { HTMLAttributes, useEffect } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import "braft-editor/dist/output.css";
import { getArticleById, Loading, Message, SaveBar, useHttpData } from "react-blog-library";

export interface LookProps extends HTMLAttributes<any> {}
const Look: React.FC<LookProps> = (props) => {
  const [params] = useSearchParams();

  const id = params.get("id");

  const { data, run, loading, error } = useHttpData(async () => {
    if (!id) throw new Error("id不存在");
    return await getArticleById(id);
  });

  useEffect(() => {
    run();
  }, []);

  if (error) {
    Message.error(error);
  }

  return (
    <Loading loading={loading}>
      {data && (
        <div
          className="braft-output-content"
          dangerouslySetInnerHTML={{ __html: data!.content }}
        ></div>
      )}
      <SaveBar showBack />
    </Loading>
  );
};
export default Look;
