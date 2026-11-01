import { createRouter, createWebHistory } from 'vue-router'
import ProgramView from '../views/ProgramView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'program', component: ProgramView },
    // unbekannten URLs (ADR-0004)
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
