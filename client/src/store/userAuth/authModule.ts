import axios from "axios";
import { IAuthState } from "./interfaces";
import { UserAuthActions } from "./actions";
import { Commit, Dispatch } from "vuex";

const initialState: IAuthState = {
  isAuthenticated: false,
  captcha: null,
  captchaId: null,
  isCaptchaVerified: false,
  user: {
    firstName: null,
    lastName: null,
    email: localStorage.getItem("userEmail") || null,
  },
  accessToken: localStorage.getItem("accessToken") || null,
};

export const authModule = {
  namespaced: true,
  state: () => initialState,
  getters: {
    isAuthenticated: (state: IAuthState) => state.isAuthenticated, // !!state.accessToken,
  },
  setter: {},
  mutations: {
    clearAuth(state: IAuthState) {
      state.accessToken = null;
      state = initialState;
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
    setToken(state: IAuthState, accessToken: string) {
      state.accessToken = accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    },
    setIsAuthenticated(state: IAuthState, payload: boolean) {
      state.isAuthenticated = payload;
    },
  },
  actions: {
    login: async (
      { commit, state }: { commit: Commit; state: IAuthState },
      { email, password }: { email: string; password: string }
    ) => await UserAuthActions.login({ commit, state }, { email, password }),
    registration: async (
      { state, commit }: { state: IAuthState; commit: Commit },
      { email, password }: { email: string; password: string }
    ) =>
      await UserAuthActions.registration(
        { state, commit },
        { email, password }
      ),
    refreshToken: async ({
      state,
      dispatch,
      commit,
    }: {
      state: IAuthState;
      dispatch: Dispatch;
      commit: Commit;
    }) => await UserAuthActions.refreshToken({ state, dispatch, commit }),
    fetchCaptcha: async ({ commit }: { commit: Commit }) =>
      await UserAuthActions.fetchCaptcha({ commit }),
    verifyCaptcha: async (
      { state, commit }: { state: IAuthState; commit: Commit },
      { captchaValue }: { captchaId: string; captchaValue: string }
    ) =>
      await UserAuthActions.verifyCaptcha({ state, commit }, { captchaValue }),
    getUserData: async ({
      state,
      commit,
      dispatch,
    }: {
      state: IAuthState;
      commit: Commit;
      dispatch: Dispatch;
    }) => await UserAuthActions.getUserData({ state, commit, dispatch }),
    logout: ({ commit }: { commit: Commit }) =>
      UserAuthActions.logout({ commit }),
  },
};
