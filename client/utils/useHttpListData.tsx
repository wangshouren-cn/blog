import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  parseSearch,
  stringifySearch,
  useForceUpdate,
} from "react-blog-library";

export default function <Data, SearchParams>(
  api: (search: SearchParams) => Promise<ListData<Data>>
) {
  const forceUpdate = useForceUpdate();

  const router = useRouter();

  const setSearch: (partialSearch: SearchParams) => void = useCallback(
    (partialSearch: SearchParams) => {
      const search = ref.current.search;

      Object.assign(search, partialSearch);

      router.push(router.pathname + `${stringifySearch(search as any)}`);
    },
    [router]
  );

  /**
   * @description:执行这个函数可以获取数据
   * @param {*}
   * @return {*}
   */
  const run = useCallback(async () => {
    const state = ref.current;

    Object.assign(state, { loading: true });

    forceUpdate();

    let data = {},
      error;

    try {
      data = await api(router.query as any);
    } catch (e) {
      error = e;
    }

    //这里用...将data展开了，所以能拿到list
    Object.assign(state, { ...data, error, loading: false });

    forceUpdate();
  }, [router]);

  const setSearchAndRun: (partialSearch: SearchParams) => void = useCallback(
    (partialSearch) => {
      setSearch(partialSearch);
      run();
    },
    [run, setSearch]
  );

  const ref = useRef<
    ListData<Data> & {
      loading: boolean;
      error: any;
      run: () => Promise<void>;
      search: SearchParams;
      setSearchAndRun: (partialSearch: SearchParams) => void;
      setSearch: (partialSearch: SearchParams) => void;
    }
  >({
    page: 1,
    pageSize: 20,
    loading: false,
    error: null,
    list: [],
    run,
    total: 0,
    search: router.query as any,
    setSearchAndRun,
    setSearch,
  });

  ref.current.run = run;
  ref.current.setSearchAndRun = setSearchAndRun;
  ref.current.setSearch = setSearch;

  return ref.current;
}
