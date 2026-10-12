import { computed, onMounted, ref } from "vue";
import { getIncidents } from "../core/api/incidentService";
import {
  INCIDENT_PRIORITY_FILTER_OPTIONS,
  INCIDENT_STATUS_OPTIONS,
  INCIDENT_SUMMARY_OPTIONS,
} from "../shared/constants/incidentOptions";

const PRIORITY_ORDER = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};

export function useIncidents({ fetchOnMounted = true } = {}) {
  const incidents = ref([]);
  const selectedPriority = ref("ALL");
  const selectedStatus = ref("ALL");
  const isLoading = ref(false);
  const errorMessage = ref("");

  const filteredIncidents = computed(() => {
    return [...incidents.value]
      .filter((incident) => {
        if (selectedStatus.value === "ALL") {
          return true;
        }

        return incident.status === selectedStatus.value;
      })
      .filter((incident) => {
        if (selectedPriority.value === "ALL") {
          return true;
        }

        return incident.priority === selectedPriority.value;
      })
      .sort(
        (firstIncident, secondIncident) =>
          getPriorityOrder(firstIncident.priority) -
          getPriorityOrder(secondIncident.priority),
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

  function getPriorityOrder(priority) {
    return PRIORITY_ORDER[priority] ?? 99;
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
    priorityOptions: INCIDENT_PRIORITY_FILTER_OPTIONS,
    selectedPriority,
    selectedStatus,
    statusOptions: INCIDENT_STATUS_OPTIONS,
  };
}
