<script setup>
import { useInitialPasswordChangeForm } from "../../composables/useInitialPasswordChangeForm";
import BaseButton from "../ui/BaseButton.vue";
import StatusMessage from "../ui/StatusMessage.vue";

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["cancel", "submit"]);

const {
  canSubmit,
  confirmPassword,
  newPassword,
  showConfirmPassword,
  showNewPassword,
  submitForm,
  validationMessage,
} = useInitialPasswordChangeForm(props, emit);
</script>

<template>
  <form
    class="grid gap-5 rounded-lg border border-(--color-border) bg-(--color-background) p-5 shadow-md"
    @submit.prevent="submitForm"
  >
    <header class="grid gap-1">
      <h2 class="text-lg font-bold text-(--color-primary)">
        Cambiar contraseña
      </h2>
      <p class="text-sm text-(--color-text-secondary)">
        Tu cuenta usa una contraseña temporal.
      </p>
      <p class="text-xs font-bold text-(--color-text)">
        {{ email }}
      </p>
    </header>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Nueva contraseña
      <span class="relative">
        <input
          v-model="newPassword"
          :type="showNewPassword ? 'text' : 'password'"
          autocomplete="new-password"
          required
          class="h-11 w-full rounded border border-(--color-border) px-3 pr-11 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
        />

        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)"
          :aria-label="
            showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
          "
          @click="showNewPassword = !showNewPassword"
        >
          <span class="text-sm font-bold">
            {{ showNewPassword ? "Ocultar" : "Ver" }}
          </span>
        </button>
      </span>
    </label>

    <label class="grid gap-2 text-xs font-bold uppercase text-(--color-text)">
      Repetir contraseña
      <span class="relative">
        <input
          v-model="confirmPassword"
          :type="showConfirmPassword ? 'text' : 'password'"
          autocomplete="new-password"
          required
          class="h-11 w-full rounded border border-(--color-border) px-3 pr-11 text-sm text-(--color-text) outline-none focus:border-(--color-primary)"
        />

        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)"
          :aria-label="
            showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
          "
          @click="showConfirmPassword = !showConfirmPassword"
        >
          <span class="text-sm font-bold">
            {{ showConfirmPassword ? "Ocultar" : "Ver" }}
          </span>
        </button>
      </span>
    </label>

    <StatusMessage v-if="validationMessage" variant="error">
      {{ validationMessage }}
    </StatusMessage>

    <StatusMessage v-if="errorMessage" variant="error">
      {{ errorMessage }}
    </StatusMessage>

    <div class="grid gap-3">
      <BaseButton type="submit" :disabled="!canSubmit">
        {{ isLoading ? "Guardando..." : "Guardar contraseña" }}
      </BaseButton>

      <BaseButton
        type="button"
        variant="secondary"
        :disabled="isLoading"
        @click="$emit('cancel')"
      >
        Volver al login
      </BaseButton>
    </div>
  </form>
</template>
