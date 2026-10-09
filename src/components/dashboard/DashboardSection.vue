<script setup>
defineProps({
  title: { type: String, required: true },
  actionLabel: { type: String, default: "" },
});
</script>

<template>
  <section class="grid gap-3">
    <div class="flex items-center justify-between">
      <h2
        class="text-xs font-bold uppercase tracking-wide text-(--color-text-secondary)"
      >
        {{ title }}
      </h2>

      <button
        v-if="actionLabel"
        type="button"
        class="text-xs font-bold text-(--color-primary)"
      >
        {{ actionLabel }} →
      </button>
    </div>

    <slot />
  </section>
</template>
