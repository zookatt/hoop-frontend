import { computed, ref } from "vue";

export function useLoginForm(props, emit) {
  const email = ref("");
  const password = ref("");
  const showPassword = ref(false);

  const trimmedEmail = computed(() => email.value.trim());

  const canSubmit = computed(
    () =>
      trimmedEmail.value !== "" &&
      password.value.trim() !== "" &&
      !props.isLoading,
  );

  function submitForm() {
    if (!canSubmit.value) {
      return;
    }

    emit("submit", {
      email: trimmedEmail.value,
      password: password.value,
    });
  }

  return {
    canSubmit,
    email,
    password,
    showPassword,
    submitForm,
  };
}
