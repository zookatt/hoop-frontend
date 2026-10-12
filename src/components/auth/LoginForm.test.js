import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import LoginForm from "./LoginForm.vue";

describe("LoginForm integration", () => {
  it("keeps submission disabled until both credentials are valid", async () => {
    const wrapper = mount(LoginForm);
    const submitButton = wrapper.get('button[type="submit"]');

    expect(submitButton.attributes("disabled")).toBeDefined();

    await wrapper.get('input[type="email"]').setValue("  admin@hoop.test  ");
    await wrapper
      .get('input[autocomplete="current-password"]')
      .setValue("secret");

    expect(submitButton.attributes("disabled")).toBeUndefined();
  });

  it("emits trimmed email and password when submitted", async () => {
    const wrapper = mount(LoginForm);

    await wrapper.get('input[type="email"]').setValue("  admin@hoop.test  ");
    await wrapper
      .get('input[autocomplete="current-password"]')
      .setValue("secret");
    await wrapper.get("form").trigger("submit");

    expect(wrapper.emitted("submit")).toEqual([
      [{ email: "admin@hoop.test", password: "secret" }],
    ]);
  });

  it("does not submit while loading and presents the loading state", async () => {
    const wrapper = mount(LoginForm, {
      props: { isLoading: true },
    });

    await wrapper.get('input[type="email"]').setValue("admin@hoop.test");
    await wrapper
      .get('input[autocomplete="current-password"]')
      .setValue("secret");

    expect(wrapper.get('button[type="submit"]').text()).toBe("Entrando...");
    await wrapper.get("form").trigger("submit");
    expect(wrapper.emitted("submit")).toBeUndefined();
  });

  it("toggles password visibility and displays an authentication error", async () => {
    const wrapper = mount(LoginForm, {
      props: { errorMessage: "Credenciales incorrectas" },
    });
    const passwordInput = wrapper.get('input[autocomplete="current-password"]');

    expect(passwordInput.attributes("type")).toBe("password");
    await wrapper
      .get('button[aria-label="Mostrar contrasena"]')
      .trigger("click");
    expect(passwordInput.attributes("type")).toBe("text");
    expect(wrapper.text()).toContain("Credenciales incorrectas");
  });
});
