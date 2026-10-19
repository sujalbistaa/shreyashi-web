"""Derive slimmed, self-hosted webfonts from the installed Fontsource packages.

Run once after `npm install` if the font choices change:
    python3 scripts/build-fonts.py

Each variable font is subset to Latin, then instanced: the optical-size axis is
pinned where each face is mostly read (display 72, italic 56, text 20) and the weight axis
narrowed to the weights the design uses. Italics become static single weights.
This takes a page's fonts from ~350KB to ~130KB.
Output goes to src/assets/fonts/ and is committed.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
NM = ROOT / "node_modules"
OUT = ROOT / "src/assets/fonts"
OUT.mkdir(parents=True, exist_ok=True)

# Basic Latin, Latin-1, typographic punctuation, superscripts, arrows used in UI.
UNICODES = "U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+2002-2014,U+2018-201E,U+2022,U+2026,U+2032-2033,U+2039-203A,U+2070-2079,U+00B9,U+00B2,U+00B3,U+2116,U+2190-2193,U+2197,U+2212,U+2215,U+20AC"

JOBS = [
    ("@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2", "bricolage.woff2", {"wght": (500, 800), "wdth": (75, 100), "opsz": 72}),
    ("@fontsource-variable/newsreader/files/newsreader-latin-opsz-italic.woff2", "newsreader-italic.woff2", {"wght": 300, "opsz": 56}),
    ("@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2", "source-serif-roman.woff2", {"wght": (400, 600), "opsz": 20}),
    ("@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-italic.woff2", "source-serif-italic.woff2", {"wght": 400, "opsz": 18}),
]

def unicodes():
    out = []
    for part in UNICODES.split(","):
        part = part.replace("U+", "")
        if "-" in part:
            a, b = part.split("-")
            out.extend(range(int(a, 16), int(b, 16) + 1))
        else:
            out.append(int(part, 16))
    return out

for src, dst, limits in JOBS:
    font = TTFont(NM / src)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]  # keep onum, tnum, liga, kern, sups, etc.
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=unicodes())
    sub.subset(font)
    font = instancer.instantiateVariableFont(font, limits)
    font.flavor = "woff2"
    font.save(OUT / dst)
    print(dst, (OUT / dst).stat().st_size // 1024, "KB")

# Plex Mono is static; one weight is enough for metadata.
mono = TTFont(NM / "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2")
opts = subset.Options(); opts.flavor = "woff2"; opts.layout_features = ["*"]
sub = subset.Subsetter(opts); sub.populate(unicodes=unicodes()); sub.subset(mono)
mono.flavor = "woff2"; mono.save(OUT / "plex-mono.woff2")
print("plex-mono.woff2", (OUT / "plex-mono.woff2").stat().st_size // 1024, "KB")
