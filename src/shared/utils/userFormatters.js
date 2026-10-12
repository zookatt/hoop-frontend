const USER_ROLE_LABELS = {
  ADMIN: "Administrador",
  RECEPTION: "Recepcion",
  MAINTENANCE: "Mantenimiento",
  CLEANING: "Limpieza",
};

export function getUserRoleLabel(roleName) {
  if (!roleName) {
    return "Sin rol";
  }

  return USER_ROLE_LABELS[roleName] ?? roleName;
}
