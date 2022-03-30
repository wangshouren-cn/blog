import { Context } from "egg";

module.exports = () => {
  return async (ctx: Context, next) => {
    if (process.env.node_env === "test") return await next();

    const { path, method } = ctx.request;

    //get请求和登录请求不需要token
    if (method == "GET" || /(login|sendMail|register)/.test(ctx.path))
      return await next();

    const token = ctx.request.header.authorization;

    if (!token) {
      ctx.status = 401;
      return (ctx.body = { msg: "token不存在" });
    }

    try {
      ctx.tokenInfo = ctx.app.deToken(token as string, ctx.app); // 验证token

      //用户只有一个路径可以访问，就是收藏文章
      if( !ctx.tokenInfo.isAdmin && !(method==="PUT" &&  path.startsWith("/user/"))){
        return ctx.body = {
          msg: "没有访问权限",
          code: 403,
        };
      }

      try {
        await next();
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        msg: "token已过期，请重新登录",
        code: 401,
      };
    }
  };
};
