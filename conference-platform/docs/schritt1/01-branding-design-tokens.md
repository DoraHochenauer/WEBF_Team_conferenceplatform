# Gruppenarbeit Konferenz Plattform
### Teamname: Lisa und Doris
### Markenkonzept:  ConFlare
Con für Conference, Flare für Leuchtsignal oder Funke. Das ruhige Blau steht für Struktur, das Orange ist der Funke. ConFlare bringt Ordnung in das Konferenzprogramm und macht die Highlights sichtbar. Die Marke wirkt klar, professionell und zugänglich.

### Alleinstellung:
ConFlare zeigt nicht nur das Gesamtprogramm, sondern hilft beim Planen des eigenen Tages: ohne Konto, mit offline gespeicherter Merkliste 
Das passt zum Setting der Konferenz bei der es unzuverlässiges WLan gibt, und somit offline funktionieren muss.

### Palette
Farbpalette welche das Markenkozept unterstreicht:
(komplettes Tokens-Set in conference-platform\src\style\tokens.css)

Primäre Farben, Haupfarbe des Logos und dient als ruhige seriöse Grundfarbe
    --primary: #253c6d;
    --primary-dark: #1a2b50;
Sekundäre Farbe welche die primäre Farbe unterstütz
    --secondary: #3d6fd1;
    --secondary-light: #e8edf6;

Als Kontrast Orange als Akzent, der "Flare" für wichtige Highlights
    --accent: #f2842f;
    --accent-dark: #b85a12;

Neutrale Farben für Hintergründe, Boxen, etc.
    --neutral: #1f2937;
    --neutral-light: #505d79;

semantisch bedeutende Farben für Fehler und Succes Meldungen
    --success: #2e7d4f;
    --error: #c0392b;


Diese Primtiven Farben werden in der Palette als Token in ihren Abstufungen in der Form zB --color-gray-600, --color-blue-900, --color-orange-700 abglegt. Auf deren Basis werden semantische Token der Form --color-brand-primary, --color-background gebildet die entweder direkt oder noch in Form von Komponententoken zB --button-background verwendet werden.

### Begründung
#### Wartbarkeit
Jede Grundfarbe (primitive) steht genau einmal in tokens.css. Soll das zB Blau etwas heller werden, ändert ihr nur --color-blue-800, Buttons und Karten passen sich automatisch an.
#### Dark Mode leicht implementiertbar
in :root[data-theme="dark"] können die Werte für den Darkmode zentral belegt werden,
die Komponenten passen sich automatisch an. Deswegen dürfen hier keine Komponenten hinterlegt werden. Lediglich Semantische Tokens die auf Primitves zurückgreifen. (Anmerkung: aktuell sind noch keine Primitives für Dark Mode hinterlegt)

#### Aussagekräftig
Die Bezeichnungen der Tokens sprechen für sich.
Primitive sagen, was ein Wert ist (color-blue-900 ist ein dunkles Blau)
Semanitics sagen, wozu ein Wert da ist ( --color-background ist ein Hintergrund)
Komponenten wo ein Wert ist ( --button-background ... selbsterklärend)
Vereinfacht Kommunikation zwischen Design und Entwicklung.
(Anmerkung, im Layout werden hauptsächlich Semantische Werte verwendet, da wir Komponentenstruktur erst aufbauen müssen aber trotzdem die Palette anschauen wollten)

#### Exportierbarkeit
Namen entsprechen Token-Pfaden im DTCG-Format 2025.10 und und können somit leicht nach zB. figma exportiert werden.

### WCAG-AA-Kontrastprüfung 
Farben aus conference-platform\src\style\tokens.css
#### Allgemein:
--color-text (#1F2937) auf --color-background (#F7F8FB)
Contrast Ratio: 13.82:1

Normal Text
WCAG AA: Pass
WCAG AAA: Pass

Large Text
WCAG AA: Pass
WCAG AAA: Pass

Graphical Objects and User Interface Components
WCAG AA: Pass

#### Button

--button-text (#ffffff) auf --button-background (#253c6d)
Contrast Ratio: 10.79:1

Normal Text
WCAG AA: Pass
WCAG AAA: Pass

Large Text
WCAG AA: Pass
WCAG AAA: Pass

Graphical Objects and User Interface Components
WCAG AA: Pass

#### Card
--color-text (#1F2937) auf  --card-background (#ffffff)
Contrast Ratio: 14.67:1

Normal Text
WCAG AA: Pass
WCAG AAA: Pass

Large Text
WCAG AA: Pass
WCAG AAA: Pass

Graphical Objects and User Interface Components
WCAG AA: Pass