<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../../core/api/authService";
import logoHoop from "../../assets/images/logo-hoop.png";

const router = useRouter();

const email = ref("");
const password = ref("");
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
  <main
    class="flex min-h-screen justify-center bg-(--color-surface) px-4 pb-8 pt-28 sm:items-center sm:py-10"
  >
    <section class="flex w-full max-w-360px flex-col md:flex-row items-center">
      <header
        class="md:mb-0 md:w-1/2 mb-7 flex flex-col items-center text-center"
      >
        <div
          class="mb-4 flex h-25 w-25 items-center border border-(--color-border) justify-center rounded-full bg-(--color-background) text-(--color-background)"
          aria-hidden="true"
        >
          <img :src="logoHoop" alt="HOOP" />
        </div>
        <h1 class="mt-2 text-sm font-medium text-(--color-text-secondary)">
          Operaciones Hoteleras
        </h1>
        <p class="mt-1 text-xs font-bold text-(--color-text-secondary)">
          Portal de administración
        </p>
      </header>
      <div class="w-full md:w-1/2">
        <form
          class="grid w-full gap-5 rounded-lg border border-(--color-border) bg-(--color-background) px-5 py-6 shadow-md"
          @submit.prevent="submitLogin"
        >
          <label
            class="grid gap-2 text-xs font-bold uppercase text-(--color-text)"
          >
            Correo electrónico
            <span class="relative block">
              <svg
                class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--color-text-secondary)"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                class="h-10 w-full rounded border border-(--color-border) pl-10 pr-3 text-sm font-medium text-(--color-text) outline-none transition placeholder:text-(--color-text-secondary) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)"
              />
            </span>
          </label>

          <label
            class="grid gap-2 text-xs font-bold uppercase text-(--color-text)"
          >
            Contraseña
            <span class="relative block">
              <svg
                class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-(--color-text-secondary)"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                type="password"
                autocomplete="current-password"
                placeholder="••••••••"
                required
                class="h-10 w-full rounded border border-(--color-border) pl-10 pr-3 text-sm font-medium text-(--color-text) outline-none transition placeholder:text-(--color-text-secondary) focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)"
              />
            </span>
          </label>

          <button
            type="button"
            class="justify-self-end text-sm font-bold text-(--color-secondary) transition hover:text-(--color-primary)"
          >
            ¿Olvidaste tu contraseña?
          </button>

          <p
            v-if="errorMessage"
            class="rounded border border-(--color-status-open) bg-(--color-background) px-3 py-2 text-sm font-medium text-(--color-status-open)"
          >
            {{ errorMessage }}
          </p>

          <button
            type="submit"
            :disabled="!canSubmit"
            class="mt-3 flex h-12 items-center justify-center gap-2 rounded bg-(--color-primary) px-4 text-sm font-bold text-(--color-background) shadow-sm transition hover:bg-(--color-secondary) disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 17l5-5-5-5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 12H3"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M14 4h5v16h-5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {{ isLoading ? "Entrando..." : "Iniciar sesión" }}
          </button>
        </form>

        <p class="mt-8 px-6 text-center text-sm text-(--color-text-secondary)">
          Acceso seguro solo para personal autorizado.
        </p>
      </div>
    </section>
  </main>
</template>
