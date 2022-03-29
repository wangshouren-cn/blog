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
  comments:ArticleComment[]
}

interface ArticleComment extends Comment{
  username: string|null;
  children?: ArticleComment[]
  forUsername: string | null,
  articleId:string
}

interface ArticleSearchParams extends BaseSearchParams {
  title?: string;
  category?: string;
  tags?: string /* "vue,react" */;
  userId?:string
}
