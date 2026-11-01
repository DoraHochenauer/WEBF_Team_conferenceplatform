# ConFlare – Konferenzplattform

Vue 3 + Vite + vue-router + TypeScript

## Voraussetzungen

Node.js 22.18+ oder 24.12+

## Starten

Alle Befehle im Ordner `conference-platform/` :

```sh
npm install
npm run dev
```

Die App läuft dann unter http://localhost:5173 und lädt Änderungen automatisch neu.

## Rendering-Entscheidung (Session-Übersicht)

Die Übersicht (`src/views/ProgramView.vue`) wird per CSR gerendert
(ADR-0005, Abschnitt 3). Die Konferenzdaten werden über `useConferenceData()`
beim Build aus `conference-data.json` eingebunden, das Filtern nach Track, Tag
und Level (UND-verknüpft) passiert im Browser über `computed`, ohne
Server-Anfrage. Der Filterzustand steht in der URL (z. B. `/?track=ai-dx&day=2026-09-15`),
damit gefilterte Ansichten teilbar sind.

Theoretisch wäre SSG für die Liste + Filtern im Client ideal (besseres SEO).
Wir bleiben bei Vue + Vite (ADR-0004).

