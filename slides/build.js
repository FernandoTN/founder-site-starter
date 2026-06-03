const pptxgen = require("pptxgenjs");
const QRCode = require("qrcode");

// ---------- palette ----------
const INK = "17151F", PAPER = "FFFFFF", INDIGO = "5B3DF5", INDIGO_DK = "4A2FD0";
const LAV = "EFEAFF", LAVTXT = "C3BCE0", MUTED = "6B6770", INKSOFT = "33303C", LINE = "E7E4EF";
const GREEN = "1F8A55", GREEN_BG = "E6F4EC", RED = "C0492E", RED_BG = "F7E9E4";
const AMBER = "B5791A", AMBER_BG = "F6EEDC";
const SERIF = "Georgia", SANS = "Calibri", MONO = "Consolas";
const W = 13.33, H = 7.5, MX = 0.6;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.author = "Fernando Torres";
pres.title = "Run a team of AI agents — Stanford workshop";

const sh = () => ({ type: "outer", color: "17151F", blur: 9, offset: 3, angle: 135, opacity: 0.12 });

function tag(slide, text, color) {
  slide.addText(text.toUpperCase(), { x: MX, y: 0.42, w: 9, h: 0.3, fontFace: MONO, fontSize: 12, color: color || INDIGO, charSpacing: 2, bold: true, margin: 0 });
}
function title(slide, text, color, y, size) {
  slide.addText(text, { x: MX, y: y || 0.82, w: W - 2 * MX, h: 1.0, fontFace: SERIF, fontSize: size || 34, color: color || INK, bold: true, margin: 0, valign: "top" });
}
function footer(slide, n, dark) {
  const c = dark ? LAVTXT : MUTED;
  slide.addText("Run a team of AI agents · not a chat", { x: MX, y: H - 0.42, w: 8, h: 0.3, fontFace: MONO, fontSize: 9, color: c, margin: 0 });
  slide.addText(String(n), { x: W - 1.1, y: H - 0.42, w: 0.5, h: 0.3, fontFace: MONO, fontSize: 9, color: c, align: "right", margin: 0 });
}
function chev(slide, x, y, color, size) {
  slide.addText("›", { x, y, w: 0.5, h: 0.5, fontFace: SANS, fontSize: size || 30, bold: true, color: color || INDIGO, align: "center", valign: "middle", margin: 0 });
}
function box(slide, x, y, w, h, fill, lineColor) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { color: lineColor || LINE, width: 1 }, shadow: sh() });
}

