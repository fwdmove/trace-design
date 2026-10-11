import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import HeroWindow from './components/HeroWindow'
import RollText from './components/RollText'

const steps = [
  { step: 'Discover', desc: 'We learn the business, the audience and what the site has to do. You get a clear plan and scope.' },
  { step: 'Design', desc: 'Visual direction first, then every page designed in full, with motion and mobile considered from the start.' },
  { step: 'Build', desc: 'Hand-coded, fast and accessible. What we designed is what ships, down to the last transition.' },
  { step: 'Launch', desc: 'We handle hosting, domains and handover, and stay on hand after go-live.' },
]

const faqs = [
  {
    q: 'Who actually does the work?',
    a: 'The same small team designs, builds and launches your site. There are no hand-offs to another agency or freelancer along the way.',
  },
  {
    q: 'Can I update the site myself?',
    a: 'Yes. We set up a simple editor so you can change text, photos and pages without touching code or calling us.',
  },
  {
    q: 'Do you handle hosting and domains?',
    a: 'We take care of hosting, domains and the launch itself, then hand everything over and stay on hand after go-live.',
  },
  {
    q: 'How many projects do you take on?',
    a: 'Only a few at a time. That keeps every site getting full attention from first sketch to launch.',
  },
]

const launchList = ['Domain connected', 'SSL secured', 'Analytics on', 'Handover done']
const toasts = ['New enquiry', 'Quote request', 'Call booked']

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero" data-hero>
        <div className="hero-glow" aria-hidden="true"><i /><i /><i /></div>
        <div className="wrap hero-inner">
          <div data-fade data-delay="0.1">
            <Link href="#contact" className="pill">
              <span className="pill-dot" aria-hidden="true" />
              <span>Taking on new projects</span>
              <span className="pill-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          <h1 className="hero-title" data-split="hero">
            Websites, crafted <br />
            like <span className="grad">great products.</span>
          </h1>

          <div className="hero-foot" data-fade="stagger" data-delay="0.5">
            <p className="hero-lede">
              Trace is an independent studio that designs and builds custom websites for businesses that want to look like
              the best in their field. One team, from first sketch to launch.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-primary" data-magnetic>
                <RollText>Start a project</RollText>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="#features" className="btn btn-ghost">
                <RollText>See what you get</RollText>
              </Link>
            </div>
          </div>
        </div>

        <div className="wrap hero-stage" data-fade data-delay="0.35">
          <HeroWindow />
        </div>
      </section>

      {/* ═══ CLIENT STRIP ═══ */}
      <section className="clients wrap" aria-label="Recent clients">
        <p className="eyebrow">Recently launched for</p>
        <ul className="clients-list" data-fade="stagger">
          {projects.map((p) => (
            <li key={p.slug}>
              <a href={p.url} target="_blank" rel="noreferrer">{p.name}</a>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="features wrap" id="features">
        <div className="section-head">
          <p className="eyebrow" data-fade>What you get</p>
          <h2 className="section-title" data-split>
            Everything a great site needs, <span className="soft">in one studio.</span>
          </h2>
        </div>

        <div className="bento">
          {/* Web design */}
          <article className="tile tile-wide tile-design" data-inview>
            <div className="demo demo-type" aria-hidden="true">
              <span className="demo-grid"><i /><i /><i /><i /><i /><i /></span>
              <span className="demo-aa">Aa</span>
              <span className="demo-swatches"><i /><i /><i /><i /><i /></span>
            </div>
            <div className="tile-copy">
              <h3>Web design</h3>
              <p>Visual direction, layout and type shaped around your business, so the site looks like the best in its field.</p>
            </div>
          </article>

          {/* Development */}
          <article className="tile tile-dev" data-inview>
            <div className="demo demo-speed" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" className="ring-track" />
                <circle cx="60" cy="60" r="50" className="ring-fill" pathLength={1} />
              </svg>
              <span className="demo-speed-label">Fast</span>
            </div>
            <div className="tile-copy">
              <h3>Development</h3>
              <p>Fast, custom-coded builds that stay easy to update as you grow.</p>
            </div>
          </article>

          {/* Responsive */}
          <article className="tile tile-screens" data-inview>
            <div className="demo demo-screens" aria-hidden="true">
              <span className="screen"><i /><i /><i /></span>
            </div>
            <div className="tile-copy">
              <h3>Right on every screen</h3>
              <p>Designed for phones from the start, not squeezed in at the end.</p>
            </div>
          </article>

          {/* Motion */}
          <article className="tile tile-motion" data-inview>
            <div className="demo demo-motion" aria-hidden="true">
              <svg viewBox="0 0 200 120">
                <path d="M16 104 C 90 104, 96 16, 184 16" className="curve" pathLength={1} />
                <circle r="8" className="curve-dot">
                  <animateMotion
                    dur="3.2s"
                    repeatCount="indefinite"
                    path="M16 104 C 90 104, 96 16, 184 16"
                    keyPoints="0;1;1;0;0"
                    keyTimes="0;0.4;0.5;0.9;1"
                    calcMode="spline"
                    keySplines="0.65 0 0.35 1;0 0 1 1;0.65 0 0.35 1;0 0 1 1"
                  />
                </circle>
              </svg>
            </div>
            <div className="tile-copy">
              <h3>Motion design</h3>
              <p>Smooth, considered movement that makes the site feel alive.</p>
            </div>
          </article>

          {/* CMS */}
          <article className="tile tile-cms" data-inview>
            <div className="demo demo-cms" aria-hidden="true">
              <span className="cms-field"><span className="cms-text">Spring menu is live</span></span>
              <span className="cms-pill">Published</span>
            </div>
            <div className="tile-copy">
              <h3>Easy to update</h3>
              <p>A simple editor for text, photos and pages. No code needed.</p>
            </div>
          </article>

          {/* Landing pages */}
          <article className="tile tile-wide tile-landing" data-inview>
            <div className="demo demo-landing" aria-hidden="true">
              <span className="lp">
                <i className="lp-h" /><i className="lp-h2" /><i className="lp-btn" />
              </span>
              <span className="toasts">
                {toasts.map((t) => (
                  <span className="toast" key={t}><i />{t}</span>
                ))}
              </span>
            </div>
            <div className="tile-copy">
              <h3>Landing pages</h3>
              <p>Single pages with one job: turn visitors into customers. Strategy, copy direction, design and build.</p>
            </div>
          </article>

          {/* Launch */}
          <article className="tile tile-launch" data-inview>
            <ul className="demo demo-launch" aria-hidden="true">
              {launchList.map((item) => (
                <li key={item}><span className="tick" />{item}</li>
              ))}
            </ul>
            <div className="tile-copy">
              <h3>Launch, handled</h3>
              <p>Hosting, domains and handover, with us on hand after go-live.</p>
            </div>
          </article>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="process wrap" id="process" aria-labelledby="process-title">
        <div className="section-head">
          <p className="eyebrow" data-fade>How it works</p>
          <h2 className="section-title" id="process-title" data-split>
            Four steps, <span className="soft">no hand-offs.</span>
          </h2>
        </div>
        <ol className="steps" data-progress>
          <span className="steps-rail" aria-hidden="true"><span /></span>
          {steps.map((s, i) => (
            <li className="step" key={s.step} style={{ '--i': i } as React.CSSProperties}>
              <span className="step-dot" aria-hidden="true" />
              <span className="step-num">Step {i + 1}</span>
              <h3>{s.step}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ═══ WORK ═══ */}
      <section className="work wrap" id="work">
        <div className="section-head section-head-row">
          <div>
            <p className="eyebrow" data-fade>Recent launches</p>
            <h2 className="section-title" data-split>Live and <span className="soft">working.</span></h2>
          </div>
        </div>

        <div className="work-grid" data-fade="stagger">
          {projects.map((p) => (
            <a key={p.slug} href={p.url} target="_blank" rel="noreferrer" className="work-card">
              <span className="work-frame">
                <span className="work-bar" aria-hidden="true"><i /><i /><i /></span>
                <span className="work-shot">
                  <Image src={p.image} alt={p.alt} fill sizes="(max-width: 700px) 92vw, 30vw" />
                </span>
              </span>
              <span className="work-meta">
                <span className="work-name">{p.name}</span>
                <span className="work-type">{p.type}</span>
              </span>
              <span className="work-visit" aria-hidden="true">↗</span>
              <span className="sr-only"> (opens the live site in a new tab)</span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ STUDIO ═══ */}
      <section className="studio wrap" id="studio">
        <div className="studio-card">
          <p className="studio-statement" data-fade>
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
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="faq wrap" aria-labelledby="faq-title">
        <div className="section-head">
          <p className="eyebrow" data-fade>Questions</p>
          <h2 className="section-title" id="faq-title" data-split>Good to <span className="soft">know.</span></h2>
        </div>
        <div className="faq-list" data-fade="stagger">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>
                <span>{f.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="contact wrap" id="contact">
        <div className="contact-card">
          <div className="contact-glow" aria-hidden="true"><i /><i /></div>
          <div className="contact-copy">
            <p className="eyebrow" data-fade>Start a project</p>
            <h2 className="contact-title" data-split>Let’s build your next website.</h2>
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
