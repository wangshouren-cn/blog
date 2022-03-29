"use strict";

import BaseController from "./base";

//安装await-stream-ready就可以了
const awaitWriteStream = require("await-stream-ready").write;
const sendToWormhole = require("stream-wormhole");

const fs = require("fs");
const path = require("path");

export default class extends BaseController {
  async upload() {
    const { ctx } = this;

    let stream;
    try {
      stream = await ctx.getFileStream();
      const uid = Date.now();
      const filename = uid + path.extname(stream.filename);
      const target = path.join("app/public/uploads", filename);
      const writeStream = fs.createWriteStream(target);
      await awaitWriteStream(stream.pipe(writeStream));
      const url = ctx.app.config.host + "/public/uploads/" + filename;
      this.success({
        url,
        uid,
        name: stream.filename,
      });
    } catch (e) {
      console.log("e", e);
      await sendToWormhole(stream);
      this.error(e as any);
    }
  }
}
