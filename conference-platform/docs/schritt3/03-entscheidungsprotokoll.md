# ADR-0006: Offline- und Caching-Strategie
 
## Status
 
Accepted
 
## Datum
 
2026-11-14
 
## Kontext und Einleitung

Ziel ist es, dass die Konferenzplattform zu einer installierbaren, offlinefähigen PWA ausgebaut wird. Wird die App beispielsweise in einer Umgebeung verwendet, wo auf grund der Anzahl der Personen, dass Wlan überlastet ist, muss diese auch in solchen Situationenn zeigen können, welche Session aktuell in welchem Raum stattfindet. 

Die Konfernez App ist eine CSR-App (Vite + Vue). Das heißt ohne Netz wird weder HTML noch Javascript geladen. Onhne einen Service Worker wird man also immer gleich zur Fahlerseite der Konferenzapp weitergeleitet. 

Um den Servie Worker umzusetzen müssen allersings für die Datentypen einige Entscheidungen getroffen werden. Es muss hier entschieden werden, wie die folgenden Datentypen gecacht werden müssen: 

- App-Grundgerüst
- Seesion- und Speakerdaten 
- die gemerkten Sessions aus dem Local Storage


## Optionen für das App-Grundgerüst

### Kontext
Zum Grundgerüst der App gehlört HTML, JS und CSS, Design Token, Icons und auch Fonts. Diese Daten ändern sich grundlegend nur, wenn etwas im Code verändert wird und die App dann neu veröffentlich wird. Ohne das Grundgerüst kann die App gar nicht starten. 

#### Option A: Precache + Cache-First

**Vorteile:** Nach dem ersten Besuch liegt die komplette App lokal bereit. Ein start bei einem schlechten Netz ist sofort möglich. 

**Nachteil:** Beim ersten Besuchen werden mehrere Daten geladen. Die Updates werden immer erst nach einem Neuladen und der Aktivierung des neuen Service Workers einsehbar. 

#### Option B: Network-First

**Vorteile:** Die neuste Verion der App wird immer geladen. 

**Nachteile:** Ist das Wlan schlecht, versucht die App lange die Dateien aus dem Internet zu laden. Erst wenn das nicht funktioniert, nimmt sie die gespeicherte Version der App. Der Start der App kann dadurch mehrere Sekunden dauern oder im schlimmsten Fall lädt die App gar nicht. 


### Entscheidung
**Option A:** Precache + Cache First bietet die besseren Voraussethungen für die Offline-Funktion der App, da diese ohne stabilen Netzwerk besser funktioniert. 

### Konsequenzen

**Positiv:** Die App startet nach dem ersten Online Laden vollständig ohne Probleme offline. 
**Negativ:** Eine neue Verison der App kann die NutzerInnnen erst beim nächsten Neuladen erreichen. Das ist hier in Ordnung, das sich während des Nutzens der App nichts diese Daten nicht ändern bzw. während einer Konferenz sich nicht ändern. 





## Optionen für Session- und Speakerdaten

### Kontext
Hier geht es um die Daten aus der conference.json Datei. Diese Datei wird derzeit per import in eingebaut und ist damit eigentlich Teil des App-Grundgerüsts. Wenn man für diese Daten eine eigene Regel für den Cache machen möchte, muss diese verschoben werden und per fetch geladen werden. 

#### Option A: Chache First 

**Vorteile:** Funktioniert offline gut, da die Daten schon im Cache liegen. 

**Nachteil:** Eine Raumänderung würde nicht ankommen. Erst ein neue App-Version oder ein Abgklaufener Cache Eintrag würde die Daten bringen. 

#### Option B: Stale-While-Revalidate

**Vorteile:**  Stale-White-Revalidate antowrtet grundlegend genauso schnell wie Cache First. Es kann aber im Hintergrund aktualisieren., sobald wieder ein Netzwerk verfügbar ist. Somit werden spätenstens dann Raumänderungen sichtbar. 

**Nachteile:** Beim ersten Öffnen einer Änderung kann es sein dass man noch den alten Stand sieht. Bei jedem Aufruf mit Netz entsteht eine Hintergrundabfrage. 


