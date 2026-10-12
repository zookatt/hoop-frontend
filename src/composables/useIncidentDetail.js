import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  assignIncident,
  getIncidentById,
  updateIncident,
  updateIncidentStatus,
} from "../core/api/incidentService";

export function useIncidentDetail() {
  const route = useRoute();
  const router = useRouter();

  const incident = ref(null);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const isSaving = ref(false);
  const saveErrorMessage = ref("");
  const saveSuccessMessage = ref("");

  const incidentId = computed(() => route.params.id);

  async function fetchIncident() {
    isLoading.value = true;
    errorMessage.value = "";
    saveErrorMessage.value = "";
    saveSuccessMessage.value = "";

    try {
      incident.value = await getIncidentById(incidentId.value);
    } catch {
      errorMessage.value = "No se ha podido cargar la incidencia.";
    } finally {
      isLoading.value = false;
    }
  }

  async function saveBasicInfo(payload) {
    isSaving.value = true;
    saveErrorMessage.value = "";
    saveSuccessMessage.value = "";

    try {
      incident.value = await updateIncident(incidentId.value, payload);
      saveSuccessMessage.value = "Cambios guardados correctamente.";
    } catch {
      saveErrorMessage.value = "No se han podido guardar los cambios.";
    } finally {
      isSaving.value = false;
    }
  }

  async function saveAssignment(payload) {
    isSaving.value = true;
    saveErrorMessage.value = "";
    saveSuccessMessage.value = "";

    try {
      incident.value = await assignIncident(incidentId.value, payload);
      saveSuccessMessage.value = "Asignacion guardada correctamente.";
    } catch {
      saveErrorMessage.value = "No se ha podido guardar la asignación.";
    } finally {
      isSaving.value = false;
    }
  }

  async function saveStatus(status) {
    isSaving.value = true;
    saveErrorMessage.value = "";
    saveSuccessMessage.value = "";

    try {
      incident.value = await updateIncidentStatus(incidentId.value, status);
      saveSuccessMessage.value = "Estado actualizado correctamente.";
      return true;
    } catch {
      saveErrorMessage.value = "No se ha podido cambiar el estado.";
      return false;
    } finally {
      isSaving.value = false;
    }
  }

  function goBack() {
    router.push({ name: "incidents" });
  }

  onMounted(fetchIncident);

  return {
    errorMessage,
    fetchIncident,
    goBack,
    incident,
    incidentId,
    isLoading,
    isSaving,
    saveAssignment,
    saveBasicInfo,
    saveErrorMessage,
    saveSuccessMessage,
    saveStatus,
  };
}
