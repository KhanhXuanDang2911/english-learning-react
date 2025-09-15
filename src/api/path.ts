export const AUTH_PATH = {
  SIGN_IN: "/api/v1/auth/sign-in",
  REFRESH_TOKEN: "/api/v1/auth/refresh-token",
  SIGN_OUT: "/api/v1/auth/sign-out",
  SIGN_UP: "/api/v1/auth/sign-up",
  AUTHENTICATE_GOOGLE: "/api/v1/auth/authenticate/google",
  CHECK_NO_PASSWORD: "/api/v1/auth/check-no-password",
  CREATE_PASSWORD: "/api/v1/auth/create-password",
  VERIFY_EMAIL: "/api/v1/auth/verify-email",
  FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
  RESET_PASSWORD: "/api/v1/auth/reset-password",
};

export const USERS_PATH = {
  GET_PROFILE: "/api/v1/users/me",
  UPDATE_PROFILE: "/api/v1/users/me",
  UPDATE_AVATAR: "/api/v1/users/me/avatar",
  UPDATE_PASSWORD: "/api/v1/users/me/password",
};
