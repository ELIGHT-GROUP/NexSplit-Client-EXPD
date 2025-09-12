// axiosClient.ts
import axios from "axios";
import {
  getAccessToken,
  removeAuthToken,
  getRefreshToken,
  saveAccessToken,
  saveTokens,
} from "./storage-functions";
import { RefreshAccessToken } from "./endpoint/auth.service";

const axiosClient = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_BACKEND_URL || "http://95.111.248.142:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await RefreshAccessToken({ refreshToken });

        if (response && response.accessToken) {
          // Save both tokens if both are returned, otherwise just save access token
          if (response.refreshToken) {
            await saveTokens(response.accessToken, response.refreshToken);
          } else {
            await saveAccessToken(response.accessToken);
          }

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

          // Process queued requests
          processQueue(null, response.accessToken);

          // Retry the original request
          return axiosClient(originalRequest);
        } else {
          throw new Error("Invalid refresh response");
        }
      } catch (refreshError) {
        console.log("Token refresh failed:", refreshError);

        // Process queued requests with error
        processQueue(refreshError, null);

        // Remove all tokens and redirect to login
        await removeAuthToken();

        // You might want to redirect to login here
        // For now, we'll just reject the promise
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
