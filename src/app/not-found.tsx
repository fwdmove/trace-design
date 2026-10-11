import Link from 'next/link'
import RollText from './components/RollText'

export default function NotFound() {
  return (
    <section className="nf wrap">
      <p className="mono">(404) Page not found</p>
      <h1 className="nf-title">This page<br />blended in.</h1>
      <Link href="/" className="btn" data-magnetic>
        <RollText>Back to the homepage</RollText>
        <span className="btn-arrow" aria-hidden="true">→</span>
      </Link>
    </section>
  )
}
