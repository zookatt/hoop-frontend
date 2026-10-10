const MANAGEMENT_ROLES = ["ADMIN", "RECEPTION"];

export function canEditIncident(role) {
  return MANAGEMENT_ROLES.includes(role);
}

export function canAssignIncident(role) {
  return MANAGEMENT_ROLES.includes(role);
}

export function canChangeIncidentStatus(role) {
  return ["ADMIN", "RECEPTION", "MAINTENANCE", "CLEANING"].includes(role);
}

export function getAllowedStatusValues(role) {
  if (MANAGEMENT_ROLES.includes(role)) {
    return ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
  }

  if (role === "MAINTENANCE" || role === "CLEANING") {
    return ["IN_PROGRESS", "RESOLVED"];
  }

  return [];
}
