module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const { schemaTypes } = app;
  return mongoose.model(
    "User",
    new Schema(
      {
        introduction: schemaTypes.strDefaultEmpty,
        registerTime: schemaTypes.timeStrap,
        updateTime: schemaTypes.timeStrap,
        email: schemaTypes.strDefaultEmpty,
        username: schemaTypes.strDefaultEmpty,
        password: schemaTypes.strDefaultEmpty,
        articleIds: ["string"],
      },
      {
        collection: "user",
      }
    )
  );
};
