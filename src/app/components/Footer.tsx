import Link from 'next/link'
import RollText from './RollText'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top wrap">
        <p className="footer-text">
          An independent web studio,<br />designing and building since 2019.
        </p>
        <ul className="footer-links">
          <li><Link href="#work"><RollText>Work</RollText></Link></li>
          <li><Link href="#services"><RollText>Services</RollText></Link></li>
          <li><Link href="#studio"><RollText>Studio</RollText></Link></li>
          <li><Link href="#contact"><RollText>Contact</RollText></Link></li>
        </ul>
        <a href="#main" className="btn btn-ghost btn-small">
          <RollText>Back to top</RollText>
        </a>
      </div>
      <div className="footer-mark" aria-hidden="true">
        <span data-rise>trace</span>
      </div>
      <div className="footer-base wrap">
        <span>© 2026 Trace Design</span>
        <span>Working worldwide</span>
      </div>
    </footer>
  )
}
