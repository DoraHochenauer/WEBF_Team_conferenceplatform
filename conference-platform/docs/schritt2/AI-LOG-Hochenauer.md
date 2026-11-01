# AI-LOG Hochenauer

Tool, wenn nicht anders angegeben: Claude Code (Desktop-App).
Prompts im Wortlaut, eingefügte ADR-Abschnitte bzw. Angabe-Texte sind in [eckigen Klammern] zusammengefasst.

## Rendering-Strategie-ADR

**2026-10-31 · Claude Code**
- Prompt: „Betrachte conference-platform\docs\schritt2\01-rendering-strategie-adr.md in Anbetracht der Angabe [Angabe Teil A eingefügt]“
- Zweck: Ersten ADR-Entwurf gegen die Anforderungen der Angabe prüfen lassen, um fehlende Teile früh zu erkennen.
- Ergebnis: Struktur mit 4 Entscheidungspunkten fehlte, Einleitung ohne allgemeine Kriterien, Zeitplanänderungen nicht diskutiert.

**2026-10-31 · Claude Code**
- Prompt: „schlag mir das gerüst des ADR vor“
- Zweck: Einheitliche Gliederung (Kontext → Optionen → Entscheidung → Konsequenzen) für alle 4 Abschnitte bekommen.
- Ergebnis: Gerüst übernommen, Inhalte selbst befüllt.

**2026-10-31 · Claude Code**
- Prompt: „was würdest du hier schreiben, kurz und knapp [Abschnitt 1. Speaker-Profile: Kontext und Optionen]“
- Zweck: Formulierungshilfe für Vor- und Nachteile der Optionen beim Speaker-Profil.

**2026-10-31 · Claude Code**
- Prompt: „kurz: konsequenzen [eigene Entscheidung für CSR bei Abschnitt 1]“
- Zweck: Konsequenzen passend zu unserer eigenen Entscheidung (CSR statt dem Vorschlag SSG) formulieren.

**2026-10-31 · Claude Code**
- Prompt: „kurz und knapp [Abschnitt 2. Session-Detailseiten: Kontext und Optionen]“
- Zweck: Optionen für die Session-Detailseiten ausformulieren.
- Ergebnis: Hinweis, dass bei Zeitplanänderungen ISR als Option diskutiert werden sollte.


**2026-10-31 · Claude Code**
- Prompt: „ist viel CSR wie aktuell relevant für die Ladedauer“
- Zweck: Prüfen, ob der Nachteil „langsamer Seitenaufbau“ bei unserer Datenmenge überhaupt zutrifft.
- Ergebnis: Bei 20 Sessions / ca. 12 KB JSON kaum spürbar, eigentlicher Nachteil ist SEO und Link-Vorschau.

##Speaker-Profilseiten

**2026-11-01 · Claude Code**
- Prompt: „wie würdest du das in dem Projekt umsetzen? [Angabe Teil D eingefügt]“
- Zweck: Umsetzungsplan für die Speaker-Seiten auf Basis des bestehenden Codes.

**2026-11-01 · Claude Code**
- Prompt: „nicht die ADRs anpassen“
- Zweck: Umsetzung freigeben, aber Änderungen an den ADRs selbst vornehmen.


## Weitere Prompts 

- Prompt: „wie funktioniert das Holen und Setzen der Variablen aus der URL am besten? Welche Funktionene sind dabei sinnvoll?“
- Prompt: „Wie erstelle ich am besten ein Dropdown als Componente um es wieder verwenden zu können.“
- Prompt: „Wie kann ich einen String aus der URL als variable verwenden“
- Prompt: „Warum wird an manchen stellen computed verwendet, ref würde auch funktionieren“
