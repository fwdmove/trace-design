import SiteScripts from './components/SiteScripts'
import WorkShowcase from './components/WorkShowcase'
import ContactForm from './components/ContactForm'

const work = [
  {
    id: '01', name: 'Wolf River Woodworks', type: 'Full Site Build', year: '2026',
    color: '#0d1a10',
    description: 'Custom site for a Memphis woodworking studio',
    image: '/website-screenshots/woodwork.png',
    alt: 'Wolf River Woodworks website homepage screenshot',
    url: 'https://wr-woodworks.vercel.app',
  },
  {
    id: '02', name: 'Get Build Leads', type: 'Landing Page', year: '2026',
    color: '#0d0d1a',
    description: 'Lead-generation page for contractor marketing',
    image: '/website-screenshots/getbuilds.png?v=20260517',
    alt: 'Get Build Leads website homepage screenshot',
    url: 'https://www.getbuildleads.com',
  },
  {
    id: '03', name: 'Tea Room Charm', type: 'Web Design', year: '2026',
    color: '#1a0e08',
    description: 'Warm hospitality site for a tea room concept',
    image: '/website-screenshots/tea-room.png',
    alt: 'Tea Room Charm website homepage screenshot',
    url: 'https://tea-room-charm.vercel.app',
  },
  {
    id: '04', name: 'Wash Works USA', type: 'Business Website', year: '2026',
    color: '#0f0f0f',
    description: 'Service-business site for a car wash brand',
    image: '/website-screenshots/washworks.png',
    alt: 'Wash Works USA website homepage screenshot',
    url: 'https://www.washworksusa.com',
  },
]

const capabilities = [
  {
    number: '01',
    title: 'Web Design',
    desc: 'Custom website design shaped around your business. From first concept through final visual direction.',
    includes: ['Visual direction', 'Layout systems', 'Typography', 'Component library', 'Art direction'],
  },
  {
    number: '02',
    title: 'Landing Pages',
    desc: 'Single-page sites designed to turn visitors into customers, ready to launch in weeks.',
    includes: ['Conversion strategy', 'Copy direction', 'Design', 'Build', 'A/B-ready'],
  },
  {
    number: '03',
    title: 'Web Development',
    desc: 'Sites built to look right and work right across every device, easy to update as you grow.',
    includes: ['Frontend build', 'CMS integration', 'Animation', 'Performance', 'Hosting setup'],
  },
  {
    number: '04',
    title: 'Full Site Builds',
    desc: 'End-to-end. We handle the design, the build, and the launch — no hand-offs.',
    includes: ['Discovery', 'Design', 'Build', 'Content', 'Launch & handover'],
  },
]

