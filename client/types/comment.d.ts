interface Comment {
  _id: string;
  content: string;
  createTime: number;
  updateTime: number;
  targetCommentId: string;
  auditStatus: number;
  userId: string;
  targetContent?: string; //数据库中没有这个字段
}

interface CommentSearchParams extends BaseSearchParams {
  auditStatus?: number;
  content?: string;
}
