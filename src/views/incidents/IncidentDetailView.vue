<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseButton from "../../components/ui/BaseButton.vue";
import StatusMessage from "../../components/ui/StatusMessage.vue";
import { getIncidentById } from "../../core/api/incidentService";
import {
  getIncidentDepartmentLabel,
  getIncidentStatusLabel,
  getIncidentStatusStyle,
} from "../../shared/utils/incidentFormatters";

const route = useRoute();
const router = useRouter();

const incident = ref(null);
const isLoading = ref(false);
const errorMessage = ref("");

const incidentId = computed(() => route.params.id);

async function fetchIncident() {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    incident.value = await getIncidentById(incidentId.value);
  } catch {
    errorMessage.value = "No se ha podido cargar la incidencia.";
  } finally {
    isLoading.value = false;
  }
}

function goBack() {
  router.push({ name: "incidents" });
}

onMounted(fetchIncident);
</script>

<template>
  <section class="mx-auto grid max-w-md gap-4 pb-6">
    <BaseButton variant="secondary" size="sm" @click="goBack">
      Volver
    </BaseButton>

    <StatusMessage v-if="isLoading">
      Cargando incidencia...
    </StatusMessage>

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
          <p class="mt-1 text-sm font-bold text-(--color-text)">
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
    </article>
  </section>
</template>