import TagOrCategoryController from "./TagOrCategoryController";

export default class extends TagOrCategoryController {
  name = "Tag";
  serviceName = "tag";
  /**
   * @description: 在更新完之后，更新文章里的字段
   * @param {*} oldData
   * @param {*} newData
   * @return {*}
   */
  async onUpdated({ name: oldName }, { name: newName }): Promise<void> {
    const { service } = this;
    const { err, list } = await service.article.find({ tags: oldName });

    if (err) return;

    for (const { tags, _id } of list) {
      const index = tags.indexOf(oldName);
      tags[index] = newName;
      await service.article.update(_id, { tags });
    }
  }

  /**
   * @description: 删除后，删除文章里的标签
   * @param {*} param1
   * @return {*}
   */  
  async onDestroyed({ name }) {
    const { service } = this;
    const { err, list } = await service.article.find({ tags: name });

    if (err) return;

    for (const { tags, _id } of list) {
      const index = tags.indexOf(name);
      tags.splice(index, 1);
      await service.article.update(_id, { tags });
    }
  }
}
