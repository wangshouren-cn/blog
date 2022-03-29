module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const { schemaTypes } = app;
  return mongoose.model(
    "Category",
    new Schema(
      {

        createTime:schemaTypes.timeStrap,
        updateTime:schemaTypes.timeStrap,
        name:schemaTypes.strDefaultEmpty
      },
      {
        collection: "category",
      }
    )
  );
};
