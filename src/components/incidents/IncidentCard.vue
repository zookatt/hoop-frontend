<script setup>
import {
  getIncidentDepartmentIcon,
  getIncidentDepartmentLabel,
  getIncidentPriorityLabel,
  getIncidentPriorityStyle,
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
  <li class="h-55">
    <button
      type="button"
      class="grid h-full w-full grid-rows-[auto_minmax(0,1fr)_auto] gap-2 overflow-hidden rounded-lg border border-(--color-border) bg-(--color-background) p-4 text-left shadow-sm transition hover:border-(--color-primary)"
      @click="emit('select', incident)"
    >
      <header class="flex min-w-0 items-start justify-between gap-3">
        <div class="flex min-w-0 items-start gap-3">
          <img
            v-if="getIncidentDepartmentIcon(incident.department).src"
            :src="getIncidentDepartmentIcon(incident.department).src"
            :alt="getIncidentDepartmentIcon(incident.department).label"
            class="size-10 shrink-0 object-contain"
          />

          <span class="min-w-0">
            <span
              class="block truncate text-base font-bold text-(--color-text)"
            >
              {{ incident.title }}
            </span>
            <span class="block truncate text-sm text-(--color-text-secondary)">
              #{{ incident.id }}
            </span>
          </span>
        </div>

        <span
          class="shrink-0 text-xl leading-none text-(--color-text-secondary)"
          aria-hidden="true"
        >
          &gt;
        </span>
      </header>

      <p
        class="line-clamp-3 overflow-hidden text-sm leading-6 text-(--color-text-secondary)"
      >
        Habitación {{ incident.roomNumber }}
      </p>

      <footer class="grid min-w-0 gap-2">
        <span
          class="inline-flex max-w-[50%] justify-self-start truncate rounded-md border border-(--color-border) bg-(--color-surface) px-3 py-1 text-sm font-medium text-(--color-text-secondary)"
        >
          {{ getIncidentDepartmentLabel(incident.department) }}
        </span>

        <div class="flex min-w-0 items-center gap-2 overflow-hidden">
          <span
            class="shrink-0 rounded-full border px-3 py-1 text-xs font-bold"
            :style="getIncidentPriorityStyle(incident.priority)"
          >
            {{ getIncidentPriorityLabel(incident.priority) }}
          </span>

          <span
            class="min-w-0 truncate rounded-full border px-3 py-1 text-sm font-bold"
            :style="getIncidentStatusStyle(incident.status)"
          >
            {{ getIncidentStatusLabel(incident.status) }}
          </span>
        </div>
      </footer>
    </button>
  </li>
</template>
