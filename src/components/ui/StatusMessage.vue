<script setup>
defineProps({
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "error", "success"].includes(value),
  },
});
</script>

<template>
  <div
    class="rounded-lg border bg-(--color-background) p-4 text-sm font-medium shadow-sm"
    :class="
      variant === 'error'
        ? 'border-(--color-status-open) text-(--color-status-open)'
        : variant === 'success'
          ? 'border-(--color-accent) text-(--color-accent)'
        : 'border-(--color-border) text-(--color-text-secondary)'
    "
  >
    <slot />
  </div>
</template>
