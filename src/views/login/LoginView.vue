<script setup>
import InitialPasswordChangeForm from "../../components/auth/InitialPasswordChangeForm.vue";
import LoginForm from "../../components/auth/LoginForm.vue";
import { useLoginFlow } from "../../composables/useLoginFlow";
import logoHoop from "../../assets/images/logo-hoop.png";

const {
  cancelInitialPasswordChange,
  currentEmail,
  errorMessage,
  isChangingPassword,
  isLoading,
  passwordChangeErrorMessage,
  requiresPasswordChange,
  submitInitialPasswordChange,
  submitLogin,
} = useLoginFlow();
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-(--color-surface) p-4">
    <section
      class="grid w-full max-w-sm gap-8 md:max-w-3xl md:grid-cols-2 md:items-center"
    >
      <header class="grid justify-items-center gap-2 text-center">
        <div
          class="grid h-24 w-24 place-items-center rounded-full border border-(--color-border) bg-(--color-background) p-3 shadow-sm"
        >
          <img
            :src="logoHoop"
            alt="HOOP"
            class="h-full w-full object-contain"
          />
        </div>

        <h1 class="text-lg font-bold text-(--color-primary)">
          HOOP - Operaciones Hoteleras
        </h1>
        <p class="text-sm font-medium text-(--color-text-secondary)">
          La App para la gestion de incidencias en alojamientos turisticos
        </p>
      </header>

      <InitialPasswordChangeForm
        v-if="requiresPasswordChange"
        :email="currentEmail"
        :error-message="passwordChangeErrorMessage"
        :is-loading="isChangingPassword"
        @cancel="cancelInitialPasswordChange"
        @submit="submitInitialPasswordChange"
      />

      <LoginForm
        v-else
        :error-message="errorMessage"
        :is-loading="isLoading"
        @submit="submitLogin"
      />
    </section>

    <footer
      class="self-end text-center text-xs font-bold text-(--color-text-secondary)"
    >
      <p>Acceso seguro solo para personal autorizado</p>
      <p>2026 @ HOOP</p>
    </footer>
  </main>
</template>
