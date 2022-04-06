import { Service } from "egg";
import { ErrDataResult, ErrListResult } from "../../typings";

/**
 * Test Service
 */

export default class BaseService extends Service {

  async getUserOrAdminById(id: string): Promise<ErrDataResult> {

    let err, data;

    const res1 = await this.service.user.findById(id);

    if (res1.err || res1.data) return res1;

    const res2 = await this.service.admin.findById(id);

    if (res2.err || res2.data) return res2;

    return { err, data }

  }

  /**
   * @description:获取列表
   * @param {*模型名称 admin article category comment user tag} modelName
   * @param {*查询参数} query
   * @return {*}
   */
  name: string;
  async index(page, pageSize, filterQuery): Promise<ErrListResult> {
    const { ctx } = this;

    let err, list, total;

    try {
      list = await ctx.model[this.name]
        .find(filterQuery)
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(); //使用lean可以将mongoose对象转为js对象，这样就可以在对象上面增加或者修改属性了

      total = await ctx.model[this.name].find(filterQuery).countDocuments();
    } catch (e) {
      err = e;
      console.log("e", e);
    }
    return { err, list, total };
  }

  /**
   * @description:更新数据
   * @param {*}
   * @return {*}
   */
  async update(id: string, update: object = {}): Promise<ErrDataResult> {
    let err, data;

    const { app } = this;

    if (!("updateTime" in update)) {
      update["updateTime"] = Date.now();
    }

    if ("password" in update) {
      update["password"] = app.genSaltPwd(update["password"], app);
    }

    const { ctx } = this;

    try {
      data = await ctx.model[this.name].findByIdAndUpdate(id, update, {
        new: true,
      }).lean();

      if (data && data.password) {
        data.password = null;
      }
    } catch (e) {
      console.log("e", e);
      err = e;
    }

    return { err, data };
  }

  async create(body): Promise<ErrDataResult> {
    const { ctx } = this;

    let err, data;

    try {
      data = await ctx.model[this.name].create(body);

      if (data && data.password) {
        data.password = null;
      }
    } catch (e) {
      console.log("e", e);
      err = e;
    }

    return { err, data };
  }

  async deleteById(id): Promise<ErrDataResult> {
    let err, data;

    try {
      data = await this.ctx.model[this.name].findByIdAndDelete(id).lean();
    } catch (e) {
      console.log("e", e);
      err = e;
    }

    return { err, data };
  }

  async deleteMany(filterQuery) {
    let err, data;

    try {
      data = await this.ctx.model[this.name].deleteMany(filterQuery);
    } catch (e) {
      console.log("e", e);
      err = e;
    }

    return { err, data };
  }

  async findOne(filterQuery): Promise<ErrDataResult> {
    let err, data;

    try {
      data = await this.ctx.model[this.name].findOne(filterQuery).lean();
    } catch (e) {
      err = e;
      console.log("e", e);
    }

    return { err, data };
  }

  async findById(id): Promise<ErrDataResult> {
    let err, data;
    try {
      data = await this.ctx.model[this.name].findById(id).lean();
    } catch (e) {
      err = e;
      console.log("e", e);
    }

    return { err, data };
  }

  async updateMany(filterQuery, update): Promise<ErrListResult> {
    let err, list;

    try {
      list = await this.ctx.model[this.name].updateMany(filterQuery, update, {
        new: true,
      });
    } catch (e) {
      err = e;
      console.log("e", e);
    }

    return { err, list };
  }

  async find(filterQuery = {}) {
    let err, list;

    try {
      list = await this.ctx.model[this.name].find(filterQuery).lean();
    } catch (e) {
      err = e;
      console.log("e", e);
    }

    return { err, list };
  }

  /**
   * @description: 检查用户是否是管理员
   * @param {any} userId或user
   * @return {*}
   */
  async isAdmin(user: any) {
    const { data } = await this.service.admin.findById(
      typeof user === "string" ? user : user._id
    );

    return !!data;
  }
}
