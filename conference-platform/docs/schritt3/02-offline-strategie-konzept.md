# Offline-Strategie-Konzept

## Ausgangssituation
Die Konfernezapp wird nicht nur zu Hause, sondern auch außerhalb genutzt beispielsweise in Vortragsräumen oder Büros. Hier kann es zur Situation kommen, dass das Wlan vor Ort überlastet ist oder gar nicht funktioniert. Aber die NutzerInnen müssen trotzdem sehen können welche Session um wie viel Uhr in welchem Raum stattfindet. 
Da aber unsere App eine CSR-App ist, kann diese ohne Internet gar nicht starten, außer ein Service Worker hat zuvor die nötigen Daten entsprechend gespeichert. 


## App-Grundgerüst 
Zum App-grundgerüst gehören alle Dateinen, die die App zum starten braucht. Änderungen gibt es bei diesen Dateien nur, wenn eine neue Verison der App gebaut wird. Wenn dies geschieht, werden von Vite automatisch neue Dateinamen vergeben, daher werden alte und neue Dateien nicht vermischt. Beim ersten Besuch der Seite wird daher das Grundgerüst gespeichert. Dananch wird **Cache-First** genutzt: Die App startet sofort aus dem Speicher ohne auf das Internet zu warten. Bei einer neuen App-version sieht die Person zuerst noch die alte Version, die neue wird im Hintergrund geladen. Beim nächsten Öffenen ist dann die neue Version nutzbar. 

## Sessions-/Speaker-Daten
Grundlegen ändern sich die Daten vom Programmen, Sessions und Räumen in der Regel nicht. Daher würde hier eigentlich Cache-First gut passen. Es ist aber doch auch möglich dass es in der Realität zu kurzfristigen Raumänderungen kommt. Mit Cache First würden diese allerdings nicht ankommen. Auch Network-First wäre eine Option, allersings bei schlechten Wlan zu langsam. Wir haben uns daher für **Stale-While-Revalidate** entschieden. Das Programm erscheint auch Offline. Wenn kurz Internet da ist, kann das Programm sich den neusten Stand holen. Gibt es eine Raumänderungen, wäre diese beim nächsten öffnen sichtbar. Dass Änderungen verzögert erscheinen muss hier in Kauf genommen werden. 


## „Mein Programm"
Die gemerketen Session sind im localStorage gespeichert. Ein zusätzlicher Cache wird hier nicht benötigt. Es wäre zwar möglich hier mit einer zweiten Kopie zu arbeiten, allerdings gibt es hier das Risiko, dass zwei Zustände auseinanderlaufen. Das alles funktioniert so aber nur in Kombination mit den oben genannten Umsetzungen. Darüber hinaus soll der Service Worker bei jeder Seitenanfrage die gespeicherte index.html zurückgeben, damit nach jedem Neuladen die richtige Seite sich öffnet, da diese Seite vor allem zwischen Konferenezn am häufigsten besucht wird. 

## Worst Case Szenario: kompletter Verbindungsabbruch mitten in der Nutzung 

Was in diesem Fall passiert hängt grundlegend davon ab, ob die App davor schon einmal geladen wurde. 

**Die App wurden schon geladen:** Die App funktioniert ohne Einschränkungen auch nach einem Neustart des Gerätes. Sessions können weiterhin hinzugefügt und entfernt werden, weil diese im LocalStorage liegen und die Session-Details kommten aus dem Cache. Die Programmdaten haben aber den Stand vom letzten Online-Laden. Gibt es eine kurzfristige Raumänderung wird diese nicht angezeigt. 

**Die App wird ohne Netz das erste mal geladen:** Hier erscheint dann die Fehlerseite des Browsers. Der Service worker müsst zuerst aus dem Internet geladen werden, damit die App offline funktioniert. 



