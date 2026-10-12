<script setup>
import { computed } from "vue";
import IncidentAssignmentForm from "./IncidentAssignmentForm.vue";
import IncidentBasicEditForm from "./IncidentBasicEditForm.vue";
import IncidentStatusForm from "./IncidentStatusForm.vue";
import StatusMessage from "../ui/StatusMessage.vue";

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

defineEmits(["save-assignment", "save-basic-info", "save-status"]);

const isClosed = computed(() => props.incident.status === "CLOSED");
const actionsDisabled = computed(() => props.isSaving || isClosed.value);
</script>

<template>
  <section class="grid gap-4 border-t border-(--color-border) pt-4">
    <StatusMessage v-if="saveErrorMessage" variant="error">
      {{ saveErrorMessage }}
    </StatusMessage>

    <StatusMessage v-if="saveSuccessMessage" variant="success">
      {{ saveSuccessMessage }}
    </StatusMessage>

    <StatusMessage v-if="isClosed">
      Incidencia cerrada. No se puede editar ni cambiar.
    </StatusMessage>

    <IncidentBasicEditForm
      v-if="canEdit"
      :disabled="actionsDisabled"
      :incident="incident"
      @submit="$emit('save-basic-info', $event)"
    />

    <IncidentAssignmentForm
      v-if="canAssign"
      :disabled="actionsDisabled"
      :incident="incident"
      @submit="$emit('save-assignment', $event)"
    />

    <IncidentStatusForm
      v-if="canChangeStatus"
      :allowed-statuses="allowedStatusValues"
      :disabled="actionsDisabled"
      :incident="incident"
      @submit="$emit('save-status', $event)"
    />

    <p
      v-if="isSaving"
      class="text-center text-xs font-bold text-(--color-text-secondary)"
    >
      Guardando cambios...
    </p>
  </section>
</template>
