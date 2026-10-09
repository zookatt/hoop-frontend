<script setup>
import BaseModal from "../ui/BaseModal.vue";
import {
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

const emit = defineEmits(["close"]);
</script>

<template>
  <BaseModal title="Detalle de incidencia" @close="emit('close')">
    <article class="grid gap-4">
      <header class="grid gap-2">
        <div class="flex items-start justify-between gap-3">
          <div>
            <h2 class="text-lg font-bold text-(--color-text)">
              {{ incident.title }}
            </h2>
            <p class="text-sm text-(--color-text-secondary)">
              Incidencia #{{ incident.id }}
            </p>
          </div>

          <span
            class="rounded-full border px-3 py-1 text-sm font-bold"
            :style="getIncidentStatusStyle(incident.status)"
          >
            {{ getIncidentStatusLabel(incident.status) }}
          </span>
        </div>

        <p class="text-sm text-(--color-text-secondary)">
          Habitación {{ incident.roomNumber }}
        </p>
      </header>

      <section class="grid gap-2">
        <h3 class="text-xs font-bold uppercase text-(--color-text-secondary)">
          Descripción
        </h3>
        <p
          class="rounded border border-(--color-border) bg-(--color-surface) p-3 text-sm text-(--color-text)"
        >
          {{ incident.description }}
        </p>
      </section>

      <section class="grid grid-cols-2 gap-3">
        <div class="rounded border border-(--color-border) p-3">
          <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
            Departamento
          </p>
          <p class="mt-1 text-sm font-bold text-(--color-text)">
            {{ getIncidentDepartmentLabel(incident.department) }}
          </p>
        </div>

        <div class="rounded border border-(--color-border) p-3">
          <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
            Prioridad
          </p>
          <p class="mt-1 text-sm font-bold text-(--color-text)">
            {{ incident.priority ?? "Sin prioridad" }}
          </p>
        </div>
      </section>

      <section class="grid grid-cols-2 gap-3">
        <div class="rounded border border-(--color-border) p-3">
          <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
            Creada por
          </p>
          <p class="mt-1 text-sm font-bold text-(--color-text)">
            Usuario #{{ incident.createdByUserId }}
          </p>
        </div>

        <div class="rounded border border-(--color-border) p-3">
          <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
            Asignada a
          </p>
          <p class="mt-1 text-sm font-bold text-(--color-text)">
            {{
              incident.assignedToUserId
                ? `Usuario #${incident.assignedToUserId}`
                : "Sin asignar"
            }}
          </p>
        </div>
      </section>
    </article>
  </BaseModal>
</template>
