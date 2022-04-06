import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["http://192.168.2.101", "http://192.168.2.101:9000"], //[]中放放出的白名单，*代表所有
  };
  config.cors = {
    // origin: "[http://192.168.2.101:9000,http://192.168.2.101]",
    // origin: (ctx: Context) => {
    //   console.log("ctx.request.origin", ctx.request.origin);
    //   return "http://192.168.2.101:9000"
    // },
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    maxAge: 60 * 60 * 24, //1天
    allowHeaders: ["Content-type", "Authorization"],
    credentials: true,
  };
  config.host = "http://192.168.2.101:7001";

  config.clientUrl = "http://192.168.2.101"

  return config;
};
