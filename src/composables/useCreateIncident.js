import { ref } from "vue";
import { createIncident } from "../core/api/incidentService";

export function useCreateIncident({ onCreated } = {}) {
  const isCreateModalOpen = ref(false);
  const isCreatingIncident = ref(false);
  const createIncidentError = ref("");

  function openCreateModal() {
    createIncidentError.value = "";
    isCreateModalOpen.value = true;
  }

  function closeCreateModal() {
    isCreateModalOpen.value = false;
  }

  async function submitCreateIncident(payload) {
    isCreatingIncident.value = true;
    createIncidentError.value = "";

    try {
      await createIncident(payload);
      closeCreateModal();
      await onCreated?.();
    } catch {
      createIncidentError.value = "No se ha podido crear la incidencia.";
    } finally {
      isCreatingIncident.value = false;
    }
  }

  return {
    closeCreateModal,
    createIncidentError,
    isCreateModalOpen,
    isCreatingIncident,
    openCreateModal,
    submitCreateIncident,
  };
}
