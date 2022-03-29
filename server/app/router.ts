import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.resources("admin", "/admin", controller.admin);
  router.post("/admin/login", controller.admin.login);
  router.get("/admin/about", controller.admin.about);

  router.resources("tag", "/tag", controller.tag);

  router.resources("article", "/article", controller.article);
  router.get("/article/:id", controller.article.getOneArticle);

  router.resources("category", "/category", controller.category);

  router.resources("comment", "/comment", controller.comment);


  //user
  router.post("/user/checkEmailAndSend", controller.user.sendMailCheck); //发送邮箱验证码，会检查邮箱是否已存在user或者admin表中，存在就不发送
  router.post("/user/login", controller.user.login);
  router.post("/user/register", controller.user.register);
  router.post("/user/edit", controller.user.edit);
  router.put("/user/:id", controller.user.update);


  //common
  router.post("/common/upload", controller.common.upload);
};
