<script setup lang="ts">
import { computed } from 'vue'
import type { Session } from '../../types/Conference'
import { useConferenceData } from '../../composables/useConferenceData'
import { formatDay } from '../../utils/formatDay'
import BaseCard from '../base/BaseCard.vue'
import BaseBadge from '../base/BaseBadge.vue'

const props = defineProps<{
  session: Session
  showDay?: boolean
}>()

const { getTrackName, getRoomName, getSpeakersOfSession } = useConferenceData()

const speakers = computed(() => getSpeakersOfSession(props.session))
</script>

<template>
  <BaseCard :highlight="session.trackId === 'keynote'">
    <span class="time">
      <template v-if="showDay">{{ formatDay(session.day) }}, </template>
      {{ session.startTime }}–{{ session.endTime }}
    </span>
    <h2><RouterLink :to="{ name: 'session', params: { id: session.id } }">{{ session.title }}</RouterLink></h2>
    <p>
      {{ getRoomName(session.roomId) }} ·
      <!-- jeder Speaker-Name verlinkt auf sein Profil -->
      <template v-for="(speaker, index) in speakers" :key="speaker.id">
        <RouterLink :to="{ name: 'speaker', params: { id: speaker.id } }">{{ speaker.name }}</RouterLink>
        <template v-if="index < speakers.length - 1">, </template>
      </template>
    </p>
    <div class="badges">
      <BaseBadge>{{ getTrackName(session.trackId) }}</BaseBadge>
      <BaseBadge>{{ session.level }}</BaseBadge>
      <BaseBadge>{{ session.format }}</BaseBadge>
    </div>
  </BaseCard>
</template>

<style scoped>
.time {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
  color: var(--color-brand-primary);
}

h2 {
  margin: var(--space-xsmall) 0;
  font-size: var(--font-size-body);
  line-height: var(--line-height-tight);
}

p {
  margin: 0;
  font-size: var(--font-size-small);
  color: var(--color-text-muted);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xsmall);
  margin-top: var(--space-small);
}
</style>
