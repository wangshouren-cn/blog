import type { NextPage } from "next";
import { CSSProperties } from "react";
const Main: NextPage<{
  style: CSSProperties;
}> = ({ children, style }) => {
  return <main style={style}>{children}</main>;
};

export default Main;
