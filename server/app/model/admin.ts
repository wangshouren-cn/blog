module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const { schemaTypes } = app;
  const model = mongoose.model(
    "Admin",
    new Schema(
      {
        username: schemaTypes.strDefaultEmpty,
        password: schemaTypes.strDefaultEmpty,
        tags: ["string"],
        imgs: [schemaTypes.file],
        resume: schemaTypes.strDefaultEmpty,
        createTime: schemaTypes.timeStrap,
        updateTime: schemaTypes.timeStrap,
	email: schemaTypes.strDefaultEmpty,
	articleIds:["string"]
      },
      {
        collection: "admin",
      }
    )
  );
  model.findOne().then((res) => {
    if (!res) {
      const { adminInitialInfo } = app.config;
      adminInitialInfo.password = app.genSaltPwd(
        adminInitialInfo.password,
        app
      );
      model.create(adminInitialInfo);
    }
  });

  return model;
};
