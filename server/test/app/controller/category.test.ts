import * as assert from "assert";
import { app } from "egg-mock/bootstrap";

describe("test/app/controller/category.test.ts", () => {
  let name = Math.random().toString();
  let newName = Math.random().toString() + "2";
  let data: any = null;

  it("category create  ", async () => {
    const response = await app
      .httpRequest()
      .post("/category")
      .send({ name })
      .expect(200);
    assert(typeof response.body.data._id === "string");
    data = response.body.data;
  });

  it("category update  ", async () => {
    const response = await app
      .httpRequest()
      .put("/category" + `/${data._id}`)
      .send({ name: newName })
      .expect(200);
    assert(typeof response.body.data._id === "string");
  });

  it("category index  ", async () => {
    const response = await app
      .httpRequest()
      .get("/category" + `?name=${newName}`)
      .expect(200);
    assert(response.body.data.list.length === 1);
  });

  it("category destroy  ", async () => {
    const response = await app
      .httpRequest()
      .delete("/category" + `/${data._id}`)
      .expect(200);
    assert(response.body.data != null);
  });
});
