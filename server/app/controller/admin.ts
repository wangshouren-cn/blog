import BaseController from "./base";

export default class extends BaseController {
  name = "Admin";
  serviceName = "admin";

  async login() {
    const { ctx, service, app } = this;

    const { password, username } = ctx.request.body;

    const ivs = ctx.helper.isValidString;

    if (!ivs(password) || !ivs(username)) return this.paramsValidateFailed();

    const { err, data } = await service.admin.findOne({ username });
    if (err) {
      return this.error(err);
    }

    if (!data) return this.error(null, "账号不存在");

    const { password: salPwd, _id, email: adminEmail } = data;


    if (!app.comparePassword(password, salPwd, app))
      return this.error(null, "账号或密码错误");

    const token = this.genToken(username, _id, true, adminEmail);

    delete data.password

    this.success({ token, ...data }, "登录成功");
  }

  async about() {
    const { service } = this;

    const { err, data } = await service.admin.findOne({});

    delete data.password;

    this.handleErrData({ err, data });
  }

  async shouldUpdate(_body: any): Promise<{ should: boolean; reason: string }> {
    return {
      should: this.ctx.tokenInfo.isAdmin,
      reason: "",
    };
  }
}
