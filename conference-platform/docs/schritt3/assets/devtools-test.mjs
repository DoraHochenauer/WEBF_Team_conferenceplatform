// Öffnet echte Chrome-DevTools für die getestete Seite und macht Screenshots davon
import puppeteer from 'puppeteer-core'
import path from 'node:path'

const BASE = 'http://localhost:4174'
const PORT = 9333
const OUT = process.argv[2]
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: [`--remote-debugging-port=${PORT}`],
  defaultViewport: { width: 1920, height: 1080 },
})

async function openDevTools(page) {
  const id = page.target()._targetId
  const dt = await browser.newPage()
  await dt.goto(`http://127.0.0.1:${PORT}/devtools/inspector.html?ws=127.0.0.1:${PORT}/devtools/page/${id}`)
  await wait(2500)
  // Sprachhinweis schließen, DevTools-Bereich breiter ziehen (Trennlinie zur Seitenvorschau)
  await dt.mouse.click(1893, 20)
  await wait(400)
  await dt.mouse.move(1621, 600)
  await dt.mouse.down()
  await dt.mouse.move(1100, 600, { steps: 10 })
  await dt.mouse.up()
  await wait(500)
  return dt
}

// Befehl über das Command-Menü der DevTools ausführen (Strg+Shift+P)
async function command(dt, text) {
  await dt.bringToFront()
  await dt.keyboard.down('Control'); await dt.keyboard.down('Shift')
  await dt.keyboard.press('KeyP')
  await dt.keyboard.up('Shift'); await dt.keyboard.up('Control')
  await wait(600)
  await dt.keyboard.type(text, { delay: 20 })
  await wait(600)
  await dt.keyboard.press('Enter')
  await wait(1200)
}

async function consoleEval(dt, expr) {
  await command(dt, 'Show Console')
  await dt.keyboard.type(expr, { delay: 5 })
  await dt.keyboard.press('Enter')
  await wait(1500)
}

const mode = process.argv[3] ?? 'probe'

if (mode === 'probe') {
  const ctx = await browser.createBrowserContext()
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' })
  const dt = await openDevTools(page)
  await command(dt, 'Show Network')
  await dt.screenshot({ path: path.join(OUT, 'probe.png') })
}

if (mode === 'all') {
  // ---------- Szenario i ----------
  const ctx = await browser.createBrowserContext()
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle0' })
  await page.waitForFunction(async () => navigator.serviceWorker.controller && (await (await caches.open('conference-data')).keys()).length > 0, { timeout: 15000 })
  const dt = await openDevTools(page)

  await command(dt, 'Show Network')
  await command(dt, 'Go offline')
  await page.bringToFront()
  await page.reload({ waitUntil: 'networkidle0' })
  await wait(1500)
  await dt.bringToFront()
  await wait(800)
  await dt.screenshot({ path: path.join(OUT, 'devtools-i-network-offline.png') })

  await consoleEval(dt, "navigator.onLine + ' | ' + (await caches.keys()).join(', ') + ' | Sessions: ' + document.querySelectorAll('.card').length")
  await dt.screenshot({ path: path.join(OUT, 'devtools-i-console-caches.png') })

  // ---------- Szenario ii ----------
  await command(dt, 'Go online')
  for (const id of ['s01', 's05']) {
    await page.goto(`${BASE}/sessions/${id}`, { waitUntil: 'networkidle0' })
    const [btn] = await page.$$('xpath/.//button[contains(., "Session speichern")]')
    await btn.click()
    await wait(200)
  }
  await command(dt, 'Show Network')
  await command(dt, 'Go offline')
  await page.goto(`${BASE}/mein-programm`, { waitUntil: 'networkidle0' })
  await wait(1500)
  await dt.screenshot({ path: path.join(OUT, 'devtools-ii-network-offline.png') })
  await consoleEval(dt, "navigator.onLine + ' | myProgram = ' + localStorage.getItem('myProgram') + ' | ' + [...document.querySelectorAll('main li a')].map(a => a.textContent).join(' / ')")
  await dt.screenshot({ path: path.join(OUT, 'devtools-ii-console-localstorage.png') })
  await ctx.close()

  // ---------- Szenario iii ----------
  const ctx3 = await browser.createBrowserContext()
  const page3 = await ctx3.newPage()
  const dt3 = await openDevTools(page3)
  await command(dt3, 'Show Network')
  await command(dt3, 'Go offline')
  await page3.goto(BASE + '/').catch(() => {})
  await wait(1500)
  await dt3.screenshot({ path: path.join(OUT, 'devtools-iii-network-offline.png') })
}

await browser.close()
