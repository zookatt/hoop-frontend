import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import {
  changeInitialPassword,
  loginUser,
  PASSWORD_CHANGE_REQUIRED,
} from "../core/api/authService";
import { getDashboardRouteForUser } from "../core/auth/roleRoutes";

export function useLoginFlow() {
  const router = useRouter();

  const loginCredentials = ref({
    email: "",
    password: "",
  });

  const isLoading = ref(false);
  const errorMessage = ref("");
  const requiresPasswordChange = ref(false);
  const isChangingPassword = ref(false);
  const passwordChangeErrorMessage = ref("");

  const currentEmail = computed(() => loginCredentials.value.email);

  async function redirectToDashboard(user) {
    await router.push(getDashboardRouteForUser(user));
  }

  async function submitLogin(credentials) {
    isLoading.value = true;
    errorMessage.value = "";
    loginCredentials.value = credentials;

    try {
      const { user } = await loginUser(credentials);
      await redirectToDashboard(user);
    } catch (error) {
      if (error.code === PASSWORD_CHANGE_REQUIRED) {
        requiresPasswordChange.value = true;
        passwordChangeErrorMessage.value = "";
        return;
      }

      errorMessage.value =
        "No se ha podido iniciar sesion. Revisa email y contrasena.";
    } finally {
      isLoading.value = false;
    }
  }

  async function submitInitialPasswordChange({ newPassword }) {
    isChangingPassword.value = true;
    passwordChangeErrorMessage.value = "";

    try {
      await changeInitialPassword({
        email: loginCredentials.value.email,
        currentPassword: loginCredentials.value.password,
        newPassword,
      });

      const { user } = await loginUser({
        email: loginCredentials.value.email,
        password: newPassword,
      });

      await redirectToDashboard(user);
    } catch {
      passwordChangeErrorMessage.value =
        "No se ha podido cambiar la contrasena. Revisa los datos.";
    } finally {
      isChangingPassword.value = false;
    }
  }

  function cancelInitialPasswordChange() {
    requiresPasswordChange.value = false;
    passwordChangeErrorMessage.value = "";
    loginCredentials.value = {
      email: "",
      password: "",
    };
  }

  return {
    cancelInitialPasswordChange,
    currentEmail,
    errorMessage,
    isChangingPassword,
    isLoading,
    passwordChangeErrorMessage,
    requiresPasswordChange,
    submitInitialPasswordChange,
    submitLogin,
  };
}
