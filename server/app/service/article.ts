/**
 * Test Service
 */

import BaseService from "./base";


export default class extends BaseService {
  name = "Article";
  async increaseLikeNum(id: string) {
    const { data: article } = await this.findById(id);
    await this.update(id, { likeNum: parseInt(article.likeNum) + 1 });
  }

  async decreaseLikeNum(id: string) {
    const { data: article } = await this.findById(id);
    await this.update(id, { likeNum: parseInt(article.likeNum) - 1 });
  }
}
