<script setup>
import AppHeader from "./AppHeader.vue";
</script>

<template>
  <div class="min-h-screen bg-(--color-surface)">
    <AppHeader title="Incidencias" subtitle="Administrador" />

    <main class="px-4 py-4">
      <RouterView />
    </main>
  </div>
</template>
