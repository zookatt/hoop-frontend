import { computed, ref } from "vue";

export function useInitialPasswordChangeForm() {
  const newPassword = ref("");
  const confirmPassword = ref("");
  const showNewPassword = ref(false);
  const showConfirmPassword = ref(false);

  const validationMessage = computed(() => {
    if (newPassword.value === "" || confirmPassword.value === "") {
      return "";
    }

    if (newPassword.value.length < 8) {
      return "La nueva contraseña debe tener al menos 8 caracteres.";
    }

    if (newPassword.value !== confirmPassword.value) {
      return "Las contraseñas no coinciden.";
    }

    return "";
  });

  const isValid = computed(
    () =>
      newPassword.value !== "" &&
      confirmPassword.value !== "" &&
      validationMessage.value === "",
  );

  function getPayload() {
    return {
      newPassword: newPassword.value,
    };
  }

  return {
    confirmPassword,
    getPayload,
    isValid,
    newPassword,
    showConfirmPassword,
    showNewPassword,
    validationMessage,
  };
}