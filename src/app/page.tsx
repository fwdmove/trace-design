import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'

const services = [
  {
    title: 'Web design',
    medium: 'Art direction, layout, type, motion',
    desc: 'Visual direction, layout and type shaped around your business, so the site looks like the best in its field.',
  },
  {
    title: 'Development',
    medium: 'Next.js, CMS, animation, performance',
    desc: 'Fast, custom-coded builds that look right on every screen and stay easy to update as you grow.',
  },
  {
    title: 'Landing pages',
    medium: 'Strategy, copy direction, design, build',
    desc: 'Single pages with one job: turn visitors into customers. Planned, designed and built in one go.',
  },
]

const steps = [
  { step: 'Discover', desc: 'We learn the business, the audience and what the site has to do. You get a clear plan and scope.' },
  { step: 'Design', desc: 'Visual direction first, then every page designed in full, with motion and mobile considered from the start.' },
  { step: 'Build', desc: 'Hand-coded, fast and accessible. What we designed is what ships, down to the last transition.' },
  { step: 'Launch', desc: 'We handle hosting, domains and handover, and stay on hand after go-live.' },
]

const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

export default function Home() {
  return (
    <>
      {/* ═══ ENTRANCE ═══ */}
      <section className="hero" data-hero>
        <div className="wrap hero-top" data-fade="stagger" data-delay="0.5">
          <span className="label">Trace Design</span>
          <span className="label">Exhibition No. 07</span>
          <span className="label hero-open">
            <i aria-hidden="true" /> Open now, taking on new projects
          </span>
        </div>

        <div className="wrap hero-body">
          <h1 className="hero-title" data-stretch>
            <span className="hero-line">Websites</span>
            <span className="hero-line hero-line-2">worth</span>
            <span className="hero-line hero-line-3"><em>framing.</em></span>
          </h1>

          <aside className="placard hero-placard" data-fade data-delay="1.1">
            <p className="placard-title">Trace Design, 2019 to now</p>
            <p className="placard-meta">Custom websites, design and code</p>
            <p className="placard-text">
              An independent studio that designs and builds sites for businesses that want to look like the best in
              their field. One studio, first sketch to launch.
            </p>
            <div className="placard-actions">
              <Link href="#contact" className="btn" data-magnetic>
                <RollText>Commission a site</RollText>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </aside>
        </div>

        <a href="#work" className="hero-enter wrap" data-fade data-delay="1.3">
          <span className="mono">Enter the gallery</span>
          <span className="hero-enter-line" aria-hidden="true" />
          <span className="mono">Scroll</span>
        </a>
      </section>

      {/* ═══ GALLERY ═══ */}
      {/* The pin wraps [data-gallery] in a spacer, so React owns the outer section. */}
      <section className="gallery-wrap" id="work" aria-labelledby="gallery-title">
        <div className="gallery" data-gallery>
          <div className="gallery-head wrap">
            <p className="label">Room 01</p>
            <h2 className="label gallery-title" id="gallery-title">Selected work</h2>
            <p className="label gallery-count">
              <span data-gallery-count>01</span> / {String(projects.length).padStart(2, '0')}
            </p>
          </div>

          <div className="gallery-track" data-gallery-track>
            <div className="gallery-intro">
              <p className="gallery-ghost" aria-hidden="true">Selected work</p>
              <h3 className="gallery-lede">
                Four sites, <em>hung</em> in the order we made them.
              </h3>
              <p className="gallery-note">Each piece links to the live site. Hover a frame to see it in colour.</p>
            </div>

            {projects.map((p, i) => (
              <article className={`piece piece-${i % 4}`} key={p.slug} data-piece>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="piece-link"
                  data-cursor="View"
                >
                  <div className="piece-frame">
                    <div className="piece-mat">
                      <div className="piece-shot">
                        <div className="piece-shot-inner" data-piece-shot>
                          <Image src={p.image} alt={p.alt} fill sizes="(max-width: 900px) 90vw, 46vw" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="placard piece-placard">
                    <p className="placard-num mono">{roman[i]}.</p>
                    <p className="placard-title">{p.name}</p>
                    <p className="placard-meta">{p.type}, {p.year}</p>
                    <p className="placard-text">{p.summary}</p>
                    <span className="placard-visit">
                      <RollText>View the live site</RollText>
                      <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                  <span className="sr-only"> (opens the live site in a new tab)</span>
                </a>
              </article>
            ))}

            <div className="gallery-end">
              <p className="label">End of room</p>
              <p className="gallery-end-title">
                Your site<br /> <em>next?</em>
              </p>
              <Link href="#contact" className="text-link">
                <RollText>Commission a piece</RollText>
              </Link>
            </div>
          </div>

          <div className="gallery-progress wrap" aria-hidden="true">
            <span className="gallery-bar"><i data-gallery-bar /></span>
          </div>
        </div>
      </section>

      {/* ═══ CURATOR'S NOTE ═══ */}
      <section className="note wrap" id="studio">
        <div className="note-side">
          <p className="label" data-fade>Curator’s note</p>
          <div className="stats" data-fade="stagger">
            <div className="stat">
              <span className="stat-num" data-count="7">7</span>
              <span className="stat-label">Years in practice</span>
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
        </div>
        <p className="note-statement" data-scrub-words>
          Trace is a small studio with a short list of clients. We take on a few projects at a time, so every site is
          designed, built and launched by the same hands, and ships looking exactly like the design.
        </p>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services wrap" id="services">
        <div className="section-head">
          <p className="label" data-fade>Room 02</p>
          <h2 className="section-title" data-stretch-scroll>
            The <em>collection</em>
          </h2>
        </div>

        <ul className="service-list">
          {services.map((s, i) => (
            <li className="service" key={s.title} data-fade>
              <span className="service-num mono">Plate {roman[i]}</span>
              <h3 className="service-title">{s.title}</h3>
              <div className="service-body">
                <p className="service-medium">{s.medium}</p>
                <p>{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="process" aria-labelledby="process-title">
        <div className="wrap">
          <div className="section-head">
            <p className="label" data-fade>Room 03</p>
            <h2 className="section-title" id="process-title" data-stretch-scroll>
              How a piece <em>is made</em>
            </h2>
          </div>
          <ol className="process-list" data-fade="stagger">
            {steps.map((p, i) => (
              <li className="process-step" key={p.step}>
                <span className="process-num">0{i + 1}</span>
                <h3 className="process-name">{p.step}</h3>
                <p>{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact" id="contact">
        <div className="wrap contact-inner">
          <div>
            <p className="label" data-fade>Commissions</p>
            <h2 className="contact-title" data-stretch-scroll>
              Let’s hang your <em>next</em> site.
            </h2>
            <p className="contact-lede" data-fade>
              Tell us a little about the project. We take on a short list of clients at a time.
            </p>
          </div>
          <div className="contact-card" data-fade>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
