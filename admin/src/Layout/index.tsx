import React, { ReactElement } from "react";
import Login from "./Login";
import Content from "./Content";
import Slide from "./Slide";

export interface LayoutProps {
  routesConfig: RoutesConfig;
}

const FunctionComponent: React.FC<LayoutProps> = (props) => {
  const { routesConfig } = props;
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Login />;
  }
  return (
    <>
      <Slide routesConfig={routesConfig} />
      <Content routesConfig={routesConfig} />
    </>
  );
};

export default React.memo(FunctionComponent);
