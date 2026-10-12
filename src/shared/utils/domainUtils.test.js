import { describe, expect, it } from "vitest";
import {
  getIncidentDepartmentIcon,
  getIncidentDepartmentLabel,
  getIncidentPriorityLabel,
  getIncidentPriorityStyle,
  getIncidentStatusLabel,
  getIncidentStatusStyle,
} from "./incidentFormatters";
import {
  canAssignIncident,
  canChangeIncidentStatus,
  canEditIncident,
  getAllowedStatusValues,
} from "./incidentPermissions";
import {
  filterAssignableUsersByDepartment,
  getAssignableRoleForDepartment,
} from "./userFilters";
import { getUserRoleLabel } from "./userFormatters";
import {
  getDashboardRouteForRole,
  getDashboardRouteForUser,
} from "../../core/auth/roleRoutes";

describe("role-based routes and permissions", () => {
  it.each([
    ["ADMIN", "admin-dashboard"],
    ["RECEPTION", "reception-dashboard"],
    ["MAINTENANCE", "maintenance-dashboard"],
    ["CLEANING", "cleaning-dashboard"],
    ["UNKNOWN", "incidents"],
  ])("routes %s to %s", (role, routeName) => {
    expect(getDashboardRouteForRole(role)).toEqual({ name: routeName });
  });

  it("routes unauthenticated users to login and users by their role", () => {
    expect(getDashboardRouteForUser(null)).toEqual({ name: "login" });
    expect(getDashboardRouteForUser({ role: "ADMIN" })).toEqual({
      name: "admin-dashboard",
    });
  });

  it("limits editing and assignment to management roles", () => {
    for (const role of ["ADMIN", "RECEPTION"]) {
      expect(canEditIncident(role)).toBe(true);
      expect(canAssignIncident(role)).toBe(true);
    }

    expect(canEditIncident("MAINTENANCE")).toBe(false);
    expect(canAssignIncident("CLEANING")).toBe(false);
  });

  it("allows operational roles to progress incidents but not reopen or close them", () => {
    expect(canChangeIncidentStatus("CLEANING")).toBe(true);
    expect(canChangeIncidentStatus("UNKNOWN")).toBe(false);
    expect(getAllowedStatusValues("ADMIN")).toEqual([
      "OPEN",
      "IN_PROGRESS",
      "RESOLVED",
      "CLOSED",
    ]);
    expect(getAllowedStatusValues("MAINTENANCE")).toEqual([
      "IN_PROGRESS",
      "RESOLVED",
    ]);
    expect(getAllowedStatusValues("UNKNOWN")).toEqual([]);
  });
});

describe("incident presentation", () => {
  it("formats known and fallback status, department and priority values", () => {
    expect(getIncidentStatusLabel("OPEN")).toBe("Creada");
    expect(getIncidentStatusLabel("CUSTOM")).toBe("CUSTOM");
    expect(getIncidentDepartmentLabel("MAINTENANCE")).toBe("Mantenimiento");
    expect(getIncidentDepartmentLabel("null")).toBe("Sin asignar");
    expect(getIncidentDepartmentLabel("CUSTOM")).toBe("CUSTOM");
    expect(getIncidentPriorityLabel("HIGH")).toBe("ALTA");
    expect(getIncidentPriorityLabel(null)).toBe("Sin prioridad");
    expect(getIncidentPriorityLabel("CUSTOM")).toBe("CUSTOM");
  });

  it("provides status and priority styles, including unknown-value fallbacks", () => {
    expect(getIncidentPriorityStyle("HIGH").color).toBe(
      "var(--color-status-open)",
    );
    expect(getIncidentPriorityStyle("CUSTOM").color).toBe(
      "var(--color-text-secondary)",
    );
    expect(getIncidentStatusStyle("OPEN").color).toBe(
      "var(--color-status-open)",
    );
    expect(getIncidentStatusStyle("CUSTOM").color).toBe(
      "var(--color-text-secondary)",
    );
  });

  it("uses department icons for assigned incidents and the default icon otherwise", () => {
    expect(getIncidentDepartmentIcon("MAINTENANCE").label).toBe(
      "Mantenimiento",
    );
    expect(getIncidentDepartmentIcon("CLEANING").label).toBe("Limpieza");
    expect(getIncidentDepartmentIcon("UNKNOWN").label).toBe("Sin asignar");
  });
});

describe("user presentation and assignment filters", () => {
  it("formats known, missing and unknown roles", () => {
    expect(getUserRoleLabel("ADMIN")).toBe("Administrador");
    expect(getUserRoleLabel("")).toBe("Sin rol");
    expect(getUserRoleLabel("CUSTOM")).toBe("CUSTOM");
  });

  it("filters active users by department role", () => {
    const users = [
      { id: 1, active: true, roleName: "MAINTENANCE" },
      { id: 2, active: false, roleName: "MAINTENANCE" },
      { id: 3, active: true, roleName: "CLEANING" },
    ];

    expect(getAssignableRoleForDepartment("MAINTENANCE")).toBe("MAINTENANCE");
    expect(filterAssignableUsersByDepartment(users, "MAINTENANCE")).toEqual([
      users[0],
    ]);
    expect(getAssignableRoleForDepartment("UNKNOWN")).toBe("");
    expect(filterAssignableUsersByDepartment(users, "UNKNOWN")).toEqual([]);
  });
});
