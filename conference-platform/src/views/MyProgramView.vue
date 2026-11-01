<script setup lang="ts">
import { useMyProgram } from '../composables/useMyProgram'
import { computed } from 'vue'
import SaveSessionButton from '../components/features/SaveSessionButton.vue'
import { useConferenceData } from '../composables/useConferenceData'


const {savedSessions} = useMyProgram()



const sortedSessions = computed(() => {
    const list =  [...savedSessions.value]

    list.sort((a, b) => {
        const zeitA = a.day + a.startTime
        const zeitB = b.day + b.startTime   
        return zeitA.localeCompare(zeitB)
    })
    return list
})

</script> 

<template>
    <h1>Mein Programm</h1>
    <p v-if="sortedSessions.length === 0">
        Du hast noch keine Sessions gespeichert.
        <RouterLink :to="{ name: 'program' }">Zum Programm</RouterLink>
        </p>

   <ul v-else class="list">
    <li v-for="session in sortedSessions" :key="session.id">
      <RouterLink :to="{ name: 'session', params: { id: session.id } }">{{ session.title }}</RouterLink>
      <SaveSessionButton :session-id="session.id" />
    </li>
  </ul>


</template>