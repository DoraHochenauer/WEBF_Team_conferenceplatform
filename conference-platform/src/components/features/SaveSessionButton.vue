<script setup lang="ts">
import { useMyProgram } from '../../composables/useMyProgram'
import BaseButton from '../base/BaseButton.vue' 

const props = defineProps<{
  sessionId: string
}>()

const { add, remove, isSaved } = useMyProgram()

function toggleSaved() {
  if (isSaved(props.sessionId)) {
    remove(props.sessionId)
  } else {
    add(props.sessionId)
  }
}

</script>

<template>
  <BaseButton :aria-pressed="isSaved(props.sessionId)" @click="toggleSaved">
    {{ isSaved(sessionId) ? 'Session entfernen' : 'Session speichern' }}
  </BaseButton>

</template>