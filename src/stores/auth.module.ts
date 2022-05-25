import type { Store } from "vuex";
import type { BooksState, User } from "..";
import AuthService from "../services/auth.service";

const initialUser: User = {
  id: null,
  email: null,
  password: null,
  role: null,
  token: null,
}
const userEndoded = localStorage.getItem("user");
export const initialState =
  userEndoded != null
    ? { status: { loggedIn: true, signupErrorMessage: null, loginErrorMessage: null }, user: JSON.parse(userEndoded) as User }
    : { status: { loggedIn: false, signupErrorMessage: null, loginErrorMessage: null }, user: initialUser };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }: Store<BooksState>, user: User) {
      return AuthService.login(user)
        .then((user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        })
        .catch((error) => {
          commit("loginFailure", error.error);
          return Promise.reject(error);
        });
    },
    signup({ commit }: Store<BooksState>, user: User) {
      return AuthService.signup(user).then(
        response => {
          commit('signupSuccess');
          return Promise.resolve(response);
        },
        error => {
          commit('signupFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }: Store<BooksState>) {
      AuthService.logout();
      commit('logout');
    },
  },
  mutations: {
    loginSuccess(state: BooksState, user: User) {
      state.status.loginErrorMessage = null;
      state.status.loggedIn = true;
      state.user = {
        ...initialUser,
        ...user,
      };
    },
    loginFailure(state: BooksState, errorMessage: string) {
      state.status.loginErrorMessage = errorMessage;
      state.status.loggedIn = false;
      state.user = initialUser;
    },
    signupSuccess(state: BooksState) {
      state.status.signupErrorMessage = null;
      state.status.loggedIn = false;
    },
    signupFailure(state: BooksState, errorMessage: string) {
      state.status.signupErrorMessage = errorMessage;
      state.status.loggedIn = false;
    },
    logout(state: BooksState) {
      state.status.loggedIn = false;
      state.user = initialUser;
    },
  },
};
