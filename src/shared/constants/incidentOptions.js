export const INCIDENT_STATUS_OPTIONS = [
  { value: "ALL", label: "Todas" },
  { value: "OPEN", label: "Creada" },
  { value: "IN_PROGRESS", label: "En curso" },
  { value: "RESOLVED", label: "Resuelta" },
  { value: "CLOSED", label: "Cerrada" },
];

export const INCIDENT_STATUS_META = {
  OPEN: {
    label: "Creada",
    color: "--color-status-open",
  },
  IN_PROGRESS: {
    label: "En curso",
    color: "--color-status-progress",
  },
  RESOLVED: {
    label: "Resuelta",
    color: "--color-status-resolved",
  },
  CLOSED: {
    label: "Cerrada",
    color: "--color-status-closed",
  },
};

export const INCIDENT_DEPARTMENT_LABELS = {
  MAINTENANCE: "Mantenimiento",
  CLEANING: "Limpieza",
};
