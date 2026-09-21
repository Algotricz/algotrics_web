import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const TMP_DIR = path.join(ROOT, 'recordings-tmp')
const OUT_DIR = path.join(ROOT, 'public', 'videos')

const SITES = [
  { slug: '01-lin-engineering', name: 'Lin Engineering', url: 'https://linengineering.in/', tech: 'Next.js' },
  { slug: '02-najmethafeet', name: 'Najmethafeet', url: 'https://najmethafeet.com/', tech: 'Angular + PHP' },
  { slug: '03-fabel-fintech', name: 'Fabel-FinTech', url: 'https://fabelfintech.com/', tech: 'Angular + PHP' },
  { slug: '04-yazhini-tours', name: 'Yazhini Tours & Travels', url: 'https://yazhinitoursandtravels.com/', tech: 'Angular + PHP' },
  { slug: '05-breakoutlabs', name: 'Breakout Labs', url: 'https://breakoutlabs.in/', tech: 'React' },
  { slug: '06-algohealthplus', name: 'Algorithm Health', url: 'https://algohealthplus.com/', tech: 'HTML/CSS/Tailwind' },
  { slug: '07-aharon-trading', name: 'Aharon Trading & Contracting', url: 'http://www.aharon-trading.com/', tech: 'Angular + PHP', http: true },
  { slug: '08-fskmrsas', name: 'FSKM RSAS', url: 'https://www.fskmrsas.com/', tech: 'Framer', skip: true },
  { slug: '09-tryon', name: 'Toco-D (sample)', url: 'https://tryon-9c264.web.app/', tech: 'Next.js' },
]

const WIDTH = 1440
const HEIGHT = 810
const only = process.argv.find((arg) => arg.startsWith('--only='))?.slice(7)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function gotoReady(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
  try {
    await page.waitForLoadState('networkidle', { timeout: 25000 })
  } catch {
    /* keep going, some sites keep connections alive */
  }
  await sleep(2500)
  await page.evaluate(() => {
    const loader = document.querySelector('#global-loader, .preloader, [class*="loader"]')
    if (loader && getComputedStyle(loader).display !== 'none') loader.remove()
  })
  await sleep(1000)
}

async function smoothScroll(page) {
  await page.evaluate(async (viewportH) => {
    const scrollToEased = (target, duration) =>
      new Promise((resolve) => {
        const start = performance.now()
        const from = window.scrollY
        const step = (now) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3)
          window.scrollTo(0, from + (target - from) * eased)
          if (t < 1) requestAnimationFrame(step)
          else resolve()
        }
        requestAnimationFrame(step)
      })

    const measure = () =>
      Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - viewportH

    const total = measure()
    const duration = Math.min(22000, Math.max(9000, Math.round(total / 90)))
    await scrollToEased(total, duration)
    await new Promise((r) => setTimeout(r, 1500))
    await scrollToEased(0, Math.min(7000, Math.round(total / 200)))
    await new Promise((r) => setTimeout(r, 900))
  }, HEIGHT)
}

async function recordSite(browser, site) {
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true,
    recordVideo: {
      dir: TMP_DIR,
      size: { width: WIDTH, height: HEIGHT },
    },
  })
  const page = await context.newPage()

  try {
    await gotoReady(page, site.url)
    await smoothScroll(page)
    const videoPath = await page.video().path()
    await context.close()

    const target = path.join(OUT_DIR, `${site.slug}.webm`)
    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.copyFileSync(videoPath, target)
    const sizeKb = Math.round(fs.statSync(target).size / 1024)
    console.log(`OK   ${site.slug}.webm  (${sizeKb} KB)  ${site.name}`)
    return true
  } catch (error) {
    await context.close().catch(() => {})
    console.log(`FAIL ${site.slug}  ${site.name}  -> ${error.message}`)
    return false
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true })
  const results = []
  for (const site of SITES) {
    if (only && site.slug !== only && site.name !== only) continue
    if (site.skip) {
      console.log(`SKIP ${site.slug}  ${site.name}  (domain expired / unreachable)`)
      continue
    }
    results.push(await recordSite(browser, site))
  }
  await browser.close()
  const ok = results.filter(Boolean).length
  console.log(`\nDone: ${ok}/${results.length} recorded -> ${OUT_DIR}`)
}

main().catch((error) => {
  console.error('Fatal:', error)
  process.exit(1)
})