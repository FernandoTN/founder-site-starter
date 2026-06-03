# slides/

The workshop deck — **Run a team of AI agents, not a chat** (13 slides).

- **`founder-site-workshop.pptx`** — the deck. Open in PowerPoint, Keynote, or Google Slides.
- `build.js` — the generator. Fittingly, the deck is produced from code, and is the source of truth — edit it and rebuild rather than editing the `.pptx` by hand.

## Arc

Title → thesis (orchestration > prompting) → what you'll watch → the method (five
moves) → the ledger → parallel vs. sequential → four ways to run agents → context
discipline → cockpits → **(to the terminal — live: `/orchestrate`)** → takeaways →
take-home (clone the boilerplate) → close.

It's a **companion**, not a script — sparse during the live build (the terminal is
the show), rich for the framing and the close.

## Rebuild

```bash
npm install pptxgenjs qrcode
node build.js          # writes founder-site-workshop.pptx
```

Design: Georgia / Calibri / Consolas; Memori indigo (`#5B3DF5`) on white, with dark
title / section / close slides. The QR on the take-home slide points at this repo.
Built with [PptxGenJS](https://gitbrent.github.io/PptxGenJS/).
