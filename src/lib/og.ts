/**
 * Open Graph cards, 1200×630, drawn with Satori and rasterised with sharp.
 * Same language as the site: a tint panel, heavy grotesk title, serif italic aside,
 * a red spot for the number, and an ink outline.
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const PAPER = '#fbf8f3';
const INK = '#161514';
const INK_2 = '#45413b';
const RED = '#e2362b';

export const TINTS = {
  Gender: '#fad3dc',
  Nature: '#c9ebd5',
  Climate: '#f9e79b',
  default: '#dcd5fa',
} as const;

const font = (file: string) => readFile(resolve(process.cwd(), 'node_modules', file));

let fonts: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
function loadFonts() {
  fonts ??= Promise.all([
    font('@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-800-normal.woff'),
    font('@fontsource/newsreader/files/newsreader-latin-300-italic.woff'),
    font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff'),
  ]).then(([grotesk, italic, mono]) => [
    { name: 'Bricolage', data: grotesk, weight: 800, style: 'normal' },
    { name: 'Newsreader', data: italic, weight: 300, style: 'italic' },
    { name: 'Plex Mono', data: mono, weight: 400, style: 'normal' },
  ]);
  return fonts;
}

type Node = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

const mono = (text: string, extra: Record<string, unknown> = {}) =>
  el('div', { fontFamily: 'Plex Mono', fontSize: 22, letterSpacing: 1.6, textTransform: 'uppercase', color: INK, ...extra }, text);

export type Card = {
  /** Shown in the red spot, e.g. "01". Omit for the site card. */
  number?: string;
  kicker: string;
  title: string;
  italic?: string;
  tint: string;
  footLeft: string;
  footRight: string;
};

export async function renderCard(card: Card): Promise<Buffer> {
  const size = card.title.length > 40 ? 76 : card.title.length > 24 ? 92 : 124;

  const panel = el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      // Satori sizes boxes content-box: subtract padding (44+44, 36+34) and border (3+3).
      width: 1200 - 96 - 88 - 6,
      height: 630 - 96 - 70 - 6,
      margin: 48,
      padding: '36px 44px 34px',
      background: card.tint,
      border: `3px solid ${INK}`,
    },
    [
      el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [
        el('div', { display: 'flex', alignItems: 'center' }, [
          el('div', { width: 26, height: 26, borderRadius: 13, background: RED, marginRight: 14 }),
          el('div', { fontFamily: 'Bricolage', fontSize: 30, letterSpacing: -0.5, color: INK }, 'Shreyashi Bista'),
        ]),
        mono(card.kicker),
      ]),
      el('div', { display: 'flex', alignItems: 'flex-start' }, [
        ...(card.number
          ? [
              el(
                'div',
                {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  width: 92,
                  height: 92,
                  borderRadius: 46,
                  background: RED,
                  color: PAPER,
                  fontFamily: 'Bricolage',
                  fontSize: 44,
                  marginRight: 30,
                  marginTop: 6,
                  transform: 'rotate(-10deg)',
                },
                card.number,
              ),
            ]
          : []),
        el('div', { display: 'flex', flexDirection: 'column', maxWidth: card.number ? 900 : 1000 }, [
          el(
            'div',
            { fontFamily: 'Bricolage', fontSize: size, lineHeight: 0.96, letterSpacing: -2, color: INK, textWrap: 'balance' },
            card.title,
          ),
          ...(card.italic
            ? [el('div', { fontFamily: 'Newsreader', fontStyle: 'italic', fontSize: 46, color: INK_2, marginTop: 14 }, card.italic)]
            : []),
        ]),
      ]),
      el('div', { display: 'flex', justifyContent: 'space-between' }, [mono(card.footLeft), mono(card.footRight)]),
    ],
  );

  const tree = el('div', { display: 'flex', width: 1200, height: 630, background: PAPER }, [panel]);
  const svg = await satori(tree as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts: await loadFonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toBuffer();
}

export const pngResponse = (png: Buffer) =>
  new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
