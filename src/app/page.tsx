import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'
import ChromeStar from './components/ChromeStar'
import Window from './components/Window'

const services = [
  {
    title: 'Web design',
    file: 'design.app',
    desc: 'Visual direction, layout and type shaped around your business, so the site looks like the best in its field.',
    includes: ['Art direction', 'Layout systems', 'Typography', 'Motion design'],
  },
  {
    title: 'Development',
    file: 'build.app',
    desc: 'Fast, custom-coded builds that look right on every screen and stay easy to update as you grow.',
    includes: ['Next.js builds', 'CMS setup', 'Animation', 'Performance'],
  },
  {
    title: 'Landing pages',
    file: 'launch.app',
    desc: 'Single pages with one job: turn visitors into customers. Strategy, copy direction, design and build.',
    includes: ['Conversion strategy', 'Copy direction', 'Design + build', 'Launch'],
  },
]

const steps = [
  { step: 'Discover', desc: 'We learn the business, the audience and what the site has to do. You get a clear plan and scope.' },
  { step: 'Design', desc: 'Visual direction first, then every page designed in full, with motion and mobile considered from the start.' },
  { step: 'Build', desc: 'Hand-coded, fast and accessible. What we designed is what ships, down to the last transition.' },
  { step: 'Launch', desc: 'We handle hosting, domains and handover, and stay on hand after go-live.' },
]

const ticker = ['Now booking', 'Web design', 'Development', 'Landing pages', 'Motion', 'Est. 2019']

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

