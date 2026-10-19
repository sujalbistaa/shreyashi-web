> **Superseded.** This was the first proposal (quiet editorial, serif-led, dark mode). The site was later redesigned as a light, colour-blocked magazine: Bricolage Grotesque headlines with Newsreader italics, ladybird red, and section tints (Writing pink, Research mint, About lilac, Contact butter). The tokens in `src/styles/tokens.css` and the README are now the reference.

# Design brief: Shreyashi Bista

## The idea: a field journal

Her material has two halves that meet in one place. The **essays** are about gender, family, ritual and self (Saturday, Cinderella, Dashain) and about nature and climate (Ladybird, Climate). The **CV** is about wildlife ecology *and* gender and social inclusion in conservation: GESI in UNDP's NBSAP, women's climate leadership with the Badi community, a care-ethics dissertation. The ladybird essay links the two directly: a twelve-year-old turning over leaves with her father becomes the ecologist.

So the site should read like **an independent literary journal kept by a field scientist**: a quiet printed page, carefully set, with the order and marginalia of a naturalist's notebook. That means numbered entries, small mono metadata in the margins, hairline rules, and one red mark.

That red is the accent, and it comes from her own writing: **ladybird red**. It's also the red of Dashain tika, which ties to the other essay. It appears once or twice per screen at most.

## Typography

All fonts self-hosted via Fontsource variable packages (all confirmed available on npm), with `font-display: swap` and metric-matched fallbacks (`size-adjust`, `ascent-override`) so swapping fonts causes no layout shift.

| | Display | Text | Metadata |
|---|---|---|---|
| **A: Field Journal (recommended)** | **Newsreader**, opsz 72, wght 300–420, with its italic | **Source Serif 4**, opsz text, 400/600 + italic | **IBM Plex Mono** 400, small caps-height labels only |
| B: Caslon Quarterly | Libre Caslon Display | Literata (opsz) | IBM Plex Mono |
| C: Brygada | Brygada 1918 (+ italic) | Literata | Spline Sans Mono |

**Why A.** Newsreader at its display optical size is sharp and high-contrast, with a beautiful light italic, which suits a masthead name and essay titles at 6–11rem. Source Serif 4 is one of the best screen text serifs available. Its optical sizing, true old-style figures (`onum`) and tabular figures (`tnum`) cover everything the brief asks for. Plex Mono gives the notebook feel for numerals, dates and reading times without turning techy. B is more classical and literary. C has the most personality but is less proven for long reading.

**Craft rules**
- Fluid scale, using `clamp()` on a 1.250 ratio below the body size and 1.333 above it. Body text 1.125rem → 1.3125rem at 1440px+.
- Masthead: `clamp(3.75rem, 13vw, 11.5rem)`, tracking −0.02em, Newsreader 300. Splits "Shreyashi / Bista" over two lines at every width, set flush left.
- Reading measure **64ch**, line-height 1.6 for body and 1.05 for display.
- `text-wrap: balance` on headings, `pretty` on paragraphs, `hanging-punctuation: first last` (Safari; harmless elsewhere).
- `font-variant-numeric: oldstyle-nums proportional-nums` in prose, `lining-nums tabular-nums` in the index and CV dates.
- Curly quotes, em dashes and thin spaces fixed at build time by a remark plugin (smartypants), so the Markdown stays readable.
- Drop cap: three-line, Newsreader 300, ink not red, using `initial-letter: 3` with a float fallback. On the essay page only.
- Labels: Plex Mono 0.75rem, uppercase, +0.08em tracking. Used sparingly.

## Palette

| Token | Light (paper) | Dark (night paper) | Use | Contrast on bg |
|---|---|---|---|---|
| `--paper` | `#F4EFE6` | `#1C1A17` | page | — |
| `--paper-sunk` | `#EAE3D6` | `#24211D` | CV blocks, code | — |
| `--ink` | `#1F1C18` | `#ECE5D8` | text | 14.8 / 13.9 |
| `--ink-2` | `#4A453E` | `#C9C0B2` | secondary text | 8.3 / — |
| `--ink-3` | `#6E675D` | `#A69D90` | metadata, captions | 4.9 / 6.5 (AA) |
| `--rule` | `#CFC6B8` | `#3A352F` | hairlines (decorative) | — |
| `--accent` | `#B3261E` (ladybird) | `#E2624B` | link hover, index numeral on hover, one rule, focus ring | 5.7 / 5.0 (AA) |

Dark mode follows `prefers-color-scheme`, with a small text toggle ("Night / Day") in the footer. No pure white, pure black, gradients or shadows. Elevation is shown only with hairlines.

## Grid

