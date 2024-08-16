import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { ConfirmationCodeInputPage } from "./pages/ConfirmationCodeInputPage";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: String(import.meta.env.VITE_AWS_USER_POOLS_ID), //メモっておいたユーザープールIDをここに!
      userPoolClientId: String(import.meta.env.VITE_AWS_POOLS_WEB_CLIENT_ID), //メモっておいたクライアントIDをここに!
      loginWith: {
        oauth: {
          domain: "XXXX.auth.ap-northeast-1.amazoncognito.com", //Cognitoドメイン(XXXX => 作成したドメイン名を挿入)
          scopes: ["openid", "email", "profile"],
          redirectSignIn: ["http://localhost:3000/login/home"], //ログイン後、リダイレクトするurl
          redirectSignOut: ["http://localhost:3000/login"], //ログアウト後、リダイレクトするurl
          responseType: "code",
          providers: ["Google", { custom: "Line" }], //後述(ソーシャルログイン)
        },
      },
    },
  },
});

export default function App() {
  return <ConfirmationCodeInputPage />;
}