const marqueeItems = [
  'Web Design',
  'Web Development',
  'Branding',
  'Landing Pages',
  'E-commerce',
  'Marketing Sites',
  'Portfolios',
  'Redesigns',
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
          <div className="hero-text">
            <div className="hero-top">
              <p className="eyebrow">A web studio — Est. 2019</p>
              <h1 className="hero-headline">
                <span className="hero-line"><span className="hero-line-inner">Websites</span></span>
                <span className="hero-line"><span className="hero-line-inner">that don&apos;t</span></span>
                <span className="hero-line"><span className="hero-line-inner"><em>blend in</em></span></span>
              </h1>
            </div>
            <div className="hero-bottom">
              <p className="hero-sub">
                Trace Design is a web studio. We design and build custom websites —
                every project handled end-to-end, from first sketch through launch.
              </p>
              <div className="hero-actions">
                <a href="#work"    className="cta-primary">See the Work</a>
                <a href="#contact" className="cta-ghost">Start a Project</a>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <svg
              className="hero-art"
              viewBox="0 0 720 900"
              role="img"
              aria-labelledby="hero-art-title"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title id="hero-art-title">Playful custom website illustration</title>
              <rect width="720" height="900" fill="white" />

              <g className="hero-art-burst" fill="none" strokeLinecap="round">
                <path d="M408 138L438 102" stroke="#38bdf8" strokeWidth="14" />
                <path d="M442 196L486 186" stroke="#24c18a" strokeWidth="14" />
                <path d="M246 204L202 194" stroke="#6c63ff" strokeWidth="14" />
              </g>

              <g className="hero-art-shape hero-art-shape-sun">
                <path d="M430 132H640L602 296H392Z" fill="#ffd84d" />
              </g>

              <g className="hero-art-card hero-art-card-back">
                <rect x="128" y="182" width="442" height="292" rx="28" fill="#6c63ff" />
                <rect x="158" y="220" width="184" height="28" rx="14" fill="white" opacity="0.95" />
                <rect x="158" y="278" width="100" height="100" rx="22" fill="#24c18a" />
                <rect x="286" y="278" width="226" height="28" rx="14" fill="white" opacity="0.92" />
                <rect x="286" y="326" width="166" height="18" rx="9" fill="white" opacity="0.6" />
                <rect x="286" y="358" width="208" height="18" rx="9" fill="white" opacity="0.6" />
              </g>

              <g className="hero-art-card hero-art-card-main">
                <rect x="84" y="260" width="472" height="338" rx="30" fill="white" stroke="#0a0a0a" strokeWidth="4" />
                <path d="M84 326H556" stroke="#0a0a0a" strokeWidth="4" />
                <circle cx="124" cy="293" r="10" fill="#ff5f57" />
                <circle cx="156" cy="293" r="10" fill="#ffbd2e" />
                <circle cx="188" cy="293" r="10" fill="#28c840" />
                <path d="M128 390H374" stroke="#0a0a0a" strokeWidth="22" strokeLinecap="round" />
                <path d="M128 440H470" stroke="#0a0a0a" strokeWidth="22" strokeLinecap="round" />
                <path d="M128 500H294" stroke="#e8450a" strokeWidth="22" strokeLinecap="round" />
                <rect x="382" y="488" width="100" height="64" rx="18" fill="#38bdf8" stroke="#0a0a0a" strokeWidth="4" />
                <path d="M398 520H466" stroke="white" strokeWidth="10" strokeLinecap="round" />
              </g>

              <g className="hero-art-card hero-art-card-phone">
                <rect x="414" y="486" width="170" height="290" rx="32" fill="#fff7dc" stroke="#0a0a0a" strokeWidth="4" />
                <rect x="454" y="526" width="92" height="14" rx="7" fill="#0a0a0a" />
                <rect x="452" y="570" width="96" height="96" rx="26" fill="#ff8a4c" />
                <path d="M468 704H532" stroke="#0a0a0a" strokeWidth="12" strokeLinecap="round" />
                <path d="M458 734H542" stroke="#0a0a0a" strokeWidth="6" strokeLinecap="round" />
              </g>

              <g className="hero-art-card hero-art-card-note">
                <rect x="92" y="586" width="230" height="164" rx="28" fill="#24c18a" stroke="#0a0a0a" strokeWidth="4" />
                <path d="M128 634H252" stroke="#0a0a0a" strokeWidth="14" strokeLinecap="round" />
                <path d="M128 674H276" stroke="white" strokeWidth="12" strokeLinecap="round" />
                <path d="M128 710H216" stroke="white" strokeWidth="12" strokeLinecap="round" />
              </g>

              <g className="hero-art-cursor">
                <path d="M566 386L638 558L576 528L542 602L504 584L538 512L478 532L566 386Z" fill="white" stroke="#0a0a0a" strokeWidth="4" strokeLinejoin="round" />
                <path d="M576 528L542 602" stroke="#e8450a" strokeWidth="6" strokeLinecap="round" />
              </g>

              <g className="hero-art-scribble" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M138 792C192 824 264 824 318 790" stroke="#6c63ff" strokeWidth="8" />
                <path d="M520 804C554 798 586 778 608 748" stroke="#24c18a" strokeWidth="8" />
              </g>

            </svg>
          </div>
        </section>

        {/* ════════ MARQUEE ════════ */}
        <div className="marquee-wrapper" aria-hidden="true">
          <div className="marquee-track">
            {marqueeLoop.map((item, i) => (
              <span key={i} className="marquee-chunk">
                <span className="marquee-item">{item}</span>
                <span className="marquee-sep">◆</span>
              </span>
            ))}
          </div>
        </div>

        {/* ════════ WORK ════════ */}
        <section id="work" className="section">
          <div className="container">
            <div className="work-header reveal">
              <div>
                <p className="section-label">Selected Work</p>
                <h2 className="section-heading">
                  Recent <em>projects</em>
                </h2>
              </div>
            </div>

            <WorkShowcase projects={work} />
          </div>
        </section>

        {/* ════════ ACCENT BAND ════════ */}
        <div className="accent-band">
          <div className="container accent-band-inner reveal reveal-soft">
            <p className="accent-band-text">
              Working on a new website? <em>Let&apos;s talk.</em>
            </p>
            <a href="#contact" className="accent-band-cta">Get in Touch →</a>
          </div>
        </div>

        {/* ════════ SERVICES ════════ */}
        <section id="services" className="section">
          <div className="container">
            <div className="services-header reveal">
              <p className="section-label">What We Do</p>
              <h2 className="section-heading">Services</h2>
            </div>

            <div className="services-bento reveal reveal-scale">
              {capabilities.map((cap) => (
                <div key={cap.number} className="service-card" data-number={cap.number}>
                  <div className="service-top">
                    <span className="cap-number">{cap.number}</span>
                    <span className="service-arrow" aria-hidden="true">↗</span>
                  </div>
                  <div className="service-bottom">
                    <h3 className="cap-title">{cap.title}</h3>
                    <p className="cap-desc">{cap.desc}</p>
                    <ul className="cap-includes">
                      {cap.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ STUDIO ════════ */}
        <section id="studio" className="section">
          <div className="container">
            <p className="section-label reveal" style={{ marginBottom: '2rem' }}>Studio</p>

            <div className="studio-grid reveal reveal-scale delay-1">
              <div className="studio-left">
                <blockquote className="studio-quote">
                  Custom websites, <em>designed and built</em> end-to-end for clients who care about the result.
                </blockquote>
              </div>
              <div className="studio-right">
                <p className="studio-body">
                  Trace Design has been designing and building custom websites since 2019.
                  Concept, design, development, and launch — every project handled in-house,
                  from the first conversation to the live site.
                </p>
                <p className="studio-body">
                  We take on a short list of projects at a time so each one gets the
                  attention it needs. If you&apos;re looking for a website that feels
                  considered, we&apos;d love to hear from you.
                </p>
              </div>
            </div>

            <div className="studio-stats">
              <div className="stat reveal">
                <span className="stat-num" data-count="7" data-suffix=" yrs">7 yrs</span>
                <span className="stat-label">In Business</span>
              </div>
              <div className="stat reveal delay-1">
                <span className="stat-num" data-count="30" data-suffix="+">30+</span>
                <span className="stat-label">Sites Shipped</span>
              </div>
              <div className="stat reveal delay-2">
                <span className="stat-num">100%</span>
                <span className="stat-label">Custom Built</span>
              </div>
            </div>
          </div>
        </section>

        {/* ════════ CONTACT ════════ */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-left">
                <h2 className="contact-headline reveal">
                  Let&apos;s build<br />
                  your <em>next</em><br />
                  website.
                </h2>
              </div>
              <div className="reveal delay-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ════════ FOOTER ════════ */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-wordmark">TRACE DESIGN</span>
          <span className="footer-copy">© 2026 — Trace Design</span>
          <span className="footer-location">Working worldwide.</span>
        </div>
      </footer>
    </>
  )
}
