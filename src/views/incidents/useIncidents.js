import { computed, onMounted, ref } from "vue";
import { getIncidents } from "../../core/api/incidentService";
import { INCIDENT_STATUS_OPTIONS } from "../../shared/constants/incidentOptions";

export function useIncidents() {
  const incidents = ref([]);
  const selectedStatus = ref("ALL");
  const isLoading = ref(false);
  const errorMessage = ref("");

  const filteredIncidents = computed(() => {
    if (selectedStatus.value === "ALL") {
      return incidents.value;
    }

    return incidents.value.filter(
      (incident) => incident.status === selectedStatus.value,
    );
  });

  const fetchIncidents = async () => {
    isLoading.value = true;
    errorMessage.value = "";

    try {
      incidents.value = await getIncidents();
    } catch {
      errorMessage.value = "No se han podido cargar las incidencias.";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchIncidents);

  return {
    errorMessage,
    filteredIncidents,
    isLoading,
    selectedStatus,
    statusOptions: INCIDENT_STATUS_OPTIONS,
  };
}
