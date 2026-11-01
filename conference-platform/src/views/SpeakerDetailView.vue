<script setup lang="ts">
import { computed } from 'vue'
import { useConferenceData } from '../composables/useConferenceData'
import SessionList from '../components/features/SessionList.vue'
import NotFoundView from './NotFoundView.vue'


// id kommt als prop aus der Route = speakers/:id 
const props = defineProps<{
  id: string
}>()

const { getSpeaker, getSessionsOfSpeaker } = useConferenceData()

const speaker = computed(() => getSpeaker(props.id))

const sessions = computed(() =>
  getSessionsOfSpeaker(props.id).sort((a, b) =>
    (a.day + a.startTime).localeCompare(b.day + b.startTime)
  )
)
</script>

<template>
  <template v-if="speaker">
    <RouterLink :to="{ name: 'speakers' }" class="back"> zurück zu "Alle Speaker"</RouterLink>

    <h1>{{ speaker.name }}</h1>
    <p class="role">{{ speaker.title }} - {{ speaker.company }}</p>
    <p class="bio">{{ speaker.bio }}</p>

    <h2>Sessions</h2>
    <SessionList :sessions="sessions" show-day />
  </template>

  <!-- unbekannte Speaker ID-->
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

.role {
  margin: 0;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
}

.bio {
  max-width: 65ch;
  margin: var(--space-medium) 0 0;
}

h2 {
  margin: var(--space-large) 0 0;
  font-size: var(--font-size-heading-2);
  color: var(--color-brand-primary);
}
</style>
