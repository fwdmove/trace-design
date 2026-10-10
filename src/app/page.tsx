import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'


const services = [
  {
    title: 'Web design',
    desc: 'Visual direction, layout and type shaped around your business, so the site feels like the best in its field.',
    includes: ['Art direction', 'Layout', 'Typography', 'Motion'],
  },
  {
    title: 'Development',
    desc: 'Fast, custom-coded builds that look right on every screen and stay easy to update as you grow.',
    includes: ['Next.js', 'CMS setup', 'Animation', 'Performance'],
  },
  {
    title: 'Landing pages',
    desc: 'Single pages with one job: turn visitors into customers. Strategy, copy direction, design and build.',
    includes: ['Strategy', 'Copy direction', 'Design + build', 'Launch'],
  },
]

const steps = [
  { step: 'Discover', desc: 'We learn the business, the audience and what the site has to do. You get a clear plan and scope.' },
  { step: 'Design', desc: 'Visual direction first, then every page designed in full, with motion and mobile considered from the start.' },
  { step: 'Build', desc: 'Hand-coded, fast and accessible. What we designed is what ships, down to the last transition.' },
  { step: 'Launch', desc: 'We handle hosting, domains and handover, and stay close after go-live.' },
]

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero" data-hero>
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner wrap">
          <p className="pill" data-fade data-delay="0.3">
            <span className="pill-dot" aria-hidden="true" />
            Taking on new projects
          </p>

          <div data-hero-drift>
            <h1 className="hero-title" data-split="hero">
              Websites that make you <em>the obvious choice.</em>
            </h1>
          </div>

          <div className="hero-foot" data-fade="stagger" data-delay="0.9">
            <p className="hero-lede">
              Trace is an independent studio designing and building custom websites for businesses that want to stand out
              in their field, whatever that field is. One small team, from first sketch to launch.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="btn" data-magnetic>
                <RollText>Start a project</RollText>
              </Link>
              <Link href="#work" className="btn btn-ghost">
                <RollText>See the work</RollText>
              </Link>
            </div>
          </div>
        </div>

        <div className="pebbles" aria-hidden="true">
          {projects.slice(0, 3).map((p, i) => (
            <div className={`pebble pebble-${i + 1}`} data-float={8 + i * 4} key={p.slug}>
              <div className="pebble-inner">
                <Image src={p.image} alt="" fill sizes="220px" priority />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section className="intro wrap" id="studio">
        <p className="label" data-fade>The studio</p>
        <p className="intro-statement" data-scrub-words>
          We keep a short list of clients and take on a few projects at a time, so every site is designed, built and
          launched by the same hands, with room to get the details right.
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
      <section className="work wrap" id="work">
        <div className="section-head">
          <p className="label" data-fade>Selected work</p>
          <h2 className="section-title" data-split>
            Recent sites, <em>live</em> and working.
          </h2>
        </div>

        <div className="work-grid">
          {projects.map((p) => (
            <article className="work-card" key={p.slug}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="work-link"
                data-cursor="Visit"
              >
                <div className="work-frame" data-clip>
                  <div className="work-shot" data-parallax="5">
                    <Image src={p.image} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
                  </div>
                </div>
                <div className="work-meta">
                  <div>
                    <h3 className="work-name">{p.name}</h3>
                    <p className="work-summary">{p.summary}</p>
                  </div>
                  <span className="work-tag">{p.type}</span>
                </div>
                <span className="work-visit" aria-hidden="true">↗</span>
                <span className="sr-only"> (opens the live site in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services" id="services">
        <div className="wrap">
        <div className="section-head">
          <p className="label" data-fade>What we do</p>
          <h2 className="section-title" data-split>
            Everything a site needs, <em>under one roof.</em>
          </h2>
        </div>

        <ul className="service-list" data-fade="stagger">
          {services.map((s) => (
            <li className="service" key={s.title}>
              <span className="service-glow" aria-hidden="true" />
              <h3 className="service-title">{s.title}</h3>
              <p>{s.desc}</p>
              <ul className="chips">
                {s.includes.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </li>
          ))}
        </ul>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="process wrap" aria-labelledby="process-title">
        <div className="section-head">
          <p className="label" data-fade>How it works</p>
          <h2 className="section-title" id="process-title" data-split>
            Four steps, <em>no hand-offs.</em>
          </h2>
        </div>

        <div className="process-body">
          <svg className="process-line" viewBox="0 0 200 1000" preserveAspectRatio="none" aria-hidden="true">
            <path
              data-draw
              d="M100 0 C 20 120, 180 220, 100 330 S 20 540, 100 660 S 180 880, 100 1000"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="process-steps">
            {steps.map((p, i) => (
              <li className="process-step" key={p.step} data-fade>
                <span className="process-num">0{i + 1}</span>
                <div>
                  <h3>{p.step}</h3>
                  <p>{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact wrap" id="contact">
        <div className="contact-card">
          <span className="contact-glow" aria-hidden="true" />
          <div className="contact-copy">
            <p className="label" data-fade>Say hello</p>
            <h2 className="contact-title" data-split>
              Let’s build something <em>worth noticing.</em>
            </h2>
            <p className="contact-lede" data-fade>
              Tell us a little about the project. We take on a short list of clients at a time, and reply to every note.
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
