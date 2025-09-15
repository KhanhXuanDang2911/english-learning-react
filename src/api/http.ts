import { AUTH_PATH } from "./path";
import { AuthApi } from "./auth.api";
import { signOut } from "@/context/AuthContext/auth.action";
import { externalDispatch } from "@/context/AuthContext/auth.context";
import type { ErrorResponse } from "@/types/common.type";
import type { RefreshTokenResponse } from "@/types/auth.type";
import {
  getAccessTokenLocalStorage,
  getRefreshTokenLocalStorage,
  removeTokenLocalStorage,
  setAccessTokenLocalStorage,
  setRefreshTokenLocalStorage,
} from "@/utils/token";
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private promiseRefreshToken: Promise<RefreshTokenResponse> | null;

  constructor() {
    this.accessToken = getAccessTokenLocalStorage();
    this.refreshToken = getRefreshTokenLocalStorage();
    this.promiseRefreshToken = null;
    this.instance = axios.create({
      baseURL: "http://localhost:8080/e-learning",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": "vi",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        if (
          response.config.url === AUTH_PATH.SIGN_IN ||
          response.config.url === AUTH_PATH.AUTHENTICATE_GOOGLE
        ) {
          if (!response.data.data.user.noPassword) {
            this.accessToken = response.data.data.accessToken;
            this.refreshToken = response.data.data.refreshToken;
            setAccessTokenLocalStorage(this.accessToken);
            setRefreshTokenLocalStorage(this.refreshToken);
          }
        }
        if (response.config.url === AUTH_PATH.SIGN_OUT) {
          this.accessToken = "";
          this.refreshToken = "";
          removeTokenLocalStorage();
        }
        return response;
      },
      (error: AxiosError<ErrorResponse>) => {
        const { config } = error;
        if (
          error.response?.data.status === 401 &&
          config?.url !== AUTH_PATH.SIGN_OUT &&
          config?.url !== AUTH_PATH.REFRESH_TOKEN
        ) {
          this.promiseRefreshToken = this.promiseRefreshToken
            ? this.promiseRefreshToken
            : AuthApi.refreshToken().finally(
                () => (this.promiseRefreshToken = null)
              );
          return this.promiseRefreshToken
            .then((response) => {
              this.accessToken = response.data.accessToken;
              setAccessTokenLocalStorage(this.accessToken);
              return this.instance(config as AxiosRequestConfig);
            })
            .catch((err) => {
              removeTokenLocalStorage();
              externalDispatch(signOut());
              return Promise.reject(err);
            });
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
