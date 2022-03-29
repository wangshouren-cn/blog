import "egg";

declare module "egg" {}

declare interface ErrListResult {
  err?: any;
  list?: any[];
  total?: number;
}

declare interface ErrDataResult {
  err?: any;
  data?: any;
}
