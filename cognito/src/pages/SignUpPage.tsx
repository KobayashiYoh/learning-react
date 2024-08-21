import { Button, TextField } from "@mui/material";
import { FormTitle } from "../components/FormTitle";
import { Page } from "../components/Page";
import { Form } from "../components/Form";
import { useSignUpState } from "../hooks/useSignUpState";
import { PasswordTextField } from "../components/PasswordTextField";

export const SignUpPage = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSignUp,
  } = useSignUpState();

  return (
    <Page>
      <Form>
        <h2>新規登録</h2>
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
          onClick={handleSignUp}
          style={{ marginTop: "16px" }}
        >
          サインアップ
        </Button>
      </Form>
    </Page>
  );
};

export default SignUpPage;
