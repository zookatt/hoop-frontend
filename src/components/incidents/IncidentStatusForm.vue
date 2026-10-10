<script setup>
import { ref, watch } from "vue";
import BaseButton from "../ui/BaseButton.vue";
import { INCIDENT_STATUS_CHANGE_OPTIONS } from "../../shared/constants/incidentOptions";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  incident: {
    type: Object,
    required: true,
  },
  allowedStatuses: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["submit"]);

const status = ref("");

watch(
  () => props.incident,
  (incident) => {
    status.value = incident.status ?? "";
  },
  { immediate: true },
);

function submitForm() {
  emit("submit", status.value);
}
</script>

<template>
  <form class="grid gap-4" @submit.prevent="submitForm">
    <h2 class="text-base font-bold text-(--color-text)">
      Cambiar estado
    </h2>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Estado
      <select
        v-model="status"
        required
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
      >
        <option
          v-for="option in INCIDENT_STATUS_CHANGE_OPTIONS.filter((statusOption) =>
            allowedStatuses.includes(statusOption.value),
          )"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </label>

    <BaseButton type="submit" :disabled="disabled">
      Guardar estado
    </BaseButton>
  </form>
</template>
