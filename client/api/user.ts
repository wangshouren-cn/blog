import { http } from "react-blog-library";

export function login(data: { username: string; password: string }) {
  return http.post<any, { token: string }>("/user/login", data);
}

export function register(data: {
  username: string;
  password: string;
  email: string;
  code: string;
}) {
  return http.post<any, { token: string } & User>("/user/register", data);
}

export function updateUser(id: string, data: User) {
  return http.put<any, User>("/user/" + id, data);
}
