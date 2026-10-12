<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
      <section
        class="grid w-full max-w-md gap-4 rounded-lg border border-(--color-border) bg-(--color-background) p-5 shadow-lg"
        role="dialog"
        aria-modal="true"
      >
        <header class="flex items-center justify-between gap-4">
          <h2 class="text-lg font-bold text-(--color-text)">
            {{ title }}
          </h2>

          <button
            type="button"
            class="text-xl font-bold text-(--color-text-secondary)"
            aria-label="Cerrar modal"
            @click="emit('close')"
          >
            ×
          </button>
        </header>

        <slot />
      </section>
    </div>
  </Teleport>
</template>
