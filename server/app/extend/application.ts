import { Application } from "egg";
const crypto = require("crypto");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
export default {
  schemaTypes: {
    file: {
      type: new Schema({
        uid: "string",
        url: "string",
        name: "string",
      }),
      default: null,
    },
    timeStrap: { type: "number", default: Date.now },
    numDefault0: { type: "number", default: 0 },
    strDefaultEmpty: { type: "string", default: "" },
    strDefaultNull: { type: "string", default: null },
    numberDefault1: { type: "number", default: 1 },
  },
  genSaltPwd(pwd: string, app: Application) {
    return crypto
      .createHmac("sha256", app.config.secret)
      .update(pwd)
      .digest("hex")
      .slice(0, 20);
  },
  comparePassword(pwd, salPwd, app) {

    return salPwd === this.genSaltPwd(pwd, app);
  },
  genToken(data: object, app: Application) {
    return app.jwt.sign(
      {
        ...data,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 7, // token 有效期为 7天
      },
      app.config.secret
    );
  },
  deToken(token: string, app: Application) {
    return app.jwt.verify(token as string, app.config.secret);
  },
};
