import Link from 'next/link'
import ContactForm from './components/ContactForm'
import HeroPile from './components/HeroPile'
import Stickers from './components/Stickers'
import Steps from './components/Steps'
import RollText from './components/RollText'

const services = [
  {
    title: 'Web ',
    em: 'design',
    desc: 'Design shaped around what you do, so the site looks like the best in its field.',
    tags: ['Art direction', 'Layout', 'Typography', 'Motion', 'Mobile'],
  },
  {
    title: 'Web ',
    em: 'development',
    desc: 'Fast, custom builds that look right on every screen and stay easy to update.',
    tags: ['Next.js', 'CMS setup', 'Animation', 'Speed', 'SEO basics'],
  },
  {
    title: 'Landing ',
    em: 'pages',
    desc: 'Single pages with one job: turn visitors into customers.',
    tags: ['Strategy', 'Copy direction', 'Design', 'Build', 'Launch'],
  },
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
            <p className="hero-lede">
              Custom websites, designed and built by one studio.
            </p>
            <div className="hero-actions">
              <Link href="#contact" className="btn btn-accent" data-magnetic>
                <RollText>Start a project</RollText>
                <span className="btn-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <HeroPile />
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="services wrap" id="services">
        <div className="section-head">
          <h2 className="section-title" data-split>
            What we <em>do.</em>
          </h2>
          <span className="label" data-fade>(Services)</span>
        </div>

        <div className="stack" data-stack>
          {services.map((s, i) => (
            <article className={`panel panel-${i + 1}`} key={s.em}>
              <span className="panel-num" aria-hidden="true">{i + 1}</span>
              <div className="panel-top">
                <span className="mono">0{i + 1} / 03</span>
                <h3 className="panel-title">
                  {s.title}<em>{s.em}</em>
                </h3>
                <p className="panel-desc">{s.desc}</p>
              </div>
              <Stickers items={s.tags} />
            </article>
          ))}
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <Steps />

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
