import Link from 'next/link'
import RollText from './RollText'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top wrap">
        <div className="footer-col">
          <p className="label">Studio</p>
          <p className="footer-text">Independent web studio, designing and building since 2019.</p>
        </div>
        <div className="footer-col">
          <p className="label">Sitemap</p>
          <ul className="footer-links">
            <li><Link href="#work"><RollText>Work</RollText></Link></li>
            <li><Link href="#services"><RollText>Services</RollText></Link></li>
            <li><Link href="#process"><RollText>Process</RollText></Link></li>
            <li><Link href="#contact"><RollText>Contact</RollText></Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="label">Based</p>
          <p className="footer-text">Working worldwide.</p>
        </div>
        <div className="footer-col footer-col-end">
          <a href="#main" className="footer-top-link">
            <RollText>Back to top ↑</RollText>
          </a>
        </div>
      </div>
      <div className="footer-mark" aria-hidden="true">
        <span data-rise>TRACE</span>
      </div>
      <div className="footer-base wrap">
        <span className="mono">© 2026 Trace Design</span>
        <span className="mono">Websites that don’t blend in</span>
      </div>
    </footer>
  )
}
