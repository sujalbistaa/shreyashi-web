// Full-page screenshots of every page at the given widths, plus console errors.
// Usage: npm run preview & npm run qa:screens  (widths default to 390 and 1440)
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { base, pages } from './pages.mjs';

const widths = (process.argv[2] ?? '390,1440').split(',').map(Number);
const scheme = process.argv[3] ?? 'light';
const out = new URL('../qa/screens/', import.meta.url);
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const problems = [];
for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
  const page = await context.newPage();
  page.on('console', (m) => m.type() === 'error' && problems.push(`${width} ${page.url()}: ${m.text()}`));
  page.on('pageerror', (e) => problems.push(`${width} ${page.url()}: ${e.message}`));
  for (const path of pages) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) problems.push(`${width} ${path}: horizontal overflow ${overflow}px`);
    const name = `${width}-${scheme}-${path === '/' ? 'home' : path.slice(1).replaceAll('/', '_')}.png`;
    await page.screenshot({ path: new URL(name, out).pathname, fullPage: true, animations: 'disabled' });
  }
  await context.close();
}
await browser.close();
console.log(problems.length ? problems.join('\n') : 'No console errors, no horizontal overflow.');
