import { useState, useCallback } from "react";
import { predictStream } from "../services/predictStream";
import { Chat } from "../types/chat";

export const useChat = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([
    { message: "質問です。", isUser: true },
    { message: "回答です。", isUser: false },
  ]);

  const handleSend = useCallback(async () => {
    if (isLoading || inputText.trim().length === 0) {
      return;
    }
    setChats((prevChats) => {
      const userChat: Chat = { message: inputText, isUser: true };
      return [...prevChats, userChat];
    });
    setInputText("");
    setLoading(true);
    setShowErrorAlert(false);
    // Bedrockに送る情報をchatsから作成する
    const sendMessage = [...chats, { isUser: true, message: inputText }].reduce(
      (acc, cur) => {
        if (cur.isUser) {
          return `${acc} Human: ${cur.message}\n\n Assistant: `;
        } else {
          return `${acc} ${cur.message}\n\n`;
        }
      },
      ""
    );
    try {
      // Bedrockにプロンプトを投げて、レスポンスを取得する
      const stream = predictStream({
        messages: sendMessage.trim(),
      });
      let answer = "";
      for await (const chunk of stream) {
        answer += chunk;
        setChats((prevChats) => {
          const assistantChat: Chat = { message: answer, isUser: false };
          return [...prevChats, assistantChat];
        });
      }
    } catch (error) {
      console.error(error);
      // NOTE: 5秒間アラートを表示するように状態を切り替えている。
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
    } finally {
      setLoading(false);
    }
  }, [chats, inputText]);

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
