<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
});
</script>

<template>
  <button
    type="button"
    class="flex w-full items-center justify-between rounded-lg border border-(--color-border) bg-(--color-background) p-4 text-left shadow-sm"
  >
    <span>
      <span class="block text-sm font-bold text-(--color-text)">
        {{ title }}
      </span>
      <span class="mt-1 block text-xs text-(--color-text-secondary)">
        {{ description }}
      </span>
    </span>

    <span class="text-xl text-(--color-text-secondary)">›</span>
  </button>
</template>