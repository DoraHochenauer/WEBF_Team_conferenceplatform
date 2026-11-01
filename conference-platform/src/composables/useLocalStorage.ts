import { ref, watch, type Ref } from 'vue'
 

export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  let startValue = initialValue
 
  
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      startValue = JSON.parse(stored)
    }
  } catch {
    startValue = initialValue
  }
 
  const value = ref(startValue) as Ref<T>
 
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })
 
  return value
}