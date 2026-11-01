import { computed } from 'vue'
import type { Session } from '../types/Conference'
import { useLocalStorage } from './useLocalStorage'
import { useConferenceData } from './useConferenceData'

const savedIds = useLocalStorage<string[]>('myProgram', [])

export function useMyProgram() {
  const { getSession } = useConferenceData()

  function add(id: string) {
    if (!savedIds.value.includes(id)) {
      savedIds.value = [...savedIds.value, id]
    }
  }

  function remove(id: string) {
    savedIds.value = savedIds.value.filter((savedId) => savedId !== id)
  }

  function isSaved(id: string) {
    return savedIds.value.includes(id)
  }


  const savedSessions = computed(() => {
    const result: Session[] = []
    for (const id of savedIds.value) {
      const session = getSession(id)
      if (session) {
        result.push(session)
      }
    }
    return result
  })

  return { savedIds, savedSessions, add, remove, isSaved }
}