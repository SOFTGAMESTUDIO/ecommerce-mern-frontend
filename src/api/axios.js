/**
 * ============================================================
 * AXIOS INSTANCE
 * ============================================================
 */

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  timeout: 30000,

  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;

let failedQueue = [];

/**
 * ============================================================
 * Process Queue
 * ============================================================
 */

const processQueue = (
  error,
  token = null
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * ============================================================
 * REQUEST
 * ============================================================
 */

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        'accessToken'
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  Promise.reject
);

/**
 * ============================================================
 * RESPONSE
 * ============================================================
 */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest =
      error.config;

    if (
      error.response?.status ===
        401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(
          (resolve, reject) => {
            failedQueue.push({
              resolve,
              reject,
            });
          }).then((token) => {
            originalRequest.headers.Authorization =
              `Bearer ${token}`;

            return api(
              originalRequest
            );
          });
      }

      originalRequest._retry = true;

      isRefreshing = true;

      try {
        const refreshToken =
          localStorage.getItem(
            'refreshToken'
          );

        const response =
          await axios.post(
            `${
              import.meta.env
                .VITE_API_URL
            }/auth/refresh-token`,
            {
              refreshToken,
            }
          );

        const {
          accessToken,
        } = response.data.data;

        localStorage.setItem(
          'accessToken',
          accessToken
        );

        processQueue(
          null,
          accessToken
        );

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err);

        localStorage.removeItem(
          'accessToken'
        );

        localStorage.removeItem(
          'refreshToken'
        );

        window.location.href =
          '/login';

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;

