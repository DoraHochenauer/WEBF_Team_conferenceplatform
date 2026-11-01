<script setup lang="ts">
import type { Session } from '../../types/Conference'
import SessionCard from './SessionCard.vue'

defineProps<{
  sessions: Session[]
}>()
</script>

<template>
  <div v-if="sessions.length > 0" class="grid">
    <SessionCard v-for="session in sessions" :key="session.id" :session="session" />
  </div>
  <p v-else class="empty">
    <slot name="empty">Keine Sessions gefunden.</slot>
  </p>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-medium);
  margin-top: var(--space-medium);
}

.empty {
  margin-top: var(--space-medium);
  color: var(--color-text-muted);
}
</style>
