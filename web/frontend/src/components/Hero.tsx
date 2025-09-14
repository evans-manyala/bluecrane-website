import React, { useState, useEffect } from 'react'
import { ChevronRightIcon, PlayIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import { BRAND } from '../branding'
import { useInView, fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from '../lib/animations'

export default function Hero() {
  const [ref, isInView] = useInView<HTMLDivElement>()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const features = [
    { 
      icon: '🚀', 
      text: 'DevOps & CI/CD pipelines',
      description: 'Automated deployment workflows that reduce deployment time by 80%'
    },
    { 
      icon: '☁️', 
      text: 'Cloud migration (AWS/Azure)',
      description: 'Seamless cloud transformation with zero downtime'
    },
    { 
      icon: '🔒', 
      text: 'Cybersecurity hardening',
      description: 'Enterprise-grade security that protects your digital assets'
    },
    { 
      icon: '💻', 
      text: 'Custom web & mobile development',
      description: 'Scalable applications built with modern technologies'
    },
    { 
      icon: '📊', 
      text: '24/7 support & monitoring',
      description: 'Proactive monitoring and instant issue resolution'
    },
    { 
      icon: '⚡', 
      text: 'Performance optimization',
      description: 'Lightning-fast applications that convert better'
    },
  ]

  const testimonials = [
    {
      quote: "BluecraneCreatives transformed our infrastructure. 10x faster deployments!",
      author: "Sarah Chen",
      role: "CTO, TechStart Inc."
    },
    {
      quote: "Their cybersecurity implementation saved us from potential breaches.",
      author: "Michael Rodriguez",
      role: "IT Director, SecureCorps"
    },
    {
      quote: "Best ROI we've seen from any technology investment.",
      author: "Lisa Thompson",
      role: "CEO, GrowthCo"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      <div className="absolute inset-0 noise-texture"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl animate-pulse-soft"></div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDownIcon className="w-5 h-5" />
        </div>
      </div>

      <div className="container relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Enhanced Content */}
          <div className={`text-white space-y-8 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Available for new projects</span>
              </div>

              {/* Main heading with enhanced typography */}
              <h1 className="heading-1 text-white leading-extra-tight">
                We build & maintain
                <span className="block text-gradient bg-gradient-to-r from-accent-300 via-primary-300 to-accent-200 bg-clip-text text-transparent">
                  reliable IT systems
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-blue-100/90 font-light max-w-2xl leading-relaxed">
                {BRAND.description}
              </p>
            </div>

            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-white text-primary-900 hover:bg-blue-50 font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
                <span>Get Free Consultation</span>
                <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 font-semibold px-8 py-4 rounded-2xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2">
                <PlayIcon className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Enhanced social proof with testimonial */}
            <div className="space-y-6 pt-8 border-t border-white/20">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-300">{BRAND.features.experience.split(' ')[0]}</div>
                  <div className="text-blue-200 text-sm">{BRAND.features.experience.split(' ').slice(1).join(' ')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-300">{BRAND.features.reliability.split(' ')[0]}</div>
                  <div className="text-blue-200 text-sm">{BRAND.features.reliability.split(' ').slice(1).join(' ')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-300">{BRAND.features.support.split(' ')[0]}</div>
                  <div className="text-blue-200 text-sm">{BRAND.features.support.split(' ').slice(1).join(' ')}</div>
                </div>
              </div>

              {/* Rotating testimonial */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                <div className="transition-all duration-500">
                  <p className="text-white/90 italic mb-2">"{testimonials[currentTestimonial].quote}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    <div>
                      <div className="text-sm font-medium text-white">{testimonials[currentTestimonial].author}</div>
                      <div className="text-xs text-white/70">{testimonials[currentTestimonial].role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Features Card */}
          <div className={`lg:justify-self-end ${isInView ? 'animate-scale-in' : 'opacity-0'} transition-all duration-700 delay-300`}>
            <div className="glass-effect rounded-3xl border-white/10 shadow-2xl max-w-lg p-8">
              <div className="text-center mb-8">
                <h3 className="heading-3 text-secondary-900 mb-3">Our Expertise</h3>
                <p className="text-secondary-600">Enterprise-grade solutions for modern businesses</p>
              </div>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-primary-50 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300 mt-1">
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-secondary-800 font-semibold mb-1">{feature.text}</div>
                      <div className="text-secondary-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {feature.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA in card */}
              <div className="mt-8 pt-6 border-t border-secondary-200">
                <button className="w-full btn btn-primary group">
                  <span>Start Your Project</span>
                  <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-secondary-500 text-sm mt-3">
                  Free consultation • No commitment required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
