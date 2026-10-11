<script setup>
import IncidentAssignmentForm from "./IncidentAssignmentForm.vue";
import IncidentBasicEditForm from "./IncidentBasicEditForm.vue";
import IncidentStatusForm from "./IncidentStatusForm.vue";
import StatusMessage from "../ui/StatusMessage.vue";

defineProps({
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
});

defineEmits(["save-assignment", "save-basic-info", "save-status"]);
</script>

<template>
  <section class="grid gap-4 border-t border-(--color-border) pt-4">
    <StatusMessage v-if="saveErrorMessage" variant="error">
      {{ saveErrorMessage }}
    </StatusMessage>

    <IncidentBasicEditForm
      v-if="canEdit"
      :incident="incident"
      @save="$emit('save-basic-info', $event)"
    />

    <IncidentAssignmentForm
      v-if="canAssign"
      :incident="incident"
      @save="$emit('save-assignment', $event)"
    />

    <IncidentStatusForm
      v-if="canChangeStatus"
      :allowed-statuses="allowedStatusValues"
      :disabled="isSaving"
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
