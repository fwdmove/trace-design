import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cells">
        <div className="footer-cell">
          <p className="tag">Studio</p>
          <p>Independent web studio, designing and building since 2019.</p>
        </div>
        <div className="footer-cell">
          <p className="tag">Sitemap</p>
          <ul className="footer-links">
            <li><Link href="#work">Work</Link></li>
            <li><Link href="#services">Services</Link></li>
            <li><Link href="#studio">Studio</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-cell">
          <p className="tag">Based</p>
          <p>Working worldwide.</p>
        </div>
        <a href="#main" className="footer-cell footer-top">
          <span data-scramble>Back to top</span> ↑
        </a>
      </div>
      <div className="footer-mark" aria-hidden="true">
        <span data-fit data-rise>TRACE</span>
      </div>
      <div className="footer-base">
        <span>© 2026 Trace Design</span>
        <span>Websites that don’t blend in</span>
      </div>
    </footer>
  )
}
