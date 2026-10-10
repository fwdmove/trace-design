import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, nextProject, projects } from '@/content/work'
import TransitionLink from '../../components/TransitionLink'
import RollText from '../../components/RollText'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  }
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()
  const next = nextProject(slug)

  return (
    <article className="case">
      <header className="case-head wrap" data-hero>
        <Link href="/#work" className="text-link case-back">
          <RollText>← All work</RollText>
        </Link>
        <p className="label case-index" data-fade data-delay="0.2">
          Project {project.index} / {String(projects.length).padStart(2, '0')}
        </p>
        <h1 className="case-title" data-split="hero">{project.name}</h1>
        <dl className="case-facts" data-fade="stagger" data-delay="0.4">
          <div><dt className="label">Type</dt><dd>{project.type}</dd></div>
          <div><dt className="label">Year</dt><dd>{project.year}</dd></div>
          <div><dt className="label">Scope</dt><dd>{project.scope.join(', ')}</dd></div>
          <div>
            <dt className="label">Live site</dt>
            <dd>
              <a href={project.url} target="_blank" rel="noreferrer" className="text-link">
                <RollText>Visit site ↗</RollText>
              </a>
            </dd>
          </div>
        </dl>
      </header>

      <div className="case-hero wrap">
        <div className="case-frame" style={{ background: project.tone }}>
          <div className="case-shot" data-parallax="4" style={{ viewTransitionName: `shot-${project.slug}` }}>
            <Image src={project.image} alt={project.alt} fill priority sizes="100vw" />
          </div>
        </div>
      </div>

      <section className="case-body wrap">
        <p className="label" data-fade>(Overview)</p>
        <p className="case-overview" data-scrub-words>{project.overview}</p>
        <div className="case-scope" data-fade>
          <p className="label">What we did</p>
          <ul className="chips chips-dark">
            {project.scope.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>
      </section>

      <section className="case-next">
        <TransitionLink href={`/work/${next.slug}`} className="case-next-link wrap" data-cursor="Next">
          <p className="label">Next project</p>
          <h2 className="case-next-title">{next.name}</h2>
          <div className="case-next-frame" data-clip style={{ background: next.tone }}>
            <div className="case-shot" data-parallax="6" style={{ viewTransitionName: `shot-${next.slug}` }}>
              <Image src={next.image} alt={next.alt} fill sizes="100vw" />
            </div>
          </div>
        </TransitionLink>
      </section>
    </article>
  )
}
