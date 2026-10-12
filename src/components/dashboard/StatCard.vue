<script setup>
defineProps({
  value: { type: [String, Number], required: true },
  label: { type: String, required: true },
  variant: {
    type: String,
    default: "open",
    validator: (value) =>
      ["open", "progress", "resolved", "closed"].includes(value),
  },
});

const variantClasses = {
  open: "text-(--color-status-open)",
  progress: "text-(--color-status-progress)",
  resolved: "text-(--color-status-resolved)",
  closed: "text-(--color-status-closed)",
};
</script>

<template>
  <article
    class="rounded-lg border border-(--color-border) bg-(--color-background) p-4 shadow-sm"
  >
    <p class="text-2xl font-bold" :class="variantClasses[variant]">
      {{ value }}
    </p>
    <p
      class="mt-3 inline-flex rounded-full border border-(--color-border) px-2 py-1 text-xs font-bold text-(--color-text-secondary)"
    >
      {{ label }}
    </p>
  </article>
</template>
