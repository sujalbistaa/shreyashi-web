# Shreyashi Bista — essays and research

A static site built with [Astro](https://astro.build). Essays live as Markdown and all facts live in data files. There's no client-side JavaScript. The site is light only.

## Run, build, preview

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # type-checks (astro check), then builds to dist/
npm run preview    # serves dist/ at http://localhost:4321
```

Requires Node 20+.

## Deploy (free, on Cloudflare Pages)

1. Push this folder to the GitHub repository (`shreyash-web`).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choose `shreyash-web`.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Environment variables (Production):
   - `NODE_VERSION` = `24` (Astro 7 needs Node 22.22 or newer; `.node-version` says the same)
   - `SITE_URL` = the site's address, e.g. `https://shreyash-web.pages.dev`. Canonical links, the sitemap, robots.txt, share images and structured data all use it.
5. **Save and Deploy.** Every later `git push` to `main` redeploys automatically.
6. Optional: **Custom domains** → add a domain, follow the DNS steps, then update `SITE_URL` and redeploy.

Netlify and Vercel work the same way: same build command, same `dist` folder, same two variables.

## Where things live

```
context/                     source material (CV, .docx essays, original photos). Git-ignored: local only
src/content/essays/*.md      the five essays (frontmatter: title, number, year, theme, summary, …)
src/data/site.ts             name, email, links, home-page intro
src/data/cv.ts               the CV, transcribed from the PDF
src/data/research.ts         publications, theses, presentations, interests
src/assets/images/           portrait and essay photographs (optimised to AVIF/WebP at build)
src/assets/fonts/            slimmed webfonts (generated, see below)
src/styles/tokens.css        every colour, size, space and motion value
src/styles/base.css          reset, grid, shared primitives
src/styles/prose.css         long-form essay setting
src/components/              RunningHead, Footer, SectionHead, EssayIndex, Plate
src/pages/                   one file per page; og/ renders Open Graph images
public/cv/                   the downloadable CV PDF
scripts/                     font build, essay verification, QA
```

## Common edits

**Change an essay's photograph.** Put the file in `src/assets/images/`, then in the essay's `.md` file set
`image: ../../assets/images/your-file.jpg` and `imageAlt: "…what the photo shows…"`.

Photos used elsewhere: `portrait.jpg` and `field-4x5.jpg` (home cover, About), `sticker-portrait.jpg` (the round sticker on the home page, cropped from `context/originals/ghilbi.png`), and `research-community.jpg` / `research-riverbed.jpg` (Research page). Large originals belong in `context/originals/`, which is not committed.

**Confirm an essay's year.** Set `year:` and change `yearIsPlaceholder: true` to `false` (or delete the line). JSON-LD only includes `datePublished` once the year is confirmed.

**Add an essay.** Copy an existing `.md` file, give it the next `number`, and fill in the frontmatter. Its page, index row, Open Graph image and sitemap entry are generated automatically. To keep the text verifiable, set `source:` to its .docx in `context/` and run `python3 scripts/verify-essays.py`.

**Update the CV.** Edit `src/data/cv.ts` and replace `public/cv/Shreyashi-Bista-CV.pdf`.

## Typography

- Headlines: **Bricolage Grotesque** (condensed, heavy). Italic accents: **Newsreader**. Essay text: **Source Serif 4**. Labels: **IBM Plex Mono**.
- All four are installed from Fontsource. `scripts/build-fonts.py` subsets them to Latin, pins the optical size and narrows the weight and width axes. Re-run it only if the font choices change (`python3 scripts/build-fonts.py`, needs `fonttools` and `brotli`).

## Colour

Light only, set in `src/styles/tokens.css`: paper, ink, ladybird red, and four tints. Each essay theme has a tint (pink for Gender, mint for Nature, butter for Climate), and so does each section page (Writing pink, Research mint, About lilac, Contact butter). Every tint passes WCAG AA with ink and with the smallest grey text.
- `scripts/fallback-metrics.py` computes the `size-adjust`/`ascent-override` values in `src/styles/fonts.css`. These make the fallback font occupy the same space as the webfont, so text doesn't shift when fonts load.

## Quality checks

With `npm run preview` running in another terminal:

```sh
npm run qa:screens                         # full-page screenshots at 390 and 1440 → qa/screens/
node scripts/screenshots.mjs 360,768,1920  # any widths; add "dark" as a 2nd argument for night mode
npm run qa:axe                             # axe-core WCAG 2.2 AA on every page, at 390 and 1440
npm run qa:lighthouse                      # Lighthouse mobile scores for every page
python3 scripts/verify-essays.py           # word-level diff of each essay against its .docx
```

Playwright needs a browser once: `npx playwright install chromium`.
