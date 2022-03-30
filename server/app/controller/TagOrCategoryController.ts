import { ErrListResult } from "../../typings";
import BaseController from "./base";

export default class extends BaseController {
  async getFilterQuery({ name }) {
    let filterQuery: any = {};
    if (name) {
      filterQuery.name = {
        $regex: decodeURIComponent(name),
        $options: "i",
      };
    }
    return filterQuery;
  }

  async shouldCreate({ name }): Promise<{ should: boolean; reason: string }> {
    const { service } = this;

    let should = true,
      reason;

    const { err, data } = await service[this.serviceName].findOne({ name });

    if (err) {
      should = false;
      reason = err;
    } else if (data) {
      should = false;
      reason = "名称已存在";
    }

    return { should, reason };
  }
  async shouldUpdate(_id:string,body: any): Promise<{ should: boolean; reason: string }> {
    return await this.shouldCreate(body);
  }

  async onQueried(res: ErrListResult): Promise<void> {
    const { list } = res;
    const { service, name } = this;

    if (list) {
      for (const item of list) {
        const filterQuery = {};
        filterQuery[name] = item.name;
        const { list: _list } = await service.article.find(filterQuery);
        item.articleCount = _list.length;
      }
    }
  }
}
