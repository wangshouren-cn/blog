import React from "react";
import { Routes } from "react-router";
import routesConfig from "../../routes.config";
import { mapRoutesConfigToRouter } from "../../util/mapRoutesConfig";
import styles from "./index.module.less";

const FunctionComponent: React.FC<{ routesConfig: RoutesConfig }> = (props) => {
  return (
    <div className={styles["content"]}>
      <div className={styles["content-wrap"]}>
        <Routes>{mapRoutesConfigToRouter(routesConfig)}</Routes>
      </div>
    </div>
  );
};

export default React.memo(FunctionComponent);
