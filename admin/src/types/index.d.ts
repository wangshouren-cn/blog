interface RouteConfig {
  key: string;
  name?: string;
  children?: RouteConfig[];
}
type RoutesConfig = RouteConfig[];

type ReactNode = import("react").ReactNode;

interface RequestParams {
  [key: string]: string | number | undefined | null;
}

interface ReactElementProps {
  style?: { [key: string]: string };
  className?: string;
  children?: ReactNode;
}

interface HttpResult {
  data?: object | null;
  err?: string;
  msg?: string;
  code: number;
}

interface ListData<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}

interface Column<Record> {
  field?: string;
  name?: string;
  render?: (value: any, record: Record, index: number) => ReactNode;
  onSort?: (field:string) => any;
}
interface BaseSearchParams {
  page?: number | string;
  pageSize?: number | string;
}
