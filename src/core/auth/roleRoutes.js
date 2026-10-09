const dashboardRouteByRole = {
  ADMIN: "admin-dashboard",
  RECEPTION: "reception-dashboard",
  MAINTENANCE: "maintenance-dashboard",
  CLEANING: "cleaning-dashboard",
};

export function getDashboardRouteForRole(role) {
  return {
    name: dashboardRouteByRole[role] ?? "incidents",
  };
}

export function getDashboardRouteForUser(user) {
  if (!user) {
    return { name: "login" };
  }

  return getDashboardRouteForRole(user.role);
}
