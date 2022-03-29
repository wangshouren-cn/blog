module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const { schemaTypes } = app;
  return mongoose.model(
    "Article",
    new Schema(
      {
        tags: ["string"],
        likeNum: schemaTypes.numDefault0,
        collectNum: schemaTypes.numDefault0,
        createTime: schemaTypes.timeStrap,
        updateTime: schemaTypes.timeStrap,
        content: schemaTypes.strDefaultNull,
        introduction: schemaTypes.strDefaultNull,
        cover: schemaTypes.file,
        category: schemaTypes.strDefaultNull,
        title: schemaTypes.strDefaultNull,
      },
      {
        collection: "article",
      }
    )
  );
};
