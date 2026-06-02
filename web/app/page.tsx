import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="wrap">
        <nav className="nav">
          <span className="brand">Fernando Torres</span>
          <span className="links">
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <Link href="/book">Book</Link>
          </span>
        </nav>

        <header className="hero">
          <div className="eyebrow">Founder &amp; CEO, Memori</div>
          <h1>I&apos;m building memory that belongs to you — not the platform.</h1>
          <p className="lede">Your AI, on your terms.</p>
          <div className="btn-row">
            <Link className="btn" href="/book">Book time with me</Link>
            <a className="btn ghost" href="#work">See what I&apos;m building</a>
          </div>
        </header>
      </div>

      <div className="wrap">
        <section className="block" id="about">
          <h2>About</h2>
          <div className="prose">
            <p>
              I&apos;m a founder and engineer building <strong>Memori</strong>, the
              personal memory profile for AI — the notes and knowledge you already
              capture become editable Mems you control, brought into the AI tools
              you already use.
            </p>
            <p>
              I&apos;m a Stanford GSB Sloan Fellow (MSx &rsquo;26). I care about making
              powerful technology personal without making people powerless.
              {" "}
              <span className="ph">[ add: previous roles, a sentence of story ]</span>
            </p>
          </div>
        </section>

        <section className="block" id="work">
          <h2>Work</h2>
          <p className="sub">A few things I&apos;m proud of.</p>
          <div className="grid">
            <div className="card">
              <h3>Memori</h3>
              <p>The personal memory profile for AI. Your memory should belong to you, not the model.</p>
            </div>
            <div className="card">
              <h3>Writing &amp; talks</h3>
              <p><span className="ph">[ add links to essays, decks, or this very workshop ]</span></p>
            </div>
            <div className="card">
              <h3>Previously</h3>
              <p><span className="ph">[ add a past company or project ]</span></p>
            </div>
          </div>
        </section>
      </div>

      <div className="wrap">
        <footer>
          <span>© 2026 Fernando Torres</span>
          <span>
            <Link href="/book">Book time</Link> · <Link href="/login">Admin</Link>
          </span>
        </footer>
      </div>
    </>
  );
}
