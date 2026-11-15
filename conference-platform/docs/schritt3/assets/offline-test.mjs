// Automatisierter Offline-Test für Schritt 3 (Szenarien i–iii), erzeugt Screenshots + results.json
import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
import path from 'node:path'

const BASE = 'http://localhost:4174'
const OUT = process.argv[2]
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
fs.mkdirSync(OUT, { recursive: true })

const results = { chrome: '', scenarios: {} }
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

// Hinweisbox mit den gemessenen Werten, klar als Test-Overlay gekennzeichnet
async function overlay(page, title, lines) {
  await page.evaluate((title, lines) => {
    document.getElementById('test-overlay')?.remove()
    const box = document.createElement('div')
    box.id = 'test-overlay'
    box.style.cssText =
      'position:fixed;right:16px;bottom:16px;max-width:520px;z-index:9999;background:#111;color:#e8ffe8;' +
      'font:13px/1.45 Consolas,monospace;padding:12px 14px;border-radius:8px;border:2px solid #4caf50;white-space:pre-wrap'
    box.textContent = '[Test-Overlay, nicht Teil der App]\n' + title + '\n\n' + lines.join('\n')
    document.body.appendChild(box)
  }, title, lines)
}

async function cacheState(page) {
  return page.evaluate(async () => {
    const out = {}
    for (const name of await caches.keys()) {
      const keys = await (await caches.open(name)).keys()
      out[name] = keys.map((r) => new URL(r.url).pathname)
    }
    return out
  })
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, defaultViewport: { width: 1280, height: 900 } })
results.chrome = await browser.version()

