import BaseController from "./base";

const nodemailer = require("nodemailer");
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
    const { ctx, app } = this;
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

    // this.ctx.session.emailValidate = {
    //   code,
    //   email,
    //   // time: Date.now() + 1000 * 60, //1分钟有效期  egg-session自己内置了
    // };

    const { user, pass } = app.config.emailInfo;

    const mailTransport = nodemailer.createTransport({
      service: "qq",
      secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
      port: 465,
      auth: {
        user, //发送邮件的邮箱
        pass, //第三方授权密码，POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务
      },
    });

    const mailOptions = {
      from: user,
      to: email,
      subject: "博客邮箱验证码",
      text: code,
    };

    try {
      await mailTransport.sendMail(mailOptions);
      this.success(null, "发送成功");
    } catch (e) {
      this.error(e, "发送失败");
    }
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

    const ivs = ctx.helper.isValidString;
    if (!ivs(username) || !ivs(password)) return this.paramsValidateFailed();

    const { err: err1, data: data1 } = await service.user.findOne({
      $or: [{ username }, { email: username }],
    });

    const { err: err2, data: data2 } = await service.admin.findOne({
      $or: [{ username }, { email: username }],
    });

    const data = data1 || data2;
    const err = err1 || err2;

    if (err) return this.error(err);
    if (!data) return this.error(null, "账号不存在");

    const { password: salPwd, _id: id } = data;

    const { email } = data;

    if (app.comparePassword(password, salPwd, app)) {
      const token = this.genToken(username, id, false, email);

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

  async shouldUpdate(_id,{
    username,
    
  }: any): Promise<{ should: boolean; reason: string }> {

    if (_id != this.ctx.tokenInfo.id) {
      return {should:false,reason:"没有访问权限"}
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
}
