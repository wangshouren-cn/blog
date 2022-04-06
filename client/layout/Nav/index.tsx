import React, {
  ChangeEvent,
  KeyboardEvent,
  HTMLAttributes,
  useCallback,
  useEffect,
} from "react";
import Link from "next/link";
import {
  Button,
  Message,
  Img,
  Input,
  Modal,
  Login,
  stringifySearch,
} from "react-blog-library";
import classnames from "classnames";

export interface NavProps extends HTMLAttributes<any> {
  onSearch: (search: ArticleSearchParams) => any;
  onCollect: (userId: string) => void;
}
import styles from "./index.module.css";
import { login } from "../../api/user";
import Register from "../../components/Register";
import useUser from "../../utils/useUser";
import { useRouter } from "next/router";
import useThrottle from "../../utils/useThrottle";
import useDebounce from "../../utils/useDebounce";
const Nav: React.FC<NavProps> = ({ onSearch, onCollect }) => {
  const { user, setUser, clearUser } = useUser();

  const router = useRouter();

  const handleChange = useDebounce(
    (title: string) => {
      onSearch({ title });
    },
    [onSearch],
    { delay: 1000, first: false }
  );

  const onLogined = useCallback((token: string, user: User) => {
    Modal.close();
    localStorage.setItem("token", token);
    setUser(user);
    Message.success(`欢迎你，${user.username}!`);
  }, []);

  const userRegister = useCallback(() => {
    Modal.open({
      content: <Register onRegistered={onLogined} />,
      autoClose: true,
    });
  }, []);

  const userLogin = useCallback(() => {
    Modal.open({
      content: <Login api={login} onLogined={onLogined} />,
      autoClose: true,
    });
  }, []);

  const homeClick = useCallback(() => {
    sessionStorage.removeItem("scrollTop");
    router.push("/");
  }, []);

  return (
    <nav className={classnames(styles.nav)}>
      <div className={classnames(styles.head)}>
        <div className={classnames(styles.avatarBox)}>
          <Img
            className={classnames(styles.avatarImg)}
            style={{ borderRadius: "50%" }}
            src="http://demo.qzhai.net/gohan/wp-content/uploads/2020/01/stock-photo-1005217204-1-100x100.png"
          />
        </div>
        <h1 className={classnames(styles.h1)}>首人小寨</h1>
      </div>
      <ul className={classnames(styles.footer)}>
        <li>
          <Input
            onChange={handleChange}
            className={classnames(styles.input)}
            placeholder="搜索"
          />
        </li>
        <li
          onClick={homeClick}
          className={classnames(styles.li, {
            active: router.pathname === "/",
          })}
        >
          <Link href={"/"}>首页</Link>
        </li>

        {user ? (
          <>
            <li
              onClick={() => onCollect(user._id)}
              className={classnames(styles.li, {
                active: stringifySearch(router.query as any).includes("userId"),
              })}
            >
              <span >收藏</span>
            </li>
            <li onClick={() => {
              Modal.confirm({
                content: "确定要退出吗？",
                onOk: clearUser,
              });
            }}>
              <span

              >
                退出
              </span>
            </li>
          </>
        ) : (
          <>
            <li onClick={userRegister}>
              <span >注册</span>
            </li>
            <li onClick={userLogin}>
              <span >登录</span>
            </li>
          </>
        )}


      </ul>
    </nav>
  );
};
export default Nav;
