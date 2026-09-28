<script setup>
import IncidentCard from "../../components/incidents/IncidentCard.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import FilterButton from "../../components/ui/FilterButton.vue";
import StatusMessage from "../../components/ui/StatusMessage.vue";
import { useIncidents } from "./useIncidents";

const { errorMessage, filteredIncidents, isLoading, selectedStatus, statusOptions } =
  useIncidents();
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

    <StatusMessage v-if="isLoading">
      Cargando incidencias...
    </StatusMessage>

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
      />
    </ul>

    <BaseButton class="mt-1">
      <span class="text-xl font-bold">+</span>
      <span>Añadir incidencia</span>
    </BaseButton>
  </section>
</template>
