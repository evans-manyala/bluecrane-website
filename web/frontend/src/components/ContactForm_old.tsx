import React, { useState } from 'react'
import { createTicket } from '../lib/api'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('Project inquiry')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await createTicket({ name, email, subject, message })
      setStatus('success')
      setName(''); setEmail(''); setSubject('Project inquiry'); setMessage('')
    } catch (err: any) {
      setStatus('error')
      setError(err?.message || 'Something went wrong')
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold">Contact us</h2>
          <p className="text-gray-600 mt-2">
            Tell us about your goals—we’ll reply within 1 business day.
          </p>
          <div className="mt-6 card">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"/>
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"/>
              </div>
              <div>
                <label className="block text-sm font-medium">Subject</label>
                <input required value={subject} onChange={e=>setSubject(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"/>
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea required rows={4} value={message} onChange={e=>setMessage(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"/>
              </div>
              <button disabled={status==='sending'} className="btn btn-primary">
                {status==='sending' ? 'Sending...' : 'Send message'}
              </button>
              {status==='success' && <p className="text-green-700">Thanks! We’ll be in touch shortly.</p>}
              {status==='error' && <p className="text-red-700">{error}</p>}
            </form>
          </div>
        </div>
        <div className="card">
          <h3 className="font-semibold text-lg">Why choose us?</h3>
          <ul className="mt-4 space-y-2 text-gray-700 list-disc list-inside">
            <li>Proven SRE & DevOps expertise</li>
            <li>Secure by default, privacy first</li>
            <li>Transparent pricing, no surprises</li>
            <li>Friendly humans, not bots</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
