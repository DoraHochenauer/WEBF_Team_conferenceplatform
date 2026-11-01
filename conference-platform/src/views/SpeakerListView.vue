<script setup lang="ts">
import { useConferenceData } from '../composables/useConferenceData'
import SpeakerCard from '../components/features/SpeakerCard.vue'

// CSR (ADR-0005, Abschnitt 1)
const { speakers } = useConferenceData()
</script>

<template>
  <h1>Speaker</h1>
  <p class="count">{{ speakers.length }} Speaker</p>

  <div class="grid">
    <SpeakerCard v-for="speaker in speakers" :key="speaker.id" :speaker="speaker" />
  </div>
</template>

<style scoped>
.count {
  font-size: var(--font-size-small);
  color: var(--color-text-muted);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-medium);
  margin-top: var(--space-medium);
}
</style>
