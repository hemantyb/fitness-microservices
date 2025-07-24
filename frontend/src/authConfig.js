import {
  AuthContext,
  AuthProvider,
  TAuthConfig,
  TRefreshTokenExpiredEvent,
} from "react-oauth2-code-pkce";

const authConfig = {
  clientId: "myClientID",
  authorizationEndpoint: "https://myAuthProvider.com/auth",
  tokenEndpoint: "https://myAuthProvider.com/token",
  redirectUri: "http://localhost:3000/",
  scope: "someScope openid",
  onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) =>
    event.logIn(undefined, undefined, "popup"),
};
