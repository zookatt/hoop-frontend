<script setup>
defineProps({
  title: {
    type: String,
    default: "Incidencias",
  },
  subtitle: {
    type: String,
    default: "Administrador",
  },
});
</script>

<template>
  <header
    class="flex items-center justify-between border-b border-(--color-border) bg-(--color-background) px-4 py-3"
  >
    <div class="flex items-center gap-3">
      <button
        type="button"
        aria-label="Abrir menu hamburguesa"
        class="flex h-10 w-10 items-center justify-center rounded-md text-(--color-text)"
      >
        <span class="text-2xl">☰</span>
      </button>

      <div>
        <p class="text-lg font-bold text-(--color-primary)">HOOP</p>
        <p class="text-xs font-medium text-(--color-text-secondary)">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <h1 class="text-lg font-bold text-(--color-primary)">
      {{ title }}
    </h1>
  </header>
</template>
