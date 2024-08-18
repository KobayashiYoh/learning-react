export const postBedrock = async (): Promise<string> => {
  // TODO: 現在は通信を再現するために4秒待機しているだけだが、現在の処理は削除してBedrockの繋ぎ込みを行う。
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return "生成されたモックの回答です。";
};
