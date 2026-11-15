# AI-LOG Hochenauer – Schritt 3

Tool:  Claude, Opus 5.5

## Angabe verstehen

**2026-11-15
- Prompt: „erklär mir die angabe für person 2 file:///C:/Users/dorish25/Downloads/05b%20Team%20Assignment(1).pdf“
- Zweck: Aufgaben von Person 2 (C für Sessions-/Speaker-Daten, E) und die gemeinsamen Teile verstehen.
- Ergebnis: Hinweis, dass die JSON per import im JS-Bundle steckt und für eine eigene Caching-Regel per fetch geladen werden müsste.

**2026-11-15
- Prompt: „lies die regeln im ADR in schritt 3 und sag mir wie ich am besten vorgehe“
- Zweck: Vorgehen aus den Entscheidungen in ADR-0006 und dem Offline-Konzept ableiten.
- Ergebnis: Reihenfolge JSON nach public → fetch → SWR-Route → Test → Nachweis. Stolperfalle erkannt: Beim Erstbesuch läuft der fetch am Service Worker vorbei, die Daten würden nicht gecacht.

## C. Caching-Strategie umsetzen

**2026-11-15
- Prompt: „erklär mir das genauer [Angabe Teil C eingefügt]“
- Zweck: Begriffe verstehen (Route, Precache vs. Runtime-Cache, Navigation-Fallback) und was „klar erkennbare Caching-Regeln“ bedeutet.



**2026-11-15
- Prompt: „ist C. Caching-Strategie umsetzen aus der angabe umgesetzt?“
- Zweck: Eigene Umsetzung gegen die Angabe prüfen lassen.
- Ergebnis: Offline-Test im Build bestanden. Zwei Fehler gefunden: doppeltes `mount` in `main.ts` (App startete vor dem Laden der Daten) und alter JSON-Import in `useConferenceData.ts`. Beides selbst behoben.



## D. Entscheidungsprotokoll

**2026-11-15
- Prompt: „was würdest du hier machen [Angabe Teil D eingefügt]“
- Zweck: Testablauf für die drei Szenarien und Aufbau des Abschnitts „Testszenarien“ klären.

**2026-11-15
- Prompt: „bitte gib mir eine Vorlage“
- Zweck: Vorlage für die Testszenarien bekommen.

## E. Verifikations-Nachweis

**2026-11-15
- Prompt: „wie mache ich das am beste [Angabe Teil E eingefügt]“
- Zweck: Welche Screenshots für welches Szenario nötig sind und wie Lighthouse geprüft wird.
- Ergebnis: Lighthouse in Chrome hat keine PWA-Kategorie mehr, Lighthouse 11.7.1 per CLI als Alternative.

