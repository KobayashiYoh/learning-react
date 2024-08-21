import { useState } from "react";
import { signUpByEmailAndPassword } from "../services/signUpByEmailAndPassword";
import { useNavigate } from "react-router-dom";

export const useSignUpState = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      await signUpByEmailAndPassword(email, password);
      alert("サインアップに成功しました！");
      navigate("/confirmation-code-input");
    } catch (error) {
      console.error("サインアップエラー:", error);
      alert("サインアップに失敗しました。");
    }
  };

  return {
    showPassword,
    email,
    password,
    handleClickShowPassword,
    handleEmailChange,
    handlePasswordChange,
    handleSignUp,
  };
};
