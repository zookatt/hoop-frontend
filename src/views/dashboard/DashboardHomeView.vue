<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "../../components/ui/BaseButton.vue";
import DashboardSection from "../../components/dashboard/DashboardSection.vue";
import ShortcutCard from "../../components/dashboard/ShortcutCard.vue";
import StatCard from "../../components/dashboard/StatCard.vue";
import BaseModal from "../../components/ui/BaseModal.vue";
import IncidentForm from "../../components/incidents/IncidentForm.vue";
import { useCreateIncident } from "../../composables/useCreateIncident";
import { useIncidents } from "../../composables/useIncidents";
import { getAuthUser } from "../../core/auth/authStorage";

const { errorMessage, fetchIncidents, incidentStats, isLoading } =
  useIncidents();

const {
  closeCreateModal,
  createIncidentError,
  isCreateModalOpen,
  isCreatingIncident,
  openCreateModal,
  submitCreateIncident,
} = useCreateIncident({ onCreated: fetchIncidents });

const authUser = computed(() => getAuthUser());

const role = computed(() => authUser.value?.role ?? "");
const isAdmin = computed(() => role.value === "ADMIN");

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

const router = useRouter();

function goToIncidents() {
  router.push({ name: "incidents" });
}
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

    <BaseButton @click="openCreateModal">
      <span class="text-xl font-bold">+</span>
      <span>Crear incidencia</span>
    </BaseButton>

    <BaseModal
      v-if="isCreateModalOpen"
      title="Crear incidencia"
      @close="closeCreateModal"
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
