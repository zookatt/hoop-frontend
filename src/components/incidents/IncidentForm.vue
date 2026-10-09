<script setup>
import { reactive } from "vue";
import BaseButton from "../ui/BaseButton.vue";

const emit = defineEmits(["submit"]);

const form = reactive({
  title: "",
  description: "",
  roomNumber: "",
});

function submitForm() {
  emit("submit", {
    title: form.title.trim(),
    description: form.description.trim(),
    roomNumber: form.roomNumber.trim(),
  });
}
</script>

<template>
  <form class="grid gap-4" @submit.prevent="submitForm">
    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Título
      <input
        v-model="form.title"
        type="text"
        required
        placeholder="Aire acondicionado roto"
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-secondary) focus:border-(--color-primary)"
      />
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Descripción
      <textarea
        v-model="form.description"
        required
        rows="4"
        placeholder="Describe la incidencia"
        class="rounded border border-(--color-border) px-3 py-3 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-secondary) focus:border-(--color-primary)"
      />
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Habitación
      <input
        v-model="form.roomNumber"
        type="text"
        required
        placeholder="203"
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-secondary) focus:border-(--color-primary)"
      />
    </label>

    <BaseButton type="submit">
      Crear incidencia
    </BaseButton>
  </form>
</template>