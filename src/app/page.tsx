import ContactForm from './components/ContactForm'

const services = [
  { title: 'Web design', desc: 'A look made for you, not picked from a template.' },
  { title: 'Development', desc: 'Fast, custom builds that work on every screen.' },
  { title: 'Landing pages', desc: 'One page with one job, done properly.' },
]

export default function Home() {
  return (
    <>
      <header className="top">
        <a href="#main" className="mark" aria-label="Trace Design, home">
          <span className="mark-word">Trace</span>
          <em>Design</em>
        </a>
        <a href="#contact" className="pill">Start a project</a>
      </header>

      <main id="main">
        {/* ═══ HERO ═══ */}
        <section className="hero">
          <h1 className="hero-title" data-lines="load">
            Websites that leave a <em>trace.</em>
          </h1>
          <div className="hero-foot" data-reveal="load" data-delay="0.9">
            <p className="hero-lede">
              An independent studio designing and building custom websites, from first idea to launch day.
            </p>
            <a href="#contact" className="pill pill-lg">
              Start a project <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section className="services" aria-labelledby="services-title">
          <h2 className="services-title" id="services-title" data-lines>
            Design, build and launch. <em>All under one roof.</em>
          </h2>
          <ul className="service-list">
            {services.map((s, i) => (
              <li className="service" key={s.title} data-reveal>
                <span className="service-num"><em>{['i', 'ii', 'iii'][i]}.</em></span>
                <h3 className="service-name">
                  <span className="swap" data-alt={s.title}>
                    <span>{s.title}</span>
                  </span>
                </h3>
                <p className="service-desc">{s.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ═══ CONTACT ═══ */}
        <section className="close" id="contact" aria-labelledby="contact-title">
          <div className="close-grid">
            <div>
              <h2 className="close-title" id="contact-title" data-lines>
                Have a project <em>in mind?</em>
              </h2>
              <p className="close-lede" data-reveal>
                Tell us what you’re working on and what the site needs to do. We’ll reply with honest thoughts and
                clear next steps.
              </p>
            </div>
            <div data-reveal>
              <ContactForm />
            </div>
          </div>

          <p className="close-mark" aria-hidden="true">
            Trace <em>Design</em>
          </p>
          <div className="close-base">
            <span>© 2026 Trace Design</span>
            <span>Independent web studio, est. 2019</span>
            <span>Working worldwide</span>
          </div>
        </section>
      </main>
    </>
  )
}
