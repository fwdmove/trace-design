import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'

// The pieces in Room 01: the studio's own work, shown as typographic art.
const exhibits = [
  {
    art: 'Design',
    tone: 'light',
    caption: 'Type and layout on screen',
    title: 'Web design',
    meta: 'Art direction, layout, type, motion',
    text: 'Visual direction, layout and type shaped around your business, so the site looks like the best in its field.',
  },
  {
    art: 'Build',
    tone: 'dark',
    caption: 'Hand-written code',
    title: 'Development',
    meta: 'Next.js, CMS, animation, performance',
    text: 'Fast, custom-coded builds that look right on every screen and stay easy to update as you grow.',
  },
  {
    art: 'Convert',
    tone: 'light',
    caption: 'One page, one job',
    title: 'Landing pages',
    meta: 'Strategy, copy direction, design, build',
    text: 'Single pages with one job: turn visitors into customers. Planned, designed and built in one go.',
  },
  {
    art: '30+',
    tone: 'dark',
    caption: 'Sites shipped since 2019',
    title: 'The body of work',
    meta: 'Seven years in practice',
    text: 'Thirty-odd sites for builders, makers, hospitality and service businesses, each one designed from scratch.',
  },
  {
    art: 'One',
    tone: 'light',
    caption: 'Studio, sketch to launch',
    title: 'No hand-offs',
    meta: 'Design and code by the same hands',
    text: 'The person who designs your site builds it, so what you approve is exactly what ships.',
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

        <a href="#services" className="hero-enter wrap" data-fade data-delay="1.3">
          <span className="mono">Enter the gallery</span>
          <span className="hero-enter-line" aria-hidden="true" />
          <span className="mono">Scroll</span>
        </a>
      </section>

      {/* ═══ GALLERY: the studio is the exhibit ═══ */}
      {/* The pin wraps [data-gallery] in a spacer, so React owns the outer section. */}
      <section className="gallery-wrap" id="services" aria-labelledby="gallery-title">
        <div className="gallery" data-gallery>
          <div className="gallery-head wrap">
            <p className="label">Room 01</p>
            <h2 className="label gallery-title" id="gallery-title">The practice</h2>
            <p className="label gallery-count">
              <span data-gallery-count>01</span> / {String(exhibits.length).padStart(2, '0')}
            </p>
          </div>

          <div className="gallery-track" data-gallery-track>
            <div className="gallery-intro">
              <p className="gallery-ghost" aria-hidden="true">The practice</p>
              <h3 className="gallery-lede">
                What we do, <em>hung</em> on the wall.
              </h3>
              <p className="gallery-note">Five pieces on how Trace works. Keep scrolling, the room moves sideways.</p>
            </div>

            {exhibits.map((x, i) => (
              <article className={`piece piece-${i % 5}`} key={x.title} data-piece>
                <div className="piece-frame">
                  <div className="piece-mat">
                    <div className={`art art-${x.tone}`}>
                      <span className="art-corner mono">No. {String(i + 1).padStart(2, '0')}</span>
                      <span
                        className="art-word"
                        style={{ fontSize: `${Math.min(30, 80 / x.art.length)}cqi` }}
                      >
                        {x.art}
                      </span>
                      <span className="art-caption">{x.caption}</span>
                    </div>
                  </div>
                </div>
                <div className="placard piece-placard">
                  <p className="placard-num mono">{roman[i]}.</p>
                  <p className="placard-title">{x.title}</p>
                  <p className="placard-meta">{x.meta}</p>
                  <p className="placard-text">{x.text}</p>
                </div>
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

      {/* ═══ PROCESS ═══ */}
      <section className="process" aria-labelledby="process-title">
        <div className="wrap">
          <div className="section-head">
            <p className="label" data-fade>Room 02</p>
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

      {/* ═══ WORK: a modest index, previews on hover ═══ */}
      <section className="archive wrap" id="work">
        <div className="section-head">
          <p className="label" data-fade>Room 03</p>
          <h2 className="section-title" data-stretch-scroll>
            Recent <em>work</em>
          </h2>
        </div>
        <ul className="archive-list">
          {projects.map((p, i) => (
            <li key={p.slug} data-fade>
              <a href={p.url} target="_blank" rel="noreferrer" className="archive-row">
                <span className="archive-num mono">{roman[i]}.</span>
                <span className="archive-thumb" aria-hidden="true">
                  <Image src={p.image} alt="" fill sizes="(max-width: 700px) 96px, 280px" />
                </span>
                <span className="archive-name">{p.name}</span>
                <span className="archive-type">{p.type}</span>
                <span className="archive-year mono">{p.year}</span>
                <span className="archive-visit mono">
                  <RollText>Visit</RollText> <span aria-hidden="true">↗</span>
                </span>
                <span className="sr-only"> (opens the live site in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
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
