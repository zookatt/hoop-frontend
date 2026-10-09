import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../components/layout/DashboardLayout.vue";
import { getAuthUser, isAuthenticated } from "../core/auth/authStorage";
import { getDashboardRouteForUser } from "../core/auth/roleRoutes";
import IncidentsView from "../views/incidents/IncidentsView.vue";
import LoginView from "../views/login/LoginView.vue";
import DashboardHomeView from "../views/dashboard/DashboardHomeView.vue";

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
    redirect: () => getDashboardRouteForUser(getAuthUser()),
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
        component: DashboardHomeView,
      },
      {
        path: "reception",
        name: "reception-dashboard",
        component: DashboardHomeView,
      },
      {
        path: "maintenance",
        name: "maintenance-dashboard",
        component: DashboardHomeView,
      },
      {
        path: "cleaning",
        name: "cleaning-dashboard",
        component: DashboardHomeView,
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
    return getDashboardRouteForUser(getAuthUser());
  }

  return true;
});
