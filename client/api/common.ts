import { http } from "react-blog-library";

export const sendCode = (data: { email: string }) => {
  return http.post("/user/checkEmailAndSend", data);
};
