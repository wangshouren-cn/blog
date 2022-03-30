import { Controller } from "egg";
import { ErrDataResult, ErrListResult } from "../../typings";

export default class BaseController extends Controller {
  name: string;
  serviceName: string;

  genToken(username: string, id: string, isAdmin: boolean, email: string) {
    const { app } = this;
    return app.genToken(
      {
        username,
        id,
        isAdmin,
        email,
      },
      app
    );
  }

  

  public async index() {
    const { ctx, service } = this;
    let { page = 1, pageSize = 20, ...search } = ctx.query;

    page = +page;
    pageSize = +pageSize;

    let filterQuery;

    try {
      filterQuery = await this.getFilterQuery(search);
    } catch (e) {
      console.log("e", e);
      return this.error(e);
    }

    const res: ErrListResult = await service[this.serviceName].index(
      page,
      pageSize,
      filterQuery //调用子类的getQueryCondition方法获得查询对象
    );

    if (!res.err) await this.onQueried(res);

    this.handleErrList(res, page, pageSize);
  }

  public async update() {
    const { ctx, service } = this;
    const {
      params: { id },
      request: { body },
    } = ctx;

    const { should, reason } = await this.shouldUpdate(id,body);
    if (should) {
      const { data: oldData } = await service[this.serviceName].findById(id);
      const res: ErrDataResult = await service[this.serviceName].update(
        id,
        body
      );

      if (!res.err) this.onUpdated(oldData, res.data);

      this.handleErrData(res, "已保存");
    } else {
      this.error(reason);
    }
  }

  async create() {
    const { ctx, service } = this;
    const { body } = ctx.request;
    const { should, reason } = await this.shouldCreate(body);
    if (should) {
      const res = await service[this.serviceName].create(body);
      this.handleErrData(res, "创建成功");
    } else {
      this.error(reason);
    }
  }

  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    if (!ctx.helper.isValidString(id)) return this.paramsValidateFailed();

    const res = await service[this.serviceName].deleteById(id);

    if (!res.err) {
      await this.onDestroyed(res.data);
    }

    this.handleErrData(res, "删除成功");
  }

  handleErrData(res: ErrDataResult, successMsg = "") {
    const { err, data } = res;
    if (err) {
      this.error(err);
    } else {
      this.success(data, successMsg);
    }
  }
  handleErrList(res: ErrListResult, page: number, pageSize: number) {
    const { err, list, total } = res;
    if (err) {
      this.error(err);
    } else {
      this.success({
        page,
        pageSize,
        total,
        list,
      });
    }
  }
  success(data: any, msg: string = "", code: number = 0) {
    this.ctx.body = {
      data,
      msg,
      code,
    };
  }
  error(err: any, msg: string = "", code: number = 1) {
    this.ctx.body = {
      err: String(err),
      msg,
      code,
    };
  }
  paramsValidateFailed() {
    this.error(null, "参数校验失败", 400);
  }
  async getFilterQuery(_) {
    throw new Error("ChildService should have getFilterQuery()");
  }
  async shouldCreate(_body) {
    return {
      should: true,
      reason: "",
    };
  }

  async shouldUpdate(_id,_body) {
    return {
      should: true,
      reason: "",
    };
  }
  /**
   * @description: 更新过后的回调
   * @param {*} _oldData
   * @param {*} _newData
   * @return {*}
   */
  async onUpdated(_oldData, _newData) {}

  /**
   * @description: 删除过后的回调
   * @return {*}
   */
  async onDestroyed(_destroyedData) {}

  /**
   * @description: 查询列表过后的回调
   * @return {*}
   */
  async onQueried(_res: ErrListResult) {}

 
}
