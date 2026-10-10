import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  assignIncident,
  getIncidentById,
  updateIncident,
} from "../core/api/incidentService";

export function useIncidentDetail() {
  const route = useRoute();
  const router = useRouter();

  const incident = ref(null);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const isSaving = ref(false);
  const saveErrorMessage = ref("");

  const incidentId = computed(() => route.params.id);

  async function fetchIncident() {
    isLoading.value = true;
    errorMessage.value = "";

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

    try {
      incident.value = await updateIncident(incidentId.value, payload);
    } catch {
      saveErrorMessage.value = "No se han podido guardar los cambios.";
    } finally {
      isSaving.value = false;
    }
  }

  async function saveAssignment(payload) {
    isSaving.value = true;
    saveErrorMessage.value = "";

    try {
      incident.value = await assignIncident(incidentId.value, payload);
    } catch {
      saveErrorMessage.value = "No se ha podido guardar la asignación.";
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
  };
}
