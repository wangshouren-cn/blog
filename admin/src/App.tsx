import Layout from "./Layout/index";
import React from "react";
import routesConfig from "./routes.config";
import { BrowserRouter } from "react-router-dom";

const FunctionComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout routesConfig={routesConfig} />
    </BrowserRouter>
  );
};

export default React.memo(FunctionComponent);
