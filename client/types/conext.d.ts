interface ContextValue {
  article: ListData<Article> & {
    search: ArticleSearchParams;
  };
}
