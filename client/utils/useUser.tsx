import { useCallback, useEffect, useMemo, useRef } from "react";
import { Message, useForceUpdate } from "react-blog-library/lib";

let _user: any = null;

/**
 * @description: 从localStorage中取出user，并可设置user，同步到localStorage中，组件销毁时需要调用removeUpdater清除更新
 * @param {*}
 * @return {*}
 */
let updaters: Function[] = [];
export default function useUser() {

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    let userJson = localStorage.getItem("user");

    if (userJson) _user = JSON.parse(userJson);
    else _user = null;

    return () => {

      updaters = updaters.filter(u => u != forceUpdate);
    }

  }, []);

  useEffect(() => {

    updaters.push(forceUpdate);
  }, []);

  // const removeUpdater = useCallback(
  //   () => {
  //     updaters = updaters.filter(u => u != forceUpdate);
  //   },
  //   [],
  // );

  const setUser = useCallback((user: User) => {
    _user = user;
    localStorage.setItem("user", JSON.stringify(user));
    updaters.forEach(u => u());
  }, []);

  const clearUser = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    _user = null;
    updaters.forEach(u => u());
    Message.success("退出成功");
  }, []);

  return { user: _user, setUser, clearUser };
}
