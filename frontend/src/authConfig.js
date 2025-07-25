import {
  AuthContext,
  AuthProvider,
  TAuthConfig,
  TRefreshTokenExpiredEvent,
} from "react-oauth2-code-pkce";

export const authConfig = {
  clientId: "oauth2-pkce-client",
  authorizationEndpoint:
    "http://localhost:8181/realms/oauth2-pkce-client/protocol/openid-connect/auth",
  tokenEndpoint:
    "http://localhost:8181/realms/oauth2-pkce-client/protocol/openid-connect/token",
  redirectUri: "http://localhost:5173/",
  scope: "openid profile email offline_access",
  onRefreshTokenExpire: (event) => event.logIn(),
};
