// Lighthouse (mobile, default throttling) on every page. Prints the four category scores and CLS.
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { base, pages } from './pages.mjs';

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new'] });
const rows = [];
for (const path of pages.filter((p) => p !== '/does-not-exist')) {
  const { lhr } = await lighthouse(base + path, { port: chrome.port, output: 'json', logLevel: 'error' });
  const s = (k) => Math.round(lhr.categories[k].score * 100);
  rows.push({
    page: path,
    perf: s('performance'),
    a11y: s('accessibility'),
    bp: s('best-practices'),
    seo: s('seo'),
    LCP: lhr.audits['largest-contentful-paint'].displayValue,
    CLS: lhr.audits['cumulative-layout-shift'].displayValue,
    TBT: lhr.audits['total-blocking-time'].displayValue,
  });
  const failed = Object.values(lhr.audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative' && a.scoreDisplayMode !== 'notApplicable' && a.scoreDisplayMode !== 'manual');
  if (failed.length) console.log(path, '→', failed.map((a) => a.id).join(', '));
}
chrome.kill();
console.table(rows);
