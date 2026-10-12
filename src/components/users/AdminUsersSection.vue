<script setup>
import { useAdminUsers } from "../../composables/useAdminUsers";
import StatusMessage from "../ui/StatusMessage.vue";
import UserCreateForm from "./UserCreateForm.vue";

const {
  createAdminUser,
  createErrorMessage,
  errorMessage,
  isCreating,
  isLoading,
  roles,
  users,
} = useAdminUsers();
</script>

<template>
  <section class="grid gap-4">
    <header class="grid gap-1">
      <h2
        class="text-base font-bold uppercase tracking-wide text-(--color-text)"
      >
        Usuarios
      </h2>
      <p class="text-sm text-(--color-text-secondary)">
        Crea cuentas internas para trabajadores del hotel.
      </p>
    </header>

    <UserCreateForm
      :error-message="createErrorMessage"
      :is-loading="isCreating"
      :roles="roles"
      @submit="createAdminUser"
    />

    <StatusMessage v-if="isLoading"> Cargando usuarios... </StatusMessage>

    <StatusMessage v-if="errorMessage" variant="error">
      {{ errorMessage }}
    </StatusMessage>

    <ul class="grid gap-3">
      <li
        v-for="user in users"
        :key="user.id"
        class="grid gap-2 rounded-lg border border-(--color-border) bg-(--color-background) p-4 shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="font-bold text-(--color-text)">
              {{ user.name }}
            </p>
            <p class="text-sm text-(--color-text-secondary)">
              {{ user.email }}
            </p>
          </div>

          <span
            class="rounded-full border border-(--color-border) px-2 py-1 text-xs font-bold text-(--color-text-secondary)"
          >
            {{ user.roleName }}
          </span>
        </div>

        <div class="flex flex-wrap gap-2 text-xs font-bold">
          <span
            class="rounded-full px-2 py-1"
            :class="
              user.active
                ? 'bg-(--color-status-resolved-bg) text-(--color-status-resolved)'
                : 'bg-(--color-status-open-bg) text-(--color-status-open)'
            "
          >
            {{ user.active ? "Activo" : "Inactivo" }}
          </span>

          <span
            v-if="user.mustChangePassword"
            class="rounded-full bg-(--color-status-progress-bg) px-2 py-1 text-(--color-status-progress)"
          >
            Contraseña temporal
          </span>
        </div>
      </li>
    </ul>
  </section>
</template>
