<script setup lang="ts">
import AppLayout from './layout/AppLayoutProto.vue'
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
