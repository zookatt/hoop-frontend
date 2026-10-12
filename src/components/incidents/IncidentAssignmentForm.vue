<script setup>
import { computed, reactive, watch } from "vue";
import BaseButton from "../ui/BaseButton.vue";
import StatusMessage from "../ui/StatusMessage.vue";
import {
  INCIDENT_DEPARTMENT_OPTIONS,
  INCIDENT_PRIORITY_OPTIONS,
} from "../../shared/constants/incidentOptions";
import { filterAssignableUsersByDepartment } from "../../shared/utils/userFilters";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  incident: {
    type: Object,
    required: true,
  },
  isLoadingUsers: {
    type: Boolean,
    default: false,
  },
  users: {
    type: Array,
    default: () => [],
  },
  usersErrorMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["submit"]);

const form = reactive({
  department: "",
  priority: "",
  assignedToUserId: "",
});

const filteredUsers = computed(() =>
  filterAssignableUsersByDepartment(props.users, form.department),
);

const isWorkerSelectDisabled = computed(
  () => props.disabled || props.isLoadingUsers || !form.department,
);

const isSubmitDisabled = computed(
  () => props.disabled || isWorkerSelectDisabled.value || !form.assignedToUserId,
);

const workerPlaceholder = computed(() => {
  if (!form.department) {
    return "Selecciona primero departamento";
  }

  if (props.isLoadingUsers) {
    return "Cargando trabajadores";
  }

  if (filteredUsers.value.length === 0) {
    return "No hay trabajadores disponibles";
  }

  return "Selecciona trabajador";
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

watch(
  [() => form.department, () => props.users],
  ([department]) => {
    if (!department) {
      form.assignedToUserId = "";
      return;
    }

    if (props.users.length === 0) {
      return;
    }

    const currentUserIsValid = filteredUsers.value.some(
      (user) => String(user.id) === String(form.assignedToUserId),
    );

    if (!currentUserIsValid) {
      form.assignedToUserId = "";
    }
  },
);
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
        :disabled="disabled"
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
        :disabled="disabled"
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
      <select
        v-model="form.assignedToUserId"
        required
        :disabled="isWorkerSelectDisabled"
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-secondary) focus:border-(--color-primary)"
      >
        <option disabled value="">
          {{ workerPlaceholder }}
        </option>
        <option
          v-for="user in filteredUsers"
          :key="user.id"
          :value="user.id"
        >
          {{ user.name }} - {{ user.email }}
        </option>
      </select>
    </label>

    <StatusMessage
      v-if="usersErrorMessage"
      variant="error"
    >
      {{ usersErrorMessage }}
    </StatusMessage>

    <BaseButton type="submit" :disabled="isSubmitDisabled">
      Guardar asignación
    </BaseButton>
  </form>
</template>
