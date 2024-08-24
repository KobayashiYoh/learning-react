import { signUp } from "aws-amplify/auth";

export const signUpByEmailAndPassword = async (
  username: string,
  password: string
) => {
  try {
    await signUp({ username: username, password: password });
  } catch (error) {}
};
