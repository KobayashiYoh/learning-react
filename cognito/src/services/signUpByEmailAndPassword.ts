import { signUp } from "aws-amplify/auth";

export const signUpByEmailAndPassword = async (username: string, password: string) => {
  try {
    await signUp({ username: username, password: password });
    alert("認証用のメールを送信しました。ご確認ください。");
  } catch (error) {
    alert(`認証に失敗しました。${error}`);
  }
};
