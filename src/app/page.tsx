import Link from 'next/link'
import ContactForm from './components/ContactForm'
import RollText from './components/RollText'

const services = [
  {
    title: 'Design',
    desc: 'Art direction, layout, type and motion, made for you and not pulled from a template.',
  },
  {
    title: 'Build',
    desc: 'Custom code that loads fast, works on every screen and stays easy to update.',
  },
  {
    title: 'Launch',
    desc: 'Domain, hosting and go-live handled for you, with help on hand after launch.',
  },
]

export default function Home() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="hero wrap" data-hero>
        <div data-hero-drift>
          <h1 className="hero-title" data-split="hero">
            Websites that don’t blend <em>in.</em>
          </h1>
        </div>

        <div className="hero-foot" data-fade="stagger" data-delay="0.7">
          <p className="hero-lede">
            An independent studio designing and building custom websites, from the first idea to launch day.
          </p>
          <div className="hero-actions">
            <Link href="#contact" className="btn" data-magnetic>
              <RollText>Start a project</RollText>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="#services" className="text-link">
              <RollText>What we do</RollText>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══ */}
      <section className="offer wrap" id="services">
        <div className="offer-panel" data-panel>
          <div className="offer-head">
            <p className="label" data-fade>(What we do)</p>
            <h2 className="section-title" data-split>
              One studio, from first idea <em>to launch.</em>
            </h2>
          </div>

          <ul className="offer-grid" data-fade="stagger">
            {services.map((s, i) => (
              <li className="offer-card" key={s.title} data-tilt>
                <span className="mono offer-num">0{i + 1}</span>
                <h3 className="offer-title">{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
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
