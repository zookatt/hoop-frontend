<script setup>
import { computed, onMounted, ref } from "vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import DashboardSection from "../../components/dashboard/DashboardSection.vue";
import ShortcutCard from "../../components/dashboard/ShortcutCard.vue";
import StatCard from "../../components/dashboard/StatCard.vue";
import { getIncidents } from "../../core/api/incidentService";

const incidents = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");

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

function countByStatus(status) {
  return incidents.value.filter((incident) => incident.status === status).length;
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

onMounted(fetchDashboardIncidents);
</script>

<template>
  <section class="mx-auto grid max-w-md gap-6 pb-6">
    <div>
      <h1 class="text-xl font-bold text-(--color-text)">
        Panel de administración
      </h1>
      <p class="mt-2 text-sm text-(--color-text-secondary)">
        Gestión interna del hotel
      </p>
    </div>

    <DashboardSection title="Incidencias" action-label="Ver todas">
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

    <DashboardSection title="Usuarios" action-label="Ver todos">
      <ShortcutCard
        title="Gestión de usuarios"
        description="Crear, ver y bloquear usuarios"
      />
    </DashboardSection>

    <BaseButton>
      <span class="text-xl font-bold">+</span>
      <span>Crear incidencia</span>
    </BaseButton>
  </section>
</template>
