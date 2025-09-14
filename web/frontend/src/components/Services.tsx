import React, { useState, useEffect } from 'react'
import { ArrowRightIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { Service } from '../lib/api'

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  // Default services data if API is not available
  const defaultServices: Service[] = [
    {
      id: 1,
      name: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies. Responsive design, fast performance, and SEO optimized.',
      price: 2500,
      category: 'development',
      photo: '/assets/web-dev.jpg'
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android. User-friendly interfaces with robust functionality.',
      price: 5000,
      category: 'development',
      photo: '/assets/mobile-dev.jpg'
    },
    {
      id: 3,
      name: 'DevOps & CI/CD',
      description: 'Automated deployment pipelines, containerization, and infrastructure as code. Reduce deployment time by 80%.',
      price: 1500,
      category: 'infrastructure',
      photo: '/assets/devops.jpg'
    },
    {
      id: 4,
      name: 'Cloud Migration',
      description: 'Seamless migration to AWS, Azure, or Google Cloud. Zero downtime migration with enhanced security and scalability.',
      price: 3000,
      category: 'infrastructure',
      photo: '/assets/cloud.jpg'
    },
    {
      id: 5,
      name: 'Cybersecurity',
      description: 'Enterprise-grade security implementation. Protect your digital assets with advanced threat detection and prevention.',
      price: 2000,
      category: 'security',
      photo: '/assets/security.jpg'
    },
    {
      id: 6,
      name: '24/7 Support & Monitoring',
      description: 'Proactive monitoring and instant issue resolution. Keep your systems running smoothly around the clock.',
      price: 800,
      category: 'support',
      photo: '/assets/support.jpg'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Services', count: defaultServices.length },
    { id: 'development', name: 'Development', count: defaultServices.filter(s => s.category === 'development').length },
    { id: 'infrastructure', name: 'Infrastructure', count: defaultServices.filter(s => s.category === 'infrastructure').length },
    { id: 'security', name: 'Security', count: defaultServices.filter(s => s.category === 'security').length },
    { id: 'support', name: 'Support', count: defaultServices.filter(s => s.category === 'support').length },
  ]

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        if (response.ok) {
          const data = await response.json()
          setServices(data)
        } else {
          // Use default services if API is not available
          setServices(defaultServices)
        }
      } catch (error) {
        console.log('Using default services data')
        setServices(defaultServices)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  return (
    <section id="services" className="section-padding bg-secondary-50">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-2 text-secondary-900 mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-secondary-600 leading-relaxed">
            Comprehensive IT solutions to transform your business. From development to deployment, we've got you covered.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200'
              }`}
            >
              {category.name}
              <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-secondary-100 text-secondary-500'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        {loading ? (
          /* Loading Skeleton */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="card animate-pulse">
                <div className="h-48 bg-secondary-200 rounded-xl mb-6"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-secondary-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-secondary-200 rounded"></div>
                    <div className="h-4 bg-secondary-200 rounded w-2/3"></div>
                  </div>
                  <div className="h-12 bg-secondary-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((svc, index) => (
                <div
                  key={svc.id}
                  className="card card-hover group overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Service Image */}
                  {svc.photo && (
                    <div className="relative overflow-hidden rounded-xl mb-6 -mx-6 -mt-6">
                      <img
                        src={
                          svc.photo.startsWith('/assets/')
                            ? svc.photo
                            : '/assets/services/' + svc.photo.replace(/^.*[\\/]/, '')
                        }
                        alt={svc.name}
                        className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  )}

                  {/* Service Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                      {svc.name}
                    </h3>
                    
                    <p className="text-secondary-600 leading-relaxed">
                      {svc.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
                      <div className="space-y-1">
                        <div className="text-sm text-secondary-500">Starting at</div>
                        <div className="text-2xl font-bold text-primary-600">
                          ${svc.price?.toFixed?.(0) ?? '0'}
                          <span className="text-sm text-secondary-500 font-normal">/month</span>
                        </div>
                      </div>
                      
                      {/* Popular badge */}
                      {index === 1 && (
                        <div className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Popular
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <a 
                      href="#contact" 
                      className="btn btn-primary w-full group-hover:shadow-lg group-hover:shadow-primary-600/25 transition-all duration-300"
                    >
                      Get {svc.name}
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Section */}
            <div className="mt-20 text-center">
              <div className="bg-primary-600 rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-90"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">Need a custom solution?</h3>
                  <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Every business is unique. Let's discuss your specific requirements and create a tailored solution.
                  </p>
                  <a 
                    href="#contact" 
                    className="btn bg-white text-primary-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl px-8 py-4 text-lg font-semibold"
                  >
                    Schedule Free Consultation
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-secondary-50 rounded-2xl p-12 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-secondary-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">No services available</h3>
              <p className="text-secondary-600 mb-6">
                We're currently adding our services. Check back soon!
              </p>
              <a 
                href="/api/docs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary text-sm"
              >
                Admin: Add Services
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
