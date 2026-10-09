# ADR-0004: Vue + Vite  + vue-router für Projekt Setup
## Status

Accepted

## Datum

[2026-10-07]

## Kontext

Wir suchen ein Setup (Framework + Build Tool) für eine Web Konferenz App. Wir möchten eine Navigation zwischen Unterseiten im Projekt. Im Team haben beide keine Vorerfahrung im Frontend Bereich,
und noch keine Tools außerhalb unserer Studien kennengelernt. Entwicklungszeit sind zwei Wochen.


## Entscheidung

Wir wollen bei den bereits bekannten Setup Vue + Vite  + vue-router aus den vorhergehenden Übungen bleiben.

## Betrachtete Alternativen

### Nuxt und vue
- Vorteile: einfachere Rendering Umsetzung
- Nachteile: keine Erfahrung im Team  
- Warum abgelehnt: Wir wollen bei bekannten Tools bleiben, zu hoher Zeitaufwand neue Technologien zu erlernen

### angular und esbuild
- Vorteile: starkes CLI mit vielen Funktionen
- Nachteile: keine Erfahrung im Team, Angular hat steile Lernkurve
- Warum abgelehnt: Wir wollen bei bekannten Tools bleiben, zu hoher Zeitaufwand neue Technologien zu erlernen

## Konsequenzen

### Positiv
- Unsere Kenntnisse können somit angewandt und verfestigt werden.

### Negativ
- Eventuell passande Features können mangels Erfahrung nicht angewandt werden.

### Risiken
- mit vite könnten wir bei einem großen Projekt Rendering Probleme bekommen

## Verwandte Entscheidungen
- keine