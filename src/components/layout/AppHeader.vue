<script setup>
import logoHoop from "../../assets/images/logo-hoop.png";
import BaseButton from "../ui/BaseButton.vue";

defineProps({
  title: {
    type: String,
    default: "Incidencias",
  },
  subtitle: {
    type: String,
    default: "Administrador",
  },
  showLogout: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["logout"]);
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
        <img :src="logoHoop" alt="HOOP" class="h-5 w-auto" />
        <p class="text-xs font-medium text-(--color-text-secondary)">
          {{ subtitle }}
        </p>
      </div>
    </div>

    <div class="flex items-center gap-3">
      <h1 class="text-lg font-bold text-(--color-primary)">
        {{ title }}
      </h1>

      <BaseButton
        v-if="showLogout"
        size="sm"
        variant="secondary"
        @click="emit('logout')"
      >
        Salir
      </BaseButton>
    </div>
  </header>
</template>
