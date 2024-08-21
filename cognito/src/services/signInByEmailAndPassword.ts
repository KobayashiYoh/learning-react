import { signIn } from "aws-amplify/auth";

export const signInByEmailAndPassword = async (
  username: string,
  password: string
) => {
  try {
    await signIn({ username: username, password: password });
  } catch (error) {}
};
