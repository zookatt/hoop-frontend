<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "./AppHeader.vue";
import { clearAuthSession, getAuthUser } from "../../core/auth/authStorage";
import { getDashboardRouteForUser } from "../../core/auth/roleRoutes";

const router = useRouter();
const authUser = computed(() => getAuthUser());
const subtitle = computed(
  () => authUser.value?.role || authUser.value?.email || "Usuario",
);
const showUsersLink = computed(() => authUser.value?.role === "ADMIN");

async function goHome() {
  await router.push(getDashboardRouteForUser(authUser.value));
}

async function goToIncidents() {
  await router.push({ name: "incidents" });
}

async function goToUsers() {
  await router.push({ name: "admin-users" });
}

async function logout() {
  clearAuthSession();
  await router.push({ name: "login" });
}
</script>

<template>
  <div class="min-h-screen bg-(--color-surface)">
    <AppHeader
      title="Incidencias"
      :subtitle="subtitle"
      :user="authUser"
      show-logout
      :show-users-link="showUsersLink"
      @home="goHome"
      @incidents="goToIncidents"
      @logout="logout"
      @profile="goHome"
      @users="goToUsers"
    />

    <main class="mx-auto w-full max-w-6xl px-4 py-4 md:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>
