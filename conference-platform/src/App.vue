<script setup lang="ts">
import AppLayout from './layout/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <h1>Programm</h1>

    <!-- Dummy-Filter: nur Optik, noch ohne Funktion -->
    <form class="filter" @submit.prevent>
      <label class="field">
        <span>Tag</span>
        <select>
          <option>Alle Tage</option>
          <option>Di, 15.09.</option>
          <option>Mi, 16.09.</option>
        </select>
      </label>
      <label class="field">
        <span>Track</span>
        <select>
          <option>Alle Tracks</option>
          <option>Beispiel-Track</option>
        </select>
      </label>
      <label class="field">
        <span>Level</span>
        <select>
          <option>Alle Level</option>
          <option>Einsteiger</option>
          <option>Fortgeschritten</option>
          <option>Experte</option>
        </select>
      </label>
      <label class="field">
        <span>Speaker</span>
        <select>
          <option>Alle Speaker</option>
          <option>Beispiel-Speaker</option>
        </select>
      </label>
      <button type="button" class="reset">Zurücksetzen</button>
    </form>

    <!-- Beispiel-Boxen, später durch echte Session-Daten ersetzen -->
    <div class="grid">
      <div class="box box-highlight">
        <span class="time">09:00</span>
        <h2>Beispiel-Keynote</h2>
        <p>Hauptsaal</p>
      </div>
      <div class="box">
        <span class="time">10:15</span>
        <h2>Beispiel-Session</h2>
        <p>Saal A</p>
      </div>
      <div class="box">
        <span class="time">10:15</span>
        <h2>Beispiel-Session</h2>
        <p>Saal B</p>
      </div>
    </div>
  </AppLayout>
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

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-text-muted);
}

select,
.reset {
  font: inherit;
  font-size: 0.9rem;
  padding: 6px var(--space-small);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text);
}

.reset {
  border-color: var(--color-brand-primary);
  color: var(--color-brand-primary);
  font-weight: 600;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-medium);
  margin-top: var(--space-medium);
}

.box {
  padding: var(--card-padding);
  background: var(--card-background);
  border: 1px solid var(--card-border);
  border-left: 4px solid var(--color-brand-secondary);
  border-radius: 8px;
}

.box-highlight {
  border-left-color: var(--color-brand-accent);
}

.time {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-brand-primary);
}

h2 {
  margin: 4px 0;
  font-size: 1rem;
}

p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
</style>
