import Link from 'next/link'
import RollText from './RollText'
import Clock from './Clock'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top wrap grid">
        <div className="footer-col">
          <p className="mono footer-label">Studio</p>
          <p>Independent web studio,<br />designing and building since 2019.</p>
        </div>
        <div className="footer-col">
          <p className="mono footer-label">Sitemap</p>
          <ul className="footer-links">
            <li><Link href="#work"><RollText>Work</RollText></Link></li>
            <li><Link href="#services"><RollText>Services</RollText></Link></li>
            <li><Link href="#studio"><RollText>Studio</RollText></Link></li>
            <li><Link href="#contact"><RollText>Contact</RollText></Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="mono footer-label">Your time</p>
          <p><Clock />, working worldwide.</p>
        </div>
        <div className="footer-col footer-col-end">
          <a href="#main" className="footer-top-link">
            <RollText>Back to top ↑</RollText>
          </a>
        </div>
      </div>
      {/* Each letter hops on hover. */}
      <div className="footer-mark" aria-hidden="true" data-fade="stagger">
        {'TRACE'.split('').map((c, i) => <span key={i}>{c}</span>)}
      </div>
      <div className="footer-base wrap">
        <span className="mono">© 2026 Trace Design</span>
        <span className="mono">Websites that don’t blend in</span>
      </div>
    </footer>
  )
}
