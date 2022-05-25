import { describe, it, expect, beforeEach, vi, beforeAll, afterAll, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Login from "../Login.vue";
import store from "@/stores";
import { createApp } from "vue";

describe("Login", () => {
  const app = createApp(Login);
  app.use(store);
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Login, {
      global: {
        plugins: [store],
      },
      computed: { showAlert: () => false },
    });
  });
  it("renders properly", () => {
    expect(wrapper.find("#email-field").exists()).toBe(true);
    expect(wrapper.find("#password-field").exists()).toBe(true);
  });

});
