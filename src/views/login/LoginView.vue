<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import logoHoop from "../../assets/images/logo-hoop.png";
import { loginUser } from "../../core/api/authService";
import BaseButton from "../../components/ui/BaseButton.vue";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const canSubmit = computed(
  () =>
    email.value.trim() !== "" &&
    password.value.trim() !== "" &&
    !isLoading.value,
);

async function submitLogin() {
  if (!canSubmit.value) {
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    await loginUser({
      email: email.value.trim(),
      password: password.value,
    });

    await router.push({ name: "incidents" });
  } catch {
    errorMessage.value =
      "No se ha podido iniciar sesión. Revisa email y contraseña.";
  } finally {
    isLoading.value = false;
  }
}
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
          La App para la gestión de incidencias en alojamientos turísticos
        </p>
      </header>

      <form
        class="grid gap-5 rounded-lg border border-(--color-border) bg-(--color-background) p-5 shadow-md"
        @submit.prevent="submitLogin"
      >
        <label
          class="grid gap-2 text-xs font-bold uppercase text-(--color-text)"
        >
          Correo electrónico
          <span class="relative">
            <svg
              class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--color-text-secondary)"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 6h16v12H4V6Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <path
                d="m4 7 8 6 8-6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <input
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="admin@hoop.test"
              required
              class="h-11 w-full rounded border border-(--color-border) px-3 pl-10 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-secondary) focus:border-(--color-primary)"
            />
          </span>
        </label>

        <label
          class="grid gap-2 text-xs font-bold uppercase text-(--color-text)"
        >
          Contraseña
          <span class="relative">
            <svg
              class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--color-text-secondary)"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 10V8a5 5 0 0 1 10 0v2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M6 10h12v10H6V10Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linejoin="round"
              />
              <path
                d="M12 14v2"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>

            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="••••••••"
              required
              class="h-11 w-full rounded border border-(--color-border) px-3 pl-10 pr-11 text-sm text-(--color-text) outline-none placeholder:text-(--color-text-secondary) focus:border-(--color-primary)"
            />

            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-(--color-text-secondary)"
              :aria-label="
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              "
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="showPassword"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 3l18 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M8.4 5.4A10.6 10.6 0 0 1 12 5c5 0 8.5 4 10 7a16 16 0 0 1-3.1 4.2"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 18.6A10.7 10.7 0 0 1 12 19c-5 0-8.5-4-10-7a16.4 16.4 0 0 1 4.2-5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <svg
                v-else
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </button>
          </span>
        </label>

        <button
          type="button"
          class="justify-self-end text-sm font-bold text-(--color-secondary)"
        >
          ¿Olvidaste tu contraseña?
        </button>

        <p
          v-if="errorMessage"
          class="rounded border border-(--color-status-open) p-3 text-sm font-medium text-(--color-status-open)"
        >
          {{ errorMessage }}
        </p>

        <BaseButton type="submit" :disabled="!canSubmit">
          {{ isLoading ? "Entrando..." : "Iniciar sesión" }}
        </BaseButton>
      </form>
    </section>

    <footer
      class="self-end text-center text-xs font-bold text-(--color-text-secondary)"
    >
      <p>Acceso seguro solo para personal autorizado</p>
      <p>2026 @ HOOP</p>
    </footer>
  </main>
</template>
