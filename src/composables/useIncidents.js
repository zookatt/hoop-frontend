import { computed, onMounted, ref } from "vue";
import { getIncidents } from "../core/api/incidentService";
import {
  INCIDENT_STATUS_OPTIONS,
  INCIDENT_SUMMARY_OPTIONS,
} from "../shared/constants/incidentOptions";

export function useIncidents({ fetchOnMounted = true } = {}) {
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

  const incidentStats = computed(() =>
    INCIDENT_SUMMARY_OPTIONS.map((option) => ({
      value: countByStatus(option.status),
      label: option.label,
      variant: option.variant,
    })),
  );

  function countByStatus(status) {
    return incidents.value.filter((incident) => incident.status === status)
      .length;
  }

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

  if (fetchOnMounted) {
    onMounted(fetchIncidents);
  }

  return {
    errorMessage,
    filteredIncidents,
    fetchIncidents,
    incidentStats,
    incidents,
    isLoading,
    selectedStatus,
    statusOptions: INCIDENT_STATUS_OPTIONS,
  };
}
