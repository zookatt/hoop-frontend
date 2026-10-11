<script setup>
import IncidentAssignmentForm from "../../components/incidents/IncidentAssignmentForm.vue";
import IncidentBasicEditForm from "../../components/incidents/IncidentBasicEditForm.vue";
import IncidentStatusForm from "../../components/incidents/IncidentStatusForm.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import StatusMessage from "../../components/ui/StatusMessage.vue";
import { useIncidentDetail } from "../../composables/useIncidentDetail";
import IncidentDetailSummary from "../../components/incidents/IncidentDetailSummary.vue";
import { useIncidentPermissions } from "../../composables/useIncidentPermissions";
const {
  errorMessage,
  goBack,
  incident,
  isLoading,
  isSaving,
  saveAssignment,
  saveBasicInfo,
  saveErrorMessage,
  saveStatus,
} = useIncidentDetail();

const { allowedStatusValues, canAssign, canChangeStatus, canEdit, hasActions } =
  useIncidentPermissions();
</script>

<template>
  <section class="mx-auto grid max-w-md gap-4 pb-6">
    <BaseButton variant="secondary" size="sm" @click="goBack">
      Volver
    </BaseButton>

    <StatusMessage v-if="isLoading"> Cargando incidencia... </StatusMessage>

    <StatusMessage v-else-if="errorMessage" variant="error">
      {{ errorMessage }}
    </StatusMessage>

    <article v-else-if="incident" class="grid gap-4">
      <IncidentDetailSummary :incident="incident" />

      <section
        v-if="hasActions"
        class="grid gap-4 border-t border-(--color-border) pt-4"
      >
        <StatusMessage v-if="saveErrorMessage" variant="error">
          {{ saveErrorMessage }}
        </StatusMessage>

        <IncidentBasicEditForm
          v-if="canEdit"
          :disabled="isSaving"
          :incident="incident"
          @submit="saveBasicInfo"
        />

        <IncidentAssignmentForm
          v-if="canAssign"
          :disabled="isSaving"
          :incident="incident"
          @submit="saveAssignment"
        />

        <IncidentStatusForm
          v-if="canChangeStatus"
          :allowed-statuses="allowedStatusValues"
          :disabled="isSaving"
          :incident="incident"
          @submit="saveStatus"
        />

        <p
          v-if="isSaving"
          class="text-sm font-medium text-(--color-text-secondary)"
        >
          Guardando cambios...
        </p>
      </section>
    </article>
  </section>
</template>
