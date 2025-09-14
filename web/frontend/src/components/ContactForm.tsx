import React, { useState } from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon, PaperAirplaneIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline'
import { createTicket } from '../lib/api'
import { BRAND } from '../branding'
import { useInView } from '../lib/animations'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project inquiry',
    message: '',
    company: '',
    budget: '',
    timeline: ''
  })
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [error, setError] = useState('')
  const [ref, isInView] = useInView<HTMLDivElement>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    
    try {
      // Add additional form data to message
      const enhancedMessage = `${formData.message}

Additional Details:
Company: ${formData.company}
Budget Range: ${formData.budget}
Timeline: ${formData.timeline}`

      await createTicket({ 
        name: formData.name, 
        email: formData.email, 
        subject: formData.subject, 
        message: enhancedMessage 
      })
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: 'Project inquiry',
        message: '',
        company: '',
        budget: '',
        timeline: ''
      })
    } catch (err: any) {
      setStatus('error')
      setError(err?.message || 'Something went wrong. Please try again.')
    }
  }

  const features = [
    { 
      icon: CheckCircleIcon, 
      title: 'Proven Track Record', 
      desc: 'Over 50+ successful projects delivered across various industries' 
    },
    { 
      icon: '🔒', 
      title: 'Security First', 
      desc: 'Enterprise-grade security and data protection in every solution' 
    },
    { 
      icon: '💎', 
      title: 'Transparent Pricing', 
      desc: 'No hidden costs or surprises - clear, upfront pricing' 
    },
    { 
      icon: '🤝', 
      title: 'Personal Touch', 
      desc: 'Direct access to our expert team throughout your project' 
    },
  ]

  const contactInfo = [
    { 
      icon: EnvelopeIcon,
      label: 'Email us',
      value: BRAND.company.email,
      href: `mailto:${BRAND.company.email}`,
      description: 'Send us an email anytime'
    },
    { 
      icon: PhoneIcon,
      label: 'Call us',
      value: BRAND.company.phone,
      href: `tel:${BRAND.company.phone.replace(/[^+\d]/g, '')}`,
      description: 'Mon-Fri 9am-6pm EAT'
    },
    { 
      icon: MapPinIcon,
      label: 'Visit us',
      value: BRAND.company.address,
      href: '#',
      description: 'Our office location'
    },
    { 
      icon: ClockIcon,
      label: 'Response time',
      value: '< 2 hours',
      href: '#',
      description: 'Average response time'
    },
  ]

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    'Over $100,000'
  ]

  const timelineOptions = [
    'ASAP',
    '1-2 weeks',
    '1-2 months',
    '3-6 months',
    '6+ months'
  ]

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="container" ref={ref}>
        {/* Enhanced Header */}
        <div className={`text-center mb-20 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-soft">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Let's Start Your Project
          </div>
          <h2 className="heading-2 text-secondary-900 mb-6">
            Ready to <span className="text-gradient">transform your business?</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto leading-relaxed">
            Get a free consultation and discover how we can help you achieve your technology goals. 
            No obligation, just expert advice tailored to your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Enhanced Contact Form */}
          <div className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-200`}>
            <div className="card">
              <h3 className="heading-3 text-secondary-900 mb-6">Send us a message</h3>
              
              {status === 'success' && (
                <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">Message sent successfully!</h4>
                      <p className="text-green-600 text-sm mt-1">We'll get back to you within 2 hours.</p>
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-800">Failed to send message</h4>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@company.com"
                      className="input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Project Type
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="Project inquiry">General Project Inquiry</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App">Mobile App Development</option>
                      <option value="DevOps/CI-CD">DevOps & CI/CD</option>
                      <option value="Cloud Migration">Cloud Migration</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                      <option value="Support">Support & Maintenance</option>
                      <option value="Consultation">Free Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-secondary-700 mb-2">
                      Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="select"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-secondary-700 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    className="textarea"
                    rows={6}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="btn btn-primary w-full group text-lg py-4"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="loader mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-center text-secondary-500 text-sm">
                  * Required fields. We typically respond within 2 hours during business days.
                </p>
              </form>
            </div>
          </div>

          {/* Enhanced Contact Info & Features */}
          <div className={`space-y-8 ${isInView ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-400`}>
            {/* Contact Information */}
            <div className="card">
              <h3 className="heading-3 text-secondary-900 mb-6">Get in touch</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a 
                    key={index}
                    href={item.href}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-primary-50 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
                        {item.label}
                      </h4>
                      <p className="text-secondary-800 font-medium">{item.value}</p>
                      <p className="text-secondary-500 text-sm">{item.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="card">
              <h3 className="heading-3 text-secondary-900 mb-6">Why choose us?</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      {typeof feature.icon === 'string' ? (
                        <span className="text-lg">{feature.icon}</span>
                      ) : (
                        <feature.icon className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 mb-1">{feature.title}</h4>
                      <p className="text-secondary-600 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Quick stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">&lt; 2hrs</div>
                  <div className="text-primary-100 text-sm">Response time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-primary-100 text-sm">Projects delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">99.9%</div>
                  <div className="text-primary-100 text-sm">Uptime SLA</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-primary-100 text-sm">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
