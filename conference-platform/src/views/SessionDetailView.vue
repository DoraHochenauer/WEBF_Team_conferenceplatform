<script setup lang="ts">
import { computed } from 'vue'
import { useConferenceData } from '../composables/useConferenceData'
import NotFoundView from './NotFoundView.vue'
import { formatDay } from '../utils/formatDay'
import BaseBadge from '../components/base/BaseBadge.vue'
import SaveSessionButton from '../components/features/SaveSessionButton.vue'

const props = defineProps<{
  id: string
}>()

const { getSession, getRoomName, getTrackName, getSpeakersOfSession } = useConferenceData()


const session = computed(() => getSession(props.id))

const sessions = computed(() => {
   if (!session.value) return [] // das ! sagt, wenn es keine Sesson gibt dann gib eine leere Liste zurück 
  return getSpeakersOfSession(session.value) 
})


</script>


<template>
    <template v-if="session">
     <RouterLink :to="{ name: 'program' }" class="back"> zurück zum Programm</RouterLink>
    


     <h1>{{ session.title }}</h1>

     <p class="time">{{ session.day }} - {{ session.startTime }} - {{ session.endTime }} - {{ getRoomName(session.roomId) }}</p>

     <div class="badges">
      <BaseBadge>{{ getTrackName(session.trackId) }}</BaseBadge>
      <BaseBadge>{{ session.level }}</BaseBadge>
      <BaseBadge>{{ session.format }}</BaseBadge>
    </div>



    
    <div class="save">
  <SaveSessionButton :session-id="session.id" />
</div>



    <p class="abstract">{{ session.abstract }} </p>

    <h2>Speakers</h2>
    <ul class="speakers">
      <li v-for="speaker in speakers" :key="speaker.id">
        
      <RouterLink :to="'/speakers/' + speaker.id">{{ speaker.name }}</RouterLink>
– {{ speaker.title }}, {{ speaker.company }}

</li>
</ul>
</template>
<NotFoundView v-else /> 

</template>




<style scoped>
.back {
  display: inline-block;
  margin-bottom: var(--space-medium);
  font-size: var(--font-size-small);
}

h1 {
  margin-bottom: var(--space-xsmall);
}

.time {
  margin: 0;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
}
 
.badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xsmall);
  margin-top: var(--space-small);
}
 
.abstract {
  max-width: 65ch;
  margin: var(--space-medium) 0 0;
}
 
h2 {
  margin: var(--space-large) 0 0;
  font-size: var(--font-size-heading-2);
  color: var(--color-brand-primary);
}
 
.speakers {
  margin: var(--space-small) 0 0;
  padding-left: var(--space-medium);
}
</style>