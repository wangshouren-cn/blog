import TagOrCategoryController from "./TagOrCategoryController";

export default class extends TagOrCategoryController {
  name = "Category";
  serviceName = "category";
  /**
   * @description: 在更新完之后，更新文章里的字段
   * @param {*} oldData
   * @param {*} newData
   * @return {*}
   */
  async onUpdated({ name: oldName }, { name: newName }): Promise<void> {
    const { service } = this;
    await service.article.updateMany(
      { category: oldName },
      { category: newName }
    );
  }

  /**
   * @description: 删除后清除文章里的分类
   * @param {any} param1
   * @return {*}
   */
  async onDestroyed({ name }: any): Promise<void> {
    const { service } = this;
    await service.article.updateMany({ category: name }, { category: null });
  }
}
