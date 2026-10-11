import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/work'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'

const services = [
  { title: 'Web design', desc: 'Design shaped around what you do.' },
  { title: 'Development', desc: 'Fast, custom builds that work on every screen.' },
  { title: 'Landing pages', desc: 'Single pages built to turn visitors into customers.' },
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
            <p className="hero-lede">Custom websites, designed and built by one studio.</p>
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

      {/* ═══ SERVICES ═══ */}
      <section className="services wrap" id="services">
        <div className="section-head">
          <h2 className="section-title" data-split>
            What we <em>do.</em>
          </h2>
        </div>

        <ul className="service-list">
          {services.map((s, i) => (
            <li className="service" key={s.title} data-fade>
              <span className="service-num">0{i + 1}</span>
              <div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="steps" data-fade>Discover, design, build, launch.</p>
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
