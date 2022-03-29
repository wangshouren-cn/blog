import * as assert from "assert";
import { app } from "egg-mock/bootstrap";

describe("test/app/controller/article.test.ts", () => {
  let content = Math.random().toString();
  let title = content + "10";
  let newContent = Math.random().toString() + "20";
  let newTitle = newContent + "10";
  let data: any = null;

  it("article create  ", async () => {
    const response = await app
      .httpRequest()
      .post("/article")
      .send({ title, content })
      .expect(200);
    assert(typeof response.body.data._id === "string");
    data = response.body.data;
  });

  it("article update  ", async () => {
    const response = await app
      .httpRequest()
      .put("/article" + `/${data._id}`)
      .send({ title: newTitle, content: newContent })
      .expect(200);
    assert(typeof response.body.data._id === "string");
  });

  it("article index  ", async () => {
    const response = await app
      .httpRequest()
      .get("/article" + `?title=${newTitle}`)
      .expect(200);
    assert(response.body.data.list.length === 1);
  });

  it("article destroy  ", async () => {
    const response = await app
      .httpRequest()
      .delete("/article" + `/${data._id}`)
      .expect(200);
    assert(response.body.data != null);
  });
});
