<script setup>
import { ref } from "vue";
import closeIcon from "../../assets/images/cerrar.png";
import logoHoop from "../../assets/images/logo-hoop.png";
import menuIcon from "../../assets/images/menu.png";
import BaseButton from "../ui/BaseButton.vue";
import AppSidebar from "./AppSidebar.vue";

defineProps({
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
  isSidebarOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "home",
  "incidents",
  "logout",
  "profile",
  "toggle-sidebar",
  "users",
]);

const isMenuOpen = ref(false);

function closeMenu() {
  isMenuOpen.value = false;
}

function openMobileMenu() {
  isMenuOpen.value = true;
}

function selectMenuItem(eventName) {
  emit(eventName);
  closeMenu();
}
</script>

<template>
  <header
    class="fixed left-0 top-0 z-50 flex h-65px w-full items-center justify-between border-b border-(--color-border) bg-(--color-background) px-4 py-3"
  >
    <div class="flex items-center gap-3">
      <button
        type="button"
        aria-label="Abrir menu"
        class="flex h-10 w-10 items-center justify-center rounded-md text-(--color-text) md:hidden"
        @click="openMobileMenu"
      >
        <img :src="menuIcon" alt="" class="h-6 w-6 object-contain" />
      </button>

      <button
        type="button"
        aria-label="Abrir o cerrar menu lateral"
        class="hidden h-10 w-10 items-center justify-center rounded-md text-(--color-text) md:flex"
        @click="emit('toggle-sidebar')"
      >
        <img
          v-if="isSidebarOpen"
          :src="closeIcon"
          alt=""
          class="h-5 w-5 object-contain"
        />
        <img v-else :src="menuIcon" alt="" class="h-7 w-7 object-contain" />
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
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <button
        v-if="isMenuOpen"
        type="button"
        class="fixed inset-0 z-60 bg-black/45 backdrop-blur-sm md:hidden"
        aria-label="Cerrar menu"
        @click="closeMenu"
      />
    </Transition>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <AppSidebar
        v-if="isMenuOpen"
        class="fixed inset-y-0 left-0 z-70 w-[72vw] min-w-232px max-w-280px md:hidden"
        role="dialog"
        aria-modal="true"
        :subtitle="subtitle"
        :user="user"
        show-close
        :show-logout="showLogout"
        :show-users-link="showUsersLink"
        @close="closeMenu"
        @home="selectMenuItem('home')"
        @incidents="selectMenuItem('incidents')"
        @logout="selectMenuItem('logout')"
        @profile="selectMenuItem('profile')"
        @users="selectMenuItem('users')"
      />
    </Transition>
  </Teleport>
</template>
