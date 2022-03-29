import React from "react";
import { ReactElement, lazy } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

const pages = import.meta.glob("../pages/**/*");

/* 
{"../pages/Tag/index.tsx": function tsx()}
*/

export const mapRoutesConfigToRouter = (
  routesConfig: RoutesConfig
): ReactElement => {
  return (
    <>
      {routesConfig.map(({ key, children }: RouteConfig) => {
        key = key.split(".").join("/");

        const page = pages[`../pages/${key}/index.tsx`];

        if (!page) return;

        //@ts-ignore
        const Component = lazy(page);

        return (
          <React.Fragment key={key}>
            <Route
              caseSensitive={false}
              path={`/${key}`}
              element={
                <React.Suspense fallback={"Loading..."}>
                  <Component />
                </React.Suspense>
              }
            />
            {children ? mapRoutesConfigToRouter(children) : null}
          </React.Fragment>
        );
      })}
    </>
  );
};
