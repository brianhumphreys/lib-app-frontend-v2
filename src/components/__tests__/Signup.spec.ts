import { describe, it, expect, beforeEach, vi, beforeAll, afterAll, afterEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import Signup from "../Signup.vue";
import store from "@/stores";
import { createApp } from "vue";

describe("Register", () => {
  const app = createApp(Signup);
  app.use(store);
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(Signup, {
      global: {
        plugins: [store],
      },
      computed: { showAlert: () => false },
    });
  });
  it("renders properly", () => {
    expect(wrapper.find("#email-field").exists()).toBe(true);
    expect(wrapper.find("#password-field").exists()).toBe(true);
    expect(wrapper.find("#role-selector").exists()).toBe(true);
  });

});
