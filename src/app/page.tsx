import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'

const services = [
  {
    title: 'Web design',
    desc: 'Visual direction, layout and type shaped around your business, so the site looks like the best in its field.',
    includes: ['Art direction', 'Layout systems', 'Typography', 'Motion design'],
  },
  {
    title: 'Development',
    desc: 'Fast, custom-coded builds that look right on every screen and stay easy to update as you grow.',
    includes: ['Next.js builds', 'CMS setup', 'Animation', 'Performance'],
  },
  {
    title: 'Landing pages',
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

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero" data-hero data-morph="0">
        <div className="wrap hero-inner">
          <div className="hero-meta" data-fade="stagger" data-delay="0.6">
            <span className="label">Independent web studio</span>
            <span className="label">Design + development</span>
            <span className="label">Est. 2019</span>
          </div>

          <div className="hero-center" data-hero-drift>
            <h1 className="hero-title" data-split="hero">
              Websites that <br />
              don’t <span className="outline">blend</span> <em>in.</em>
            </h1>
          </div>

          <div className="hero-foot" data-fade="stagger" data-delay="0.8">
            <p className="hero-lede">
              We design and build custom websites for businesses that want to look like the best in their field.
              One studio, from first sketch to launch.
            </p>
            <div className="scroll-cue" aria-hidden="true">
              <span className="scroll-cue-line" />
              <span className="label">Scroll to tune the field</span>
            </div>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-accent" data-magnetic>
                <RollText>Start a project</RollText>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="#work" className="text-link">
                <RollText>See the work</RollText>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section className="intro wrap" id="studio" data-morph="1">
        <p className="label" data-fade>(Studio)</p>
        <p className="intro-statement" data-scrub-words>
          Trace is a small studio with a short list of clients. We take on a few projects at a time, so every site is
          designed, built and launched by the same hands, and ships looking exactly like the design.
        </p>
        <div className="stats" data-fade="stagger">
          <div className="stat">
            <span className="stat-num" data-count="7">7</span>
            <span className="stat-label">Years in business</span>
          </div>
          <div className="stat">
            <span className="stat-num" data-count="30" data-suffix="+">30+</span>
            <span className="stat-label">Sites shipped</span>
          </div>
          <div className="stat">
            <span className="stat-num" data-count="1">1</span>
            <span className="stat-label">Team, end to end</span>
          </div>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section className="work wrap" id="work" data-morph="2">
        <div className="section-head">
          <h2 className="section-title" data-split>
            Selected <em>work</em>
          </h2>
          <span className="label" data-fade>({String(projects.length).padStart(2, '0')}) Projects</span>
        </div>

        <div className="work-list">
          {projects.map((p) => (
            <article className="work-card" key={p.slug}>
              <a href={p.url} target="_blank" rel="noreferrer" className="work-link" data-cursor="Visit" data-tilt>
                <div className="work-frame" data-clip style={{ background: p.tone }}>
                  <div className="work-shot" data-parallax="6">
                    <Image src={p.image} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 60vw" />
                  </div>
                  <span className="work-scan" aria-hidden="true" />
                </div>
                <div className="work-info">
                  <span className="mono work-index">{p.index} / {String(projects.length).padStart(2, '0')}</span>
                  <h3 className="work-name">{p.name}</h3>
                  <p className="work-summary">{p.summary}</p>
                  <div className="work-tags">
                    <span className="mono">{p.type}</span>
                    <span className="mono">{p.year}</span>
                  </div>
                  <span className="work-visit">
                    <RollText>Visit site</RollText>
                    <span aria-hidden="true">↗</span>
                  </span>
                </div>
                <span className="sr-only"> (opens the live site in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services" id="services" data-morph="3">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title" data-split>
              What we <em>do</em>
            </h2>
            <span className="label" data-fade>Every project, end to end</span>
          </div>

          <ul className="service-list">
            {services.map((s, i) => (
              <li className="service" key={s.title} data-fade>
                <span className="mono service-num">0{i + 1}</span>
                <h3 className="service-title">{s.title}</h3>
                <div className="service-body">
                  <p>{s.desc}</p>
                  <ul className="chips">
                    {s.includes.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      {/* The pin wraps [data-hscroll] in a spacer, so React owns the outer section. */}
      <section className="process-wrap" aria-labelledby="process-title" data-morph="3">
        <div className="process" data-hscroll>
          <div className="process-track" data-hscroll-track>
            <div className="process-intro">
              <p className="label">(How it works)</p>
              <h2 className="section-title" id="process-title" data-split>
                Four steps, <em>no hand-offs.</em>
              </h2>
            </div>
            {steps.map((p, i) => (
              <div className="process-card" key={p.step}>
                <span className="process-num">0{i + 1}</span>
                <div>
                  <h3 className="process-step">{p.step}</h3>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact" id="contact" data-morph="4">
        <div className="wrap contact-inner">
          <div>
            <p className="label" data-fade>(Contact)</p>
            <h2 className="contact-title" data-split>
              Let’s build your <em>next</em> website.
            </h2>
            <p className="contact-lede" data-fade>
              Tell us a little about the project. We take on a short list of clients at a time.
            </p>
          </div>
          <div data-fade>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
