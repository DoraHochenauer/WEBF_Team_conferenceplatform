<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConferenceData } from '../composables/useConferenceData'
import BaseSelect, { type SelectOption } from '../components/base/BaseSelect.vue'
import BaseButton from '../components/base/BaseButton.vue'
import SessionList from '../components/features/SessionList.vue'

// CSR (ADR-0005)
//Die Daten sind beim Build fix, gefiltert wird im Browser ohne Server-Anfrage.
const { sessions, tracks } = useConferenceData()
const route = useRoute()
const router = useRouter()

function formatDay(day: string) {
  return new Date(`${day}T00:00:00`).toLocaleDateString('de-AT', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  })
}

//holen der Optionen für Dropdown
const trackOptions: SelectOption[] = tracks.map((track) => ({ value: track.id, label: track.name }))
const days = [...new Set(sessions.map((session) => session.day))].sort()
const dayOptions: SelectOption[] = days.map((day) => ({ value: day, label: formatDay(day) }))
const levelOptions: SelectOption[] = [...new Set(sessions.map((session) => session.level))].map(
  (level) => ({ value: level, label: level })
)

// Filterzustand liegt in der URL 
function useQueryFilter(key: string, options: SelectOption[]) {
  return computed({
    get() {
      const value = route.query[key]
      return typeof value === 'string' && options.some((option) => option.value === value)
        ? value
        : ''
    },
    set(value: string) {
      router.replace({ query: { ...route.query, [key]: value || undefined } })
    },
  })
}

const selectedTrack = useQueryFilter('track', trackOptions)
const selectedDay = useQueryFilter('day', dayOptions)
const selectedLevel = useQueryFilter('level', levelOptions)

const isFiltered = computed(
  () => selectedTrack.value !== '' || selectedDay.value !== '' || selectedLevel.value !== ''
)

const filteredSessions = computed(() =>
  sessions
    .filter(
      (session) =>
        (selectedTrack.value === '' || session.trackId === selectedTrack.value) &&
        (selectedDay.value === '' || session.day === selectedDay.value) &&
        (selectedLevel.value === '' || session.level === selectedLevel.value)
    )
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
)

// nach Tag gruppiert, Tage ohne Treffer fallen weg
const sessionsByDay = computed(() =>
  days
    .map((day) => ({
      day,
      sessions: filteredSessions.value.filter((session) => session.day === day),
    }))
    .filter((group) => group.sessions.length > 0)
)

function resetFilters() {
  router.replace({ query: {} })
}
</script>

<template>
  <h1>Programm</h1>

  <form class="filter" @submit.prevent>
    <BaseSelect v-model="selectedTrack" label="Track" placeholder="Alle Tracks" :options="trackOptions" />
    <BaseSelect v-model="selectedDay" label="Tag" placeholder="Alle Tage" :options="dayOptions" />
    <BaseSelect v-model="selectedLevel" label="Level" placeholder="Alle Level" :options="levelOptions" />
    <BaseButton :disabled="!isFiltered" @click="resetFilters">Zurücksetzen</BaseButton>
  </form>

  <p class="count" aria-live="polite">
    {{ filteredSessions.length }} von {{ sessions.length }} Sessions
  </p>

  <section v-for="group in sessionsByDay" :key="group.day" class="day">
    <h2 class="day-heading">{{ formatDay(group.day) }}</h2>
    <SessionList :sessions="group.sessions" />
  </section>

  <div v-if="filteredSessions.length === 0" class="empty">
    <p>Keine Sessions für diese Filter.</p>
    <BaseButton @click="resetFilters">Filter zurücksetzen</BaseButton>
  </div>
</template>

<style scoped>
.filter {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: var(--space-small) var(--space-medium);
  align-items: end;
  margin-top: var(--space-medium);
  padding: var(--space-medium);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.count {
  margin-top: var(--space-medium);
  font-size: var(--font-size-small);
  color: var(--color-text-muted);
}

.day {
  margin-top: var(--space-large);
}

.day-heading {
  margin: 0;
  font-size: var(--font-size-heading-2);
  color: var(--color-brand-primary);
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-small);
  margin-top: var(--space-large);
}
</style>
