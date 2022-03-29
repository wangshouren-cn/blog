import { http } from "react-blog-library/lib";

export function createComment(data: {
  content: string;
  targetCommentId: string|null;
  auditStatus: number;
  articleId: string;
  userId:string
}) {
  return http.post<any, Comment>(`/comment`, data);
}
