interface Category{
  name: string;
  createTime: string;
  updateTime: string;
  _id: string;
  articleCount: number;
}

interface CategorySearchParams extends BaseSearchParams{
  name?: string;
}