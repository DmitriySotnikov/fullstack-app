import axiosInstance from "@/api/axios";
import { urls } from "@/config/api";

export interface IAuthState {
  isAuthenticated: boolean;
  captcha: string | null;
  captchaValue: string | null;
  captchaId: string | null;
  isCaptchaVerified: boolean;
  password: string | null;
  user: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
  };
}

const initialState: IAuthState = {
  isAuthenticated: false,
  captcha: null,
  captchaValue: null,
  captchaId: null,
  isCaptchaVerified: false,
  password: null,
  user: {
    firstName: null,
    lastName: null,
    email: null,
  },
};

export const authModule = {
  namespaced: true,
  state: () => initialState,
  getters: {},
  setter: {},
  mutations: {
    setAuth(state: IAuthState, payload: boolean) {
      state.isAuthenticated = payload;
    },
    setUserDate(
      state: IAuthState,
      payload: {
        firstName: string;
        lastName: string;
        email: string;
      }
    ) {
      state.user = payload;
    },
    setCapcha(state: IAuthState, payload: string) {
      state.captcha = payload;
    },
    setCaptchaId(state: IAuthState, payload: string) {
      state.captchaId = payload;
    },
    setCaptchaVerified(state: IAuthState, payload: boolean) {
      state.isCaptchaVerified = payload;
    },
  },
  actions: {
    async registration(
      { state, commit }: { state: IAuthState; commit: any },
      { email, password }: { email: string; password: string }
    ) {
      try {
        const response = await axiosInstance.post(urls.REGISTRATION_USER, {
          firstname: "test",
          lastname: "test",
          captchaId: state.captchaId,
          email,
          password,
        });

        if (response?.data?.id) {
          commit("setUserDate", response.data);
          commit("setAuth", true);
          return { result: true, error: null };
        }
        return { result: false, error: "Произошла неизвестная ошибка" };
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Произошла неизвестная ошибка";
        return { result: false, error: errorMessage };
      }
    },
    async login(
      { commit }: { commit: any },
      { email, password }: { email: string; password: string }
    ) {
      try {
        const response = await axiosInstance.post(urls.LOGIN_USER, {
          email,
          password,
        });

        if (response?.data?.id) {
          commit("setUserDate", response.data);
          commit("setAuth", true);
          return { result: true, error: null };
        }
        commit("setCapcha", response?.data?.svg || null);
        commit("setCaptchaId", response?.data?.captchaId || null);
        return { result: false, error: null };
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Произошла неизвестная ошибка";
        return { result: false, error: errorMessage };
      }
    },
    async fetchCaptcha({ commit }: { commit: any }) {
      try {
        const response = await axiosInstance.get(urls.GET_CAPTCHA);
        commit("setCapcha", response?.data?.svg || null);
        commit("setCaptchaId", response?.data?.captchaId || null);
        return { fetch: true, error: null };
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Произошла неизвестная ошибка";
        return { fetch: false, error: errorMessage };
      }
    },
    async verifyCaptcha(
      { state, commit }: { state: IAuthState; commit: any },
      { captchaValue }: { captchaId: string; captchaValue: string }
    ) {
      try {
        const response = await axiosInstance.post(urls.VERIFY_CAPTCHA, {
          captchaId: state.captchaId,
          captchaValue,
        });
        if (response.data?.verify) {
          commit("setCaptchaVerified", true);
          return true;
        }
        commit("setCaptchaVerified", false);
        return { isVerify: true, error: null };
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Произошла неизвестная ошибка";
        return { isVerify: false, error: errorMessage };
      }
    },
  },
};
