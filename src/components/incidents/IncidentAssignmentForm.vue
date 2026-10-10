<script setup>
import { reactive, watch } from "vue";
import BaseButton from "../ui/BaseButton.vue";
import {
  INCIDENT_DEPARTMENT_OPTIONS,
  INCIDENT_PRIORITY_OPTIONS,
} from "../../shared/constants/incidentOptions";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  incident: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["submit"]);

const form = reactive({
  department: "",
  priority: "",
  assignedToUserId: "",
});

watch(
  () => props.incident,
  (incident) => {
    form.department = incident.department ?? "";
    form.priority = incident.priority ?? "";
    form.assignedToUserId = incident.assignedToUserId ?? "";
  },
  { immediate: true },
);

function submitForm() {
  emit("submit", {
    department: form.department,
    priority: form.priority,
    assignedToUserId: Number(form.assignedToUserId),
  });
}
</script>

<template>
  <form class="grid gap-4" @submit.prevent="submitForm">
    <h2 class="text-base font-bold text-(--color-text)">
      Asignar incidencia
    </h2>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Departamento
      <select
        v-model="form.department"
        required
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
      >
        <option disabled value="">Selecciona departamento</option>
        <option
          v-for="option in INCIDENT_DEPARTMENT_OPTIONS"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Prioridad
      <select
        v-model="form.priority"
        required
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
      >
        <option disabled value="">Selecciona prioridad</option>
        <option
          v-for="option in INCIDENT_PRIORITY_OPTIONS"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Usuario asignado
      <input
        v-model="form.assignedToUserId"
        type="number"
        min="1"
        required
        placeholder="ID del trabajador"
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-secondary) focus:border-(--color-primary)"
      />
    </label>

    <BaseButton type="submit" :disabled="disabled">
      Guardar asignación
    </BaseButton>
  </form>
</template>
