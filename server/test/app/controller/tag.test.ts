import * as assert from "assert";
import { app } from "egg-mock/bootstrap";

describe("test/app/controller/tag.test.ts", () => {
  let name = Math.random().toString();
  let newName = Math.random().toString() + "2";
  let data: any = null;

  it("tag create  ", async () => {
    const response = await app
      .httpRequest()
      .post("/tag")
      .send({ name })
      .expect(200);
    assert(typeof response.body.data._id === "string");
    data = response.body.data;
  });

  it("tag update  ", async () => {
    const response = await app
      .httpRequest()
      .put("/tag" + `/${data._id}`)
      .send({ name: newName })
      .expect(200);
    assert(typeof response.body.data._id === "string");
  });

  it("tag index  ", async () => {
    const response = await app
      .httpRequest()
      .get("/tag" + `?name=${newName}`)
      .expect(200);
    assert(response.body.data.list.length === 1);
  });

  it("tag destroy  ", async () => {
    const response = await app
      .httpRequest()
      .delete("/tag" + `/${data._id}`)
      .expect(200);
    assert(response.body.data != null);
  });
});
