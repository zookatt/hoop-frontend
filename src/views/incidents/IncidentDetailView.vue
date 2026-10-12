<script setup>
import { ref } from "vue";
import IncidentActionsSection from "../../components/incidents/IncidentActionsSection.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseModal from "../../components/ui/BaseModal.vue";
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

const isCloseConfirmOpen = ref(false);
const pendingStatus = ref(null);

function requestStatusSave(status) {
  if (status === "CLOSED") {
    pendingStatus.value = status;
    isCloseConfirmOpen.value = true;
    return;
  }

  saveStatus(status);
}

function cancelCloseConfirm() {
  pendingStatus.value = null;
  isCloseConfirmOpen.value = false;
}

async function confirmCloseIncident() {
  if (!pendingStatus.value) {
    return;
  }

  const wasSaved = await saveStatus(pendingStatus.value);

  if (wasSaved) {
    cancelCloseConfirm();
  }
}
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
        @save-status="requestStatusSave"
      />
    </article>
  </section>

  <BaseModal
    v-if="isCloseConfirmOpen"
    title="Cerrar incidencia"
    @close="cancelCloseConfirm"
  >
    <div class="grid gap-4">
      <p class="text-sm leading-6 text-(--color-text-secondary)">
        Estas seguro de que quieres cerrar esta incidencia?
      </p>

      <p
        class="rounded-lg border border-(--color-primary) bg-(--color-primary-light) p-3 text-sm font-bold text-(--color-primary)"
      >
        Las incidencias cerradas no se podran volver a abrir ni editar.
      </p>

      <StatusMessage
        v-if="saveErrorMessage"
        variant="error"
      >
        {{ saveErrorMessage }}
      </StatusMessage>

      <div class="grid gap-3 sm:grid-cols-2">
        <BaseButton
          type="button"
          variant="secondary"
          :disabled="isSaving"
          @click="cancelCloseConfirm"
        >
          Cancelar
        </BaseButton>

        <BaseButton
          type="button"
          :disabled="isSaving"
          @click="confirmCloseIncident"
        >
          {{ isSaving ? "Cerrando..." : "Cerrar incidencia" }}
        </BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
