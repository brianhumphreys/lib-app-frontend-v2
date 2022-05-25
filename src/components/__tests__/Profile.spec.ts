import router from "@/router";
import { auth, initialState, type AuthState } from "@/stores/auth.module";
import { shallowMount, VueWrapper } from "@vue/test-utils";
import {
    beforeEach, describe, expect, it
} from "vitest";
import { createStore } from "vuex";
import Profile from "../Profile.vue";

describe("Register", () => {

  const state = {
    ...initialState,
    ...{
      status: {
        loggedIn: true,
        signupErrorMessage: null,
        loginErrorMessage: null,
      },
      user: {
        id: 1,
        email: "email@gmail.com",
        token: "tokennnnnnnnnnnnnnnnnnnnnnn",
        role: "admin",
        password: null,
      },
    },
  };
  
  let wrapper: VueWrapper;

  beforeEach(() => {
    const store = createStore<AuthState>({
        modules: {
          auth: {
            ...auth,
            state,
          },
        },
      });
    wrapper = shallowMount(Profile, {
      global: {
        plugins: [store, router],
      },
      computed: { showAlert: () => false },
    });
  });
  it.skip("renders properly", () => {
    expect(wrapper.find("#profile-header").text()).toBe("email@gmail.com Profile");
    expect(wrapper.find("#profile-token").text()).toBe("Token: tokennnn ... nnnnnnnn");
    expect(wrapper.find("#profile-id").text()).toBe("Id: 1");
    expect(wrapper.find("#profile-email").text()).toBe("Email: email@gmail.com");
    expect(wrapper.find("#profile-role").text()).toBe("Role: admin");
  });
});
