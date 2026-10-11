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
      <section className="hero" data-hero>
        <div className="orb-field" aria-hidden="true">
          <span className="orb" data-orb />
        </div>

        <div className="wrap hero-inner">
          <div className="hero-meta" data-fade="stagger" data-delay="0.5">
            <span>Independent web studio</span>
            <span>Design + development</span>
            <span>Est. 2019</span>
          </div>

          <h1 className="hero-title" data-split="hero">
            Websites that <br />
            don’t blend <span className="accent-word">in.</span>
          </h1>

          <div className="hero-foot" data-fade="stagger" data-delay="0.75">
            <p className="hero-lede">
              We design and build custom websites for businesses that want to look like the best in their field. One
              studio, from first sketch to launch.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-primary" data-magnetic>
                <RollText>Start a project</RollText>
                <span className="btn-dot" aria-hidden="true" />
              </Link>
              <span className="availability">
                <span className="availability-dot" aria-hidden="true" />
                Taking on new projects
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STUDIO ═══ */}
      <section className="studio wrap" id="studio">
        <p className="kicker" data-fade>The studio</p>
        <p className="statement" data-scrub-words>
          Trace is a small studio with a short list of clients. We take on a few projects at a time, so every site is
          designed, built and launched by the same hands, and ships looking exactly like the design.
        </p>
        <dl className="facts" data-fade="stagger">
          <div>
            <dt>Years in business</dt>
            <dd data-count="7">7</dd>
          </div>
          <div>
            <dt>Sites shipped</dt>
            <dd data-count="30" data-suffix="+">30+</dd>
          </div>
          <div>
            <dt>Team, end to end</dt>
            <dd>1</dd>
          </div>
        </dl>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services wrap" id="services">
        <div className="section-head">
          <p className="kicker" data-fade>What we do</p>
          <h2 className="section-title" data-split>Every project, end to end.</h2>
        </div>

        <ul className="service-list">
          {services.map((s, i) => (
            <li className="service" key={s.title} tabIndex={0} data-fade>
              <span className="service-num">0{i + 1}</span>
              <h3 className="service-title">{s.title}</h3>
              <span className="service-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
              <div className="service-more">
                <div>
                  <p>{s.desc}</p>
                  <ul className="tags">
                    {s.includes.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ WORK ═══ */}
      <section className="work wrap" id="work">
        <div className="section-head section-head-split">
          <div>
            <p className="kicker" data-fade>Selected work</p>
            <h2 className="section-title" data-split>Recently launched.</h2>
          </div>
          <p className="section-note" data-fade>Each one opens the live site.</p>
        </div>

        <div className="work-grid" data-fade="stagger">
          {projects.map((p) => (
            <a key={p.slug} href={p.url} target="_blank" rel="noreferrer" className="work-card">
              <span className="work-shot">
                <Image src={p.image} alt={p.alt} fill sizes="(max-width: 700px) 46vw, 24vw" />
              </span>
              <span className="work-meta">
                <span className="work-name">{p.name}</span>
                <span className="work-type">{p.type}</span>
              </span>
              <span className="work-arrow" aria-hidden="true">↗</span>
              <span className="sr-only"> (opens the live site in a new tab)</span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="process wrap" id="process" aria-labelledby="process-title">
        <div className="section-head">
          <p className="kicker" data-fade>How it works</p>
          <h2 className="section-title" id="process-title" data-split>Four steps, no hand-offs.</h2>
        </div>
        <ol className="steps" data-progress>
          <span className="steps-line" aria-hidden="true"><span /></span>
          {steps.map((s, i) => (
            <li className="step" key={s.step} style={{ '--i': i } as React.CSSProperties}>
              <span className="step-num">{i + 1}</span>
              <h3>{s.step}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact wrap" id="contact">
        <div className="contact-inner">
          <div className="contact-copy">
            <p className="kicker" data-fade>Start a project</p>
            <h2 className="contact-title" data-split>
              Let’s build your next <span className="accent-word">website.</span>
            </h2>
            <p className="contact-lede" data-fade>
              Tell us a little about the project. We take on a short list of clients at a time.
            </p>
          </div>
          <div className="contact-form" data-fade>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
