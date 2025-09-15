import { AUTH_PATH } from "./path";
import { AuthApi } from "./auth.api";
import { signOut } from "@/context/AuthContext/auth.action";
import { externalDispatch } from "@/context/AuthContext/auth.context";
import type { ErrorResponse } from "@/types/common.type";
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
  private isRefreshing: boolean;
  private queue: ((token: string) => void)[];

  constructor() {
    this.accessToken = getAccessTokenLocalStorage();
    this.refreshToken = getRefreshTokenLocalStorage();
    this.isRefreshing = false;
    this.queue = [];

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
      (error) => Promise.reject(error)
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
      async (error: AxiosError<ErrorResponse>) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        if (
          error.response?.data.status === 401 &&
          originalRequest &&
          !originalRequest._retry &&
          originalRequest.url !== AUTH_PATH.SIGN_OUT &&
          originalRequest.url !== AUTH_PATH.REFRESH_TOKEN &&
          originalRequest.url !== AUTH_PATH.SIGN_IN &&
          originalRequest.url !== AUTH_PATH.RESET_PASSWORD
        ) {
          if (this.isRefreshing) {
            return new Promise((resolve) => {
              this.queue.push((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.instance(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const response = await AuthApi.refreshToken();
            this.accessToken = response.data.accessToken;
            setAccessTokenLocalStorage(this.accessToken);

            this.queue.forEach((cb) => cb(this.accessToken));
            this.queue = [];

            originalRequest.headers.Authorization = `Bearer ${this.accessToken}`;
            return this.instance(originalRequest);
          } catch (err) {
            this.queue = [];
            removeTokenLocalStorage();
            this.accessToken = "";
            this.refreshToken = "";
            externalDispatch(signOut());
            return Promise.reject(err);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
