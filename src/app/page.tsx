import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'
import ReactiveTitle from './components/ReactiveTitle'
import WorkList from './components/WorkList'
import Accordion from './components/Accordion'
import Clock from './components/Clock'

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

const ticker = ['Web design', 'Development', 'Landing pages', 'Motion', 'Launch']

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="sec-label mono" data-fade>
      <span>({n})</span> {children}
    </p>
  )
}

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero" data-hero>
        <div className="wrap grid hero-top" data-fade="stagger" data-delay="0.4">
          <p className="mono">Trace Design<br />Independent web studio</p>
          <p className="mono">Design + development<br />Est. 2019</p>
          <p className="mono status"><span className="status-dot" aria-hidden="true" /> Taking on<br />new projects</p>
          <p className="mono hero-clock">Your time<br /><Clock /></p>
        </div>

        <div className="wrap">
          <ReactiveTitle lines={['Websites', 'that don’t', 'blend in.']} label="Websites that don’t blend in." />
        </div>

        <div className="wrap grid hero-foot" data-fade="stagger" data-delay="0.9">
          <p className="hero-lede">
            We design and build custom websites for businesses that want to look like the best in their field.
            One studio, from first sketch to launch.
          </p>
          <div className="hero-actions">
            <Link href="#contact" className="btn" data-magnetic>
              <RollText>Start a project</RollText>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="#work" className="text-link">
              <RollText>See the work</RollText>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="ticker" data-reel aria-hidden="true">
        <div className="ticker-track" data-reel-track>
          {[0, 1].map((k) => (
            <span className="ticker-set" key={k}>
              {[...ticker, ...ticker].map((t, i) => (
                <span key={i}>{t}<i className="ticker-star">✳</i></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ STUDIO ═══ */}
      <section className="sec wrap grid" id="studio">
        <SectionLabel n="01">Studio</SectionLabel>
        <div className="sec-body">
          <p className="statement" data-scrub-words>
            Trace is a small studio with a short list of clients. We take on a few projects at a time, so every site is
            designed, built and launched by the same hands, and ships looking exactly like the design.
          </p>
          <div className="stats" data-fade="stagger">
            <div className="stat">
              <span className="stat-num" data-count="7">7</span>
              <span className="mono">Years in business</span>
            </div>
            <div className="stat">
              <span className="stat-num" data-count="30" data-suffix="+">30+</span>
              <span className="mono">Sites shipped</span>
            </div>
            <div className="stat">
              <span className="stat-num">1</span>
              <span className="mono">Team, end to end</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section className="sec sec-dark" id="work">
        <div className="wrap grid">
          <SectionLabel n="02">Selected work</SectionLabel>
          <div className="sec-body">
            <h2 className="sec-title" data-split>Recent launches.</h2>
            <WorkList projects={projects} />
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="sec wrap grid" id="services">
        <SectionLabel n="03">Services</SectionLabel>
        <div className="sec-body">
          <h2 className="sec-title" data-split>What we do.</h2>
          <Accordion items={services} />
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="sec sec-dark" aria-labelledby="process-title">
        <div className="wrap grid">
          <SectionLabel n="04">Process</SectionLabel>
          <div className="sec-body">
            <h2 className="sec-title" id="process-title" data-split>Four steps, no hand-offs.</h2>
            <ol className="steps" data-fade="stagger">
              {steps.map((s, i) => (
                <li className="step" key={s.step}>
                  <span className="step-num">0{i + 1}</span>
                  <h3 className="step-title">{s.step}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="sec contact wrap grid" id="contact">
        <SectionLabel n="05">Contact</SectionLabel>
        <div className="sec-body">
          <h2 className="contact-title" data-split>Let’s talk.</h2>
          <div className="contact-grid">
            <p className="contact-lede" data-fade>
              Tell us a little about the project. We take on a short list of clients at a time and reply to every note.
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
