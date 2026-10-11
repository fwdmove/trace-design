'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    try {
      const res = await fetch('https://formspree.io/f/xjgzvgna', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <p className="form-success-title">Thanks. Message received.</p>
        <p>We&apos;ll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="field">
          <span className="field-label">Your name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Jane Smith" />
        </label>
        <label className="field">
          <span className="field-label">Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" />
        </label>
      </div>
      <label className="field">
        <span className="field-label">What are you building?</span>
        <textarea name="message" rows={4} required placeholder="A new site, a redesign, a landing page…" />
      </label>
      <div className="form-foot">
        <button className="pill pill-lg pill-light" type="submit" disabled={status === 'sending'}>
          <span>{status === 'sending' ? 'Sending…' : 'Send message'}</span>
          <span aria-hidden="true">→</span>
        </button>
        <p className="form-error" role="alert">
          {status === 'error' ? 'Something went wrong. Please try again in a moment.' : ''}
        </p>
      </div>
    </form>
  )
}
