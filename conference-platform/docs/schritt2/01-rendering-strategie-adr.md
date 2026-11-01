# ADR-0005: Rendering-Strategie

## Status

Accepted

## Datum

2026-10-31

## Kontext und Einleitung

Für die Seiten Speaker-Profile, Session-Detailseiten, Session-Übersicht mit Filtern, „Mein Programm" Dashboard müssen Renderingstrategien SSG,CSR, SSR oder ISR festgelegt und begründet werden.
Aufrgrund der tatsächlichen Dateneigenschaft, es handelt sich und ein statischen json, gehen wir von nicht veränderbaren Daten aus. Session-Details, Übersicht, Speaker Profile und Zeit ändern sich nicht. Wir verwednen Vue und Vite, für "Mein Programm"-Dashboard verwenden wir eine headless Architektur und den localStorage. 

Ändert sich der Inhalt der Seite zur Laufzeit? 
Speaker-Profile -> nein
Session-Detailseiten -> nein
Session-Übersicht mit Filtern -> ja
„Mein Programm" Dashboard 
-> ja, ändert sich zur Laufzeit bei Hinzufügen von Session zu localStorage, 
Seite muss aber nicht beim Hinzufügen neu geniert werden, 
erst beim Aufruf des „Mein Programm" Dashboards. Dabei wird der veränderte localStorage ausgelesen.

Aufgrund unseres Setups Vue + Vite (ADR-0004) handelt es sich um eine reine CSR-App. SSG, SSR und ISR diskutieren wir wo es sinnvoll wäre.

## Betrachtete Optionen

## 1. Speaker-Profile

### Kontext
Daten werden aus statischen json geladen.
Ändern sich praktisch zur Laufzeit nicht.

### Optionen
#### Option A: SSG
- Vorteile: sehr schnelle Ladezeit, gut für SEO und Link-Vorschauen
- Nachteile: eigenes vite-ssg Plugin nötig

#### Option B: CSR
- Vorteile: Entspricht unserem Setup (ADR-0004), kein Zusatzaufwand
- Nachteile: Inhalt erst nach dem Laden von JavaScript sichtbar, schlecht für SEO und Link-Vorschauen

#### Option C: SSR
- Vorteile: Immer aktuelles HTML, gut für SEO
- Nachteile: Braucht einen Server und rendert bei jeder Anfrage neu, obwohl
  sich die Daten nicht ändern. Das ist unnötiger Aufwand.

#### Option D: ISR
- Vorteile: Schnell wie SSG, Seiten werden nach einem Intervall
  (z. B. 60 s) automatisch neu erzeugt
- Nachteile: Braucht Server bzw. Framework-Unterstützung (z. B. Nuxt),
  kurzzeitig veraltete Daten möglich

### Entscheidung
 Wir entscheiden uns für CSR da es für uns den geringsten zusätzlichen Aufwand bedeutet 
 und wir wollen uns an die bereits gelernten Strukturen halten. Theoretisch wäre SSG sinnvoller, weil die Daten für alle Besucher gleich sind und sich praktisch nie ändern.

### Konsequenzen
- Positiv: Kein zusätzliches Tool nötig, einheitlich mit dem Rest der App
  (ADR-0004). 
- Negativ: Der Inhalt ist erst nach dem Laden von JavaScript sichtbar. Das ist
  schlechter für SEO und Link-Vorschauen und macht den ersten Seitenaufbau
  langsamer.

---

## 2. Session-Detailseiten

### Kontext
Daten werden aus statischen json geladen.
Ändern sich praktisch zur Laufzeit nicht.

### Optionen
#### Option A: SSG 
- Vorteile: Sehr schnell, gut für SEO, statisches Hosting reicht
- Nachteile: Zeitplanänderungen erst nach einem neuen Build sichtbar

#### Option B: CSR
- Vorteile: Entspricht unserem Setup (ADR-0004), kein Zusatzaufwand
- Nachteile: Inhalt erst nach dem Laden von JavaScript sichtbar, schlecht für SEO und Link-Vorschauen

#### Option C: SSR
- Vorteile: Immer aktuelles HTML, gut für SEO
- Nachteile: Braucht einen Server und rendert bei jeder Anfrage neu, obwohl
  sich die Daten nicht ändern. Das ist unnötiger Aufwand.

#### Option D: ISR
- Vorteile: Schnell wie SSG, Seiten werden nach einem Intervall
  (z. B. 60 s) automatisch neu erzeugt
- Nachteile: Braucht Server bzw. Framework-Unterstützung (z. B. Nuxt),
  kurzzeitig veraltete Daten möglich

### Entscheidung
 Wir entscheiden uns für CSR da es für uns den geringsten zusätzlichen Aufwand bedeutet
 und wir wollen uns an die bereitsgelernten Strukturen halten. Theoretisch wäre SSG sinnvoller, weil die Daten für alle Besucher gleich sind und sich praktisch nie ändern.

### Konsequenzen
- Positiv: Kein zusätzliches Tool nötig, einheitlich mit dem Rest der App
  (ADR-0004). 
