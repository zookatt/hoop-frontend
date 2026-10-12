import { defineComponent, h } from "vue";
import { flushPromises, mount } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  routerPush,
  loginUser,
  changeInitialPassword,
  createIncident,
  getIncidents,
} = vi.hoisted(() => ({
  routerPush: vi.fn(),
  loginUser: vi.fn(),
  changeInitialPassword: vi.fn(),
  createIncident: vi.fn(),
  getIncidents: vi.fn(),
}));

vi.mock("vue-router", () => ({
  useRouter: () => ({ push: routerPush }),
}));

vi.mock("../core/api/authService", () => ({
  PASSWORD_CHANGE_REQUIRED: "PASSWORD_CHANGE_REQUIRED",
  loginUser,
  changeInitialPassword,
}));

vi.mock("../core/api/incidentService", () => ({
  createIncident,
  getIncidents,
}));

import { useCreateIncident } from "./useCreateIncident";
import { useIncidents } from "./useIncidents";
import { useLoginFlow } from "./useLoginFlow";

function mountComposable(factory) {
  let composable;
  const wrapper = mount(
    defineComponent({
      setup() {
        composable = factory();
        return () => h("div");
      },
    }),
  );

  return { composable, wrapper };
}

describe("useLoginFlow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("logs in and redirects to the authenticated user's dashboard", async () => {
    const user = { email: "admin@hoop.test", role: "ADMIN" };
    loginUser.mockResolvedValue({ user });
    const { composable } = mountComposable(useLoginFlow);

    await composable.submitLogin({
      email: "admin@hoop.test",
      password: "secret",
    });

    expect(loginUser).toHaveBeenCalledWith({
      email: "admin@hoop.test",
      password: "secret",
    });
    expect(routerPush).toHaveBeenCalledWith({ name: "admin-dashboard" });
    expect(composable.isLoading.value).toBe(false);
    expect(composable.errorMessage.value).toBe("");
  });

  it("requests initial password change when the API requires it", async () => {
    loginUser.mockRejectedValue(
      Object.assign(new Error("Change required"), {
        code: "PASSWORD_CHANGE_REQUIRED",
      }),
    );
    const { composable } = mountComposable(useLoginFlow);

    await composable.submitLogin({
      email: "new@hoop.test",
      password: "temporary",
    });

    expect(composable.requiresPasswordChange.value).toBe(true);
    expect(composable.currentEmail.value).toBe("new@hoop.test");
    expect(composable.passwordChangeErrorMessage.value).toBe("");
    expect(composable.isLoading.value).toBe(false);
  });

  it("shows a login error for other authentication failures", async () => {
    loginUser.mockRejectedValue(new Error("Unauthorized"));
    const { composable } = mountComposable(useLoginFlow);

    await composable.submitLogin({ email: "bad@hoop.test", password: "wrong" });

    expect(composable.errorMessage.value).toContain(
      "No se ha podido iniciar sesion",
    );
    expect(composable.isLoading.value).toBe(false);
  });

  it("changes the initial password, logs in again, and redirects", async () => {
    const user = { role: "RECEPTION" };
    changeInitialPassword.mockResolvedValue();
    loginUser.mockResolvedValue({ user });
    const { composable } = mountComposable(useLoginFlow);
    await composable.submitLogin({
      email: "reception@hoop.test",
      password: "temporary",
    });
    routerPush.mockClear();

    await composable.submitInitialPasswordChange({ newPassword: "new-secret" });

    expect(changeInitialPassword).toHaveBeenCalledWith({
      email: "reception@hoop.test",
      currentPassword: "temporary",
      newPassword: "new-secret",
    });
    expect(loginUser).toHaveBeenLastCalledWith({
      email: "reception@hoop.test",
      password: "new-secret",
    });
    expect(routerPush).toHaveBeenCalledWith({ name: "reception-dashboard" });
    expect(composable.isChangingPassword.value).toBe(false);
  });

  it("reports password-change failures and allows the flow to be cancelled", async () => {
    loginUser.mockRejectedValueOnce(
      Object.assign(new Error("Change required"), {
        code: "PASSWORD_CHANGE_REQUIRED",
      }),
    );
    const { composable } = mountComposable(useLoginFlow);
    await composable.submitLogin({ email: "user@hoop.test", password: "temp" });
    changeInitialPassword.mockRejectedValue(new Error("Failed"));

    await composable.submitInitialPasswordChange({ newPassword: "new" });

    expect(composable.passwordChangeErrorMessage.value).toContain(
      "No se ha podido cambiar",
    );
    expect(composable.isChangingPassword.value).toBe(false);

    composable.cancelInitialPasswordChange();
    expect(composable.requiresPasswordChange.value).toBe(false);
    expect(composable.passwordChangeErrorMessage.value).toBe("");
    expect(composable.currentEmail.value).toBe("");
  });
});

