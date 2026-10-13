<script setup>
import { computed, reactive, watch } from "vue";
import BaseButton from "../ui/BaseButton.vue";
import StatusMessage from "../ui/StatusMessage.vue";
import { useAssignableUsers } from "../../composables/useAssignableUsers";
import {
  INCIDENT_DEPARTMENT_OPTIONS,
  INCIDENT_PRIORITY_OPTIONS,
  INCIDENT_STATUS_CHANGE_OPTIONS,
} from "../../shared/constants/incidentOptions";
import { filterAssignableUsersByDepartment } from "../../shared/utils/userFilters";

const props = defineProps({
  allowedStatusValues: {
    type: Array,
    default: () => [],
  },
  canAssign: {
    type: Boolean,
    default: false,
  },
  canChangeStatus: {
    type: Boolean,
    default: false,
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
  incident: {
    type: Object,
    required: true,
  },
  isSaving: {
    type: Boolean,
    default: false,
  },
  saveErrorMessage: {
    type: String,
    default: "",
  },
  saveSuccessMessage: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["save"]);

const form = reactive({
  title: "",
  description: "",
  roomNumber: "",
  department: "",
  priority: "",
  assignedToUserId: "",
  status: "",
});

const {
  fetchAssignableUsers,
  isLoadingUsers,
  users,
  usersErrorMessage,
} = useAssignableUsers();

const isClosed = computed(() => props.incident.status === "CLOSED");
const actionsDisabled = computed(() => props.isSaving || isClosed.value);

const filteredUsers = computed(() =>
  filterAssignableUsersByDepartment(users.value, form.department),
);

const statusOptions = computed(() =>
  INCIDENT_STATUS_CHANGE_OPTIONS.filter((option) =>
    props.allowedStatusValues.includes(option.value),
  ),
);

const isWorkerSelectDisabled = computed(
  () => actionsDisabled.value || isLoadingUsers.value || !form.department,
);

const workerPlaceholder = computed(() => {
  if (!form.department) {
    return "Selecciona primero departamento";
  }

  if (isLoadingUsers.value) {
    return "Cargando trabajadores";
  }

  if (filteredUsers.value.length === 0) {
    return "No hay trabajadores disponibles";
  }

  return "Selecciona trabajador";
});

const hasBasicInfoChanges = computed(
  () =>
    props.canEdit &&
    (form.title.trim() !== (props.incident.title ?? "") ||
      form.description.trim() !== (props.incident.description ?? "") ||
      form.roomNumber.trim() !== (props.incident.roomNumber ?? "")),
);

const hasAssignmentChanges = computed(
  () =>
    props.canAssign &&
    (form.department !== (props.incident.department ?? "") ||
      form.priority !== (props.incident.priority ?? "") ||
      String(form.assignedToUserId) !==
        String(props.incident.assignedToUserId ?? "")),
);

const hasStatusChanges = computed(
  () => props.canChangeStatus && form.status !== (props.incident.status ?? ""),
);

const isBasicInfoValid = computed(
  () =>
    !props.canEdit ||
    (form.title.trim() !== "" &&
      form.description.trim() !== "" &&
      form.roomNumber.trim() !== ""),
);

const isAssignmentValid = computed(
  () =>
    !props.canAssign ||
    (form.department !== "" &&
      form.priority !== "" &&
      form.assignedToUserId !== ""),
);

const isStatusValid = computed(() => !props.canChangeStatus || form.status !== "");

const hasChanges = computed(
  () =>
    hasBasicInfoChanges.value ||
    hasAssignmentChanges.value ||
    hasStatusChanges.value,
);

const isSaveDisabled = computed(
  () =>
    actionsDisabled.value ||
    !hasChanges.value ||
    !isBasicInfoValid.value ||
    !isAssignmentValid.value ||
    !isStatusValid.value,
);

watch(
  () => props.canAssign,
  (canAssign) => {
    if (canAssign) {
      fetchAssignableUsers();
    }
  },
  { immediate: true },
);

watch(
  () => props.incident,
  (incident) => {
    form.title = incident.title ?? "";
    form.description = incident.description ?? "";
    form.roomNumber = incident.roomNumber ?? "";
    form.department = incident.department ?? "";
    form.priority = incident.priority ?? "";
    form.assignedToUserId = incident.assignedToUserId ?? "";
    form.status = incident.status ?? "";
  },
  { immediate: true },
);

watch(
  [() => form.department, users],
  ([department]) => {
    if (!department) {
      form.assignedToUserId = "";
      return;
    }

    if (users.value.length === 0) {
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

function submitChanges() {
  if (isSaveDisabled.value) {
    return;
  }

  emit("save", {
    basicInfo: hasBasicInfoChanges.value
      ? {
          title: form.title.trim(),
          description: form.description.trim(),
          roomNumber: form.roomNumber.trim(),
        }
      : null,
    assignment: hasAssignmentChanges.value
      ? {
          department: form.department,
          priority: form.priority,
          assignedToUserId: Number(form.assignedToUserId),
        }
      : null,
    status: hasStatusChanges.value ? form.status : null,
  });
}
</script>

<template>
  <form
    class="grid gap-4 border-t border-(--color-border) pt-4"
    @submit.prevent="submitChanges"
  >
    <StatusMessage v-if="saveErrorMessage" variant="error">
      {{ saveErrorMessage }}
    </StatusMessage>

    <StatusMessage v-if="saveSuccessMessage" variant="success">
      {{ saveSuccessMessage }}
    </StatusMessage>

    <StatusMessage v-if="isClosed">
      Incidencia cerrada. No se puede editar ni cambiar.
    </StatusMessage>

    <fieldset
      v-if="canEdit"
      class="grid gap-4 rounded-lg border border-(--color-border) p-4"
    >
      <legend class="px-1 text-sm font-bold text-(--color-text)">
        Datos de la incidencia
      </legend>

      <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
        Título
        <input
          v-model="form.title"
          type="text"
          required
          :disabled="actionsDisabled"
          class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
        />
      </label>

      <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
        Descripción
        <textarea
          v-model="form.description"
          required
          rows="4"
          :disabled="actionsDisabled"
          class="rounded border border-(--color-border) px-3 py-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
        />
      </label>

      <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
        Habitación
        <input
          v-model="form.roomNumber"
          type="text"
          required
          :disabled="actionsDisabled"
          class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
        />
      </label>
    </fieldset>

    <fieldset
      v-if="canAssign"
      class="grid gap-4 rounded-lg border border-(--color-border) p-4"
    >
      <legend class="px-1 text-sm font-bold text-(--color-text)">
        Asignación
      </legend>

      <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
        Departamento
        <select
          v-model="form.department"
          required
          :disabled="actionsDisabled"
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
          :disabled="actionsDisabled"
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
          class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
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

      <StatusMessage v-if="usersErrorMessage" variant="error">
        {{ usersErrorMessage }}
      </StatusMessage>
    </fieldset>

    <fieldset
      v-if="canChangeStatus"
      class="grid gap-4 rounded-lg border border-(--color-border) p-4"
    >
      <legend class="px-1 text-sm font-bold text-(--color-text)">
        Estado
      </legend>

      <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
        Estado
        <select
          v-model="form.status"
          required
          :disabled="actionsDisabled"
          class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
        >
          <option
            v-for="option in statusOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
    </fieldset>

    <div class="sticky bottom-0 z-10 -mx-1 bg-(--color-surface) px-1 py-2">
      <BaseButton type="submit" :disabled="isSaveDisabled">
        {{ isSaving ? "Guardando..." : "Guardar cambios" }}
      </BaseButton>
    </div>
  </form>
</template>
