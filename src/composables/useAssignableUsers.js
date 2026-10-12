import { ref } from "vue";
import { getUsers } from "../core/api/userService";

export function useAssignableUsers() {
  const users = ref([]);
  const isLoadingUsers = ref(false);
  const usersErrorMessage = ref("");
  const hasFetchedUsers = ref(false);

  async function fetchAssignableUsers() {
    if (hasFetchedUsers.value || isLoadingUsers.value) {
      return;
    }

    isLoadingUsers.value = true;
    usersErrorMessage.value = "";

    try {
      users.value = await getUsers();
      hasFetchedUsers.value = true;
    } catch {
      usersErrorMessage.value = "No se han podido cargar los trabajadores.";
    } finally {
      isLoadingUsers.value = false;
    }
  }

  return {
    fetchAssignableUsers,
    isLoadingUsers,
    users,
    usersErrorMessage,
  };
}
