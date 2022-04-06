import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1647836966627_3966";

  // add your egg config in here
  config.middleware = ["auth"];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.mongoose = {
    url: process.env.MONGO_URL || "mongodb://localhost:27017/blog",
    options: {
      poolSize: 40,
    },
  };


  config.adminInitialInfo = {
    username: "wangshouren",
    password: "513167210",
    tags: [],
    imgs: [],
    resume: "",
    articleIds: []
  };

  config.secret = "wangshouren&huangsenya";

  config.emailInfo = {
    user: "1115808717@qq.com", //发送邮件的邮箱
    pass: "pmhhcxbreozrhcae", //第三方授权密码，POP3/IMAP/SMTP/Exchange/CardDAV/CalDAV服务
  };

  config.session = {
    key: "13228800129322",
    maxAge: 864000,
    httpOnly: true,
    encrypt: true,
    renew: true, //延长会话有效期
  };



  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
