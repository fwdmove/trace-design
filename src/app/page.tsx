import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'
import { Chars, FitLine } from './components/Kinetic'

// Palette. Each block of the page names a background, text and accent; as a
// block reaches the middle of the screen the whole page shifts to its colors.
const C = {
  blue: '#2121ff',
  lime: '#d4ff2e',
  pink: '#ff4fa3',
  orange: '#ff5a1f',
  ink: '#0d0d12',
  cream: '#f5f1e8',
}

function tone(bg: string, fg: string, ac: string) {
  return {
    'data-tone': `${bg} ${fg} ${ac}`,
    style: { '--t-bg': bg, '--t-fg': fg, '--t-ac': ac } as CSSProperties,
  }
}

const projectTones = [
  tone(C.orange, C.ink, C.cream),
  tone(C.lime, C.ink, C.blue),
  tone(C.pink, C.ink, C.cream),
  tone(C.blue, C.cream, C.lime),
]

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

const marquee = ['Web design', 'Development', 'Landing pages', 'Motion', 'Art direction']

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero" data-hero {...tone(C.blue, C.cream, C.lime)}>
        <div className="wrap hero-top" data-fade="stagger" data-delay="0.9">
          <span className="label">Independent web studio</span>
          <span className="label status"><i aria-hidden="true" />Taking on new projects</span>
          <span className="label hide-sm">Est. 2019</span>
        </div>

        <h1 className="hero-title wrap" data-kin="load" data-proximity>
          <span className="sr-only">Websites that don’t blend in.</span>
          <span className="hero-lg">
            <FitLine text="WEBSITES" vh={0.24} exit={-1} />
            <FitLine text="THAT DON’T" vh={0.24} exit={1} />
            <FitLine text="BLEND IN." vh={0.24} exit={-1} className="accent" />
          </span>
          {/* Phones get shorter lines so each word can run bigger. */}
          <span className="hero-sm">
            <FitLine text="WEBSITES" exit={-1} />
            <FitLine text="THAT" exit={1} />
            <FitLine text="DON’T" exit={-1} />
            <FitLine text="BLEND IN." exit={1} className="accent" />
          </span>
        </h1>

        <div className="wrap hero-foot" data-fade="stagger" data-delay="1.2">
          <p className="hero-lede">
            We design and build custom websites for businesses that want to look like the best in their field.
            One studio, from first sketch to launch.
          </p>
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
      </section>

      {/* ═══ CROSSED BANDS ═══ */}
      <div className="bands" aria-hidden="true">
        <div className="band band-a" data-marquee="1">
          <div className="band-track" data-marquee-track>
            {[0, 1].map((k) => (
              <span className="band-set" key={k}>
                {marquee.map((m) => (
                  <span key={m}>{m}<b>✺</b></span>
                ))}
              </span>
            ))}
          </div>
        </div>
        <div className="band band-b" data-marquee="-1">
          <div className="band-track" data-marquee-track>
            {[0, 1].map((k) => (
              <span className="band-set" key={k}>
                {marquee.map((m) => (
                  <span key={m}>{m}<b>●</b></span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ INTRO ═══ */}
      <section className="intro wrap" id="studio" {...tone(C.cream, C.ink, C.blue)}>
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
            <span className="stat-num">1</span>
            <span className="stat-label">Team, end to end</span>
          </div>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section className="work" id="work" aria-labelledby="work-title">
        <div className="work-head wrap" {...tone(C.ink, C.cream, C.lime)}>
          <p className="label" data-fade>({String(projects.length).padStart(2, '0')}) Selected work</p>
          <h2 className="section-title" id="work-title" data-kin="scroll">
            <span className="sr-only">Recent launches</span>
            <FitLine text="RECENT" exit={1} />
            <FitLine text="LAUNCHES" exit={-1} className="accent" />
          </h2>
        </div>

        {projects.map((p, i) => (
          <article className="proj" key={p.slug} data-wave {...projectTones[i % projectTones.length]}>
            <div className="wrap">
              <div className="proj-top">
                <span className="mono">{p.index}</span>
                <span className="mono">{p.type}</span>
                <span className="mono">{p.year}</span>
              </div>
              <h3 className="proj-name" data-kin="scroll">
                <span className="sr-only">{p.name}</span>
                <FitLine text={p.name.toUpperCase()} vh={0.3} />
              </h3>

              <div className="proj-stage">
                <a href={p.url} target="_blank" rel="noreferrer" className="proj-link" data-cursor="Visit" data-tilt>
                  <div className="proj-frame">
                    <div className="proj-bar" aria-hidden="true">
                      <i /><i /><i />
                      <span className="mono">{host(p.url)}</span>
                    </div>
                    <div className="proj-shot" style={{ background: p.tone }}>
                      <Image src={p.image} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 78vw" />
                    </div>
                  </div>
                  <span className="sr-only"> (opens the live site in a new tab)</span>
                </a>
              </div>

              <div className="proj-foot">
                <p className="proj-summary">{p.summary}</p>
                <a href={p.url} target="_blank" rel="noreferrer" className="proj-visit">
                  <RollText>Visit site</RollText>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services" id="services" {...tone(C.ink, C.cream, C.lime)}>
        <div className="wrap">
          <div className="services-head">
            <p className="label" data-fade>(What we do)</p>
            <p className="services-lede" data-fade>Every project, end to end. One team from the first sketch to launch day.</p>
          </div>

          <ul className="service-list">
            {services.map((s, i) => (
              <li className="service" key={s.title} data-wave>
                <h3 className="service-title" data-kin="scroll" data-slide={i % 2 ? -1 : 1}>
                  <span className="sr-only">{s.title}</span>
                  <FitLine text={s.title.toUpperCase()} />
                </h3>
                <div className="service-body" data-fade>
                  <span className="mono service-num">0{i + 1}</span>
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
      <section className="process-wrap" aria-labelledby="process-title" {...tone(C.pink, C.ink, C.blue)}>
        <div className="process" data-hscroll>
          <div className="process-track" data-hscroll-track>
            <div className="process-intro">
              <p className="label">(How it works)</p>
              <h2 className="process-title" id="process-title" data-split>
                Four steps. <span className="accent">No hand-offs.</span>
              </h2>
            </div>
            {steps.map((p, i) => (
              <div className="process-panel" key={p.step}>
                <span className="process-num">0{i + 1}</span>
                <h3 className="process-step"><Chars text={p.step} /></h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact" id="contact" {...tone(C.lime, C.ink, C.blue)}>
        <div className="wrap">
          <p className="label" data-fade>(Contact)</p>
          <h2 className="contact-title" data-kin="scroll" data-proximity>
            <span className="sr-only">Let’s talk.</span>
            <FitLine text="LET’S" vh={0.34} />
            <FitLine text="TALK." vh={0.34} className="accent" />
          </h2>
          <div className="contact-inner">
            <p className="contact-lede" data-fade>
              Tell us a little about the project. We take on a short list of clients at a time.
            </p>
            <div data-fade>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
