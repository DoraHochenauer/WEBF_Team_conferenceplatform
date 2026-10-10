# ADR-0004: Vue + Vite + vue-router + TypeScript für Projekt Setup

## Status

Accepted

## Datum

2026-10-07

## Kontext

Wir suchen ein Setup (Framework + Build Tool) für eine Web Konferenz App. Die App braucht mehrere Seitentypen: eine Programmübersicht, Detailseiten für Sessions und Speaker mit eigener URL (z. B. `/sessions/:id`) und ein personalisiertes Dashboard („Mein Programm"). Dafür brauchen wir Routing mit dynamischen Parametern, teilbaren URLs und funktionierendem Browser-Zurück.

Im Team haben beide keine Vorerfahrung im Frontend Bereich und noch keine Tools außerhalb unserer Studien kennengelernt.

Anforderungen:
- geringe Einarbeitungszeit
- Entwicklungszeit sind zwei Wochen

## Entscheidung

Wir verwenden:
- Vue mit Composition API als Framework
- Vite als Build-Tool und Dev-Server
- vue-router für clientseitiges Routing
- TypeScript für Typsicherheit bei den Konferenzdaten und Composables

## Betrachtete Alternativen

### Nuxt
- Vorteile: dateibasiertes Routing ohne eigene Router-Konfiguration, Auto-Imports,
  vorgegebene Ordnerstruktur
- Nachteile: eigene Konventionen und Konzepte zusätzlich zu Vue, Auto-Imports
  erschweren für Einsteiger das Nachvollziehen, woher Funktionen kommen
- Warum abgelehnt: Wir kennen Vue + Vite + vue-router bereits. Nuxt würde zusätzliche
  Einarbeitung kosten, die wir in zwei Wochen nicht einplanen können. 

### Vue ohne vue-router
- Vorteile: eine Abhängigkeit weniger, Seitenwechsel einfach per `v-if`
- Nachteile: keine eigenen URLs pro Seite, Browser-Zurück funktioniert nicht
- Warum abgelehnt: Navigation mit teilbaren URLs ist wichtig. Einen eigenen
  Router nachzubauen wäre aufwendiger und fehleranfälliger als vue-router.

### Angular
- Vorteile: Komplettpaket mit Router, Formularen und HTTP-Client, TypeScript von
  Anfang an, starke CLI mit Code-Generatoren
- Nachteile: keine Erfahrung im Team, Angular hat steile Lernkurve
- Warum abgelehnt: Für eine App dieser Größe ist Angular überdimensioniert. Die
  Einarbeitung ist in zwei Wochen neben der Umsetzung nicht realistisch.

## Konsequenzen

### Positiv
- Wir können auf Wissen aus den Übungen aufbauen und es vertiefen
- schneller Dev-Server mit Hot Module Replacement
- Composables für das State-Management (ADR-0003) fügen sich direkt ein
- Vue DevTools erleichtern das Debuggen von Komponenten und Routen
- TypeScript erkennt Fehler beim Zugriff auf die Konferenzdaten schon beim Build

### Negativ
- Vite gibt keine Projektstruktur vor, Ordner und Namenskonventionen müssen wir
  selbst festlegen
- Routen müssen manuell in einer Router-Konfiguration gepflegt werden
- TypeScript bedeutet etwas Mehraufwand (Interfaces für die JSON-Daten)

### Risiken
- vue-router wurde im Kurs nicht separat behandelt. Dynamische Routen und
  Route-Parameter müssen wir uns über den Vue Router Guide selbst erarbeiten.
- Aufrufe mit ungültigen IDs (z. B. `/sessions/999`) brauchen eine eigene
  Not-Found-Route.

## Verwandte Entscheidungen
- ADR-0003: State-Management mit Composables
