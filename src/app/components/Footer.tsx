import Link from 'next/link'
import RollText from './RollText'

export default function Footer() {
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div className="footer-col">
          <p className="eyebrow">Studio</p>
          <p className="footer-text">Independent web studio,<br />designing and building since 2019.</p>
        </div>
        <div className="footer-col">
          <p className="eyebrow">Sitemap</p>
          <ul className="footer-links">
            <li><Link href="#features"><RollText>Services</RollText></Link></li>
            <li><Link href="#process"><RollText>Process</RollText></Link></li>
            <li><Link href="#work"><RollText>Work</RollText></Link></li>
            <li><Link href="#contact"><RollText>Contact</RollText></Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <p className="eyebrow">Based</p>
          <p className="footer-text">Working worldwide.</p>
        </div>
        <div className="footer-col footer-col-end">
          <a href="#main" className="btn btn-ghost btn-small">
            <RollText>Back to top ↑</RollText>
          </a>
        </div>
      </div>

      {/* The wordmark traces itself in as the page ends. */}
      <svg className="footer-mark" viewBox="0 0 1000 220" data-draw aria-hidden="true">
        <defs>
          <linearGradient id="footer-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#111318" />
            <stop offset="0.5" stopColor="#4b44f0" />
            <stop offset="1" stopColor="#8fc1ff" />
          </linearGradient>
        </defs>
        <text x="500" y="186" textAnchor="middle" data-len="1400">Trace</text>
      </svg>

      <div className="footer-base">
        <span>© 2026 Trace Design</span>
        <span>Websites crafted like great products</span>
      </div>
    </footer>
  )
}
