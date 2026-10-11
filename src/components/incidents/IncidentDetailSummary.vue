<script setup>
import {
  getIncidentDepartmentIcon,
  getIncidentDepartmentLabel,
  getIncidentStatusLabel,
  getIncidentStatusStyle,
} from "../../shared/utils/incidentFormatters";

defineProps({
  incident: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="grid gap-4">
    <header class="grid gap-2">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h1 class="text-xl font-bold text-(--color-text)">
            {{ incident.title }}
          </h1>
          <p class="text-sm text-(--color-text-secondary)">
            Habitación {{ incident.roomNumber }}
          </p>
        </div>

        <span
          class="rounded-full border px-3 py-1 text-xs font-bold"
          :class="getIncidentStatusStyle(incident.status)"
        >
          {{ getIncidentStatusLabel(incident.status) }}
        </span>
      </div>
    </header>

    <section class="grid gap-2">
      <h2 class="text-sm font-bold text-(--color-text)">Descripción</h2>
      <p class="text-sm leading-6 text-(--color-text-secondary)">
        {{ incident.description }}
      </p>
    </section>

    <section class="grid grid-cols-2 gap-3">
      <div class="rounded-lg border border-(--color-border) p-3">
        <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
          Departamento
        </p>
        <div class="mt-2 flex items-center gap-2">
          <img
            :src="getIncidentDepartmentIcon(incident.department)"
            alt=""
            class="size-7 object-contain"
          />
          <p class="text-sm font-bold text-(--color-text)">
            {{ getIncidentDepartmentLabel(incident.department) }}
          </p>
        </div>
      </div>

      <div class="rounded-lg border border-(--color-border) p-3">
        <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
          Prioridad
        </p>
        <p class="mt-2 text-sm font-bold text-(--color-text)">
          {{ incident.priority ?? "Sin prioridad" }}
        </p>
      </div>
    </section>

    <section class="grid grid-cols-2 gap-3">
      <div class="rounded-lg border border-(--color-border) p-3">
        <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
          Creada por
        </p>
        <p class="mt-2 text-sm font-bold text-(--color-text)">
          Usuario {{ incident.createdByUserId }}
        </p>
      </div>

      <div class="rounded-lg border border-(--color-border) p-3">
        <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
          Asignada a
        </p>
        <p class="mt-2 text-sm font-bold text-(--color-text)">
          <template v-if="incident.assignedToUserId">
            Usuario {{ incident.assignedToUserId }}
          </template>
          <template v-else>Sin asignar</template>
        </p>
      </div>
    </section>
  </article>
</template>