- **Desktop ≥1024:** 12 columns, max content width 1440px, outer margin `clamp(1rem, 4vw, 4rem)`, gutter `clamp(1rem, 1.6vw, 2rem)`.
- **Tablet 768–1023:** 8 columns. **Mobile <768:** 4 columns with a 16px margin.
- **Running head** on every page: a top hairline, with "Shreyashi Bista" on the left and the section name and number on the right (e.g. `02 — Writing`), in Plex Mono.
- **Essay page:** text in cols 4–10 (≈64ch). Cols 1–3 hold sticky marginalia (essay number, theme, reading time, year). The pull quote hangs out into cols 10–12. On mobile the marginalia become a single mono line under the title, and the pull quote sits inline with a left hairline.

```
HOME, 1440px
┌────────────────────────────────────────────────────────────────┐
│ Shreyashi Bista                                    Writing  About  Contact │  running head
├────────────────────────────────────────────────────────────────┤
│                                                                │
│ Shreyashi                                                      │  masthead, cols 1–12
│        Bista                                                   │  (2nd line indented 2 cols)
│                                                                │
│                         ┌ intro, cols 6–11, text serif 1.5rem ┐│
├── 01 ─ Writing ────────────────────────────────────────────────┤
│ 01  This Dashain Is Finally Certain!        Gender    2020  3 min│  typographic TOC
│ 02  Little lady and ladybug                 Nature    ····  2 min│  hairline between rows
│ …                                                              │
├── 02 ─ About ──────────────────────────────────────────────────┤
│ [portrait cols 1–4]   short bio cols 6–11 → Read the CV        │
├── 03 ─ Contact ────────────────────────────────────────────────┤
│ email, set large in display italic                             │
└────────────────────────────────────────────────────────────────┘
```

On mobile the masthead fills the width on two lines, the index rows stack the title above one mono line (`Gender · 2020 · 3 min`), and the numerals stay in a left gutter column. This keeps the print feel rather than turning the rows into stacked cards.

## Pages

1. **Home**: masthead, intro (wording below, pending your approval), essay index, about teaser with portrait (if approved), contact.
2. **/writing**: all 5 essays as a table of contents with columns № · Title · Theme · Year · Reading time. **No filter**, since five entries don't justify one. The theme column does that job. The first-line summary appears on hover/focus on desktop and always on mobile.
3. **/writing/[slug]**: running head, title (with a View Transition morph from the index row), marginalia, drop cap, one pull quote taken verbatim from the essay, the essay image where one exists (Cinderella only), previous/next essay at the foot.
4. **/about**: the CV set as HTML, with dates in a tabular mono column on the left and entries on the right, plus a "Download CV (PDF)" link to the original file.
5. **/contact**: the `mailto:` address and her real links. No form.
6. **/colophon**: fonts, built with Astro, hosting, year.
7. **404**: same voice, e.g. "This page has wandered off the trail." with links back. (I'll show you the wording.)
8. *Proposed (needs your OK):* **Research**, either as a section on /about or its own page, listing her publications with DOIs. Her scientific work is a big part of who she is, and right now the site would only show it inside the CV.

## Intro wording (pick one or edit)

1. **Factual, from the CV:** "Shreyashi Bista is a conservation researcher from Kathmandu, Nepal, working where wildlife, people and policy meet. She also writes essays on gender, family and the natural world."
2. **Her words as an epigraph, then a factual line (recommended):**
   > "…to be a part of it rather than becoming a master to it."
   >
   > Essays and research by Shreyashi Bista, conservation researcher, Kathmandu.
3. **Shortest:** "Essays on gender, nature and climate by Shreyashi Bista, a conservation researcher from Kathmandu."

"Working where wildlife, people and policy meet" in option 1 is my summary of her listed research interests, not a quote.

## Motion

- One easing curve, `--ease: cubic-bezier(0.22, 0.61, 0.21, 1)`, and three durations: 160ms (hover), 240ms (reveal), 380ms (page).
- **Page load:** main content rises 6px and fades in over 380ms, once. Up to 5 index rows are staggered by 40ms. No scroll-triggered reveals below the fold.
- **Index row hover/focus:** the numeral turns ladybird red, the title shifts 4px right, and the row's bottom hairline draws left to right (`scaleX`, 240ms). Focus gets the same treatment plus a 2px accent outline offset by 4px.
- **View Transitions:** a crossfade between pages, with the essay title morphing from its index row into the essay heading.
- **`prefers-reduced-motion: reduce`:** all transforms and transitions are removed and View Transitions are disabled. Content is visible immediately.
- JS budget: Astro ClientRouter (~4KB) plus the theme toggle (<1KB). Nothing else.

## Technical outline

Astro (latest) + TypeScript, with content collections (`src/content/essays/*.md`, Zod schema: title, slug, number, year, summary, theme, image?, imageAlt?, pullQuote, readingTime). Plain CSS, with tokens in `src/styles/tokens.css` and no Tailwind, to keep the custom look. Images through `astro:assets` (AVIF/WebP, srcset). Satori + resvg for per-essay typographic OG images (paper background, Newsreader title, number, name, one red rule). `@astrojs/sitemap`, robots.txt, canonical URLs, and JSON-LD (`Person` with ResearchGate `sameAs`, `Article` per essay). Playwright + Lighthouse CI + axe for the quality gate.
