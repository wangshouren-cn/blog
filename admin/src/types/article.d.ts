interface Article {
  tags: string[];
  likeNum: number;
  collectNum: number;
  title: string;
  createTime: number;
  updateTime: number;
  _id: string;
  content: string;
  introduction: string;
  cover: ImgFile | null;
  category: string;
}

interface ImgFile {
  uid: string;
  url: string;
  name: string;
}

interface ArticleSearchParams extends BaseSearchParams {
  title?: string;
  category?: string;
  tags?: string /* "vue,react" */;
}
