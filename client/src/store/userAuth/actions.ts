import axiosInstance from "@/api/axios";
import { urls } from "@/config/api";
import { IAuthState } from "./interfaces";
import { Commit, Dispatch } from "vuex";

export class UserAuthActions {
  ///
  static async registration(
    { state, commit }: { state: IAuthState; commit: Commit },
    { email, password }: { email: string; password: string }
  ) {
    try {
      const response = await axiosInstance.post(urls.REGISTRATION_USER, {
        // todo
        firstname: "test",
        lastname: "test",
        captchaId: state.captchaId,
        email,
        password,
      });

      if (response?.data?.id) {
        commit("setUserDate", response.data);
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
  }

  static async login(
    { commit, state }: { commit: Commit; state: IAuthState },
    { email, password }: { email: string; password: string }
  ) {
    try {
      const response = await axiosInstance.post(urls.LOGIN_USER, {
        email,
        password,
      });
      if (response?.data?.id) {
        const accessToken = response?.data?.accessToken;
        commit("setUserDate", response.data);
        commit("setToken", accessToken);
        commit("setIsAuthenticated", true);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userEmail", response?.data?.email);
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
  }

  static async refreshToken({
    commit,
    dispatch,
    state,
  }: {
    commit: Commit;
    dispatch: Dispatch;
    state: IAuthState;
  }) {
    try {
      const response = await axiosInstance.get(urls.REFRESH_TOKEN);
      if (response?.data?.accessToken) {
        const accessToken = response?.data?.accessToken;
        commit("setToken", accessToken);
        commit("setIsAuthenticated", true);
        localStorage.setItem("accessToken", accessToken);
        return;
      }
      commit("setIsAuthenticated", false);
      commit("setToken", null);
      dispatch("auth/logout");
    } catch (error) {
      return error;
    }
  }

  static async fetchCaptcha({ commit }: { commit: Commit }) {
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
  }

  static async verifyCaptcha(
    { state, commit }: { state: IAuthState; commit: Commit },
    { captchaValue }: { captchaValue: string }
  ) {
    try {
      const response = await axiosInstance.post(urls.VERIFY_CAPTCHA, {
        captchaId: state?.captchaId,
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
  }

  static async getUserData({
    state,
    commit,
    dispatch,
  }: {
    state: IAuthState;
    commit: Commit;
    dispatch: Dispatch;
  }) {
    try {
      const response = await axiosInstance.post(urls.GET_USER_DATA, {
        email: state.user.email,
      });
      if (response?.data?.id) {
        commit("setIsAuthenticated", true);
        commit("setUserDate", response.data);
      }
    } catch (error) {
      return error;
    }
  }

  static async logout({ commit }: { commit: Commit }) {
    const response = await axiosInstance.get(urls.LOGOUT);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    commit("clearAuth");
    if (response?.data?.status === "success") {
      return true;
    }
    return false;
  }
}
