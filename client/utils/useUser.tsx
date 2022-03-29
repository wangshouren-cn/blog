import { useCallback, useEffect, useMemo, useRef } from "react";
import { Message, useForceUpdate } from "react-blog-library/lib";

/**
 * @description: 从localStorage中取出user，并可设置user，同步到localStorage中
 * @param {*}
 * @return {*}
 */
export default function useUser() {

  //服务端没有localStorage
  // const defaultUser = useMemo(
  //   () => JSON.parse(localStorage.getItem("user") || "{}"),
  //   []
  // );

  const userRef = useRef<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const forceUpdate = useForceUpdate();

  const setUser = useCallback((user: User) => {
    userRef.current = user;
    localStorage.setItem("user", JSON.stringify(user));
    forceUpdate();
  }, []);

  const clearUser = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    userRef.current = null;
    forceUpdate();
    Message.success("退出成功");
  }, []);

  return { user: userRef.current, setUser, clearUser };
}
