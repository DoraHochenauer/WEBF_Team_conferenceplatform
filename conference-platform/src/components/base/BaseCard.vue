<script setup lang="ts">
defineProps<{
  // hebt die Karte mit dem Akzent-Rand hervor (z. B. Keynotes)
  highlight?: boolean
}>()
</script>

<template>
  <article class="card" :class="{ 'card-highlight': highlight }">
    <slot />
  </article>
</template>

<style scoped>
.card {
  padding: var(--card-padding);
  background: var(--card-background);
  color: var(--card-text);
  border: 1px solid var(--card-border);
  border-left: 4px solid var(--color-brand-secondary);
  border-radius: 8px;
}

.card-highlight {
  border-left-color: var(--color-brand-accent);
}
</style>
