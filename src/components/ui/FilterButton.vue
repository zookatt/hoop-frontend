<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    type="button"
    class="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition"
    :class="
      active
        ? 'border-(--color-primary) bg-(--color-background) text-(--color-primary) shadow-sm'
        : 'border-(--color-border) bg-(--color-background) text-(--color-text-secondary)'
    "
  >
    <slot />
  </button>
</template>
