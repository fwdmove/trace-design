import Link from 'next/link'
import ContactForm from './components/ContactForm'
import Deck from './components/Deck'
import RollText from './components/RollText'

const services = [
  {
    title: 'Web design',
    desc: 'Visual direction, layout and type shaped around what you do.',
    includes: ['Art direction', 'Typography', 'Motion'],
  },
  {
    title: 'Development',
    desc: 'Fast, custom builds that look right on every screen.',
    includes: ['Next.js', 'CMS setup', 'Performance'],
  },
  {
    title: 'Landing pages',
    desc: 'One page with one job: turn visitors into customers.',
    includes: ['Strategy', 'Design + build', 'Launch'],
  },
]

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero wrap" data-hero id="work">
        <div className="hero-copy">
          <p className="label" data-fade data-delay="0.6">(Independent web studio, est. 2019)</p>
          <h1 className="hero-title" data-split="hero">
            Websites that don’t blend <em>in.</em>
          </h1>
          <div className="hero-foot" data-fade="stagger" data-delay="0.8">
            <p className="hero-lede">
              Custom websites, designed and built from the first sketch to the day they go live.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-accent" data-magnetic>
                <RollText>Start a project</RollText>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
              <Link href="#services" className="text-link">
                <RollText>What we do</RollText>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-deck" data-fade data-delay="0.5">
          <Deck />
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services wrap" id="services">
        <div className="section-head">
          <h2 className="section-title" data-split>
            Everything a site needs, <em>under one roof.</em>
          </h2>
          <span className="label" data-fade>(What we do)</span>
        </div>

        <ul className="service-grid" data-fade="stagger">
          {services.map((s, i) => (
            <li className="service-card" key={s.title}>
              <span className="mono service-num">0{i + 1}</span>
              <div className="service-body">
                <h3 className="service-title">{s.title}</h3>
                <p>{s.desc}</p>
                <ul className="chips">
                  {s.includes.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ul>
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
