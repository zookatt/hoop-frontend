import {
  INCIDENT_DEPARTMENT_LABELS,
  INCIDENT_STATUS_META,
} from "../constants/incidentOptions";
import cleaningIcon from "../../assets/images/limpieza.png";
import maintenanceIcon from "../../assets/images/mantenimiento.png";
import newIncidentIcon from "../../assets/images/nuevo.png";

export function getIncidentStatusLabel(status) {
  return INCIDENT_STATUS_META[status]?.label ?? status;
}

export function getIncidentDepartmentLabel(department) {
  if (!department || department === "null") {
    return "Sin asignar";
  }

  return INCIDENT_DEPARTMENT_LABELS[department] ?? department;
}

export function getIncidentDepartmentIcon(department) {
  const icons = {
    MAINTENANCE: {
      label: "Mantenimiento",
      src: maintenanceIcon,
    },
    CLEANING: {
      label: "Limpieza",
      src: cleaningIcon,
    },
  };

  return icons[department] ?? {
    label: "Sin asignar",
    src: newIncidentIcon,
  };
}

export function getIncidentStatusStyle(status) {
  const statusColor = INCIDENT_STATUS_META[status]?.color ?? "--color-text-secondary";

  return {
    color: `var(${statusColor})`,
    borderColor: `color-mix(in srgb, var(${statusColor}) 35%, white)`,
    backgroundColor: `color-mix(in srgb, var(${statusColor}) 10%, white)`,
  };
}
