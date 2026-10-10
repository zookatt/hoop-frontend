import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getIncidentById } from "../core/api/incidentService";

export function useIncidentDetail() {
  const route = useRoute();
  const router = useRouter();

  const incident = ref(null);
  const isLoading = ref(false);
  const errorMessage = ref("");

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
  };
}
