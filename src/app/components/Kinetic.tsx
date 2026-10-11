import { Fragment } from 'react'

// Kinetic type: text split into per-character spans that the motion system
// drives through the display font's weight (--w) and width (--x) axes.
// Screen readers get the plain text; the letters are hidden from them.

export function Chars({ text }: { text: string }) {
  // Letters are grouped per word so lines only ever break between words.
  const words = text.split(' ')
  return (
    <>
      {words.map((word, w) => (
        <Fragment key={w}>
          {w > 0 && <span className="c c-sp"> </span>}
          <span className="wd">
            {Array.from(word).map((ch, i) => (
              <span key={i} className="c">{ch}</span>
            ))}
          </span>
        </Fragment>
      ))}
    </>
  )
}

interface FitLineProps {
  text: string
  /** Cap the fitted size at this fraction of the viewport height. */
  vh?: number
  /** Direction the line slides when its block scrolls away (1 or -1). */
  exit?: number
  className?: string
}

// A single line of display type sized (by lib/fit) to fill its container's
// width exactly. The inline vw size is a close first guess before JS runs.
export function FitLine({ text, vh, exit, className }: FitLineProps) {
  return (
    <span
      className={`fit${className ? ` ${className}` : ''}`}
      data-fit
      data-fit-vh={vh}
      data-exit={exit}
      aria-hidden="true"
      style={{ fontSize: `${(100 / (text.length * 0.62)).toFixed(2)}vw` }}
    >
      <span className="fit-in">
        <Chars text={text} />
      </span>
    </span>
  )
}
