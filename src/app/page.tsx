import SiteScripts from './components/SiteScripts'

interface WorkItem {
  id: string
  name: string
  type: string
  year: string
  img: string
  alt: string
}

interface Capability {
  number: string
  title: string
  desc: string
}

const work: WorkItem[] = [
  {
    id: '01', name: 'Veldt', type: 'Web Design', year: '2024',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=750&fit=crop&q=80&auto=format',
    alt: 'Website design displayed on a laptop',
  },
  {
    id: '02', name: 'Keel', type: 'Full Site Build', year: '2024',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=750&fit=crop&q=80&auto=format',
    alt: 'Brand and web design work',
  },
  {
    id: '03', name: 'Forma', type: 'Landing Page', year: '2023',
    img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&h=750&fit=crop&q=80&auto=format',
    alt: 'UI design on screen',
  },
  {
    id: '04', name: 'Passage', type: 'Custom Build', year: '2023',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=750&fit=crop&q=80&auto=format',
    alt: 'Clean website on MacBook',
  },
]

const marqueeItems: string[] = [
  'Web Design',
  'Frontend Development',
  'Landing Pages',
  'Full Site Builds',
  'Next.js',
  'React',
  'Design Systems',
  'Custom Code',
]

const capabilities: Capability[] = [
  {
    number: '01',
    title: 'Web Design',
    desc: 'Figma-based design from scratch — layout, typography, and visual direction that\'s sharp enough to stand on its own.',
  },
  {
    number: '02',
    title: 'Frontend Development',
    desc: 'Hand-coded in Next.js and React. Fast, responsive, accessible, and built so it\'s easy to maintain.',
  },
  {
    number: '03',
    title: 'Landing Pages',
    desc: 'High-converting pages built for launches, campaigns, and lead generation. Fast to ship, built to perform.',
  },
  {
    number: '04',
    title: 'Full Site Builds',
    desc: 'Design and development end-to-end. From first wireframe to production deploy — everything handled under one roof.',
  },
]

const marqueeLoop = [...marqueeItems, ...marqueeItems]

export default function Home() {
  return (
    <>
      <SiteScripts />

      {/* ════════ NAV ════════ */}
      <nav id="site-nav">
        <a href="/" className="wordmark">
          TRACE<span className="wordmark-sub">DESIGN</span>
        </a>
        <div className="nav-links">
          <a href="#studio"   className="nav-link">Studio</a>
          <a href="#work"     className="nav-link">Work</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#contact"  className="nav-cta">Contact</a>
        </div>
      </nav>

      <main>
        {/* ════════ HERO ════════ */}
        <section id="hero" className="hero-section">
          <div className="hero-inner">
            <div className="hero-top">
              <p className="eyebrow reveal">Web Studio — Est. 2019</p>
              <h1 className="hero-headline reveal delay-1">
                Websites that<br />
                don&apos;t blend in.
              </h1>
            </div>

            <div className="hero-bottom">
              <p className="hero-sub reveal delay-2">
                Trace Design builds fast, custom-coded websites for founders
                and businesses that need to launch and convert. Design and development
                under one roof — no templates, no shortcuts.
              </p>
              <div className="hero-actions reveal delay-3">
                <a href="#work"    className="cta-primary">View Work →</a>
                <a href="#contact" className="cta-ghost">Start a Project</a>
              </div>
              <div className="hero-scroll-hint reveal delay-4" aria-hidden="true">
                <span>Scroll</span>
                <span className="scroll-line" />
              </div>
            </div>
          </div>
        </section>

        {/* ════════ MARQUEE ════════ */}
        <div className="marquee-wrapper" aria-hidden="true">
          <div className="marquee-track">
            {marqueeLoop.map((item, i) => (
              <span key={i} className="marquee-chunk">
                <span className="marquee-item">{item}</span>
                <span className="marquee-sep">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ════════ WORK ════════ */}
        <section id="work" className="section">
          <div className="container">
            <header className="section-header reveal">
              <div>
                <p className="section-label">Selected Work</p>
                <h2 className="section-heading">Recent Projects</h2>
              </div>
              <a href="#" className="view-all-link">View All →</a>
            </header>

            <div className="work-grid">
              {work.map((item) => (
                <article key={item.id} className="work-item reveal">
                  <div className="work-thumb">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.alt} loading="lazy" decoding="async" />
                  </div>
                  <div className="work-meta">
                    <div className="work-meta-row">
                      <span className="work-number">{item.id}</span>
                      <span className="work-type">{item.type} · {item.year}</span>
                    </div>
                    <h3 className="work-name">{item.name}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ STUDIO ════════ */}
        <section id="studio" className="section">
          <div className="container">
            <div className="studio-layout">
              <div className="studio-left reveal">
                <p className="section-label">Studio</p>
                <div className="studio-stats">
                  <div className="stat reveal delay-1">
                    <span className="stat-num">2019</span>
                    <span className="stat-label">Founded</span>
                  </div>
                  <div className="stat reveal delay-2">
                    <span className="stat-num">Next.js</span>
                    <span className="stat-label">Stack</span>
                  </div>
                  <div className="stat reveal delay-3">
                    <span className="stat-num">Custom</span>
                    <span className="stat-label">Every Build</span>
                  </div>
                </div>
              </div>

              <div className="studio-right">
                <blockquote className="studio-quote reveal delay-1">
                  &ldquo;Most websites are forgettable. We build the ones that aren&apos;t.&rdquo;
                </blockquote>
                <p className="studio-body reveal delay-2">
                  Trace Design is a web studio specialising in custom-coded sites
                  and landing pages. We work with founders, product teams, and growing
                  businesses who need a site that&apos;s fast, well-built, and actually
                  converts. Every project is handled from first concept to final deploy
                  — no templates, no hand-offs, no surprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ SERVICES ════════ */}
        <section id="services" className="section">
          <div className="container">
            <header className="section-header reveal">
              <p className="section-label">What We Do</p>
            </header>

            <div className="capabilities-list">
              {capabilities.map((cap) => (
                <div key={cap.number} className="capability-item reveal">
                  <span className="cap-number">{cap.number}</span>
                  <div className="cap-body">
                    <h3 className="cap-title">{cap.title}</h3>
                    <p className="cap-desc">{cap.desc}</p>
                  </div>
                  <span className="cap-arrow" aria-hidden="true">↗</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ CONTACT ════════ */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="contact-layout">
              <h2 className="contact-headline reveal">
                Let&apos;s build<br />
                your next<br />
                website.
              </h2>

              <div className="contact-details reveal delay-2">
                <a href="mailto:hello@tracedesign.co" className="contact-email">
                  hello@tracedesign.co
                </a>
                <p className="contact-note">Available for select projects in 2026</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ════════ FOOTER ════════ */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-wordmark">TRACE DESIGN</span>
          <span className="footer-copy">© 2026 — All rights reserved</span>
          <span className="footer-location">Based worldwide.</span>
        </div>
      </footer>
    </>
  )
}
