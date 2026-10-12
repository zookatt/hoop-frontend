<script setup>
import { useRouter } from "vue-router";
import IncidentCard from "../../components/incidents/IncidentCard.vue";
import IncidentForm from "../../components/incidents/IncidentForm.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import BaseModal from "../../components/ui/BaseModal.vue";
import FilterButton from "../../components/ui/FilterButton.vue";
import StatusMessage from "../../components/ui/StatusMessage.vue";
import { useCreateIncident } from "../../composables/useCreateIncident";
import { useIncidents } from "../../composables/useIncidents";
import { getAuthUser } from "../../core/auth/authStorage";
import { getDashboardRouteForUser } from "../../core/auth/roleRoutes";

const {
  errorMessage,
  fetchIncidents,
  filteredIncidents,
  isLoading,
  priorityOptions,
  selectedPriority,
  selectedStatus,
  statusOptions,
} = useIncidents();

const {
  closeCreateModal,
  createIncidentError,
  isCreateModalOpen,
  isCreatingIncident,
  openCreateModal,
  submitCreateIncident,
} = useCreateIncident({ onCreated: fetchIncidents });

const router = useRouter();

function goToDashboard() {
  router.push(getDashboardRouteForUser(getAuthUser()));
}

function openIncidentDetail(incident) {
  router.push({
    name: "incident-detail",
    params: { id: incident.id },
  });
}
</script>

<template>
  <section class="mx-auto flex max-w-md flex-col gap-4 pb-6 md:max-w-3xl lg:max-w-5xl">
    <div class="flex items-center justify-between gap-3">
      <BaseButton variant="secondary" size="sm" @click="goToDashboard">
        Volver al panel
      </BaseButton>

      <BaseButton
        class="hidden md:flex md:w-auto"
        size="sm"
        @click="openCreateModal"
      >
        <span class="text-xl font-bold">+</span>
        <span>Añadir incidencia</span>
      </BaseButton>
    </div>

    <section class="grid gap-3">
      <div class="grid gap-2">
        <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
          Estado
        </p>
        <nav
          class="flex gap-2 overflow-x-auto pb-1"
          aria-label="Filtros por estado"
        >
          <FilterButton
            v-for="option in statusOptions"
            :key="option.value"
            :active="selectedStatus === option.value"
            @click="selectedStatus = option.value"
          >
            {{ option.label }}
          </FilterButton>
        </nav>
      </div>

      <div class="grid gap-2">
        <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
          Prioridad
        </p>
        <nav
          class="flex gap-2 overflow-x-auto pb-1"
          aria-label="Filtros por prioridad"
        >
          <FilterButton
            v-for="option in priorityOptions"
            :key="option.value"
            :active="selectedPriority === option.value"
            @click="selectedPriority = option.value"
          >
            {{ option.label }}
          </FilterButton>
        </nav>
      </div>
    </section>

    <StatusMessage v-if="isLoading"> Cargando incidencias... </StatusMessage>

    <StatusMessage v-else-if="errorMessage" variant="error">
      {{ errorMessage }}
    </StatusMessage>

    <StatusMessage v-else-if="filteredIncidents.length === 0">
      No hay incidencias para este filtro.
    </StatusMessage>

    <ul v-else class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      <IncidentCard
        v-for="incident in filteredIncidents"
        :key="incident.id"
        :incident="incident"
        @select="openIncidentDetail"
      />
    </ul>

    <BaseButton class="mt-1 md:hidden" @click="openCreateModal">
      <span class="text-xl font-bold">+</span>
      <span>Añadir incidencia</span>
    </BaseButton>
  </section>

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
</template>
