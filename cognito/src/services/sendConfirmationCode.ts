import { confirmSignUp } from "aws-amplify/auth";

export const sendConfirmationCode = async (
  username: string,
  confirmationCode: string
): Promise<void> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;
    // TODO: 現在はリクエスト回数削減のため早期リターンしているが、confirmSignUpを実行できるように修正する。
    const response = await confirmSignUp({
      username,
      confirmationCode,
    });
    console.log("Sign up confirmed:", response);
  } catch (error) {
    console.error("Error confirming sign up:", error);
  }
};
