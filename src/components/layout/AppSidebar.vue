<script setup>
import { computed } from "vue";
import closeMobileIcon from "../../assets/images/cerrar-movil.png";

const props = defineProps({
  showClose: {
    type: Boolean,
    default: false,
  },
  showLogout: {
    type: Boolean,
    default: false,
  },
  showUsersLink: {
    type: Boolean,
    default: false,
  },
  subtitle: {
    type: String,
    default: "Usuario",
  },
  user: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits([
  "close",
  "home",
  "incidents",
  "logout",
  "profile",
  "users",
]);

const userEmail = computed(() => props.user?.email || "");
const userName = computed(
  () => props.user?.name || userEmail.value.split("@")[0] || "Usuario",
);
const userInitial = computed(() => userName.value.charAt(0).toUpperCase());

function selectMenuItem(eventName) {
  emit(eventName);

  if (props.showClose) {
    emit("close");
  }
}
</script>

<template>
  <aside class="flex h-full flex-col bg-(--color-background)">
    <div class="bg-(--color-primary) px-5 py-7 text-white">
      <div class="mb-2 flex items-center justify-between gap-4">
        <button
          type="button"
          class="text-left md:hidden"
          aria-label="Volver al panel"
          @click="selectMenuItem('home')"
        >
          <p class="text-lg font-bold">HOOP</p>
          <p class="text-xs text-white/75">
            {{ subtitle }}
          </p>
        </button>

        <button
          v-if="showClose"
          type="button"
          class="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-lg font-bold"
          aria-label="Cerrar menu"
          @click="emit('close')"
        >
          <img :src="closeMobileIcon" alt="" class="h-4 w-4 object-contain" />
        </button>
      </div>

      <div class="flex items-center gap-3">
        <span
          class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/20 text-sm font-bold"
        >
          {{ userInitial }}
        </span>

        <span class="min-w-0">
          <span class="block truncate text-sm font-bold leading-tight">
            {{ userName }}
          </span>
          <span class="block truncate text-xs text-white/80">
            {{ userEmail }}
          </span>
        </span>
      </div>
    </div>

    <nav class="grid gap-2 px-4 py-5 text-sm font-bold">
      <button
        type="button"
        class="flex items-center gap-3 rounded-lg px-3 py-3 text-(--color-text-secondary) transition hover:bg-(--color-surface) hover:text-(--color-primary)"
        @click="selectMenuItem('home')"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        class="flex items-center gap-3 rounded-lg px-3 py-3 text-(--color-text-secondary) transition hover:bg-(--color-surface) hover:text-(--color-primary)"
        @click="selectMenuItem('incidents')"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        class="flex items-center gap-3 rounded-lg px-3 py-3 text-(--color-text-secondary) transition hover:bg-(--color-surface) hover:text-(--color-primary)"
        @click="selectMenuItem('users')"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        <span class="flex items-center gap-3">Perfil</span>
        <span class="h-1.5 w-1.5 rounded-full bg-(--color-primary)" />
      </button>
    </nav>

    <div class="mt-auto border-t border-(--color-border) p-4">
      <button
        v-if="showLogout"
        type="button"
        class="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-(--color-primary) transition hover:bg-(--color-surface)"
        @click="selectMenuItem('logout')"
      >
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
</template>
