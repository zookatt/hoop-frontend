import { onMounted, ref } from "vue";
import { createUser, getUserRoles, getUsers } from "../core/api/userService";

export function useAdminUsers() {
  const users = ref([]);
  const roles = ref([]);
  const isLoading = ref(false);
  const isCreating = ref(false);
  const errorMessage = ref("");
  const createErrorMessage = ref("");

  async function fetchUsers() {
    isLoading.value = true;
    errorMessage.value = "";

    try {
      users.value = await getUsers();
    } catch {
      errorMessage.value = "No se han podido cargar los usuarios.";
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchRoles() {
    try {
      roles.value = await getUserRoles();
    } catch {
      errorMessage.value = "No se han podido cargar los roles.";
    }
  }

  async function createAdminUser(payload) {
    isCreating.value = true;
    createErrorMessage.value = "";

    try {
      await createUser(payload);
      await fetchUsers();
    } catch {
      createErrorMessage.value = "No se ha podido crear el usuario.";
    } finally {
      isCreating.value = false;
    }
  }

  onMounted(async () => {
    await Promise.all([fetchUsers(), fetchRoles()]);
  });

  return {
    createAdminUser,
    createErrorMessage,
    errorMessage,
    isCreating,
    isLoading,
    roles,
    users,
  };
}
