# AI-LOG Hochenauer

Tool, wenn nicht anders angegeben: Claude Code (Desktop-App).
Prompts im Wortlaut, eingefügte ADR-Abschnitte bzw. Angabe-Texte sind in [eckigen Klammern] zusammengefasst.

## A. Rendering-Strategie-ADR

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
- Prompt: „kurz ud knapp zu [Abschnitt 4. „Mein Programm"-Dashboard: Kontext und Optionen]“
- Zweck: Optionen für das Dashboard ausformulieren.

**2026-10-31 · Claude Code**
- Prompt: „kurz wenn wir ns für CSR entscheiden [leere Abschnitte Entscheidung und Konsequenzen]“
- Zweck: Entscheidung und Konsequenzen für CSR formulieren lassen.

**2026-10-31 · Claude Code**
- Prompt: „nur für das dashboard“
- Zweck: Vorherige Antwort war für das ganze ADR, gebraucht wurde sie nur für Abschnitt 4.

**2026-10-31 · Claude Code**
- Prompt: „schreib das kurz [Abschnitt 3. Session-Übersicht: Kontext]“
- Zweck: Kontext für die Übersicht formulieren, Unterschied zwischen Daten und Filterzustand herausarbeiten.

**2026-10-31 · Claude Code**
- Prompt: „was würdest du kurz und knapp hier schrieben [Abschnitt 3: Optionen]“
- Zweck: Optionen für die Übersicht ausformulieren.

**2026-10-31 · Claude Code**
- Prompt: „gib kurz und knapp [leere Abschnitte Entscheidung und Konsequenzen]“
- Zweck: Entscheidung und Konsequenzen für Abschnitt 2 formulieren.

**2026-10-31 · Claude Code**
- Prompt: „nimm das GANZE ADR und überleg kurz diese zwei Punkte [Risiken, Verwandte Entscheidungen]“
- Zweck: Übergreifende Risiken und Bezüge zu ADR-0002 bis 0004 sammeln.

**2026-10-31 · Claude Code**
- Prompt: „bei Risiken, es handelt sich um ein statisches json“
- Zweck: Vorschlag der AI korrigieren: Sie hatte ein Nachladen der JSON per fetch angenommen, bei uns ist die JSON statisch eingebunden.

**2026-10-31 · Claude Code**
- Prompt: „ist viel CSR wie aktuell relevant für die Ladedauer“
- Zweck: Prüfen, ob der Nachteil „langsamer Seitenaufbau“ bei unserer Datenmenge überhaupt zutrifft.
- Ergebnis: Bei 20 Sessions / ca. 12 KB JSON kaum spürbar, eigentlicher Nachteil ist SEO und Link-Vorschau.

**2026-10-31 · Claude Code**
- Prompt: „schreib kurz das risiko zu CSR SR ist bei euch SEO und Link-Vorschauen, weil Suchmaschinen und Messenger zuerst ein fast leeres HTML sehen.“
- Zweck: Das tatsächlich relevante Risiko von CSR ins ADR aufnehmen.

## B. Session-Übersicht mit Filterung

**2026-11-01 · Claude Code**
- Prompt: „wie würdest du das implementieren? [Angabe Teil B eingefügt] in anbetracht aller dateien und ADRs aktuell im projekt“
- Zweck: Umsetzungsplan, der zu ADR-0002 (Ordnerstruktur), ADR-0003 (Composables) und ADR-0005 (CSR) passt.

**2026-11-01 · Claude Code**
- Prompt: „Ja, umsetzen“
- Zweck: Vorgeschlagenen Plan umsetzen lassen (Router, ProgramView, Base- und Feature-Komponenten).

**2026-11-01 · Claude Code**
- Prompt: „erklär mir die Programview“
- Zweck: Generierten Code verstehen, bevor er übernommen wird.

**2026-11-01 · Claude Code**
- Prompt: „wo ist festgehalten das der filter über die URL zu setzen ist?“
- Zweck: Prüfen, ob der Filter in der URL eine Anforderung ist oder eine Annahme der AI.
- Ergebnis: Nur ein Vorschlag der AI, nicht in der Angabe.

**2026-11-01 · Claude Code**
- Prompt: „warum verwendest du die computed funktion?“
- Zweck: Verstehen, warum computed statt ref verwendet wird.

## D. Speaker-Profilseiten

**2026-11-01 · Claude Code**
- Prompt: „wie würdest du das in dem Projekt umsetzen? [Angabe Teil D eingefügt]“
- Zweck: Umsetzungsplan für die Speaker-Seiten auf Basis des bestehenden Codes.

**2026-11-01 · Claude Code**
- Prompt: „nicht die ADRs anpassen“
- Zweck: Umsetzung freigeben, aber Änderungen an den ADRs selbst vornehmen.

## Review und AI-LOG

**2026-11-01 · Claude Code**
- Prompt: „mach einen kan kleinen kurzen AI Log von unseren konversationen und fügt ihn im gleichen stil wie in Hochenauer Log dazu, und nur die sachen die ein professor gern sehen würde“
- Zweck: Bisherige AI-Nutzung im Log nachtragen.

**2026-11-01 · Claude Code**
- Prompt: „Prüf meine implementierung (Person 1) gegen die Angabe und die bestehenden ADRs [Angabe als PDF]“
- Zweck: Eigene Teile B und D vor dem Cross-Review auf Vollständigkeit und Konsistenz mit den ADRs prüfen.
- Ergebnis: B und D funktional vollständig, AI-LOG-Format und ADR-Einleitung unvollständig, Session-Links fehlen noch (Abhängigkeit zu Teil C).

**2026-11-01 · Claude Code**
- Prompt: „Ja, AI-LOG aufbauen“
- Zweck: AI-LOG ins verlangte Format bringen (Datum, Tool, Prompt im Wortlaut, Zweck).

## Weitere Einträge (Datum, Tool und Wortlaut ergänzen)

- Prompt: „wie funktioniert das Holen und Setzen der Variablen aus der URL am besten? Welche Funktionene sind dabei sinnvoll?“
- Prompt: „Wie erstelle ich am besten ein Dropdown als Componente um es wieder verwenden zu können.“
- Prompt: „Wie kann ich einen String aus der URL als variable verwenden“
- Prompt: „Warum wird an manchen stellen computed verwendet, ref würde auch funktionieren“
