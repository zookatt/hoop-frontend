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

const {
  errorMessage,
  fetchIncidents,
  filteredIncidents,
  isLoading,
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

function openIncidentDetail(incident) {
  router.push({
    name: "incident-detail",
    params: { id: incident.id },
  });
}
</script>

<template>
  <section class="mx-auto flex max-w-md flex-col gap-4 pb-6">
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

    <StatusMessage v-if="isLoading"> Cargando incidencias... </StatusMessage>

    <StatusMessage v-else-if="errorMessage" variant="error">
      {{ errorMessage }}
    </StatusMessage>

    <StatusMessage v-else-if="filteredIncidents.length === 0">
      No hay incidencias para este filtro.
    </StatusMessage>

    <ul v-else class="grid gap-3">
      <IncidentCard
        v-for="incident in filteredIncidents"
        :key="incident.id"
        :incident="incident"
        @select="openIncidentDetail"
      />
    </ul>

    <BaseButton class="mt-1" @click="openCreateModal">
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
