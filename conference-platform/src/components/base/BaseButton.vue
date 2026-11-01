<script setup lang="ts">
// Einfacher Button. Klick-Events kommen über die Attribute durch (@click).
</script>

<template>
  <button type="button" class="button">
    <slot />
  </button>
</template>

<style scoped>
.button {
  font: inherit;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-xsmall) var(--space-small);
  border: 1px solid var(--color-brand-primary);
  border-radius: 6px;
  background: var(--button-background);
  color: var(--button-text);
  cursor: pointer;
}

.button:hover:not(:disabled) {
  background: var(--button-background-hover);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
