<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md"].includes(value),
  },
});

const buttonClasses = computed(() => [
  "flex items-center justify-center gap-2 rounded-lg text-sm font-bold shadow-md transition disabled:opacity-60",
  props.size === "sm" ? "w-auto px-3 py-2" : "w-full px-4 py-4",
  props.variant === "primary"
    ? "bg-(--color-primary) text-(--color-background) hover:bg-(--color-secondary)"
    : "border border-(--color-border) bg-(--color-background) text-(--color-text-secondary) hover:border-(--color-primary) hover:text-(--color-primary)",
]);
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>
