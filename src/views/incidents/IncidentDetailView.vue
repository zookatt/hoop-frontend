<script setup>
import IncidentAssignmentForm from "../../components/incidents/IncidentAssignmentForm.vue";
import IncidentBasicEditForm from "../../components/incidents/IncidentBasicEditForm.vue";
import IncidentStatusForm from "../../components/incidents/IncidentStatusForm.vue";
import BaseButton from "../../components/ui/BaseButton.vue";
import StatusMessage from "../../components/ui/StatusMessage.vue";
import { useIncidentDetail } from "../../composables/useIncidentDetail";
import {
  getIncidentDepartmentIcon,
  getIncidentDepartmentLabel,
  getIncidentStatusLabel,
  getIncidentStatusStyle,
} from "../../shared/utils/incidentFormatters";

const {
  errorMessage,
  goBack,
  incident,
  isLoading,
  isSaving,
  saveAssignment,
  saveBasicInfo,
  saveErrorMessage,
  saveStatus,
} = useIncidentDetail();
</script>

<template>
  <section class="mx-auto grid max-w-md gap-4 pb-6">
    <BaseButton variant="secondary" size="sm" @click="goBack">
      Volver
    </BaseButton>

    <StatusMessage v-if="isLoading"> Cargando incidencia... </StatusMessage>

    <StatusMessage v-else-if="errorMessage" variant="error">
      {{ errorMessage }}
    </StatusMessage>

    <article v-else-if="incident" class="grid gap-4">
      <header class="grid gap-2">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-sm text-(--color-text-secondary)">
              Incidencia #{{ incident.id }}
            </p>

            <h1 class="text-xl font-bold text-(--color-text)">
              {{ incident.title }}
            </h1>
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
        <h2 class="text-xs font-bold uppercase text-(--color-text-secondary)">
          Descripción
        </h2>

        <p
          class="rounded-lg border border-(--color-border) bg-(--color-surface) p-4 text-sm text-(--color-text)"
        >
          {{ incident.description }}
        </p>
      </section>

      <section class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border border-(--color-border) p-3">
          <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
            Departamento
          </p>
          <p class="mt-1 inline-flex items-center gap-2 text-sm font-bold text-(--color-text)">
            <img
              v-if="getIncidentDepartmentIcon(incident.department).src"
              :src="getIncidentDepartmentIcon(incident.department).src"
              :alt="getIncidentDepartmentIcon(incident.department).label"
              class="size-9 shrink-0 object-contain"
            />
            {{ getIncidentDepartmentLabel(incident.department) }}
          </p>
        </div>

        <div class="rounded-lg border border-(--color-border) p-3">
          <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
            Prioridad
          </p>
          <p class="mt-1 text-sm font-bold text-(--color-text)">
            {{ incident.priority ?? "Sin prioridad" }}
          </p>
        </div>
      </section>

      <section class="grid grid-cols-2 gap-3">
        <div class="rounded-lg border border-(--color-border) p-3">
          <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
            Creada por
          </p>
          <p class="mt-1 text-sm font-bold text-(--color-text)">
            Usuario #{{ incident.createdByUserId }}
          </p>
        </div>

        <div class="rounded-lg border border-(--color-border) p-3">
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

      <section class="grid gap-4 border-t border-(--color-border) pt-4">
        <StatusMessage v-if="saveErrorMessage" variant="error">
          {{ saveErrorMessage }}
        </StatusMessage>

        <IncidentBasicEditForm
          :disabled="isSaving"
          :incident="incident"
          @submit="saveBasicInfo"
        />

        <IncidentAssignmentForm
          :disabled="isSaving"
          :incident="incident"
          @submit="saveAssignment"
        />

        <IncidentStatusForm
          :disabled="isSaving"
          :incident="incident"
          @submit="saveStatus"
        />

        <p
          v-if="isSaving"
          class="text-sm font-medium text-(--color-text-secondary)"
        >
          Guardando cambios...
        </p>
      </section>
    </article>
  </section>
</template>
