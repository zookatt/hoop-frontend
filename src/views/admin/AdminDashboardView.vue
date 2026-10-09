<script setup>
import BaseButton from "../../components/ui/BaseButton.vue";
import DashboardSection from "../../components/dashboard/DashboardSection.vue";
import ShortcutCard from "../../components/dashboard/ShortcutCard.vue";
import StatCard from "../../components/dashboard/StatCard.vue";

const incidentStats = [
  {
    value: 1,
    label: "Creadas",
    variant: "open",
  },
  {
    value: 2,
    label: "En curso",
    variant: "progress",
  },
  {
    value: 1,
    label: "Resueltas",
    variant: "resolved",
  },
  {
    value: 1,
    label: "Cerradas",
    variant: "closed",
  },
];
</script>

<template>
  <section class="mx-auto grid max-w-md gap-6 pb-6">
    <div>
      <h1 class="text-xl font-bold text-(--color-text)">
        Panel de administración
      </h1>
      <p class="mt-2 text-sm text-(--color-text-secondary)">
        Gestión interna del hotel
      </p>
    </div>

    <DashboardSection title="Incidencias" action-label="Ver todas">
      <div class="grid grid-cols-2 gap-3">
        <StatCard
          v-for="stat in incidentStats"
          :key="stat.label"
          :value="stat.value"
          :label="stat.label"
          :variant="stat.variant"
        />
      </div>
    </DashboardSection>

    <DashboardSection title="Usuarios" action-label="Ver todos">
      <ShortcutCard
        title="Gestión de usuarios"
        description="Crear, ver y bloquear usuarios"
      />
    </DashboardSection>

    <BaseButton>
      <span class="text-xl font-bold">+</span>
      <span>Crear incidencia</span>
    </BaseButton>
  </section>
</template>
