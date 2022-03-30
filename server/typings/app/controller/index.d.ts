// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTagOrCategoryController from '../../../app/controller/TagOrCategoryController';
import ExportAdmin from '../../../app/controller/admin';
import ExportArticle from '../../../app/controller/article';
import ExportBase from '../../../app/controller/base';
import ExportCategory from '../../../app/controller/category';
import ExportComment from '../../../app/controller/comment';
import ExportCommon from '../../../app/controller/common';
import ExportTag from '../../../app/controller/tag';
import ExportUser from '../../../app/controller/user';

declare module 'egg' {
  interface IController {
    tagOrCategoryController: ExportTagOrCategoryController;
    admin: ExportAdmin;
    article: ExportArticle;
    base: ExportBase;
    category: ExportCategory;
    comment: ExportComment;
    common: ExportCommon;
    tag: ExportTag;
    user: ExportUser;
  }
}
