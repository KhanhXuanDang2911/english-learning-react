const API_V1 = "/api/v1";

export const AUTH_PATH = {
  SIGN_IN: `${API_V1}/auth/sign-in`,
  REFRESH_TOKEN: `${API_V1}/auth/refresh-token`,
  SIGN_OUT: `${API_V1}/auth/sign-out`,
  SIGN_UP: `${API_V1}/auth/sign-up`,
  AUTHENTICATE_GOOGLE: `${API_V1}/auth/authenticate/google`,
  CHECK_NO_PASSWORD: `${API_V1}/auth/check-no-password`,
  CREATE_PASSWORD: `${API_V1}/auth/create-password`,
  VERIFY_EMAIL: `${API_V1}/auth/verify-email`,
  FORGOT_PASSWORD: `${API_V1}/auth/forgot-password`,
  RESET_PASSWORD: `${API_V1}/auth/reset-password`,
};

export const USERS_PATH = {
  BASE: `${API_V1}/users`,
  ME: `${API_V1}/users/me`,
  AVATAR: `${API_V1}/users/me/avatar`,
  PASSWORD: `${API_V1}/users/me/password`,
  BY_ID: (id: number | string) => `${API_V1}/users/${id}`,
};

export const CATEGORIES_COURSE_PATH = {
  BASE: `${API_V1}/categories-course`,
  BY_ID: (id: number | string) => `${API_V1}/categories-course/${id}`,
};

export const CATEGORIES_POST_PATH = {
  BASE: `${API_V1}/categories-post`,
  BY_ID: (id: number | string) => `${API_V1}/categories-post/${id}`,
};

export const POST_PATH = {
  BASE: `${API_V1}/posts`,
  BY_ID: (id: number | string) => `${API_V1}/posts/${id}`,
  GET_PUBLIC: `${API_V1}/posts/public`,
  GET_PUBLIC_BY_ID: (id: number | string) =>
    `${API_V1}/posts/public/${id}/related`,
  ME: `${API_V1}/posts/me`,
  ME_BY_ID: (id: number | string) => `${API_V1}/posts/me/${id}`,
};
