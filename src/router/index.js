import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../components/layout/DashboardLayout.vue";
import { isAuthenticated } from "../core/auth/authStorage";
import IncidentsView from "../views/incidents/IncidentsView.vue";
import LoginView from "../views/login/LoginView.vue";
import AdminDashboardView from "../views/admin/AdminDashboardView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      guestOnly: true,
    },
  },
  {
    path: "/",
    redirect: "/admin",
  },
  {
    path: "/",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "admin",
        name: "admin-dashboard",
        component: AdminDashboardView,
      },
      {
        path: "incidents",
        name: "incidents",
        component: IncidentsView,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const loggedIn = isAuthenticated();

  if (to.meta.requiresAuth && !loggedIn) {
    return { name: "login" };
  }

  if (to.meta.guestOnly && loggedIn) {
    return { name: "admin-dashboard" };
  }

  return true;
});
