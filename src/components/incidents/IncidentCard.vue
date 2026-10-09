<script setup>
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

const emit = defineEmits(["select"]);
</script>

<template>
  <li
    class="rounded-lg border border-(--color-border) bg-(--color-background) p-4 shadow-sm"
  >
    <button
      type="button"
      class="w-full rounded-lg border border-(--color-border) bg-(--color-background) p-4 text-left shadow-sm"
      @click="emit('select', incident)"
    >
      <article class="flex flex-col gap-3">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-base font-bold text-(--color-text)">
                {{ incident.title }}
              </h2>

              <span class="text-sm text-(--color-text-secondary)">
                #{{ incident.id }}
              </span>
            </div>

            <p class="mt-2 text-sm text-(--color-text-secondary)">
              Habitacion {{ incident.roomNumber }} - {{ incident.description }}
            </p>
          </div>

          <span
            class="mt-1 text-xl text-(--color-text-secondary)"
            aria-hidden="true"
          >
            &gt;
          </span>
        </div>

        <div class="flex items-center justify-between gap-3">
          <span
            class="rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-1 text-sm font-medium text-(--color-text-secondary)"
          >
            {{ getIncidentDepartmentLabel(incident.department) }}
          </span>

          <span
            class="rounded-full border px-3 py-1 text-sm font-bold"
            :style="getIncidentStatusStyle(incident.status)"
          >
            {{ getIncidentStatusLabel(incident.status) }}
          </span>
        </div>
      </article>
    </button>
  </li>
</template>
