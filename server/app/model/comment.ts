module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const { schemaTypes } = app;
  return mongoose.model(
    "Comment",
    new Schema(
      {
        targetCommentId:schemaTypes.strDefaultEmpty,
        content: schemaTypes.strDefaultEmpty,
        createTime:schemaTypes.timeStrap,
        updateTime: schemaTypes.timeStrap,
        auditStatus: schemaTypes.numberDefault1,
        articleId: schemaTypes.strDefaultEmpty,
        userId:schemaTypes.strDefaultEmpty
      },
      {
        collection: "comment",
      }
    )
  );
};
