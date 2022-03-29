import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./index.module.less";

export interface SlideProps {
  routesConfig: RoutesConfig;
}

const FunctionComponent: React.FC<SlideProps> = ({ routesConfig }) => {
  const exit = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className={styles["slide"]}>
      <div className={styles["linkContainer"]}>
        {routesConfig.map(
          ({ key, name }: RouteConfig) =>
            name && (
              <NavLink
                className={({ isActive }) =>
                  styles["link-item"] + " " + (isActive ? styles["active"] : "")
                }
                key={key}
                to={`/${key.split(".").join("/")}`}
              >
                {name}
              </NavLink>
            )
        )}
        <a onClick={exit} className={styles["link-item"]}>
          退出
        </a>
      </div>
      {/* <h1 className={styles["title"]}>王首人的博客后台</h1> */}
    </div>
  );
};

export default React.memo(FunctionComponent);
