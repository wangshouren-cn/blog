import { createContext } from "react";

export const defaultContextValue: ContextValue = {
  article: {
    page: 1,
    pageSize: 20,
    total: 0,
    list: [],
    search: {},
  },
};

const Context = createContext<ContextValue>(defaultContextValue);
export default Context;