- Negativ: Der Inhalt ist erst nach dem Laden von JavaScript sichtbar. Das ist
  schlechter für SEO und Link-Vorschauen und macht den ersten Seitenaufbau
  langsamer.


---

## 3. Session-Übersicht mit Filtern

### Kontext
Die Übersicht zeigt alle Sessions aus dem json. Diese Daten
sind für alle Besucher gleich und ändern sich nicht. Pro Nutzer ändert sich nur der Filterzustand (Track, Tag, Level). Das ist reiner Zustand im Browser, die Daten selbst bleiben
gleich. Der Filter steht in der URL (z. B. `?track=ai-dx`), damit gefilterte Ansichten teilbar sind.

### Optionen
#### Option A: SSG/ISR für die Liste + Filtern im Client (CSR)
- Vorteile: Liste sofort als HTML da, gut für SEO, Filtern ohne Server-Anfrage und kann sofort reagieren
- Nachteile: Braucht ein Zusatz-Tool (z. B. vite-ssg bzw. Nuxt), alle Sessions werden auf einmal geladen

#### Option B: SSR pro Filteranfrage
- Vorteile: Jede gefilterte Ansicht ist fertiges HTML, immer aktuelle Daten
- Nachteile: Braucht einen Server, jeder Filterklick löst eine Server-Anfrage
  aus und ist dadurch langsamer. Bei 20 Sessions ist das unnötig.

#### Option C: Reine CSR
- Vorteile: Entspricht unserem Setup (ADR-0004), Filtern ist sofort und ohne
  Server möglich
- Nachteile: Liste erst nach dem Laden von JavaScript sichtbar, schwächer für SEO


### Entscheidung
Theoretisch wäre Option A ideal: Die Liste als statisches HTML (SSG), gefiltert
wird im Browser. Wir setzen aber reine CSR um (Option C), weil wir bei Vue + Vite
bleiben (ADR-0004). Das Filtern läuft in beiden Fällen gleich: über `computed`
im Browser, ohne Server-Anfrage.


### Konsequenzen
- Positiv: Kein Server und kein Zusatz-Tool nötig, Filtern reagiert sofort.
- Negativ: Inhalt erst nach dem Laden von JavaScript sichtbar, schwächer
  für SEO

---

## 4. „Mein Programm"-Dashboard

### Kontext
Personalisiert, gemerkte Session-IDs liegen nur im localStorage (ADR-0003).
Der Server hat keinen Zugriff darauf. 

### Optionen
#### Option A: CSR
- Vorteile: Liest den localStorage direkt im Browser, Änderungen sind sofort
  sichtbar, entspricht unserem Setup (ADR-0004)
- Nachteile: Inhalt erst nach dem Laden von JavaScript sichtbar

#### Option B: SSR
- Vorteile: Fertiges HTML beim ersten Aufruf
- Nachteile: Der Server kann den localStorage nicht lesen und kann daher nicht rendern

#### Option C: SSG
- Vorteile: Schnell, statisches Hosting reicht
- Nachteile: Der Inhalt ist bei jedem User anders, daher nicht möglich.

#### Option C: ISR

- Vorteile: Wie SSG, mit regelmäßiger Aktualisierung
- Nachteile: Gleiches Problem wie SSG: Die Seite kann keine persönlichen Daten enthalten

### Entscheidung

CSR. Die gemerkten Sessions liegen nur im localStorage des Browsers, deshalb
kann nur dort gerendert werden. 

### Konsequenzen

- Positiv: Änderungen sind sofort integriert, kein Server nötig, kein SEO nötig
  (persönliche Seite)
- Negativ: Gemerkte Sessions sind an Browser und Gerät gebunden und gehen
  verloren, wenn der localStorage gelöscht wird


### Risiken
- Zeitplanänderungen: Die Daten stammen aus einer statischen JSON und sind
  beim Build fix. Ändert sich in der Realität ein Raum oder eine Uhrzeit,
  muss die JSON angepasst und die App neu gebaut werden. Bis dahin sehen
  Besucher veraltete Angaben.

  - Spätere Umstellung: Wird SEO wichtig oder ändern sich Daten häufiger, ist
  ein Umstieg auf SSG/ISR (vite-ssg oder Nuxt) nötig. Das kostet Aufwand.

- SEO und Link-Vorschauen: Bei CSR liefert der Server zunächst ein fast
  leeres HTML. Suchmaschinen und Messenger zeigen
  dann keinen Titel und keine Beschreibung der Speaker- und Session-Seiten.
  Für eine öffentliche Konferenz-App ist das ein Nachteil, weil diese Seiten
  geteilt und gefunden werden sollen.

  - Inhalt erst nach dem Laden von JavaScript sichtbar. Bei unserer Datenmenge (20 Sessions) ist der Unterschied zu SSG kaum spürbar

## Verwandte Entscheidungen

- ADR-0002: Komponenten- und Ordnerstruktur (Headless-Logik für
  „Zum Programm hinzufügen")
- ADR-0003: State-Management mit Composables (localStorage, nur IDs speichern)
- ADR-0004: Vue + Vite + vue-router (kein Nuxt, daher CSR als Basis)