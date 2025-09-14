import React, { useEffect, useState } from 'react'
import { CheckCircleIcon, UserGroupIcon, TrophyIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { fetchAbout, About } from '../lib/api'
import { BRAND } from '../branding'
import { useInView } from '../lib/animations'

export default function AboutUs() {
  const [about, setAbout] = useState<About | null>(null)
  const [ref, isInView] = useInView<HTMLDivElement>()

  useEffect(() => {
    fetchAbout().then(setAbout).catch(() => setAbout(null))
  }, [])

  const stats = [
    { icon: TrophyIcon, value: '50+', label: 'Projects Completed', color: 'text-yellow-600' },
    { icon: UserGroupIcon, value: '25+', label: 'Happy Clients', color: 'text-blue-600' },
    { icon: ShieldCheckIcon, value: '99.9%', label: 'Uptime SLA', color: 'text-green-600' },
    { icon: CheckCircleIcon, value: '24/7', label: 'Support Available', color: 'text-purple-600' },
  ]

  const values = [
    {
      title: 'Innovation First',
      description: 'We leverage cutting-edge technologies to deliver solutions that give you a competitive edge.',
      icon: '🚀'
    },
    {
      title: 'Client-Centric',
      description: 'Your success is our priority. We work closely with you to understand and exceed your expectations.',
      icon: '🤝'
    },
    {
      title: 'Quality Assured',
      description: 'Every project undergoes rigorous testing and quality checks to ensure excellence.',
      icon: '⭐'
    },
    {
      title: 'Transparent Process',
      description: 'Clear communication, regular updates, and honest pricing with no hidden surprises.',
      icon: '🔍'
    }
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="heading-2 text-secondary-900 mb-6">
            About <span className="text-gradient">{BRAND.siteName}</span>
          </h2>
          <p className="text-xl text-secondary-600 leading-relaxed">
            We're a team of passionate technologists dedicated to transforming businesses through innovative IT solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className={`space-y-8 ${isInView ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-200`}>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-secondary-600 leading-relaxed">
                {about?.content || `Founded with a vision to bridge the gap between complex technology and business success, ${BRAND.siteName} has grown into a trusted partner for organizations seeking digital transformation.`}
              </p>
              <p className="text-lg text-secondary-600 leading-relaxed">
                Our expertise spans across web development, cloud infrastructure, cybersecurity, and DevOps, enabling us to provide comprehensive solutions that scale with your business needs.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-secondary-900">Why Choose Us?</h3>
              <div className="space-y-3">
                {[
                  'Enterprise-grade security and compliance',
                  'Scalable solutions that grow with your business',
                  'Dedicated support team available 24/7',
                  'Proven track record with 50+ successful projects'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-secondary-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image */}
          <div className={`${isInView ? 'animate-scale-in' : 'opacity-0'} transition-all duration-700 delay-400`}>
            {about?.photo ? (
              <div className="relative">
                <img
                  src={
                    about.photo.startsWith('/assets/')
                      ? about.photo
                      : '/assets/aboutus/' + about.photo.replace(/^.*[\\/]/, '')
                  }
                  alt="About Us"
                  className="rounded-3xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl p-12 text-center">
                <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl text-white">🏢</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-4">Our Mission</h3>
                <p className="text-secondary-600 leading-relaxed">
                  To empower businesses with reliable, secure, and scalable technology solutions that drive growth and innovation.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mb-20 ${isInView ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-600`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</div>
                <div className="text-secondary-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-800`}>
          <div className="text-center mb-12">
            <h3 className="heading-3 text-secondary-900 mb-4">Our Core Values</h3>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we work with our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card text-center group hover:shadow-2xl transition-all duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold text-secondary-900 mb-3">{value.title}</h4>
                <p className="text-secondary-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}