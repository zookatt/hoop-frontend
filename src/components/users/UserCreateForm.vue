<script setup>
import { useUserCreateForm } from "../../composables/useUserCreateForm";
import { getUserRoleLabel } from "../../shared/utils/userFormatters";
import BaseButton from "../ui/BaseButton.vue";
import StatusMessage from "../ui/StatusMessage.vue";

const props = defineProps({
  errorMessage: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["submit"]);

const { canSubmit, email, name, password, roleId, showPassword, submitForm } =
  useUserCreateForm(props, emit);
</script>

<template>
  <form
    class="grid gap-4 rounded-lg border border-(--color-border) bg-(--color-background) p-4 shadow-sm"
    @submit.prevent="submitForm"
  >
    <header class="grid gap-1">
      <h2 class="text-base font-bold text-(--color-text)">
        Crear usuario
      </h2>
      <p class="text-sm text-(--color-text-secondary)">
        La contraseña será temporal hasta el primer acceso.
      </p>
    </header>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Nombre
      <input
        v-model="name"
        type="text"
        required
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
      />
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Correo electrónico
      <input
        v-model="email"
        type="email"
        required
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
      />
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Contraseña temporal
      <span class="relative">
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="new-password"
          required
          class="h-11 w-full rounded border border-(--color-border) px-3 pr-16 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
        />

        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-(--color-text-secondary)"
          :aria-label="
            showPassword ? 'Ocultar contraseña temporal' : 'Mostrar contraseña temporal'
          "
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? "Ocultar" : "Ver" }}
        </button>
      </span>
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Rol
      <select
        v-model="roleId"
        required
        class="h-11 rounded border border-(--color-border) px-3 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
      >
        <option value="" disabled>Selecciona un rol</option>
        <option
          v-for="role in roles"
          :key="role.id"
          :value="role.id"
        >
          {{ getUserRoleLabel(role.name) }}
        </option>
      </select>
    </label>

    <StatusMessage v-if="errorMessage" variant="error">
      {{ errorMessage }}
    </StatusMessage>

    <BaseButton type="submit" :disabled="!canSubmit">
      {{ isLoading ? "Creando..." : "Crear usuario" }}
    </BaseButton>
  </form>
</template>