### Entscheidung
**Option B:**  Grundsätzlich würde Cache First ausreichen, da die Daten meist statisch sind. In der Realität kann es aber zu Raumänderungen kommen und dieses Scenarion sellte hier ebenfalls berücksichtigt werden. Daher die Entscheidung für Stale-White-Revalidate. Dieses bietet eine Offline Fähigkeit und kann Änderungen liefern. Damit die Daten eine eigene Caching-Regel bekommen, verschieben wir sie nach public/data/conference-data.json und laden sie per fetch()

### Konsequenzen

**Poitiv:**  Das Programm ist offline verfügbar und spätere Änderungen kommen trotzdem an. 
**Negativ:** Ohne Netzwerk bleibt der alte Stand der Daten bestehen, dies wird von der App auch nicht gekennzeichnet. Gibt es Änderungen werden diese erst beim zweiten Öffnen sichtbar. Es wird zuerst das geladen, was bereits im Cache vorhanden ist, nicht das was vom Netzwerk kommt. 




## Optionen für "Mein Programm"

### Kontext
Die gemerkten Sessions werden grundlegend schon clientseitig im localStroage gespeichert. Die Daten sind also schon ohne NEtzwerk im Browser gespeichert. Um aber die gemerkten IDs und die Sessions anzuzeigen, braucht es allersings das App-Grundgerüst und die Session-Daten. 

#### Option A: Kein eigenes Caching
--> Abhängig vom Grundgerüst  

**Vorteile:**  Es gibt keine doppelte Datenhaltung. Der localStorage bleibt die einzige Quelle. 

**Nachteil:**  Kann nur funktionieren wenn die ersten beiden Optionen dazupassen und korrekt umgesetzt wurden. 

#### Option B: gemerkte Sessions zusätzlich in Service worker speichern. 

**Vorteile:**  zusätzliche Sicherheit durch doppelte Speicherung 

**Nachteile:**  Es gibt zwei Datenquellen die gleich gehalten werden müssen. 


### Entscheidung
**Option A:**  Die gemerkten Sessions werden nur im LocalStorage gespeichert, der Service Worker speichert sie nicht zusätzlich. Ein Navigation fallback soll dafür sorgen, dass der Service Worker bei jeder Seitenanfrage die gespeicherte index.html zurückgibt. 

### Konsequenzen

**Poitiv:**   Es ist eine einfache Lösung mit nur einer Datenquelle. Die gemerkten Sessions sind offline sofort verfügbar.
**Negativ:** „Mein Programm“ funktioniert offline nur, wenn App-Grundgerüst und Programmdaten vorher einmal online geladen wurden. Werden die Browserdaten gelöscht, sind die gemerkten Sessions weg. Es gibt keine Sicherung auf einem Server.






## Testszenarien 
Build + `npm run dev`, offline über DevTools → Network → „Offline", Inkognito-Fenster.
Person 2: [ Firefox ]

### i. Übersicht offline
- **Vorher:** App einmal online geöffnet
- **Aktion:** Offline → `/` neu laden
- **Ergebnis P1:** ✅ alle 20 Sessions, Filter funktionieren
- **Ergebnis P2:** [ … ]
- **Lücke:** Daten = Stand vom letzten Online-Laden, kein Offline-Hinweis

### ii. Mein Programm offline
- **Vorher:** Sessions online gemerkt
- **Aktion:** Offline → `/mein-programm` neu laden
- **Ergebnis P1:** ✅ gemerkte Sessions sichtbar, Entfernen funktioniert
- **Ergebnis P2:** [ … ]
- **Lücke:** Browserdaten gelöscht = Sessions weg

### iii. Erstbesuch offline
- **Vorher:** App nie geöffnet
- **Aktion:** Offline → App aufrufen
- **Ergebnis P1:** ⚠️ [Fehlerseite des Browsers]
- **Ergebnis P2:** [ … ]
- **Warum okay:** Service Worker muss einmal online installiert werden, Teilnehmende öffnen die App meist vorab


