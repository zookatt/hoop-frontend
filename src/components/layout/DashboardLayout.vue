<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import AppHeader from "./AppHeader.vue";
import { clearAuthSession, getAuthUser } from "../../core/auth/authStorage";

const router = useRouter();
const authUser = computed(() => getAuthUser());
const subtitle = computed(() => authUser.value?.role || authUser.value?.email || "Usuario");

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
      show-logout
      @logout="logout"
    />

    <main class="px-4 py-4">
      <RouterView />
    </main>
  </div>
</template>
