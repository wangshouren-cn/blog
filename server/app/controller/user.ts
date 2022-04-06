import BaseController from "./base";

export default class extends BaseController {
  name = "User";
  serviceName = "user";

  validateEmailCode(session, _email, _code) {
    const { email, code } = session || {};


    const res = email === _email && code === _code;

    if (res) session.emailValidate = null;

    return res;
  }

  async sendMailCheck() {
    return this.sendMail(true);
  }

  /**
   * @description: 发送邮箱验证码，isCheckEmailExisted用来是否在数据库中检查email已存在
   * @param {*}isCheckEmailExisted
   * @return {*}
   */
  async sendMail(isCheckEmailExisted: boolean = false) {
    const { ctx } = this;
    const { email } = this.ctx.request.body;

    if (isCheckEmailExisted) {
      const { should, reason } = await this.shouldCreate({ email });
      if (!should) {
        return this.error(reason);
      }
    }

    if (!ctx.helper.isValidString(email)) return this.paramsValidateFailed();

    const code = Math.floor(1000 + Math.random() * 9000).toString();

    this.ctx.session.code = code;
    this.ctx.session.email = email;

    let err = await this._sendMail(email, "邮箱验证码——首人小寨", code);
    this.handleErrData(err, "发送成功")
  }

  /**
   * @description: 注册，需要邮箱验证
   * @param {*}
   * @return {*}
   */
  async register() {
    const { email, code, password, username, ...rest } = this.ctx.request.body;
    const { ctx, service, app } = this;

    const ivs = ctx.helper.isValidString;
    if (!ivs(email, code, password, username))
      return this.paramsValidateFailed();

    const { should, reason } = await this.shouldCreate(this.ctx.request.body);

    if (!should) return this.error(null, reason);

    if (this.validateEmailCode(ctx.session, email, code)) {
      const { err, data } = await service.user.create({
        email,
        password: app.genSaltPwd(password, app),
        username,
        ...rest,
      });

      if (err) {
        this.error(null, "服务器错误，请重试");
      } else {
        const token = this.genToken(username, data._id, false, email);
        this.success({ token, ...data._doc }, "注册成功");
      }
    } else {
      this.error(null, "验证失败，请重试");
    }
  }

  /**
   * @description: 登陆，不需要邮箱验证，可使用邮箱或者用户名登录
   * @param {*}
   * @return {*}
   */
  async login() {
    //这里的username可能是邮箱
    const { username, password } = this.ctx.request.body;
    console.log("username, password", username, password);

    const { ctx, service, app } = this;

    let isAdmin = false;

    const ivs = ctx.helper.isValidString;
    if (!ivs(username) || !ivs(password)) return this.paramsValidateFailed();

    const { err: err1, data: user } = await service.user.findOne({
      $or: [{ username }, { email: username }],
    });

    const { err: err2, data: admin } = await service.admin.findOne({
      $or: [{ username }, { email: username }],
    });

    const data = user || admin;
    const err = err1 || err2;

    if (err) return this.error(err);
    if (!data) return this.error(null, "账号不存在");

    const { password: salPwd, _id: id } = data;

    const { email } = data;

    if (app.comparePassword(password, salPwd, app)) {

      if (admin) isAdmin = true;

      const token = this.genToken(username, id, isAdmin, email);

      delete data.password;

      return this.success({ ...data, token }, "登陆成功");
    } else {
      return this.error(null, "账号或密码错误");
    }
  }

  /**
   * @description: 编辑信息，需要邮箱验证
   * @param {*}
   * @return {*}
   */
  async edit() {
    //这里的username可能是邮箱
    let { code, id, ...rest } = this.ctx.request.body;
    const { ctx, service } = this;

    const ivs = ctx.helper.isValidString;
    if (!ivs(code, id)) return this.paramsValidateFailed();

    const { email } = ctx.tokenInfo;
    const hasPower = ctx.tokenInfo.id === id || ctx.tokenInfo.isAdmin;

    if (!hasPower) return this.error(null, "没有权限");

    if (this.validateEmailCode(ctx.session, email, code)) {
      const res = await service.user.update(id, { ...rest, email });
      this.handleErrData(res, "已保存");
    } else {
      this.error(null, "验证码校验失败");
    }
  }

  async shouldCreateUser(
    service: any,
    email: string | undefined,
    username: string | undefined
  ) {
    let should = true,
      reason;

    if (email) {
      let { data, err } = await service.findOne({ email });
      if (err) {
        return {
          should: false,
          reason: err,
        };
      } else if (data) {
        return {
          should: false,
          reason: "邮箱已存在",
        };
      }
    }

    if (username) {
      let { data, err } = await service.findOne({ username });
      if (err) {
        return {
          should: false,
          reason: err,
        };
      } else if (data) {
        return {
          should: false,
          reason: "用户名已存在",
        };
      }
    }

    return { should, reason };
  }

  async shouldCreate({
    email,
    username,
  }: {
    email?: string;
    username?: string;
  }): Promise<{ should: boolean; reason: string }> {
    //检查user数据库
    let res1 = await this.shouldCreateUser(this.service.user, email, username);

    //检查admin数据库
    let res2 = await this.shouldCreateUser(this.service.admin, email, username);

    if (!res1.should) {
      return res1;
    } else if (!res2.should) {
      return res2;
    } else {
      return res2;
    }
  }

  async shouldUpdate(_id, {
    username,

  }: any): Promise<{ should: boolean; reason: string }> {

    if (_id != this.ctx.tokenInfo.id) {
      return { should: false, reason: "没有访问权限" }
    }

    let should = true,
      reason;
    const { data, err } = await this.service.user.findOne({ username });

    if (err) {
      should = false;
      reason = err;
    } else if (data) {
      should = false;
      reason = "用户名已存在";
    }

    return { should, reason };
  }

  async onUpdated(oldData: any, newData: any, body: any): Promise<void> {

    const { ctx, service } = this;

    const { articleIds } = body;

    const { id: userId } = ctx.tokenInfo
    console.log("ctx.tokenInfo", ctx.tokenInfo);
    if (ctx.tokenInfo.isAdmin && articleIds) {


      //如果是管理员且做的是收藏文章，那么做特殊处理
      const oldRes = await service.admin.findById(userId);
      oldData = oldRes.data;
      const newRes = await service.admin.update(userId, { articleIds });
      newData = newRes.data;
    }

    //对文章喜欢数量做更改
    const oldAtcIds = oldData.articleIds as string[];
    const newAtcIds = newData.articleIds as string[];

    for (let index = 0, len = newAtcIds.length; index < len; index++) {

      const atcId = newAtcIds[index];

      const oldIndex = oldAtcIds.indexOf(atcId);

      if (oldIndex >= 0) {
        oldAtcIds.splice(oldIndex, 1);
      } else {
        return await service.article.increaseLikeNum(atcId);
      }

    }

    while (oldAtcIds.length > 0) {
      await service.article.decreaseLikeNum(oldAtcIds.pop() as string);
    }

  }
}
