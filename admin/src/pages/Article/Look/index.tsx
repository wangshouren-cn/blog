import React, { HTMLAttributes, MutableRefObject, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "braft-editor/dist/output.css";
import { getArticleById, Loading, Message, SaveBar, useHttpData, mdParser, MdLook } from "react-blog-library";
import 'highlight.js/styles/a11y-light.css'
import 'highlight.js/styles/default.css'
export interface LookProps extends HTMLAttributes<any> { }
const Look: React.FC<LookProps> = () => {
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
      <MdLook markdown={data.content} />
      <SaveBar showBack />
    </Loading>
  );
};
export default Look;
