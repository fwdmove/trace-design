import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'

const services = [
  {
    title: 'Web design',
    desc: 'Visual direction, layout and type shaped around what you do, so the site looks like the best in its field.',
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
  { step: 'Discover', desc: 'We learn what you do, who it’s for and what the site has to do. You get a clear plan and scope.' },
  { step: 'Design', desc: 'Visual direction first, then every page designed in full, with motion and mobile considered from the start.' },
  { step: 'Build', desc: 'Hand-coded, fast and accessible. What we designed is what ships, down to the last transition.' },
  { step: 'Launch', desc: 'We handle hosting, domains and handover, and stay on hand after go-live.' },
]

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero" data-hero>
        <div className="wrap hero-inner">
          <div data-hero-drift>
            <h1 className="hero-title" data-split="hero">
              Websites that <br />
              don’t blend <em>in.</em>
            </h1>
          </div>

          <div className="hero-foot" data-fade="stagger" data-delay="0.8">
            <p className="hero-lede">
              Custom websites, designed and built by one studio.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-accent" data-magnetic>
                <RollText>Start a project</RollText>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* The reel is the work: each site links out, and the strip pauses on hover. */}
        <div className="reel" id="work" data-reel data-fade data-delay="1">
          <div className="reel-track" data-reel-track>
            {[...projects, ...projects].map((p, i) => {
              const copy = i >= projects.length
              return (
                <a
                  className="reel-item"
                  key={i}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{ background: p.tone }}
                  aria-hidden={copy || undefined}
                  tabIndex={copy ? -1 : undefined}
                >
                  <Image src={p.image} alt={copy ? '' : p.alt} fill sizes="(max-width: 700px) 70vw, 34vw" priority={i < 3} />
                  <span className="reel-label">
                    <span className="reel-name">{p.name}</span>
                    <span className="reel-type">{p.type} ↗</span>
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section className="intro wrap" id="studio">
        <p className="label" data-fade>(Studio)</p>
        <p className="intro-statement" data-scrub-words>
          Most websites look like they came from the same template. <em>Yours won’t.</em>
        </p>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services" id="services">
        <div className="wrap">
          <div className="section-head">
            <h2 className="section-title" data-split>
              Everything a site needs, <em>under one roof.</em>
            </h2>
            <span className="label" data-fade>(What we do)</span>
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
      <section className="process-wrap" aria-labelledby="process-title">
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
      <section className="contact wrap" id="contact">
        <div className="contact-inner">
          <div>
            <p className="label" data-fade>(Contact)</p>
            <h2 className="contact-title" data-split>
              Let’s build your <em>next</em> website.
            </h2>
            <p className="contact-lede" data-fade>
              Tell us what you’re working on and what the site needs to do. We’ll reply with honest thoughts and clear
              next steps.
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
