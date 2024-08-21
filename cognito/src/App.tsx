import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { Routes, Route } from "react-router-dom";
import { SignInPage } from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { ConfirmationCodeInputPage } from "./pages/ConfirmationCodeInputPage";
import { AuthenticatedUserPage } from "./pages/AuthenticatedUserPage";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: String(import.meta.env.VITE_AWS_USER_POOLS_ID),
      userPoolClientId: String(import.meta.env.VITE_AWS_POOLS_WEB_CLIENT_ID),
    },
  },
});

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route
        path="/confirmation-code-input"
        element={<ConfirmationCodeInputPage />}
      />
      <Route path="/authenticated-user" element={<AuthenticatedUserPage />} />
    </Routes>
  );
}
