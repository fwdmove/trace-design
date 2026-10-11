import Link from 'next/link'
import RollText from './RollText'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div className="footer-col">
          <p className="kicker">Studio</p>
          <p className="footer-text">Independent web studio,<br />designing and building since 2019.</p>
        </div>
        <div className="footer-col">
          <p className="kicker">Sitemap</p>
          <ul className="footer-links">
            <li><Link href="#services"><RollText>Services</RollText></Link></li>
            <li><Link href="#work"><RollText>Work</RollText></Link></li>
            <li><Link href="#process"><RollText>Process</RollText></Link></li>
            <li><Link href="#contact"><RollText>Contact</RollText></Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="kicker">Based</p>
          <p className="footer-text">Working worldwide.</p>
        </div>
        <div className="footer-col footer-col-end">
          <a href="#main" className="text-link">
            <RollText>Back to top ↑</RollText>
          </a>
        </div>
      </div>
      <div className="footer-mark" aria-hidden="true">
        <span data-rise>Trace</span>
        <span className="footer-dot" />
      </div>
      <div className="wrap footer-base">
        <span>© 2026 Trace Design</span>
        <span>Websites that don’t blend in</span>
      </div>
    </footer>
  )
}
