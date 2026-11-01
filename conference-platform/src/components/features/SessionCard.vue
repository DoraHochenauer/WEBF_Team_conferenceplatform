<script setup lang="ts">
import { computed } from 'vue'
import type { Session } from '../../types/Conference'
import { useConferenceData } from '../../composables/useConferenceData'
import BaseCard from '../base/BaseCard.vue'
import BaseBadge from '../base/BaseBadge.vue'

const props = defineProps<{
  session: Session
}>()

const { getTrackName, getRoomName, getSpeakersOfSession } = useConferenceData()

const speakerNames = computed(() =>
  getSpeakersOfSession(props.session).map((speaker) => speaker.name).join(', ')
)
</script>

<template>
  <BaseCard :highlight="session.trackId === 'keynote'">
    <span class="time">{{ session.startTime }}–{{ session.endTime }}</span>
    <h2>{{ session.title }}</h2>
    <p>{{ getRoomName(session.roomId) }} · {{ speakerNames }}</p>
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
