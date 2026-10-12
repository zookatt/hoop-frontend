import { computed } from "vue";
import { getAuthUser } from "../core/auth/authStorage";
import {
  canAssignIncident,
  canChangeIncidentStatus,
  canEditIncident,
  getAllowedStatusValues,
} from "../shared/utils/incidentPermissions";

export function useIncidentPermissions() {
  const authUser = computed(() => getAuthUser());
  const role = computed(() => authUser.value?.role ?? "");

  const canEdit = computed(() => canEditIncident(role.value));
  const canAssign = computed(() => canAssignIncident(role.value));
  const canChangeStatus = computed(() => canChangeIncidentStatus(role.value));
  const allowedStatusValues = computed(() => getAllowedStatusValues(role.value));

  const hasActions = computed(
    () => canEdit.value || canAssign.value || canChangeStatus.value,
  );

  return {
    allowedStatusValues,
    canAssign,
    canChangeStatus,
    canEdit,
    hasActions,
    role,
  };
}