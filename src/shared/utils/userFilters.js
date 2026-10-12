const ROLE_BY_DEPARTMENT = {
  MAINTENANCE: "MAINTENANCE",
  CLEANING: "CLEANING",
};

export function getAssignableRoleForDepartment(department) {
  return ROLE_BY_DEPARTMENT[department] ?? "";
}

export function filterAssignableUsersByDepartment(users, department) {
  const roleName = getAssignableRoleForDepartment(department);

  if (!roleName) {
    return [];
  }

  return users.filter((user) => user.active && user.roleName === roleName);
}
