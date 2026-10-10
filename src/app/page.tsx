import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'

const services = [
  {
    num: 'I',
    title: 'Web design',
    desc: 'Visual direction, layout and type shaped around your business, so the site looks like the best in its field.',
  },
  {
    num: 'II',
    title: 'Development',
    desc: 'Fast, custom-coded builds that look right on every screen and stay easy to update as you grow.',
  },
  {
    num: 'III',
    title: 'Landing pages',
    desc: 'Single pages with one job: turn visitors into customers. Strategy, copy direction, design and build.',
  },
]

const steps = [
  { step: 'Discover', desc: 'We learn the business, the audience and what the site has to do.' },
  { step: 'Design', desc: 'Visual direction first, then every page in full, motion and mobile included.' },
  { step: 'Build', desc: 'Hand-coded, fast and accessible. What we designed is what ships.' },
  { step: 'Launch', desc: 'Hosting, domains and handover handled, and we stay on hand after.' },
]

export default function Home() {
  const lead = projects[2]

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="nr-hero" data-hero>
        <div className="nr-hero-meta wrap" data-fade="stagger" data-delay="0.6">
          <span className="label">Trace Design</span>
          <span className="label">Independent web studio</span>
          <span className="label">Est. 2019</span>
        </div>

        <div className="nr-hero-center" data-hero-drift>
          <h1 className="nr-hero-title" data-split="hero">
            Websites with <br />
            <em>presence.</em>
          </h1>
          <p className="nr-hero-lede" data-fade data-delay="0.9">
            We design and build custom websites for businesses that want to look like the best in their field.
          </p>
        </div>

        <div className="nr-hero-foot wrap" data-fade="stagger" data-delay="1.1">
          <Link href="#contact" className="nr-pill" data-magnetic>
            <RollText>Start a project</RollText>
          </Link>
          <span className="label nr-scroll">Scroll</span>
        </div>
      </section>

      {/* ═══ SHOWREEL FRAME ═══ */}
      <section className="nr-reel wrap" aria-hidden="true">
        <div className="nr-reel-frame" data-clip style={{ background: lead.tone }}>
          <div className="nr-reel-shot" data-parallax="8">
            <Image src={lead.image} alt="" fill sizes="100vw" priority />
          </div>
        </div>
      </section>

      {/* ═══ STUDIO ═══ */}
      <section className="nr-studio wrap" id="studio">
        <p className="label" data-fade>( The studio )</p>
        <p className="nr-statement" data-scrub-words>
          A small studio with a short list of clients. Every site is designed, built and launched by the same hands,
          and ships looking exactly like the design.
        </p>
        <div className="nr-stats" data-fade="stagger">
          <div>
            <span className="nr-stat" data-count="7">7</span>
            <span className="label">Years</span>
          </div>
          <div>
            <span className="nr-stat" data-count="30" data-suffix="+">30+</span>
            <span className="label">Sites shipped</span>
          </div>
          <div>
            <span className="nr-stat">1</span>
            <span className="label">Team, end to end</span>
          </div>
        </div>
      </section>

      {/* ═══ WORK: full-bleed cards that stack as you scroll ═══ */}
      <section className="nr-work" id="work">
        <div className="nr-work-head wrap">
          <h2 className="nr-title" data-split>
            Selected <em>work</em>
          </h2>
          <span className="label" data-fade>({String(projects.length).padStart(2, '0')})</span>
        </div>

        <div className="nr-stack">
          {projects.map((p) => (
            <article className="nr-card" key={p.slug}>
              <a href={p.url} target="_blank" rel="noreferrer" className="nr-card-link" data-cursor="Visit">
                <div className="nr-card-img" style={{ background: p.tone }}>
                  <Image src={p.image} alt={p.alt} fill sizes="100vw" />
                </div>
                <div className="nr-card-body wrap">
                  <div className="nr-card-top">
                    <span className="mono">{p.index}</span>
                    <span className="mono">{p.type}, {p.year}</span>
                  </div>
                  <div className="nr-card-bottom">
                    <h3 className="nr-card-name">{p.name}</h3>
                    <div className="nr-card-side">
                      <p>{p.summary}</p>
                      <span className="nr-card-visit">
                        <RollText>Visit site</RollText> <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </div>
                </div>
                <span className="sr-only"> (opens the live site in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="nr-services wrap" id="services">
        <div className="nr-section-head">
          <p className="label" data-fade>( Services )</p>
          <h2 className="nr-title" data-split>
            What we <em>make</em>
          </h2>
        </div>
        <ul className="nr-service-list">
          {services.map((s) => (
            <li className="nr-service" key={s.title} data-fade>
              <span className="nr-service-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="nr-process wrap" aria-labelledby="process-title">
        <div className="nr-section-head">
          <p className="label" data-fade>( Process )</p>
          <h2 className="nr-title" id="process-title" data-split>
            Four steps, <em>one team.</em>
          </h2>
        </div>
        <ol className="nr-steps" data-fade="stagger">
          {steps.map((s, i) => (
            <li key={s.step}>
              <span className="mono">0{i + 1}</span>
              <h3>{s.step}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="nr-contact wrap" id="contact">
        <p className="label" data-fade>( Contact )</p>
        <h2 className="nr-contact-title" data-split>
          Let’s make something <em>worth remembering.</em>
        </h2>
        <div className="nr-contact-form" data-fade>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
