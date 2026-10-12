<script setup>
import { computed, ref } from "vue";
import logoHoop from "../../assets/images/logo-hoop.png";
import BaseButton from "../ui/BaseButton.vue";

const props = defineProps({
  title: {
    type: String,
    default: "Incidencias",
  },
  subtitle: {
    type: String,
    default: "Usuario",
  },
  showLogout: {
    type: Boolean,
    default: false,
  },
  showUsersLink: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["home", "incidents", "logout", "profile", "users"]);

const isMenuOpen = ref(false);

const userLabel = computed(() => props.user?.email?.split("@")[0] || "Usuario");
const userInitial = computed(() => userLabel.value.charAt(0).toUpperCase());

function closeMenu() {
  isMenuOpen.value = false;
}

function selectMenuItem(eventName) {
  emit(eventName);
  closeMenu();
}
</script>

<template>
  <header
    class="flex items-center justify-between border-b border-(--color-border) bg-(--color-background) px-4 py-3"
  >
    <div class="flex items-center gap-3">
      <button
        type="button"
        aria-label="Abrir menu"
        class="flex h-10 w-10 items-center justify-center rounded-md text-(--color-text) md:hidden"
        @click="isMenuOpen = true"
      >
        <span class="text-2xl">☰</span>
      </button>

      <button
        type="button"
        class="text-left"
        aria-label="Volver al panel"
        @click="emit('home')"
      >
        <img :src="logoHoop" alt="HOOP" class="h-5 w-auto" />
        <p class="text-xs font-medium text-(--color-text-secondary)">
          {{ subtitle }}
        </p>
      </button>
    </div>

    <div class="flex items-center gap-3">
      <h1 class="text-lg font-bold text-(--color-primary)">
        {{ title }}
      </h1>

      <BaseButton
        v-if="showLogout"
        size="sm"
        variant="secondary"
        @click="emit('logout')"
      >
        Salir
      </BaseButton>
    </div>
  </header>

  <Teleport to="body">
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 z-50 flex md:hidden"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        class="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
        aria-label="Cerrar menu"
        @click="closeMenu"
      />

      <aside
        class="relative z-10 flex h-full w-[72vw] min-w-232px max-w-280px flex-col bg-(--color-background) shadow-2xl"
      >
        <div class="bg-(--color-primary) px-5 py-7 text-white">
          <div class="mb-5 flex items-center justify-between gap-4">
            <p class="text-lg font-bold">HOOP</p>

            <button
              type="button"
              class="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-lg font-bold"
              aria-label="Cerrar menu"
              @click="closeMenu"
            >
              ×
            </button>
          </div>

          <div class="flex items-center gap-3">
            <span
              class="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-sm font-bold"
            >
              {{ userInitial }}
            </span>

            <span>
              <span class="block text-sm font-bold leading-tight">
                {{ userLabel }}
              </span>
              <span class="block text-xs text-white/80">
                {{ subtitle }}
              </span>
            </span>
          </div>
        </div>

        <nav class="grid gap-2 px-4 py-5 text-sm font-bold">
          <button
            type="button"
            class="flex items-center gap-3 rounded-lg px-3 py-3 text-(--color-text-secondary)"
            @click="selectMenuItem('home')"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
            </svg>
            Inicio
          </button>

          <button
            type="button"
            class="flex items-center gap-3 rounded-lg px-3 py-3 text-(--color-text-secondary)"
            @click="selectMenuItem('incidents')"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 4 3.5 19h17L12 4Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round"
              />
              <path
                d="M12 9v4m0 3h.01"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Incidencias
          </button>

          <button
            v-if="showUsersLink"
            type="button"
            class="flex items-center gap-3 rounded-lg px-3 py-3 text-(--color-text-secondary)"
            @click="selectMenuItem('users')"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <path
                d="M5 21a7 7 0 0 1 14 0"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
            Usuarios
          </button>

          <button
            type="button"
            class="hidden items-center justify-between rounded-lg bg-red-50 px-3 py-3 text-(--color-primary)"
            @click="selectMenuItem('profile')"
          >
            <span class="flex items-center gap-3">
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                />
                <path
                  d="M5 21a7 7 0 0 1 14 0"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
              Perfil
            </span>

            <span class="h-1.5 w-1.5 rounded-full bg-(--color-primary)" />
          </button>
        </nav>

        <div class="mt-auto border-t border-(--color-border) p-4">
          <button
            type="button"
            class="flex items-center gap-3 px-3 py-3 text-sm font-bold text-(--color-primary)"
            @click="selectMenuItem('logout')"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 6H6v12h4"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 8l4 4-4 4m4-4H9"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Cerrar sesion
          </button>
        </div>
      </aside>
    </div>
  </Teleport>
</template>
