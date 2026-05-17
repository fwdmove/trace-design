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
      <div className="contact-form-success">
        <p>Message sent — we&apos;ll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-row">
        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="cf-name">Name</label>
          <input className="contact-form-input" id="cf-name" name="name" type="text" required autoComplete="name" placeholder="Your name" />
        </div>
        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="cf-email">Email</label>
          <input className="contact-form-input" id="cf-email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" />
        </div>
      </div>
      <div className="contact-form-field">
        <label className="contact-form-label" htmlFor="cf-message">Message</label>
        <textarea className="contact-form-textarea" id="cf-message" name="message" rows={3} required placeholder="Tell us about your project" />
      </div>
      <div className="contact-form-footer">
        <button className="contact-form-submit" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'error' && (
          <p className="contact-form-error">Something went wrong — try emailing us directly.</p>
        )}
      </div>
    </form>
  )
}
