// Fit-to-width display lines: each [data-fit] gets the font size at which its
// inner run of letters spans the full container width, optionally capped at a
// fraction of the viewport height (data-fit-vh).

export function fitAll(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-fit]').forEach(fitOne)
}

function fitOne(el: HTMLElement) {
  const inner = el.firstElementChild as HTMLElement | null
  const avail = el.clientWidth
  if (!inner || !avail) return
  el.style.fontSize = '100px'
  const natural = inner.offsetWidth
  if (!natural) return
  let size = (100 * avail) / natural
  const vh = Number(el.dataset.fitVh)
  if (vh) size = Math.min(size, window.innerHeight * vh)
  el.style.fontSize = `${size.toFixed(2)}px`
}
