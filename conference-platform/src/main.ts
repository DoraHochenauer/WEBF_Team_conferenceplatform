import '../tokens/tokens.css'
import './style/layouPrototype.css'
import './assets/main.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadConferenceData } from './composables/useConferenceData.ts'


loadConferenceData()
  .then(() => createApp(App).use(router).mount('#app'))
  .catch(() => {
    // Offline = Hinweis
    document.querySelector('#app')!.innerHTML =
      '<p>Das Programm konnte nicht geladen werden. Bitte einmal mit Internetverbindung öffnen.</p>'
  })

//createApp(App).use(router).mount('#app')
