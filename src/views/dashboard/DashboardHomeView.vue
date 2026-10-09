<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "../../components/ui/BaseButton.vue";
import DashboardSection from "../../components/dashboard/DashboardSection.vue";
import ShortcutCard from "../../components/dashboard/ShortcutCard.vue";
import StatCard from "../../components/dashboard/StatCard.vue";
import BaseModal from "../../components/ui/BaseModal.vue";
import IncidentForm from "../../components/incidents/IncidentForm.vue";
import { getIncidents, createIncident } from "../../core/api/incidentService";
import { getAuthUser } from "../../core/auth/authStorage";

const incidents = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");
const authUser = computed(() => getAuthUser());

const role = computed(() => authUser.value?.role ?? "");
const isAdmin = computed(() => role.value === "ADMIN");

const isCreateModalOpen = ref(false);
const isCreatingIncident = ref(false);
const createIncidentError = ref("");

const dashboardTitle = computed(() => {
  const titles = {
    ADMIN: "Panel de administración",
    RECEPTION: "Panel de recepción",
    MAINTENANCE: "Panel de mantenimiento",
    CLEANING: "Panel de limpieza",
  };

  return titles[role.value] ?? "Panel de trabajo";
});

const dashboardSubtitle = computed(() => {
  const subtitles = {
    ADMIN: "Gestión interna del hotel",
    RECEPTION: "Coordinación de incidencias",
    MAINTENANCE: "Incidencias asignadas a mantenimiento",
    CLEANING: "Incidencias asignadas a limpieza",
  };

  return subtitles[role.value] ?? "Gestión de incidencias";
});

const incidentStats = computed(() => [
  {
    value: countByStatus("OPEN"),
    label: "Creadas",
    variant: "open",
  },
  {
    value: countByStatus("IN_PROGRESS"),
    label: "En curso",
    variant: "progress",
  },
  {
    value: countByStatus("RESOLVED"),
    label: "Resueltas",
    variant: "resolved",
  },
  {
    value: countByStatus("CLOSED"),
    label: "Cerradas",
    variant: "closed",
  },
]);

const router = useRouter();
function goToIncidents() {
  router.push({ name: "incidents" });
}
function countByStatus(status) {
  return incidents.value.filter((incident) => incident.status === status)
    .length;
}

async function fetchDashboardIncidents() {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    incidents.value = await getIncidents();
  } catch {
    errorMessage.value = "No se ha podido cargar el resumen de incidencias.";
  } finally {
    isLoading.value = false;
  }
}
async function submitCreateIncident(payload) {
  isCreatingIncident.value = true;
  createIncidentError.value = "";

  try {
    await createIncident(payload);
    isCreateModalOpen.value = false;
    await fetchDashboardIncidents();
  } catch {
    createIncidentError.value = "No se ha podido crear la incidencia.";
  } finally {
    isCreatingIncident.value = false;
  }
}
onMounted(fetchDashboardIncidents);
</script>

<template>
  <section class="mx-auto grid max-w-md gap-6 pb-6">
    <div>
      <h1 class="text-xl font-bold text-(--color-text)">
        {{ dashboardTitle }}
      </h1>
      <p class="mt-2 text-sm text-(--color-text-secondary)">
        {{ dashboardSubtitle }}
      </p>
    </div>

    <DashboardSection
      title="Incidencias"
      action-label="Ver todas"
      @action="goToIncidents"
    >
      <p
        v-if="isLoading"
        class="rounded-lg border border-(--color-border) bg-(--color-background) p-4 text-sm font-medium text-(--color-text-secondary)"
      >
        Cargando resumen...
      </p>

      <p
        v-else-if="errorMessage"
        class="rounded-lg border border-(--color-status-open) bg-(--color-background) p-4 text-sm font-medium text-(--color-status-open)"
      >
        {{ errorMessage }}
      </p>

      <div v-else class="grid grid-cols-2 gap-3">
        <StatCard
          v-for="stat in incidentStats"
          :key="stat.label"
          :value="stat.value"
          :label="stat.label"
          :variant="stat.variant"
        />
      </div>
    </DashboardSection>

    <DashboardSection v-if="isAdmin" title="Usuarios" action-label="Ver todos">
      <ShortcutCard
        title="Gestión de usuarios"
        description="Crear, ver y bloquear usuarios"
      />
    </DashboardSection>

    <BaseButton @click="isCreateModalOpen = true">
      <span class="text-xl font-bold">+</span>
      <span>Crear incidencia</span>
    </BaseButton>

    <BaseModal
      v-if="isCreateModalOpen"
      title="Crear incidencia"
      @close="isCreateModalOpen = false"
    >
      <p
        v-if="createIncidentError"
        class="mb-4 rounded border border-(--color-status-open) p-3 text-sm font-medium text-(--color-status-open)"
      >
        {{ createIncidentError }}
      </p>

      <IncidentForm @submit="submitCreateIncident" />

      <p
        v-if="isCreatingIncident"
        class="mt-3 text-sm font-medium text-(--color-text-secondary)"
      >
        Creando incidencia...
      </p>
    </BaseModal>
  </section>
</template>
