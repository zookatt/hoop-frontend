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

const emit = defineEmits(["select"]);
</script>

<template>
  <li
    class="rounded-lg border border-(--color-border) bg-(--color-background) p-4 shadow-sm"
  >
    <button
      type="button"
      class="flex min-h-36 w-full items-center gap-3 rounded-lg border border-(--color-border) bg-(--color-background) p-4 text-left shadow-sm"
      @click="emit('select', incident)"
    >
      <img
        v-if="getIncidentDepartmentIcon(incident.department).src"
        :src="getIncidentDepartmentIcon(incident.department).src"
        :alt="getIncidentDepartmentIcon(incident.department).label"
        class="size-10 shrink-0 object-contain"
      />
      <article class="flex min-w-0 flex-1 flex-col gap-3">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="truncate text-base font-bold text-(--color-text)">
                {{ incident.title }}
              </h2>

              <span class="shrink-0 text-sm text-(--color-text-secondary)">
                #{{ incident.id }}
              </span>
            </div>

            <p class="mt-2 line-clamp-2 text-sm text-(--color-text-secondary)">
              Habitación {{ incident.roomNumber }} - {{ incident.description }}
            </p>
          </div>

          <span
            class="mt-1 shrink-0 text-xl text-(--color-text-secondary)"
            aria-hidden="true"
          >
            &gt;
          </span>
        </div>

        <div class="flex items-center justify-between gap-3">
          <span
            class="inline-flex max-w-[55%] items-center gap-2 truncate rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-1 text-sm font-medium text-(--color-text-secondary)"
          >
            {{ getIncidentDepartmentLabel(incident.department) }}
          </span>

          <span
            class="shrink-0 rounded-full border px-3 py-1 text-sm font-bold"
            :style="getIncidentStatusStyle(incident.status)"
          >
            {{ getIncidentStatusLabel(incident.status) }}
          </span>
        </div>
      </article>
    </button>
  </li>
</template>
