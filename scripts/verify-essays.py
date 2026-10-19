"""Diff each essay in src/content/essays against its source .docx (via pandoc).
Prints only word-level differences, so every edit to her text is visible.
    python3 scripts/verify-essays.py"""
import re, subprocess, difflib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NORM = {"’": "'", "‘": "'", "“": '"', "”": '"', "—": " -- ", "–": " -- "}

def norm(t):
    for a, b in NORM.items(): t = t.replace(a, b)
    t = t.replace("\\'", "'").replace("**", "").replace("^th^", "th")
    return re.sub(r"\s+", " ", t).strip().split(" ")

for md in sorted((ROOT / "src/content/essays").glob("*.md")):
    raw = md.read_text()
    fm, body = raw.split("---", 2)[1:]
    src = re.search(r'^source: "(.+)"', fm, re.M).group(1)
    body = re.sub(r"<aside.*?</aside>", "", body, flags=re.S)
    body = re.sub(r"<[^>]+>", "", body)
    orig = subprocess.run(["pandoc", str(ROOT / "context" / src), "-t", "plain", "--wrap=none"], capture_output=True, text=True).stdout
    lines = [l for l in orig.splitlines() if l.strip()]
    title_lines = 2 if src.startswith("DARK") else 1
    a, b = norm(" ".join(lines[title_lines:])), norm(body)
    print(f"== {md.name}  (source words {len(a)}, site words {len(b)})")
    cover = re.search(r'^coverLine: "(.+)"', fm, re.M)
    if cover and " ".join(norm(cover.group(1).strip("…"))) not in " ".join(a):
        print("   coverLine is NOT a verbatim quote from the source")
    for op, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if op != "equal":
            print(f"   {op}: {' '.join(a[max(0,i1-3):i2+3])!r}  ->  {' '.join(b[max(0,j1-3):j2+3])!r}")
