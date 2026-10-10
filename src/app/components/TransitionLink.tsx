'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ComponentProps, MouseEvent } from 'react'
import { prefersReducedMotion, setPendingTransition } from '@/lib/motion'

type Props = ComponentProps<typeof Link> & { href: string }

// Wraps route changes in the View Transitions API where supported, so
// elements sharing a `view-transition-name` (project images) morph between
// the home grid and the case study. Falls back to a normal navigation.
export default function TransitionLink({ href, onClick, ...rest }: Props) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    if (!('startViewTransition' in document) || prefersReducedMotion()) return
    e.preventDefault()
    document.startViewTransition(
      () =>
        new Promise<void>((resolve) => {
          setPendingTransition(resolve)
          setTimeout(resolve, 2500)
          router.push(href)
        }),
    )
  }

  return <Link href={href} onClick={handleClick} {...rest} />
}
