import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../layout";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { stringifySearch, useForceUpdate } from "react-blog-library/lib";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const forceUpdate = useForceUpdate();

  const onSearch = useCallback(
    (search) => {

      const pathname = window.location.pathname;
      router.push(
        (pathname === "/article" ? "/" : pathname) + stringifySearch(search)
      );

      forceUpdate();
    },
    [router]
  );

  const onCollect = useCallback((userId) => {
    router.push("/" + userId);
  }, []);

  return (
    <Layout onCollect={onCollect} onSearch={onSearch}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
