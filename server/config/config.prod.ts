import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [], //[]中放放出的白名单，*代表所有
  };
  config.cors = {
    // origin: "http://127.0.0.1:3000",
    // origin: (ctx: Context) => {
    //   console.log("ctx.request.origin", ctx.request.origin);
    //   console.log("ctx.request.host", ctx.request.host);
    //   console.log("ctx.request.hostname", ctx.request.hostname);
    //   return ctx.respo
    // },
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    maxAge: 60 * 60 * 24, //1天
    allowHeaders: ["Content-type", "Authorization"],
    credentials: true,
  };
  config.host = "http://121.4.95.151:7001";
  return config;
};
