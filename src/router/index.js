import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../components/layout/DashboardLayout.vue'
import IncidentsView from '../views/incidents/IncidentsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/incidents',
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'incidents',
        name: 'incidents',
        component: IncidentsView,
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})