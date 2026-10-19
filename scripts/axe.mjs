// axe-core (WCAG 2.2 A/AA) on every page, with the OS in light and dark mode (the site stays light), at 390 and 1440.
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { base, pages } from './pages.mjs';

const browser = await chromium.launch();
let total = 0;
for (const colorScheme of ['light', 'dark']) {
  for (const width of [390, 1440]) {
    const page = await (await browser.newContext({ viewport: { width, height: 900 }, colorScheme, reducedMotion: 'reduce' })).newPage();
    for (const path of pages) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      const { violations } = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      for (const v of violations) {
        total += v.nodes.length;
        console.log(`${colorScheme} ${width} ${path}: [${v.impact}] ${v.id} — ${v.help}`);
        for (const n of v.nodes.slice(0, 3)) console.log('    ', n.target.join(' '), n.failureSummary?.split('\n')[1] ?? '');
      }
    }
  }
}
await browser.close();
console.log(total ? `${total} violation node(s).` : 'axe: 0 violations on every page, with the system in light and dark mode, at both widths.');
