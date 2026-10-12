<script setup>
import IncidentActionsSection from "../../components/incidents/IncidentActionsSection.vue";
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
  saveSuccessMessage,
  saveStatus,
} = useIncidentDetail();

const { allowedStatusValues, canAssign, canChangeStatus, canEdit, hasActions } =
  useIncidentPermissions();
</script>

<template>
  <section class="mx-auto grid max-w-md gap-4 pb-6 md:max-w-3xl lg:max-w-5xl">
    <BaseButton variant="secondary" size="sm" @click="goBack">
      Volver
    </BaseButton>

    <StatusMessage v-if="isLoading"> Cargando incidencia... </StatusMessage>

    <StatusMessage v-else-if="errorMessage" variant="error">
      {{ errorMessage }}
    </StatusMessage>

    <article
      v-else-if="incident"
      class="grid gap-4 lg:grid-cols-2 lg:items-start"
    >
      <IncidentDetailSummary :incident="incident" />

      <IncidentActionsSection
        v-if="hasActions"
        :allowed-status-values="allowedStatusValues"
        :can-assign="canAssign"
        :can-change-status="canChangeStatus"
        :can-edit="canEdit"
        :incident="incident"
        :is-saving="isSaving"
        :save-error-message="saveErrorMessage"
        :save-success-message="saveSuccessMessage"
        @save-assignment="saveAssignment"
        @save-basic-info="saveBasicInfo"
        @save-status="saveStatus"
      />
    </article>
  </section>
</template>
