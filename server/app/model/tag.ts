module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const { schemaTypes } = app;
  return mongoose.model(
    "Tag",
    new Schema(
      {
        name: schemaTypes.strDefaultEmpty,
        createTime: schemaTypes.timeStrap,
        updateTime: schemaTypes.timeStrap,
      },
      {
        collection: "tag",
      }
    )
  );
};
