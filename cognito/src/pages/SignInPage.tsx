import { Button, TextField } from "@mui/material";
import { Page } from "../components/Page";
import { Form } from "../components/Form";
import { useSignInState } from "../hooks/useSignInState";
import { FormTitle } from "../components/FormTitle";
import { PasswordTextField } from "../components/PasswordTextField";

export const SignInPage = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSignIn,
  } = useSignInState();

  return (
    <Page>
      <Form>
        <h2>ログイン</h2>
        <FormTitle>メールアドレス</FormTitle>
        <TextField
          id="email"
          variant="outlined"
          placeholder="user@example.com"
          value={email}
          onChange={handleEmailChange}
        />
        <FormTitle>パスワード</FormTitle>
        <PasswordTextField
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignIn}
          style={{ marginTop: "16px" }}
        >
          ログイン
        </Button>
      </Form>
    </Page>
  );
};
