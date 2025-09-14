import React, { useEffect, useState } from 'react'
import { DocumentTextIcon, BookOpenIcon, NewspaperIcon, AcademicCapIcon, ArrowTopRightOnSquareIcon, FunnelIcon } from '@heroicons/react/24/outline'
import { fetchResources, Resource } from '../lib/api'
import { useInView } from '../lib/animations'

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [filteredResources, setFilteredResources] = useState<Resource[]>([])
  const [selectedType, setSelectedType] = useState<string>('all')
  const [ref, isInView] = useInView<HTMLDivElement>()

  useEffect(() => {
    fetchResources()
      .then(data => {
        setResources(data)
        setFilteredResources(data)
      })
      .catch(() => {
        // Default resources if API fails
        const defaultResources = [
          {
            id: 1,
            title: 'DevOps Best Practices Guide',
            description: 'Comprehensive guide to implementing DevOps practices in your organization.',
            type: 'guide',
            url: '#'
          },
          {
            id: 2,
            title: 'Cloud Migration Checklist',
            description: 'Step-by-step checklist for successful cloud migration projects.',
            type: 'checklist',
            url: '#'
          },
          {
            id: 3,
            title: 'Cybersecurity Assessment',
            description: 'Free security assessment to identify vulnerabilities in your systems.',
            type: 'assessment',
            url: '#'
          },
          {
            id: 4,
            title: 'Technology Trends 2024',
            description: 'Latest insights on emerging technologies and their business impact.',
            type: 'report',
            url: '#'
          }
        ]
        setResources(defaultResources)
        setFilteredResources(defaultResources)
      })
  }, [])

  const resourceTypes = [
    { id: 'all', name: 'All Resources', icon: BookOpenIcon },
    { id: 'guide', name: 'Guides', icon: DocumentTextIcon },
    { id: 'checklist', name: 'Checklists', icon: AcademicCapIcon },
    { id: 'report', name: 'Reports', icon: NewspaperIcon },
    { id: 'assessment', name: 'Assessments', icon: DocumentTextIcon },
  ]

  const handleTypeFilter = (type: string) => {
    setSelectedType(type)
    if (type === 'all') {
      setFilteredResources(resources)
    } else {
      setFilteredResources(resources.filter(resource => resource.type === type))
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'guide': return DocumentTextIcon
      case 'checklist': return AcademicCapIcon
      case 'report': return NewspaperIcon
      case 'assessment': return DocumentTextIcon
      default: return BookOpenIcon
    }
  }

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'guide': return 'bg-blue-100 text-blue-600'
      case 'checklist': return 'bg-green-100 text-green-600'
      case 'report': return 'bg-purple-100 text-purple-600'
      case 'assessment': return 'bg-orange-100 text-orange-600'
      default: return 'bg-secondary-100 text-secondary-600'
    }
  }

  return (
    <section id="resources" className="section-padding bg-white">
      <div className="container" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="heading-2 text-secondary-900 mb-6">
            Knowledge <span className="text-gradient">Resources</span>
          </h2>
          <p className="text-xl text-secondary-600 leading-relaxed">
            Access our collection of guides, tools, and insights to help you make informed technology decisions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isInView ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-200`}>
          {resourceTypes.map((type) => {
            const Icon = type.icon
            const count = type.id === 'all' ? resources.length : resources.filter(r => r.type === type.id).length
            
            return (
              <button
                key={type.id}
                onClick={() => handleTypeFilter(type.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedType === type.id
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                    : 'bg-white text-secondary-600 hover:bg-primary-50 hover:text-primary-600 border border-secondary-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {type.name}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedType === type.id
                    ? 'bg-white/20 text-white'
                    : 'bg-secondary-100 text-secondary-500'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredResources.map((resource, index) => {
              const IconComponent = getResourceIcon(resource.type)
              const colorClass = getResourceColor(resource.type)
              
              return (
                <div 
                  key={resource.id} 
                  className={`card group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Resource Icon & Type */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colorClass}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                      {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                      {resource.title}
                    </h3>
                    
                    <p className="text-secondary-600 leading-relaxed">
                      {resource.description}
                    </p>

                    {/* CTA */}
                    <a
                      href={
                        resource.url.startsWith('/assets/')
                          ? resource.url
                          : resource.url.startsWith('http')
                          ? resource.url
                          : '/assets/resources/' + resource.url.replace(/^.*[\\/]/, '')
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline w-full group-hover:btn-primary transition-all duration-300"
                      download={resource.type === 'file'}
                    >
                      {resource.type === 'file' || resource.url.includes('.pdf') ? 'Download' : 'Access Resource'}
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-secondary-50 rounded-3xl p-12 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-secondary-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <BookOpenIcon className="w-10 h-10 text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">No Resources Available</h3>
              <p className="text-secondary-600 mb-6">
                We're currently building our resource library. Check back soon for valuable insights and tools!
              </p>
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className={`bg-gradient-to-r from-primary-600 to-accent-600 rounded-3xl p-12 text-white text-center ${isInView ? 'animate-scale-in' : 'opacity-0'} transition-all duration-700 delay-600`}>
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest resources, insights, and technology trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl text-secondary-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="btn bg-white text-primary-600 hover:bg-blue-50 px-8 py-4 whitespace-nowrap font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-blue-200 text-sm mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}