export default function Home() {
  return (
    <>
      {/* ═══ HERO: the "screen" ═══ */}
      <section className="hero" data-hero>
        <div className="screen">
          <div className="screen-grid" aria-hidden="true" />
          <div className="screen-glow" aria-hidden="true" />

          <div className="hero-meta" data-fade="stagger" data-delay="0.6">
            <span className="pill pill-live"><i />Taking on new projects</span>
            <span className="pixel">Trace OS v7.0</span>
          </div>

          <div className="hero-title-wrap" data-hero-drift>
            <h1 className="hero-title chrome" data-split="hero">
              Websites <br />
              that don’t <br />
              blend <em className="holo">in.</em>
            </h1>
            <div className="hero-star" data-spin aria-hidden="true">
              <ChromeStar id="hs" />
            </div>
            <div className="hero-star hero-star-sm" data-spin="-1" aria-hidden="true">
              <ChromeStar id="hs2" />
            </div>
          </div>

          {/* System windows you can throw around */}
          <div className="desk" data-desk aria-hidden="true">
            <Window title="render_01.obj" className="desk-win desk-win-1" data-drag>
              <div className="desk-render">
                <div className="desk-orbit" />
                <div className="desk-render-star" data-spin>
                  <ChromeStar id="dr" />
                </div>
                <span className="pixel desk-caption">Chrome · 4K · 60fps</span>
              </div>
            </Window>
            <Window title="services.txt" className="desk-win desk-win-2" data-drag>
              <ul className="desk-list">
                {services.map((s, i) => (
                  <li key={s.title}><span className="pixel">0{i + 1}</span>{s.title}</li>
                ))}
              </ul>
            </Window>
            <Window title="status.exe" className="desk-win desk-win-3" data-drag>
              <div className="desk-status">
                <span className="pixel">Availability</span>
                <div className="meter meter-live">
                  {Array.from({ length: 10 }, (_, b) => <i key={b} className={b < 7 ? 'on' : ''} />)}
                </div>
                <span className="desk-status-big">Open for work</span>
              </div>
            </Window>
            <span className="sticker" data-float>drag me ✦</span>
          </div>

          <div className="hero-foot" data-fade="stagger" data-delay="0.8">
            <p className="hero-lede">
              We design and build custom websites for businesses that want to look like the best in their field.
              One studio, from first sketch to launch.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-holo" data-magnetic>
                <RollText>Start a project</RollText>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="#work" className="btn btn-glass">
                <RollText>See the work</RollText>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="ticker" data-reel aria-hidden="true">
        <div className="ticker-track" data-reel-track>
          {[0, 1].map((n) => (
            <div className="ticker-set" key={n}>
              {ticker.map((t) => (
                <span key={t}>{t}<b>✦</b></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ INTRO ═══ */}
      <section className="intro wrap" id="studio">
        <p className="label" data-scramble>// Studio</p>
        <p className="intro-statement" data-scrub-words>
          Trace is a small studio with a short list of clients. We take on a few projects at a time, so every site is
          designed, built and launched by the same hands, and ships looking exactly like the design.
        </p>
        <div className="specs" data-fade="stagger">
          <div className="spec">
            <span className="pixel spec-key">Uptime</span>
            <span className="spec-num chrome-dark"><span data-count="7">7</span><small>yrs</small></span>
          </div>
          <div className="spec">
            <span className="pixel spec-key">Sites shipped</span>
            <span className="spec-num chrome-dark"><span data-count="30" data-suffix="+">30+</span></span>
          </div>
          <div className="spec">
            <span className="pixel spec-key">Team, end to end</span>
            <span className="spec-num chrome-dark"><span>1</span></span>
          </div>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section className="work wrap" id="work">
        <div className="section-head">
          <h2 className="section-title chrome-dark" data-split>
            Selected <em className="holo">work</em>
          </h2>
          <span className="label" data-scramble>{String(projects.length).padStart(2, '0')} files found</span>
        </div>

        <ul className="work-list">
          {projects.map((p) => (
            <li key={p.slug} data-fade>
              <a href={p.url} target="_blank" rel="noreferrer" className="work-row" data-cursor="Open">
                <span className="pixel work-index">{p.index}</span>
                <Window title={host(p.url)} className="work-thumb">
                  <div className="work-frame" style={{ background: p.tone }}>
                    <Image src={p.image} alt={p.alt} fill sizes="200px" />
                  </div>
                </Window>
                <span className="work-text">
                  <span className="work-name">{p.name}</span>
                  <span className="work-summary">{p.summary}</span>
                </span>
                <span className="pill work-type">{p.type} · {p.year}</span>
                <span className="work-visit" aria-hidden="true">↗</span>
                <span className="sr-only"> (opens the live site in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services" id="services">
        <div className="space-floor" aria-hidden="true" />
        <div className="wrap services-inner">
          <div className="section-head">
            <h2 className="section-title chrome" data-split>
              What we <em className="holo">do</em>
            </h2>
            <span className="label" data-scramble>Every project, end to end</span>
          </div>

          <ul className="service-list">
            {services.map((s, i) => (
              <li key={s.title} data-fade>
                <Window title={s.file} className="service">
                  <div className="service-icon" aria-hidden="true">
                    <ChromeStar id={`sv${i}`} />
                  </div>
                  <span className="pixel service-num">0{i + 1}</span>
                  <h3 className="service-title">{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul className="chips">
                    {s.includes.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </Window>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      {/* The pin wraps [data-hscroll] in a spacer, so React owns the outer section. */}
      <section className="process-wrap" aria-labelledby="process-title">
        <div className="process" data-hscroll>
          <div className="process-track" data-hscroll-track>
            <div className="process-intro">
              <p className="label">// How it works</p>
              <h2 className="section-title chrome-dark" id="process-title" data-split>
                Four steps, <em className="holo">no hand-offs.</em>
              </h2>
            </div>
            {steps.map((p, i) => (
              <Window title={`step_0${i + 1}.exe`} className="process-card" key={p.step}>
                <span className="process-num chrome-dark">0{i + 1}</span>
                <div>
                  <h3 className="process-step">{p.step}</h3>
                  <p>{p.desc}</p>
                  <div className="meter" aria-hidden="true">
                    {Array.from({ length: 12 }, (_, b) => (
                      <i key={b} className={b < (i + 1) * 3 ? 'on' : ''} />
                    ))}
                  </div>
                </div>
              </Window>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact" id="contact">
        <div className="wrap contact-inner">
          <div>
            <p className="label" data-scramble>// Contact</p>
            <h2 className="contact-title chrome-dark" data-split>
              Let’s build your <em className="holo">next</em> website.
            </h2>
            <p className="contact-lede" data-fade>
              Tell us a little about the project. We take on a short list of clients at a time.
            </p>
          </div>
          <div data-fade>
            <Window title="new_project.txt" className="contact-win">
              <ContactForm />
            </Window>
          </div>
        </div>
      </section>
    </>
  )
}
