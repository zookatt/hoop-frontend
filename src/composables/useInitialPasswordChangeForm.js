import { computed, ref } from "vue";

export function useInitialPasswordChangeForm(props, emit) {
  const newPassword = ref("");
  const confirmPassword = ref("");
  const showNewPassword = ref(false);
  const showConfirmPassword = ref(false);

  const validationMessage = computed(() => {
    if (newPassword.value === "" || confirmPassword.value === "") {
      return "";
    }

    if (newPassword.value.length < 8) {
      return "La nueva contrasena debe tener al menos 8 caracteres.";
    }

    if (newPassword.value !== confirmPassword.value) {
      return "Las contrasenas no coinciden.";
    }

    return "";
  });

  const isValid = computed(
    () =>
      newPassword.value !== "" &&
      confirmPassword.value !== "" &&
      validationMessage.value === "",
  );

  const canSubmit = computed(() => isValid.value && !props.isLoading);

  function submitForm() {
    if (!canSubmit.value) {
      return;
    }

    emit("submit", {
      newPassword: newPassword.value,
    });
  }

  return {
    canSubmit,
    confirmPassword,
    newPassword,
    showConfirmPassword,
    showNewPassword,
    submitForm,
    validationMessage,
  };
}
