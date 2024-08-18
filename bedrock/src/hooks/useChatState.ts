import { useState } from "react";
import { Chat } from "../types/chat";
import { postBedrock } from "../services/postBedrock";

export const useChatState = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([
    { message: "質問です。", isUser: true },
    { message: "回答です。", isUser: false },
  ]);

  const handleSend = async () => {
    if (isLoading || inputText.length === 0) {
      return;
    }
    setLoading(true);
    setShowErrorAlert(false);
    try {
      const newUserChat: Chat = { message: inputText, isUser: true };
      setInputText("");
      setChats((prevChats) => [...prevChats, newUserChat]);
      const generatedText: string = await postBedrock();
      const newGeneratedChat: Chat = { message: generatedText, isUser: false };
      setChats((prevChats) => [...prevChats, newGeneratedChat]);
    } catch (error) {
      console.error(error);
      setShowErrorAlert(true);
      // NOTE: 3秒後にはアラートが非表示になる。
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return {
    chats,
    isLoading,
    showErrorAlert,
    inputText,
    handleSend,
    setShowErrorAlert,
    setInputText,
  };
};
