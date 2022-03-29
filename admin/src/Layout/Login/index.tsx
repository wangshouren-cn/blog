import React, { useCallback } from "react";
import { Login, login } from "react-blog-library";
import styles from "./index.module.less";

const FunctionComponent: React.FC = () => {
  const onLogined = useCallback((token: string, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.reload();
  }, []);

  return (
    <section className={styles["login-container"]}>
      <Login onLogined={onLogined} api={login} />
    </section>
  );
};
export default React.memo(FunctionComponent);
