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

function getUserName(name, id) {
  if (name) {
    return name;
  }

  if (id) {
    return `Usuario ${id}`;
  }

  return "Sin asignar";
}

function getUserMeta(id, roleName) {
  if (!id) {
    return "";
  }

  return `ID ${id} - ${roleName ?? "Sin rol"}`;
}
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
          <p class="text-sm font-bold text-(--color-text)">
            {{
              incident.department
                ? getIncidentDepartmentLabel(incident.department)
                : "Sin asignar"
            }}
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
        <div class="mt-2 grid gap-1">
          <p class="text-sm font-bold text-(--color-text)">
            {{ getUserName(incident.createdByUserName, incident.createdByUserId) }}
          </p>
          <p class="text-xs font-bold text-(--color-text-secondary)">
            {{
              getUserMeta(
                incident.createdByUserId,
                incident.createdByUserRoleName,
              )
            }}
          </p>
        </div>
      </div>

      <div class="rounded-lg border border-(--color-border) p-3">
        <p class="text-xs font-bold uppercase text-(--color-text-secondary)">
          Asignada a
        </p>
        <div
          v-if="incident.assignedToUserId"
          class="mt-2 grid gap-1"
        >
          <p class="text-sm font-bold text-(--color-text)">
            {{
              getUserName(
                incident.assignedToUserName,
                incident.assignedToUserId,
              )
            }}
          </p>
          <p class="text-xs font-bold text-(--color-text-secondary)">
            {{
              getUserMeta(
                incident.assignedToUserId,
                incident.assignedToUserRoleName,
              )
            }}
          </p>
        </div>
        <p
          v-else
          class="mt-2 text-sm font-bold text-(--color-text)"
        >
          Sin asignar
        </p>
      </div>
    </section>
  </article>
</template>
