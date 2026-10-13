import { computed, ref } from "vue";

export function useUserCreateForm(props, emit) {
  const name = ref("");
  const email = ref("");
  const password = ref("");
  const showPassword = ref(false);
  const roleId = ref("");

  const canSubmit = computed(
    () =>
      name.value.trim() !== "" &&
      email.value.trim() !== "" &&
      password.value.trim() !== "" &&
      roleId.value !== "" &&
      !props.isLoading,
  );

  function resetForm() {
    name.value = "";
    email.value = "";
    password.value = "";
    showPassword.value = false;
    roleId.value = "";
  }

  function submitForm() {
    if (!canSubmit.value) {
      return;
    }

    emit("submit", {
      name: name.value.trim(),
      email: email.value.trim(),
      password: password.value,
      roleId: Number(roleId.value),
    });

    resetForm();
  }

  return {
    canSubmit,
    email,
    name,
    password,
    roleId,
    showPassword,
    submitForm,
  };
}
