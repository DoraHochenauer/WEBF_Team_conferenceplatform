# ADR-0004: Vue + Vite  + vue-router + typescript für Projekt Setup
## Status

Accepted

## Datum

[2026-10-07]

## Kontext

Wir suchen ein Setup (Framework + Build Tool) für eine Web Konferenz App. Wir möchten eine Navigation zwischen Unterseiten im Projekt. Im Team haben beide keine Vorerfahrung im Frontend Bereich,
und noch keine Tools außerhalb unserer Studien kennengelernt. 
Anforderungen:
- geringe Einarbeitungszeit
- Entwicklungszeit sind zwei Wochen
- SEO und Server-Rendering sind nicht erforderlich


## Entscheidung

Wir verwenden:
- Vue mit Composition API Framework
- Vite als Build-Tool und Dev-Server
- vue-router für clientseitiges Routing
- TypeScript für Typsicherheit bei den Konferenzdaten und Composables

## Betrachtete Alternativen

### Nuxt und vue
- Vorteile: Server-Side Rendering bzw. statische Generierung, dateibasiertes Routing
  ohne eigene Router-Konfiguration, Auto-Imports, vorgegebene Ordnerstruktur
- Nachteile: zusätzliche Konzepte (SSR, Hydration, Nuxt-Konventionen), Auto-Imports
  erschweren für Einsteiger das Nachvollziehen, woher Funktionen kommen
- Warum abgelehnt: Unsere Daten kommen aus einer statischen JSON-Datei, SEO ist keine
  Anforderung. SSR bringt uns keinen Nutzen, kostet aber Einarbeitungszeit.

### Vue ohne vue-router
- Vorteile: eine Abhängigkeit weniger, Seitenwechsel einfach per `v-if` 
- Nachteile: keine eigenen URLs pro Seite, Browser-Zurück funktioniert nicht
- Warum abgelehnt: Navigation mit teilbaren URLs ist wichitg. Einen eigenen
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
- reines Client-Side Rendering: ohne JavaScript bleibt die Seite leer
- TypeScript bedeutet etwas Mehraufwand (Interfaces für die JSON-Daten)
### Risiken
- 

## Verwandte Entscheidungen
 - ADR-0003: State-Management mit Composables