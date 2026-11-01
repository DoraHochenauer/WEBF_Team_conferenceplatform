import { createRouter, createWebHistory } from 'vue-router'
import ProgramView from '../views/ProgramView.vue'
import SpeakerListView from '../views/SpeakerListView.vue'
import SpeakerDetailView from '../views/SpeakerDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'program', component: ProgramView },
    { path: '/speakers', name: 'speakers', component: SpeakerListView },
    //id aus der URL kommt als Prop in die View
    { path: '/speakers/:id', name: 'speaker', component: SpeakerDetailView, props: true },
   
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
})

export default router
