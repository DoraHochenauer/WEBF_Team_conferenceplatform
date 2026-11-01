#ADR
- Was wäre ein passendes Template für  Rendering-Strategie in Anbetracht der Angabe

- Formulierungshilfe für Optionen, Entscheidung und Konsequenzen der 4 Abschnitte
-> Gerüst übernommen, Texte pro Abschnitt selbst angepasst


- Rendering-ADR gegen die Angabe prüfen lassen
-> Feedback: Struktur mit 4 Entscheidungspunkten fehlte, Einleitung ohne allgemeine Kriterien, Zeitplanänderungen nicht diskutiert

- ProgramView


- Umsetzungsvorschlag für B. Session-Übersicht mit Filtern
-> Router, ProgramView, Base- und Feature-Komponenten nach ADR-0002 erstellt, Filter UND-verknüpft über computed
-> Nachgefragt, wo der Filter über die URL festgelegt ist: war nur ein Vorschlag der AI, nicht in der Angabe

- wie funktioniert das Holen und Setzen der Variablen aus der URL am besten? 
Welche Funktionene sind dabei sinnvoll?

- Wie erstelle ich am besten ein Dropdown als Componente um es wieder verwenden zu können.

- Wie kann ich einen String aus der URL als variable verwenden


- Warum wird an manchen stellen computed verwendet, ref würde auch funktionieren
-> abgeleitete Werte werden automatisch neu berechnet und zwischengespeichert, ref wäre nur für eigenen Zustand nötig

- Umsetzungsvorschlag für D. Speaker-Profilseiten
-> Routen /speakers und /speakers/:id, unbekannte IDs zeigen NotFoundView
