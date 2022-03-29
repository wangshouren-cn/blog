interface Tag{
  name: string;
  createTime: string;
  updateTime: string;
  _id: string;
  articleCount:number
}


interface TagSearchParams extends BaseSearchParams{
  name?: string;

}