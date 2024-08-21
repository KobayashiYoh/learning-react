import { useState } from "react";
import { signInByEmailAndPassword } from "../services/signInByEmailAndPassword";
import { useNavigate } from "react-router-dom";

export const useSignInState = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      await signInByEmailAndPassword(email, password);
      alert("ログインに成功しました！");
      navigate("/authenticated-user");
    } catch (error) {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました。");
    }
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSignIn,
  };
};
