<script setup>
defineProps({
  type: {
    type: String,
    default: "button",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="flex w-full items-center justify-center gap-2 rounded-lg bg-(--color-primary) px-4 py-4 text-sm font-bold text-white shadow-md transition hover:bg-[#580000] disabled:opacity-60"
  >
    <slot />
  </button>
</template>
