import { authActions } from "@/config/actions";
import { baseURL, urls } from "@/config/api";
import store from "@/store";
import { IAuthState } from "@/store/userAuth/interfaces";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = (store.state as { auth: IAuthState }).auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (!(store as any).state.auth.accessToken) {
      return
    }
    if (error?.response?.status === 401 && error?.config && !error.config._retry) {
      error.config._retry = true;
      try {
        ///
        await store.dispatch(authActions.REFRESH_TOKEN);
        return axiosInstance(error.config);
      } catch (refreshError) {
        await store.dispatch("auth/logout");
      }
    }
    await store.dispatch("auth/logout");
    return Promise.reject(error);
  }
);

export default axiosInstance;
