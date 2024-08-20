export const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_AWS_USER_POOLS_ID,
      userPoolClientId: import.meta.env.VITE_AWS_POOLS_WEB_CLIENT_ID,
      identityPoolId: import.meta.env.VITE_APP_IDENTITY_POOL_ID,
      loginWith: {
        email: true,
      },
    },
  },
};
