# slides/

The workshop deck — **The One-Hour Personal Site** (17 slides).

- **`founder-site-workshop.pptx`** — the deck. Open in PowerPoint, Keynote, or Google Slides.
- `build.js` — the generator. Fittingly, the deck is produced from code.

## Arc

Title → thesis → what you'll watch → the method → the ledger → parallel vs.
sequential → four ways to run agents → context discipline → cockpits →
what we build → **(to the terminal — live demo)** → verify → ship → the
judgment call (what *not* to automate live) → takeaways → take-home → close.

It's a **companion**, not a script — sparse during the live build (the terminal
is the show), rich for the framing and the close. Pair it with `../RUNSHEET.md`.

## Rebuild

```bash
npm install pptxgenjs qrcode
node build.js          # writes founder-site-workshop.pptx
```

Design: Georgia / Calibri / Consolas; Memori indigo (`#5B3DF5`) on white, with
dark title / section / close slides. The QR on the take-home slide points at this
repo. Built with [PptxGenJS](https://gitbrent.github.io/PptxGenJS/).