describe("useIncidents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads incidents on mount, sorts by priority, filters, and calculates counts", async () => {
    getIncidents.mockResolvedValue([
      { id: 1, status: "OPEN", priority: "LOW" },
      { id: 2, status: "IN_PROGRESS", priority: "HIGH" },
      { id: 3, status: "OPEN", priority: "MEDIUM" },
    ]);
    const { composable } = mountComposable(() => useIncidents());
    await flushPromises();

    expect(getIncidents).toHaveBeenCalledOnce();
    expect(composable.isLoading.value).toBe(false);
    expect(composable.filteredIncidents.value.map(({ id }) => id)).toEqual([
      2, 3, 1,
    ]);
    expect(composable.incidentStats.value.map(({ value }) => value)).toEqual([
      2, 1, 0, 0,
    ]);

    composable.selectedStatus.value = "OPEN";
    composable.selectedPriority.value = "MEDIUM";
    expect(composable.filteredIncidents.value.map(({ id }) => id)).toEqual([3]);
  });

  it("supports manual refresh and exposes load errors without crashing", async () => {
    getIncidents.mockRejectedValue(new Error("Network error"));
    const { composable } = mountComposable(() =>
      useIncidents({ fetchOnMounted: false }),
    );

    expect(getIncidents).not.toHaveBeenCalled();
    await composable.fetchIncidents();

    expect(composable.errorMessage.value).toBe(
      "No se han podido cargar las incidencias.",
    );
    expect(composable.isLoading.value).toBe(false);
    expect(composable.incidents.value).toEqual([]);
  });
});

describe("useCreateIncident", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates an incident, closes the modal, and refreshes the list", async () => {
    const onCreated = vi.fn();
    createIncident.mockResolvedValue({ id: 42 });
    const { composable } = mountComposable(() =>
      useCreateIncident({ onCreated }),
    );
    composable.openCreateModal();

    await composable.submitCreateIncident({ title: "Broken lamp" });

    expect(createIncident).toHaveBeenCalledWith({ title: "Broken lamp" });
    expect(onCreated).toHaveBeenCalledOnce();
    expect(composable.isCreateModalOpen.value).toBe(false);
    expect(composable.isCreatingIncident.value).toBe(false);
    expect(composable.createIncidentError.value).toBe("");
  });

  it("keeps the modal open and reports errors when creation fails", async () => {
    createIncident.mockRejectedValue(new Error("Network error"));
    const { composable } = mountComposable(() => useCreateIncident());
    composable.openCreateModal();

    await composable.submitCreateIncident({ title: "Broken lamp" });

    expect(composable.isCreateModalOpen.value).toBe(true);
    expect(composable.createIncidentError.value).toBe(
      "No se ha podido crear la incidencia.",
    );
    expect(composable.isCreatingIncident.value).toBe(false);

    composable.openCreateModal();
    expect(composable.createIncidentError.value).toBe("");
    composable.closeCreateModal();
    expect(composable.isCreateModalOpen.value).toBe(false);
  });
});
