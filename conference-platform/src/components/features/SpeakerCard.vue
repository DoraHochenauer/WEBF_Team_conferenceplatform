<script setup lang="ts">
import type { Speaker } from '../../types/Conference'
import BaseCard from '../base/BaseCard.vue'

defineProps<{
  speaker: Speaker
}>()
</script>

<template>
  <BaseCard>
    <h2>
      <RouterLink :to="{ name: 'speaker', params: { id: speaker.id } }">{{ speaker.name }}</RouterLink>
    </h2>
    <p>{{ speaker.title }} · {{ speaker.company }}</p>
    <p>{{ speaker.sessionIds.length }} {{ speaker.sessionIds.length === 1 ? 'Session' : 'Sessions' }}</p>
  </BaseCard>
</template>

<style scoped>
h2 {
  margin: 0 0 var(--space-xsmall);
  font-size: var(--font-size-body);
  line-height: var(--line-height-tight);
}

p {
  margin: 0;
  font-size: var(--font-size-small);
  color: var(--color-text-muted);
}
</style>