async function main() {
  // ===== Slide 1 — Title (dark) =====
  {
    const s = pres.addSlide(); s.background = { color: INK };
    s.addText("›", { x: MX, y: 0.5, w: 0.5, h: 0.4, fontFace: MONO, fontSize: 18, color: INDIGO, bold: true, margin: 0 });
    s.addText("STANFORD GSB · MSx WORKSHOP — JUNE 3, 2026", { x: MX + 0.35, y: 0.55, w: 10, h: 0.3, fontFace: MONO, fontSize: 12, color: LAVTXT, charSpacing: 2, margin: 0 });
    s.addText([
      { text: "Run a team of AI agents.", options: { breakLine: true, color: PAPER } },
      { text: "Not a chat.", options: { color: INDIGO } },
    ], { x: MX, y: 2.2, w: 11.5, h: 2.2, fontFace: SERIF, fontSize: 58, bold: true, lineSpacingMultiple: 0.98, margin: 0 });
    s.addText("From one idea to a live personal site — with a private CRM — in an hour.", { x: MX, y: 4.7, w: 10.5, h: 0.6, fontFace: SANS, fontSize: 20, color: LAVTXT, margin: 0 });
    // motif: four parallel agent squares
    for (let i = 0; i < 4; i++) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 9.9 + i * 0.62, y: 0.55, w: 0.45, h: 0.45, rectRadius: 0.06, fill: { color: i === 0 ? INDIGO : INDIGO_DK }, line: { color: INDIGO, width: 1 } });
    }
    s.addText("Fernando Torres — Memori", { x: MX, y: 6.5, w: 11, h: 0.4, fontFace: SANS, fontSize: 15, color: PAPER, bold: true, margin: 0 });
    s.addText("github.com/FernandoTN/founder-site-starter", { x: MX, y: 6.9, w: 11, h: 0.3, fontFace: MONO, fontSize: 12, color: INDIGO, margin: 0 });
  }

  // ===== Slide 2 — The thesis (light, contrast diagram) =====
  {
    const s = pres.addSlide(); s.background = { color: PAPER };
    tag(s, "01 — the thesis");
    title(s, "Leverage isn't a better prompt.\nIt's better orchestration.");
    s.addText("One giant chat does everything in one place — and gets slower and worse as it fills. A team of focused agents, run off a shared plan, does more at once and does it better.",
      { x: MX, y: 2.5, w: 5.5, h: 2.2, fontFace: SANS, fontSize: 17, color: INKSOFT, margin: 0, lineSpacingMultiple: 1.1 });
    // left: one crammed chat
    box(s, 7.0, 2.5, 2.4, 3.4, PAPER, LINE);
    s.addText("ONE CHAT", { x: 7.0, y: 2.65, w: 2.4, h: 0.3, fontFace: MONO, fontSize: 11, color: MUTED, align: "center", bold: true, margin: 0 });
    for (let i = 0; i < 6; i++) s.addShape(pres.shapes.RECTANGLE, { x: 7.25, y: 3.1 + i * 0.42, w: 1.9, h: 0.28, fill: { color: i > 3 ? RED_BG : LAV }, line: { color: i > 3 ? RED : LINE, width: 1 } });
    s.addText("everything piled in", { x: 7.0, y: 5.55, w: 2.4, h: 0.3, fontFace: SANS, fontSize: 11, italic: true, color: RED, align: "center", margin: 0 });
    chev(s, 9.55, 3.95, INDIGO, 34);
    // right: a coordinator + lanes
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 10.3, y: 2.5, w: 2.4, h: 0.55, rectRadius: 0.06, fill: { color: INDIGO }, line: { color: INDIGO, width: 1 } });
    s.addText("orchestrator", { x: 10.3, y: 2.5, w: 2.4, h: 0.55, fontFace: MONO, fontSize: 12, color: PAPER, align: "center", valign: "middle", bold: true, margin: 0 });
    for (let i = 0; i < 4; i++) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 10.3, y: 3.4 + i * 0.62, w: 2.4, h: 0.5, rectRadius: 0.06, fill: { color: LAV }, line: { color: INDIGO, width: 1 } });
      s.addText("agent " + (i + 1), { x: 10.3, y: 3.4 + i * 0.62, w: 2.4, h: 0.5, fontFace: MONO, fontSize: 11, color: INDIGO_DK, align: "center", valign: "middle", margin: 0 });
    }
    s.addText("focused, in parallel", { x: 10.3, y: 5.95, w: 2.4, h: 0.3, fontFace: SANS, fontSize: 11, italic: true, color: INDIGO, align: "center", margin: 0 });
    footer(s, 2);
  }

  // ===== Slide 3 — What you'll watch (light, 3 callouts) =====
  {
    const s = pres.addSlide(); s.background = { color: PAPER };
    tag(s, "02 — what you'll watch");
    title(s, "In the next ~50 minutes");
    const items = [
      ["1", "idea", "typed in 15 seconds"],
      ["~6", "agents", "research + build, in parallel"],
      ["1", "live URL", "real site + real database"],
    ];
    items.forEach((it, i) => {
      const x = MX + i * 4.15;
      box(s, x, 2.3, 3.85, 2.4, PAPER, LINE);
      s.addText(it[0], { x: x, y: 2.45, w: 3.85, h: 1.1, fontFace: SERIF, fontSize: 60, color: INDIGO, bold: true, align: "center", margin: 0 });
      s.addText(it[1], { x: x, y: 3.6, w: 3.85, h: 0.4, fontFace: SANS, fontSize: 20, color: INK, bold: true, align: "center", margin: 0 });
      s.addText(it[2], { x: x, y: 4.05, w: 3.85, h: 0.5, fontFace: SANS, fontSize: 13, color: MUTED, align: "center", margin: 0 });
    });
    s.addText([
      { text: "And the method works for anything — ", options: {} },
      { text: "a memo, a market model, a campaign — not just code.", options: { bold: true, color: INDIGO_DK } },
    ], { x: MX, y: 5.4, w: 12, h: 0.6, fontFace: SANS, fontSize: 18, color: INKSOFT, align: "center", margin: 0 });
    footer(s, 3);
  }

  // ===== Slide 4 — The method (light, 5 numbered rows) =====
  {
    const s = pres.addSlide(); s.background = { color: PAPER };
    tag(s, "03 — the method");
    title(s, "Run AI like a team — five moves");
    const rows = [
      ["1", "One source of truth", "Everything the “company” believes lives in versioned docs."],
      ["2", "A ledger", "TODO.md tracks every task: Now → In Progress → Next → Done."],
      ["3", "One focused session per task", "Each agent gets exactly the context it needs — nothing more."],
      ["4", "Parallel vs. sequential", "Fan out the independent work; sequence what truly depends."],
      ["5", "Monitor from one screen", "Watch every running agent live with claude agents."],
    ];
    rows.forEach((r, i) => {
      const y = 2.0 + i * 0.92;
      s.addShape(pres.shapes.OVAL, { x: MX, y: y, w: 0.62, h: 0.62, fill: { color: INDIGO }, line: { color: INDIGO, width: 1 } });
      s.addText(r[0], { x: MX, y: y, w: 0.62, h: 0.62, fontFace: SERIF, fontSize: 22, color: PAPER, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(r[1], { x: 1.5, y: y - 0.04, w: 11, h: 0.42, fontFace: SANS, fontSize: 19, color: INK, bold: true, margin: 0 });
      s.addText(r[2], { x: 1.5, y: y + 0.36, w: 11.2, h: 0.4, fontFace: SANS, fontSize: 14, color: MUTED, margin: 0 });
    });
    footer(s, 4);
  }

  // ===== Slide 5 — The ledger (light, kanban) =====
  {
    const s = pres.addSlide(); s.background = { color: PAPER };
    tag(s, "04 — the ledger");
    title(s, "TODO.md is the spine");
    const cols = [
      ["NOW", [["T-0001 Site launch", INDIGO, PAPER]]],
      ["IN PROGRESS", [["T-0005 Build", LAV, INDIGO_DK]]],
      ["NEXT", [["T-0007 Calendar sync", PAPER, MUTED], ["T-0008 Multi-user", PAPER, MUTED], ["T-0009 Booking email", PAPER, MUTED]]],
      ["DONE", [["T-0002 Research", GREEN_BG, GREEN], ["T-0003 Spec", GREEN_BG, GREEN], ["T-0004 Todo", GREEN_BG, GREEN]]],
    ];
    cols.forEach((c, i) => {
      const x = MX + i * 3.05;
      s.addText(c[0], { x: x, y: 2.15, w: 2.85, h: 0.3, fontFace: MONO, fontSize: 12, color: i === 2 ? AMBER : MUTED, bold: true, charSpacing: 1, margin: 0 });
      s.addShape(pres.shapes.LINE, { x: x, y: 2.5, w: 2.85, h: 0, line: { color: LINE, width: 1.5 } });
      c[1].forEach((card, j) => {
        const cy = 2.7 + j * 0.78;
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x, y: cy, w: 2.85, h: 0.62, rectRadius: 0.06, fill: { color: card[1] }, line: { color: card[1] === PAPER ? LINE : card[1], width: 1 }, shadow: sh() });
        s.addText(card[0], { x: x + 0.12, y: cy, w: 2.6, h: 0.62, fontFace: SANS, fontSize: 13.5, color: card[2], bold: true, valign: "middle", margin: 0 });
      });
    });
    s.addText([
      { text: "The ledger tracks everything — ", options: {} },
      { text: "including what you choose to defer (NEXT).", options: { bold: true, color: AMBER } },
    ], { x: MX, y: 5.7, w: 12, h: 0.5, fontFace: SANS, fontSize: 16, color: INKSOFT, margin: 0 });
    footer(s, 5);
  }

  // ===== Slide 6 — Parallel vs sequential (light, flow) =====
  {
    const s = pres.addSlide(); s.background = { color: PAPER };
    tag(s, "05 — parallel vs. sequential");
    title(s, "The distinction that does the work");
    const stages = [
      { label: "Research", x: 1.95, n: 3, sub: "parallel ×3" },
      { label: "Spec", x: 4.45, n: 1, sub: "in order" },
      { label: "Todo Items", x: 6.55, n: 1, sub: "in order" },
      { label: "Build", x: 9.0, n: 4, sub: "parallel ×4" },
      { label: "Ship", x: 11.5, n: 1, sub: "in order" },
    ];
    const bw = 1.7;
    stages.forEach((st, i) => {
      s.addText(st.label, { x: st.x - bw / 2, y: 2.25, w: bw, h: 0.35, fontFace: SANS, fontSize: 16, bold: true, color: INK, align: "center", margin: 0 });
      const par = st.n > 1;
      const bh = par ? (st.n === 4 ? 0.5 : 0.6) : 0.62;
      const startY = 3.4 - (st.n * (bh + 0.08)) / 2 + 0.35;
      for (let k = 0; k < st.n; k++) {
        const yy = startY + k * (bh + 0.08);
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: st.x - bw / 2, y: yy, w: bw, h: bh, rectRadius: 0.06, fill: { color: par ? LAV : INDIGO }, line: { color: INDIGO, width: 1 }, shadow: sh() });
      }
      s.addText(st.sub, { x: st.x - bw / 2, y: 5.25, w: bw, h: 0.3, fontFace: MONO, fontSize: 11, color: par ? INDIGO : MUTED, align: "center", bold: par, margin: 0 });
      if (i < stages.length - 1) {
        const nx = stages[i + 1].x;
        chev(s, (st.x + nx) / 2 - 0.25, 3.5, INDIGO, 30);
      }
    });
    s.addText([
      { text: "Parallel where independent", options: { bold: true, color: INDIGO_DK } },
      { text: "   ·   sequential where one step needs the last one's output.", options: { color: INKSOFT } },
    ], { x: MX, y: 6.1, w: 12, h: 0.5, fontFace: SANS, fontSize: 17, align: "center", margin: 0 });
    footer(s, 6);
  }

  // ===== Slide 7 — 4 ways to run agents in parallel (light, 2x2) =====
  {
    const s = pres.addSlide(); s.background = { color: PAPER };
    tag(s, "06 — four surfaces");
    title(s, "Four ways to run agents at once");
    const cards = [
      ["Sub-agents", "Delegated workers inside one session — own context, return a summary.", "/agents", 0, 0],
      ["Background agents", "Many full sessions running at once; watch them all on one board.", "claude agents", 1, 0],
      ["Agent teams", "Sessions that message each other and share a task list. (Experimental.)", "team mode", 0, 1],
      ["Worktrees", "Isolated git checkouts so parallel writers never collide.", "claude -w", 1, 1],
    ];
    const cw = 5.85, ch = 1.95;
    cards.forEach((c) => {
      const x = MX + c[3] * (cw + 0.3), y = 2.1 + c[4] * (ch + 0.25);
      box(s, x, y, cw, ch, PAPER, LINE);
      s.addShape(pres.shapes.RECTANGLE, { x: x, y: y, w: 0.09, h: ch, fill: { color: INDIGO } });
      s.addText(c[0], { x: x + 0.3, y: y + 0.2, w: cw - 0.6, h: 0.4, fontFace: SANS, fontSize: 19, bold: true, color: INK, margin: 0 });
      s.addText(c[1], { x: x + 0.3, y: y + 0.66, w: cw - 0.6, h: 0.8, fontFace: SANS, fontSize: 14, color: MUTED, margin: 0, lineSpacingMultiple: 1.05 });
      s.addText(c[2], { x: x + 0.3, y: y + ch - 0.5, w: cw - 0.6, h: 0.35, fontFace: MONO, fontSize: 13, color: INDIGO_DK, bold: true, margin: 0 });
    });
    footer(s, 7);
  }

  // ===== Slide 8 — Context is the whole game (light, gauges) =====
  {
    const s = pres.addSlide(); s.background = { color: PAPER };
    tag(s, "07 — context");
    title(s, "Context is the whole game");
    function gauge(y, label, pct, col, note) {
      s.addText(label, { x: MX, y: y - 0.42, w: 11, h: 0.35, fontFace: SANS, fontSize: 17, bold: true, color: INK, margin: 0 });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX, y: y, w: 9.5, h: 0.5, rectRadius: 0.06, fill: { color: "F0EEF6" }, line: { color: LINE, width: 1 } });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX, y: y, w: 9.5 * pct, h: 0.5, rectRadius: 0.06, fill: { color: col }, line: { color: col, width: 1 } });
      s.addText(note, { x: 10.35, y: y, w: 2.4, h: 0.5, fontFace: SANS, fontSize: 13, italic: true, color: col, valign: "middle", margin: 0 });
    }
    gauge(2.55, "One giant chat — everything piled in", 0.92, RED, "slow · costly · worse");
    gauge(4.05, "Focused session — only what this step needs", 0.28, GREEN, "fast · cheap · better");
    s.addText([
      { text: "Give the right context at the right step. ", options: { bold: true, color: INDIGO_DK } },
      { text: "A lean session isn't just cheaper — it produces better work, because the model isn't wading through clutter every turn.", options: { color: INKSOFT } },
    ], { x: MX, y: 5.4, w: 12, h: 1.0, fontFace: SANS, fontSize: 17, margin: 0, lineSpacingMultiple: 1.1 });
    footer(s, 8);
  }

  // ===== Slide 9 — Same method, different cockpit (light, 3 cols) =====
  {
    const s = pres.addSlide(); s.background = { color: PAPER };
    tag(s, "08 — pick your cockpit");
    title(s, "Same method, different cockpit");
    const cols = [
      ["Claude app · Cowork", "Zero setup, approachable. A fresh chat per task gets you most of the way.", false],
      ["OpenAI Codex", "Another capable agent CLI. The principles port directly.", false],
      ["Claude Code (terminal)", "The most dials: status line, custom commands, parallel agents, worktrees.", true],
    ];
    const cw = 3.95;
    cols.forEach((c, i) => {
      const x = MX + i * (cw + 0.18);
      box(s, x, 2.2, cw, 3.2, PAPER, c[2] ? INDIGO : LINE);
      s.addShape(pres.shapes.RECTANGLE, { x: x, y: 2.2, w: cw, h: 0.7, fill: { color: c[2] ? INDIGO : LAV } });
      s.addText(c[0], { x: x + 0.2, y: 2.2, w: cw - 0.4, h: 0.7, fontFace: SANS, fontSize: 16, bold: true, color: c[2] ? PAPER : INK, valign: "middle", margin: 0 });
      s.addText(c[1], { x: x + 0.25, y: 3.15, w: cw - 0.5, h: 2.0, fontFace: SANS, fontSize: 15, color: INKSOFT, valign: "top", margin: 0, lineSpacingMultiple: 1.15 });
    });
    s.addText("Use what fits you — don't let setup be the reason you never start.", { x: MX, y: 5.75, w: 12, h: 0.5, fontFace: SANS, fontSize: 17, italic: true, color: INDIGO_DK, align: "center", margin: 0 });
    footer(s, 9);
  }

  // ===== Slide 10 — Roadmap / to the terminal (dark, timeline) =====
  {
    const s = pres.addSlide(); s.background = { color: INK };
    s.addText("LIVE — TO THE TERMINAL", { x: MX, y: 0.5, w: 10, h: 0.3, fontFace: MONO, fontSize: 12, color: INDIGO, charSpacing: 2, bold: true, margin: 0 });
    s.addText("One command kicks it off:  /orchestrate T-0001", { x: MX, y: 1.0, w: 12, h: 0.8, fontFace: SERIF, fontSize: 30, color: PAPER, bold: true, margin: 0 });
    const steps = [["1", "Research", "∥"], ["2", "Spec", "→"], ["3", "Todo", "→"], ["4", "Build", "∥"], ["5", "Ship", "→"], ["6", "Iterate", "→"]];
    const n = steps.length, x0 = 1.1, x1 = 12.2, yy = 4.0;
    s.addShape(pres.shapes.LINE, { x: x0, y: yy, w: x1 - x0, h: 0, line: { color: INDIGO_DK, width: 2 } });
    steps.forEach((st, i) => {
      const cx = x0 + (x1 - x0) * (i / (n - 1));
      const par = st[2] === "∥";
      s.addShape(pres.shapes.OVAL, { x: cx - 0.33, y: yy - 0.33, w: 0.66, h: 0.66, fill: { color: par ? INDIGO : INK }, line: { color: INDIGO, width: 2 } });
      s.addText(st[0], { x: cx - 0.33, y: yy - 0.33, w: 0.66, h: 0.66, fontFace: SERIF, fontSize: 20, color: PAPER, bold: true, align: "center", valign: "middle", margin: 0 });
      s.addText(st[1], { x: cx - 1.0, y: yy + 0.5, w: 2.0, h: 0.35, fontFace: SANS, fontSize: 15, color: PAPER, bold: true, align: "center", margin: 0 });
      s.addText(par ? "parallel" : "in order", { x: cx - 1.0, y: yy + 0.85, w: 2.0, h: 0.3, fontFace: MONO, fontSize: 10, color: par ? INDIGO : LAVTXT, align: "center", margin: 0 });
    });
    s.addText("Watch the ledger move. Watch the agents work. The terminal is the show now.", { x: MX, y: 6.2, w: 12, h: 0.5, fontFace: SANS, fontSize: 16, italic: true, color: LAVTXT, align: "center", margin: 0 });
  }

  // ===== Slide 11 — Takeaways (dark, numbered) =====
  {
    const s = pres.addSlide(); s.background = { color: INK };
    s.addText("TAKEAWAYS", { x: MX, y: 0.5, w: 10, h: 0.3, fontFace: MONO, fontSize: 12, color: INDIGO, charSpacing: 2, bold: true, margin: 0 });
    s.addText("Five moves you can steal on Monday", { x: MX, y: 1.0, w: 12, h: 0.8, fontFace: SERIF, fontSize: 32, color: PAPER, bold: true, margin: 0 });
    const t = [
      "Put the truth in docs — one source everything traces to.",
      "Run a ledger — Now / In Progress / Next / Done.",
      "One task, one focused context.",
      "Parallelize the independent; sequence the dependent.",
      "Decide what NOT to automate.",
    ];
    t.forEach((line, i) => {
      const y = 2.25 + i * 0.82;
      s.addText(String(i + 1), { x: MX, y: y, w: 0.7, h: 0.6, fontFace: SERIF, fontSize: 26, color: INDIGO, bold: true, margin: 0 });
      s.addText(line, { x: 1.4, y: y, w: 11.3, h: 0.6, fontFace: SANS, fontSize: 20, color: PAPER, valign: "middle", margin: 0 });
    });
    s.addText("None of this is about code. It's about how you direct the work.", { x: MX, y: 6.5, w: 12, h: 0.4, fontFace: SANS, fontSize: 15, italic: true, color: LAVTXT, margin: 0 });
  }

  // ===== Slide 12 — Take-home (light, QR) =====
  {
    const s = pres.addSlide(); s.background = { color: PAPER };
    tag(s, "09 — take it home");
    title(s, "Clone it. Point it at yourself.");
    let qr;
    try { qr = await QRCode.toDataURL("https://github.com/FernandoTN/founder-site-starter", { margin: 1, width: 600, color: { dark: "#17151F", light: "#FFFFFF" } }); } catch (e) { qr = null; }
    if (qr) s.addImage({ data: qr.replace(/^data:/, ""), x: MX, y: 2.4, w: 2.7, h: 2.7 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.7, y: 2.7, w: 9.0, h: 0.7, rectRadius: 0.08, fill: { color: LAV }, line: { color: INDIGO, width: 1 } });
    s.addText("github.com/FernandoTN/founder-site-starter", { x: 3.9, y: 2.7, w: 8.6, h: 0.7, fontFace: MONO, fontSize: 17, color: INDIGO_DK, bold: true, valign: "middle", margin: 0 });
    s.addText([
      { text: "Inside: ", options: { bold: true, color: INK } },
      { text: "the ledger, the run-sheet, the command cheat-sheet, the deploy steps, and the whole Next.js + database app — ready to fork.", options: { color: INKSOFT } },
    ], { x: 3.7, y: 3.7, w: 9.0, h: 1.0, fontFace: SANS, fontSize: 16, margin: 0, lineSpacingMultiple: 1.15 });
    s.addText([
      { text: "No terminal? ", options: { bold: true, color: INDIGO_DK } },
      { text: "Use the Claude app — a fresh chat per task.    ", options: { color: INKSOFT } },
      { text: "Comfortable in one? ", options: { bold: true, color: INDIGO_DK } },
      { text: "Open it in Claude Code.", options: { color: INKSOFT } },
    ], { x: MX, y: 5.6, w: 12, h: 0.6, fontFace: SANS, fontSize: 15, align: "center", margin: 0 });
    footer(s, 12);
  }

  // ===== Slide 13 — Close (dark) =====
  {
    const s = pres.addSlide(); s.background = { color: INK };
    for (let i = 0; i < 4; i++) s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: MX + i * 0.62, y: 0.6, w: 0.45, h: 0.45, rectRadius: 0.06, fill: { color: i === 0 ? INDIGO : INDIGO_DK }, line: { color: INDIGO, width: 1 } });
    s.addText("Thank you.", { x: MX, y: 2.4, w: 12, h: 1.2, fontFace: SERIF, fontSize: 56, color: PAPER, bold: true, margin: 0 });
    s.addText([
      { text: "Questions — and then, fittingly: ", options: { color: LAVTXT } },
      { text: "book time with me.", options: { color: INDIGO, bold: true } },
    ], { x: MX, y: 3.9, w: 12, h: 0.6, fontFace: SANS, fontSize: 22, margin: 0 });
    s.addText("Fernando Torres — Founder & CEO, Memori", { x: MX, y: 6.3, w: 11, h: 0.4, fontFace: SANS, fontSize: 15, color: PAPER, bold: true, margin: 0 });
    s.addText("github.com/FernandoTN/founder-site-starter", { x: MX, y: 6.7, w: 11, h: 0.3, fontFace: MONO, fontSize: 12, color: INDIGO, margin: 0 });
  }

  await pres.writeFile({ fileName: "founder-site-workshop.pptx" });
  console.log("WROTE founder-site-workshop.pptx");
}

main().catch((e) => { console.error(e); process.exit(1); });
