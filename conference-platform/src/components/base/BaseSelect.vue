<script setup lang="ts">
// Auswahlfeld mit Label. Kennt keine Konferenzdaten, nur Wert/Text-Paare.
export interface SelectOption {
  value: string
  label: string
}

defineProps<{
  label: string
  options: SelectOption[]
  // Text für den leeren Wert, z. B. "Alle Tracks"
  placeholder: string
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <label class="field">
    <span>{{ label }}</span>
    <select v-model="model">
      <option value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xsmall);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
}

select {
  font: inherit;
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-regular);
  padding: var(--space-xsmall) var(--space-small);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text);
}
</style>
