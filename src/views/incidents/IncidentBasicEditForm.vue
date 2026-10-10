<script setup>
import { reactive, watch } from "vue";
import BaseButton from "../ui/BaseButton.vue";

const props = defineProps({
  incident: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const form = reactive({
  title: "",
  description: "",
  roomNumber: "",
});

watch(
  () => props.incident,
  (incident) => {
    form.title = incident.title ?? "";
    form.description = incident.description ?? "";
    form.roomNumber = incident.roomNumber ?? "";
  },
  { immediate: true },
);

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
    <h2 class="text-base font-bold text-(--color-text)">
      Editar información
    </h2>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Título
      <input
        v-model="form.title"
        type="text"
        required
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
      />
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Descripción
      <textarea
        v-model="form.description"
        required
        rows="4"
        class="rounded border border-(--color-border) px-3 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
      />
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Habitación
      <input
        v-model="form.roomNumber"
        type="text"
        required
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
      />
    </label>

    <BaseButton type="submit" :disabled="disabled">
      Guardar cambios
    </BaseButton>
  </form>
</template>