<script setup>
import { ref } from "vue";
import IncidentCard from "../../components/incidents/IncidentCard.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import FilterButton from "../../components/ui/FilterButton.vue";
import StatusMessage from "../../components/ui/StatusMessage.vue";
import IncidentDetailModal from "../../components/incidents/IncidentDetailModal.vue";

import { useIncidents } from "../../composables/useIncidents";

const {
  errorMessage,
  filteredIncidents,
  isLoading,
  selectedStatus,
  statusOptions,
} = useIncidents();

const selectedIncident = ref(null);

function openIncidentDetail(incident) {
  selectedIncident.value = incident;
}

function closeIncidentDetail() {
  selectedIncident.value = null;
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

    <BaseButton class="mt-1">
      <span class="text-xl font-bold">+</span>
      <span>Añadir incidencia</span>
    </BaseButton>
  </section>

  <IncidentDetailModal
    v-if="selectedIncident"
    :incident="selectedIncident"
    @close="closeIncidentDetail"
  />
</template>
