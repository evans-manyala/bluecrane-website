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

  const features = [
    { icon: '🏆', title: 'Proven Expertise', desc: 'Over 50+ successful projects delivered' },
    { icon: '🔒', title: 'Security First', desc: 'Privacy and data protection built-in' },
    { icon: '💎', title: 'Transparent Pricing', desc: 'No hidden costs or surprises' },
    { icon: '🤝', title: 'Personal Touch', desc: 'Work directly with our expert team' },
  ]

  const contactInfo = [
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: 'hello@bluecraneCreatives.com',
      href: 'mailto:hello@bluecraneCreatives.com'
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: 'Phone',
      value: '+254 (700) 123-456',
      href: 'tel:+254700123456'
    },
    { 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: 'Location',
      value: 'Nairobi, Kenya',
      href: '#'
    },
  ]

  return (
    <section id="contact" className="section-padding gradient-bg">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            Let's Talk
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Ready to
            <span className="text-gradient"> transform your business?</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Tell us about your project and we'll get back to you within 24 hours with a detailed proposal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="card">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">Send us a message</h3>
                <p className="text-secondary-600">We'll respond within 1 business day</p>
              </div>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900 mb-2">Message sent successfully!</h4>
                  <p className="text-secondary-600 mb-6">Thank you for reaching out. We'll be in touch shortly.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Full Name *
                      </label>
                      <input 
                        required 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                        className="input"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-2">
                        Email Address *
                      </label>
                      <input 
                        required 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        className="input"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Subject *
                    </label>
                    <select 
                      required 
                      value={subject} 
                      onChange={e => setSubject(e.target.value)}
                      className="input"
                    >
                      <option value="Project inquiry">Project Inquiry</option>
                      <option value="Technical consultation">Technical Consultation</option>
                      <option value="Partnership">Partnership Opportunity</option>
                      <option value="Support">Support Request</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Project Details *
                    </label>
                    <textarea 
                      required 
                      rows={6} 
                      value={message} 
                      onChange={e => setMessage(e.target.value)}
                      className="input resize-none"
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    />
                  </div>

                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    </div>
                  )}

                  <button 
                    disabled={status === 'sending'} 
                    className="btn btn-primary w-full text-lg py-4 relative"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info & Features */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Contact Information */}
            <div className="card">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Get in touch</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 group-hover:bg-primary-200 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-secondary-500 font-medium">{info.label}</div>
                      <div className="text-secondary-900 font-semibold">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="card">
              <h3 className="text-xl font-bold text-secondary-900 mb-6">Why choose us?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl flex-shrink-0">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">{feature.title}</h4>
                      <p className="text-secondary-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-primary-600 rounded-2xl p-6 text-white text-center">
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="text-xl font-bold mb-2">Quick Response Guarantee</h4>
              <p className="text-blue-100">We respond to all inquiries within 24 hours, usually much faster!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
