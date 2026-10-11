'use client'

import { useEffect, useState } from 'react'

// The visitor's local time, ticking. Renders a placeholder on the server.
export default function Clock() {
  const [now, setNow] = useState<string>('--:--')

  useEffect(() => {
    const fmt = () => setNow(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    fmt()
    const id = setInterval(fmt, 10_000)
    return () => clearInterval(id)
  }, [])

  return <span suppressHydrationWarning>{now}</span>
}
