<script setup>
import { useRouter } from "vue-router";
import AdminUsersSection from "../../components/users/AdminUsersSection.vue";
import BaseButton from "../../components/ui/BaseButton.vue";

const router = useRouter();

function goBack() {
  router.push({ name: "admin-dashboard" });
}
</script>

<template>
  <section class="mx-auto grid max-w-md gap-5 pb-6 md:max-w-3xl lg:max-w-5xl">
    <BaseButton variant="secondary" size="sm" @click="goBack">
      Volver
    </BaseButton>

    <header class="grid gap-2">
      <h1 class="text-xl font-bold text-(--color-text)">
        Gestion de usuarios para administracion
      </h1>
      <p class="text-sm text-(--color-text-secondary)">
        Crea cuentas internas y revisa el estado de acceso de cada trabajador.
      </p>
    </header>

    <AdminUsersSection />
  </section>
</template>
