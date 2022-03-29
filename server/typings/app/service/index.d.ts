// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAdmin from '../../../app/service/admin';
import ExportArticle from '../../../app/service/article';
import ExportBase from '../../../app/service/base';
import ExportCategory from '../../../app/service/category';
import ExportComment from '../../../app/service/comment';
import ExportTag from '../../../app/service/tag';
import ExportUser from '../../../app/service/user';

declare module 'egg' {
  interface IService {
    admin: AutoInstanceType<typeof ExportAdmin>;
    article: AutoInstanceType<typeof ExportArticle>;
    base: AutoInstanceType<typeof ExportBase>;
    category: AutoInstanceType<typeof ExportCategory>;
    comment: AutoInstanceType<typeof ExportComment>;
    tag: AutoInstanceType<typeof ExportTag>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
