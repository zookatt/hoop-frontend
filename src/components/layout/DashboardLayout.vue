<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "./AppHeader.vue";
import AppSidebar from "./AppSidebar.vue";
import { clearAuthSession, getAuthUser } from "../../core/auth/authStorage";
import { getDashboardRouteForUser } from "../../core/auth/roleRoutes";
import { getUserRoleLabel } from "../../shared/utils/userFormatters";

const router = useRouter();
const isSidebarOpen = ref(false);
const authUser = computed(() => getAuthUser());
const subtitle = computed(
  () =>
    authUser.value?.role
      ? getUserRoleLabel(authUser.value.role)
      : authUser.value?.email || "Usuario",
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

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <div class="min-h-screen bg-(--color-surface)">
    <AppHeader
      title="Incidencias"
      :is-sidebar-open="isSidebarOpen"
      :subtitle="subtitle"
      :user="authUser"
      show-logout
      :show-users-link="showUsersLink"
      @home="goHome"
      @incidents="goToIncidents"
      @logout="logout"
      @profile="goHome"
      @toggle-sidebar="toggleSidebar"
      @users="goToUsers"
    />

    <div
      class="fixed bottom-0 left-0 top-[65px] z-40 hidden w-[280px] transform transition-transform duration-300 ease-out md:block"
      :class="
        isSidebarOpen
          ? 'translate-x-0'
          : 'pointer-events-none -translate-x-full'
      "
    >
      <AppSidebar
        class="h-full border-r border-(--color-border)"
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
    </div>

    <main class="mx-auto w-full max-w-6xl px-4 py-4 md:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>
