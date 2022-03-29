interface ListData<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}

interface ImgFile {
  uid: string;
  url: string;
  name: string;
}

interface BaseSearchParams {
  page?: number | string;
  pageSize?: number | string;
}