// ---------- Szenario i ----------
{
  const ctx = await browser.createBrowserContext()
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' })
  // warten, bis der Service Worker die Seite steuert und die Daten im SWR-Cache liegen
  await page.waitForFunction(async () => {
    if (!navigator.serviceWorker.controller) return false
    const c = await caches.open('conference-data')
    return (await c.keys()).length > 0
  }, { timeout: 15000 })
  await wait(500)

  const sw = await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration()
    return { scope: reg?.scope, state: reg?.active?.state, controlled: !!navigator.serviceWorker.controller }
  })
  const manifest = await page.evaluate(async () => {
    const href = document.querySelector('link[rel="manifest"]')?.getAttribute('href')
    const m = await (await fetch(href)).json()
    return { href, name: m.name, short_name: m.short_name, display: m.display, start_url: m.start_url, theme_color: m.theme_color, background_color: m.background_color, icons: m.icons.map((i) => i.sizes) }
  })
  const cachesOnline = await cacheState(page)
  results.sw = sw
  results.manifest = manifest

  await overlay(page, 'PWA-Grundlagen nach einmaligem Online-Laden', [
    `Service Worker: ${sw.state}, steuert Seite: ${sw.controlled}`,
    `Scope: ${sw.scope}`,
    '',
    `Manifest (${manifest.href}):`,
    `  name: ${manifest.name}`,
    `  display: ${manifest.display}, start_url: ${manifest.start_url}`,
    `  theme_color: ${manifest.theme_color}, background_color: ${manifest.background_color}`,
    `  icons: ${manifest.icons.join(', ')}`,
  ])
  await page.screenshot({ path: path.join(OUT, '01-pwa-grundlagen.png') })

  await overlay(page, 'Cache Storage nach einmaligem Online-Laden', [
    ...Object.entries(cachesOnline).map(([n, k]) =>
      n.startsWith('workbox-precache') ? `${n}: ${k.length} Einträge (App-Grundgerüst)` : `${n}: ${k.join(', ')}`
    ),
    '',
    'conference-data.json ist NICHT im Precache: ' +
      !Object.entries(cachesOnline).some(([n, k]) => n.startsWith('workbox-precache') && k.some((p) => p.includes('conference-data'))),
  ])
  await page.screenshot({ path: path.join(OUT, '02-cache-storage.png') })

  // offline schalten und Übersicht neu laden
  await page.setOfflineMode(true)
  const served = {}
  page.on('response', (r) => {
    const p = new URL(r.url()).pathname
    if (p === '/' || p.endsWith('conference-data.json')) served[p] = { status: r.status(), fromServiceWorker: r.fromServiceWorker() }
  })
  await page.reload({ waitUntil: 'networkidle0' })
  await wait(800)
  const cards = await page.$$eval('.card', (c) => c.length)
  // Filter offline ausprobieren
  const selects = await page.$$('select')
  await selects[0].select((await page.$$eval('select:first-of-type option', (o) => o[1].value)))
  await wait(300)
  const filtered = await page.$$eval('.card', (c) => c.length)
  await selects[0].select('')
  await wait(300)

  results.scenarios.i = { offline: true, served, sessionCards: cards, afterTrackFilter: filtered, cachesOnline }
  await overlay(page, 'Szenario i: Übersicht offline neu geladen', [
    'Netzwerk: OFFLINE (Chrome DevTools Protocol, wie DevTools → Network → Offline)',
    `/                     → Status ${served['/']?.status}, aus Service Worker: ${served['/']?.fromServiceWorker}`,
    `conference-data.json  → Status ${served['/data/conference-data.json']?.status}, aus Service Worker: ${served['/data/conference-data.json']?.fromServiceWorker}`,
    `Angezeigte Sessions: ${cards}`,
    `Nach Track-Filter: ${filtered}`,
  ])
  await page.screenshot({ path: path.join(OUT, '03-offline-uebersicht.png') })

  // ---------- Szenario ii ----------
  await page.setOfflineMode(false)
  for (const id of ['s01', 's05']) {
    await page.goto(`${BASE}/sessions/${id}`, { waitUntil: 'networkidle0' })
    const [btn] = await page.$$('xpath/.//button[contains(., "Session speichern")]')
    await btn.click()
    await wait(200)
  }
  await page.setOfflineMode(true)
  let navServed
  page.on('response', (r) => {
    if (new URL(r.url()).pathname === '/mein-programm') navServed = { status: r.status(), fromServiceWorker: r.fromServiceWorker() }
  })
  await page.goto(`${BASE}/mein-programm`, { waitUntil: 'networkidle0' })
  await wait(800)
  const storage = await page.evaluate(() => Object.fromEntries(Object.entries(localStorage)))
  const savedTitles = await page.$$eval('main li, main .card, main article', (els) => els.map((e) => e.querySelector('h2,h3,a')?.textContent?.trim()).filter(Boolean))
  await overlay(page, 'Szenario ii: Mein Programm offline neu geladen', [
    'Netzwerk: OFFLINE',
    `/mein-programm → Status ${navServed?.status}, aus Service Worker: ${navServed?.fromServiceWorker} (Navigation-Fallback index.html)`,
    '',
    'localStorage:',
    ...Object.entries(storage).map(([k, v]) => `  ${k} = ${v}`),
  ])
  await page.screenshot({ path: path.join(OUT, '04-offline-mein-programm.png') })

  // offline eine Session entfernen
  const [removeBtn] = await page.$$('xpath/.//button[contains(., "entfernen")]')
  await removeBtn?.click()
  await wait(300)
  const storageAfterRemove = await page.evaluate(() => Object.fromEntries(Object.entries(localStorage)))
  results.scenarios.ii = { offline: true, navServed, storage, savedTitles, storageAfterRemove }
  await ctx.close()
}

// ---------- Szenario iii ----------
{
  const ctx = await browser.createBrowserContext()
  const page = await ctx.newPage()
  await page.setOfflineMode(true)
  let error = null
  try {
    await page.goto(BASE + '/', { waitUntil: 'load', timeout: 10000 })
  } catch (e) {
    error = e.message.split('\n')[0]
  }
  await wait(500)
  const swRegistered = await page.evaluate(async () => !!(await navigator.serviceWorker?.getRegistration?.())).catch(() => 'nicht abfragbar (Browser-Fehlerseite)')
  results.scenarios.iii = { offline: true, error, url: page.url(), swRegistered }
  await page.screenshot({ path: path.join(OUT, '05-erstbesuch-offline.png') })
  await ctx.close()
}

await browser.close()
fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
