import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import NavagationBar from "../NavagationBar.vue";
import store from "@/stores";
import { createApp } from "vue";
import { Console } from "console";

describe("NavagationBar", () => {
  const app = createApp(NavagationBar)
  app.use(store)
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(NavagationBar, {
      global: {
        plugins: [store],
      },
      computed: { showAlert: () => false },
    })
  })
  it.skip("renders properly", () => {
    expect(wrapper.find("#logged-out-nav").exists()).toBe(true);
    expect(wrapper.find("#signup-link").exists()).toBe(true);
    expect(wrapper.find("#login-link").exists()).toBe(true);
  });
});
