<template>
  <span class="badge">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0 var(--space-small);
  border-radius: 999px;
  background: var(--color-surface-highlight);
  color: var(--color-brand-primary);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
}
</style>
