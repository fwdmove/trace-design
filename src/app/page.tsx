import Image from 'next/image'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'

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

// Where each draggable window starts in the hero, as % of the stage.
const windows = [
  { left: 3, top: 5, rotate: -4 },
  { left: 35, top: 12, rotate: 3 },
  { left: 63, top: 3, rotate: -2 },
  { left: 70, top: 48, rotate: 5 },
]

const tape = 'Available for new projects ✶ Websites that don’t blend in ✶ Design + development ✶ '
const statement =
  'Trace is a small studio with a short list of clients. Every site is designed, built and launched by the same hands, and ships looking exactly like the design. No templates. No hand-offs. No beige.'

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero" data-hero>
        <div className="hero-cells" data-fade="stagger" data-delay="0.2">
          <span>Independent web studio</span>
          <span>Design + development</span>
          <span>Est. 2019</span>
          <span className="hero-cell-blue">N°&nbsp;001 / 2026</span>
        </div>

        <h1 className="hero-title">
          <span className="sr-only">Trace Design: websites that don’t blend in.</span>
          <span className="hero-word" data-fit data-split="hero" aria-hidden="true">TRACE</span>
        </h1>

        <div className="hero-stage" data-drag-stage>
          <p className="hero-line" aria-hidden="true" data-fade data-delay="0.6">
            Websites <br />that <mark>don’t</mark> <br />blend in.
          </p>
          <p className="hero-hint mono" data-fade data-delay="1.2">↖ Drag the windows. Click to visit.</p>

          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="win"
              data-drag
              style={{ left: `${windows[i].left}%`, top: `${windows[i].top}%`, rotate: `${windows[i].rotate}deg` }}
            >
              <div className="win-bar" data-drag-handle>
                <span>{p.slug}.site</span>
                <span className="win-btns" aria-hidden="true"><i /><i /><i /></span>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" className="win-shot" data-cursor="Visit">
                <Image src={p.image} alt={p.alt} fill sizes="(max-width: 900px) 80vw, 26vw" priority={i < 2} />
                <span className="sr-only"> (opens the live site in a new tab)</span>
              </a>
            </div>
          ))}
        </div>

        <div className="hero-foot">
          <p className="hero-lede" data-fade data-delay="0.8">
            We design and build custom websites for businesses that want to look like the best in their field. One
            studio, from first sketch to launch.
          </p>
          <div data-fade data-delay="0.9">
            <a href="#contact" className="btn btn-acid">
              <span data-scramble>Start a project</span> <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ TAPE ═══ */}
      <div className="tapes" aria-hidden="true">
        <div className="tape tape-acid" data-tape>
          <div className="tape-track" data-tape-track>
            <span>{tape.repeat(3)}</span>
            <span>{tape.repeat(3)}</span>
          </div>
        </div>
        <div className="tape tape-blue" data-tape="reverse">
          <div className="tape-track" data-tape-track>
            <span>{tape.repeat(3)}</span>
            <span>{tape.repeat(3)}</span>
          </div>
        </div>
      </div>

      {/* ═══ STUDIO ═══ */}
      <section className="studio grid-section" id="studio">
        <div className="cell-head">
          <div className="cell-sticky">
            <span className="tag">(01)</span>
            <h2 className="tag">Studio</h2>
          </div>
        </div>
        <div className="studio-body">
          <p className="statement" data-mark-words>
            {statement}
          </p>
          <div className="stats">
            <div className="stat">
              <span className="stat-num" data-count="7">7</span>
              <span className="tag">Years in business</span>
            </div>
            <div className="stat">
              <span className="stat-num" data-count="30" data-suffix="+">30+</span>
              <span className="tag">Sites shipped</span>
            </div>
            <div className="stat stat-acid">
              <span className="stat-num">1</span>
              <span className="tag">Team, end to end</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section className="work grid-section" id="work">
        <div className="cell-head">
          <div className="cell-sticky">
            <span className="tag">(02)</span>
            <h2 className="tag">Work</h2>
          </div>
        </div>
        <div className="work-body">
          <div className="work-title-row">
            <p className="big-title" data-split>Selected work</p>
            <span className="tag">[{String(projects.length).padStart(2, '0')}] Live sites</span>
          </div>
          <div className="work-grid">
            {projects.map((p) => (
              <article className="card" key={p.slug} data-fade>
                <a href={p.url} target="_blank" rel="noreferrer" className="card-link" data-cursor="Visit">
                  <div className="card-bar">
                    <span>{p.index}</span>
                    <span>{p.type}</span>
                    <span>{p.year}</span>
                  </div>
                  <div className="card-shot" style={{ background: p.tone }}>
                    <Image src={p.image} alt={p.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
                  </div>
                  <div className="card-foot">
                    <div>
                      <h3 className="card-name">{p.name}</h3>
                      <p className="card-summary">{p.summary}</p>
                    </div>
                    <span className="card-visit">
                      <span data-scramble>Visit site</span> ↗
                    </span>
                  </div>
                  <span className="sr-only"> (opens the live site in a new tab)</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services grid-section" id="services">
        <div className="cell-head">
          <div className="cell-sticky">
            <span className="tag">(03)</span>
            <h2 className="tag">Services</h2>
          </div>
        </div>
        <div className="services-body">
          <p className="big-title" data-split>What we do</p>
          <ul className="service-table">
            {services.map((s, i) => (
              <li className="service-row" key={s.title} data-fade>
                <span className="service-num">0{i + 1}</span>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <ul className="chips">
                  {s.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="process grid-section" aria-labelledby="process-title">
        <div className="cell-head">
          <div className="cell-sticky">
            <span className="tag">(04)</span>
            <h2 className="tag" id="process-title">Process</h2>
          </div>
        </div>
        <div className="process-body">
          <p className="big-title" data-split>Four steps. Zero hand-offs.</p>
          <ol className="steps">
            {steps.map((p, i) => (
              <li className="step" key={p.step} data-stamp>
                <span className="step-num">0{i + 1}</span>
                <h3 className="step-title">{p.step}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact" id="contact">
        <div className="contact-head">
          <span className="tag">(05) Contact</span>
          <span className="tag">Short list of clients at a time</span>
        </div>
        <h2 className="contact-title" data-split>
          Let’s build <br />
          your next <br />
          website.
        </h2>
        <div className="contact-grid">
          <p className="contact-lede" data-fade>
            Tell us a little about the project: what you do, what the site has to achieve, and when you need it.
          </p>
          <div data-fade>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
