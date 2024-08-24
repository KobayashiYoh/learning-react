import { useState } from "react";
import { sendConfirmationCode } from "../services/sendConfirmationCode";
import { useNavigate } from "react-router-dom";

export const useConfirmationCodeInputState = (username: string) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string>("");

  const handleCodeChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newCode = [...code];
    newCode[index] = event.target.value;
    setCode(newCode);

    if (newCode.join("").length !== 6 || isLoading) {
      return;
    }

    setLoading(true);
    try {
      await sendConfirmationCode(username, newCode.join(""));
      navigate("/authenticated-user", { replace: true });
    } catch (error) {
      setError("コードが無効です。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return { code, isLoading, error, handleCodeChange };
};
