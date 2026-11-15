# PWA-Setup

Es wurde das `vite-plugin-pwa`verwendet. Dieses passt zu unserer Entscheidung und erzeugt das Manifest direkt aus `vite-config.ts`und baut den Service Worker mit Workbox. 
Durch `registerType: 'autoUpdat'` regestriert sich der Service Worker automatisch. Gibt es eine neue Version, kann sich dieser dann auch voin selbst aktualisieren. 

**Werte im Manifest:** 
- Name: ConFlare-Konferenzplattform
- Kurzname: ConFlare
- Display: Standalone 
- Start URL

**Icons:** Die Theme_color ist #253c6d und entspricht `--color-brand-primary`. Diese wird für Startleiste und Titelzeile verwendet. Der Hintergrund hat die `background_color`#f7f8fb und entspricht `--color-background`. Das Icon zeigt ein weißes C (#ffffff) mit Orangenen Sternen/Funken (#f2842f) auf blauen Hintergrund (#253c6d). 

