"""Compute @font-face overrides so local fallbacks occupy the same space as the webfonts.
    python3 scripts/fallback-metrics.py
Prints CSS for src/styles/fonts.css."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SAMPLE = "The clock hanging on the wall was displaying nine while on my laptop it was two minutes past, and mom summoned us for dinner."

def width(font, text):
    cmap = font.getBestCmap(); hmtx = font["hmtx"]; upm = font["head"].unitsPerEm
    return sum(hmtx[cmap[ord(c)]][0] for c in text if ord(c) in cmap) / upm

def metrics(font):
    hhea = font["hhea"]; os2 = font["OS/2"]; upm = font["head"].unitsPerEm
    if os2.fsSelection & (1 << 7):  # USE_TYPO_METRICS
        return os2.sTypoAscender / upm, -os2.sTypoDescender / upm, os2.sTypoLineGap / upm
    return hhea.ascent / upm, -hhea.descent / upm, hhea.lineGap / upm

def fallback(name, web, loc, local_name, axes):
    w = TTFont(ROOT / web)
    if axes: w = instancer.instantiateVariableFont(w, axes)
    f = TTFont(loc)
    adj = width(w, SAMPLE) / width(f, SAMPLE)
    a, d, g = metrics(w)
    print(f"""@font-face {{
  font-family: "{name}";
  src: local("{local_name}");
  size-adjust: {adj*100:.2f}%;
  ascent-override: {a/adj*100:.2f}%;
  descent-override: {d/adj*100:.2f}%;
  line-gap-override: {g/adj*100:.2f}%;
}}""")

SUP = "/System/Library/Fonts/Supplemental/"
fallback("Bricolage Fallback", "src/assets/fonts/bricolage.woff2", SUP + "Arial Bold.ttf", "Arial Bold", {"wght": 700, "wdth": 85})
fallback("Newsreader Fallback", "src/assets/fonts/newsreader-italic.woff2", SUP + "Georgia Italic.ttf", "Georgia Italic", None)
fallback("Source Serif Fallback", "src/assets/fonts/source-serif-roman.woff2", SUP + "Georgia.ttf", "Georgia", {"wght": 400})
fallback("Plex Mono Fallback", "src/assets/fonts/plex-mono.woff2", SUP + "Courier New.ttf", "Courier New", None)
