import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'
import WorkIndex from './components/WorkIndex'

const services = [
  { title: 'Web design', desc: 'Visual direction, layout and type shaped around your business.', includes: ['Art direction', 'Layout systems', 'Typography', 'Motion design'] },
  { title: 'Development', desc: 'Fast, custom-coded builds that look right on every screen.', includes: ['Next.js builds', 'CMS setup', 'Animation', 'Performance'] },
  { title: 'Landing pages', desc: 'Single pages with one job: turn visitors into customers.', includes: ['Conversion strategy', 'Copy direction', 'Design + build', 'Launch'] },
]

const steps = [
  { step: 'Discover', desc: 'We learn the business, the audience and what the site has to do.' },
  { step: 'Design', desc: 'Visual direction first, then every page designed in full.' },
  { step: 'Build', desc: 'Hand-coded, fast and accessible. What we designed is what ships.' },
  { step: 'Launch', desc: 'Hosting, domains and handover, and we stay on hand after go-live.' },
]

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="sw-hero" data-hero>
        <div className="sw-grid sw-hero-top" data-fade="stagger" data-delay="0.3">
          <p className="label">Trace Design</p>
          <p className="label">Independent web studio</p>
          <p className="label">Design + development</p>
          <p className="label sw-right">Est. 2019</p>
        </div>

        <div className="sw-grid sw-hero-mid">
          <h1 className="sw-hero-title" data-split="hero">
            We design and build websites that don’t blend in.
          </h1>
          <ol className="sw-hero-list" data-fade="stagger" data-delay="0.7">
            {services.map((s, i) => (
              <li key={s.title}><span className="mono">0{i + 1}</span>{s.title}</li>
            ))}
          </ol>
          <div className="sw-hero-cta" data-fade data-delay="0.9">
            <Link href="#contact" className="btn btn-accent" data-magnetic="0.2">
              <RollText>Start a project</RollText>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="sw-mark" aria-hidden="true">
          <span data-split="hero">TRACE</span>
          <sup>®</sup>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section className="sw-section" id="work">
        <div className="sw-grid sw-head">
          <p className="label">(01) Selected work</p>
          <h2 className="sw-title" data-split>Four recent builds, all live.</h2>
        </div>
        <div data-fade>
          <WorkIndex projects={projects} />
        </div>
      </section>

      {/* ═══ STATEMENT ═══ */}
      <section className="sw-band" id="studio">
        <div className="sw-grid">
          <p className="label">(02) Studio</p>
          <p className="sw-band-text" data-scrub-words>
            A small studio with a short list of clients. Every site is designed, built and launched by the same hands,
            and ships looking exactly like the design.
          </p>
        </div>
        <div className="sw-grid sw-stats" data-fade="stagger">
          <div><span className="sw-stat" data-count="7">7</span><span className="label">Years in business</span></div>
          <div><span className="sw-stat" data-count="30" data-suffix="+">30+</span><span className="label">Sites shipped</span></div>
          <div><span className="sw-stat">1</span><span className="label">Team, end to end</span></div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="sw-section" id="services">
        <div className="sw-grid sw-head">
          <p className="label">(03) Services</p>
          <h2 className="sw-title" data-split>What we do.</h2>
        </div>
        <div className="sw-cols" data-fade="stagger">
          {services.map((s, i) => (
            <article key={s.title} className="sw-col">
              <span className="sw-col-num">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul>{s.includes.map((x) => <li key={x}>{x}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="sw-section">
        <div className="sw-grid sw-head">
          <p className="label">(04) Process</p>
          <h2 className="sw-title" data-split>Four steps, no hand-offs.</h2>
        </div>
        <ol className="sw-steps" data-fade="stagger">
          {steps.map((s, i) => (
            <li key={s.step}>
              <span className="sw-step-num">{i + 1}</span>
              <h3>{s.step}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="sw-contact" id="contact">
        <div className="sw-grid">
          <p className="label">(05) Contact</p>
          <h2 className="sw-contact-title" data-split>Let’s build your next website.</h2>
          <div className="sw-contact-form" data-fade>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
