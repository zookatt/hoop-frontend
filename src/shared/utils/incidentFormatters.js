import {
  INCIDENT_DEPARTMENT_LABELS,
  INCIDENT_STATUS_META,
} from "../constants/incidentOptions";

export function getIncidentStatusLabel(status) {
  return INCIDENT_STATUS_META[status]?.label ?? status;
}

export function getIncidentDepartmentLabel(department) {
  return INCIDENT_DEPARTMENT_LABELS[department] ?? department;
}

export function getIncidentStatusStyle(status) {
  const statusColor = INCIDENT_STATUS_META[status]?.color ?? "--color-text-secondary";

  return {
    color: `var(${statusColor})`,
    borderColor: `color-mix(in srgb, var(${statusColor}) 35%, white)`,
    backgroundColor: `color-mix(in srgb, var(${statusColor}) 10%, white)`,
  };
}
