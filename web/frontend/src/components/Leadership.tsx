import React, { useEffect, useState } from 'react'
import { EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline'
import { fetchLeaders, Leader } from '../lib/api'
import { useInView } from '../lib/animations'

export default function Leadership() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [ref, isInView] = useInView<HTMLDivElement>()

  useEffect(() => {
    fetchLeaders().then(setLeaders).catch(() => setLeaders([]))
  }, [])

  // Default team members if no leaders are loaded
  const defaultTeam = [
    {
      id: 1,
      name: 'John Doe',
      bio: 'CEO & Founder with 15+ years in enterprise technology solutions',
      photo: null
    },
    {
      id: 2,
      name: 'Jane Smith',
      bio: 'CTO specializing in cloud architecture and DevOps practices',
      photo: null
    },
    {
      id: 3,
      name: 'Mike Johnson',
      bio: 'Lead Developer focused on full-stack web and mobile applications',
      photo: null
    }
  ]

  const displayTeam = leaders.length > 0 ? leaders : defaultTeam

  return (
    <section id="leadership" className="section-padding bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <div className="container" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="heading-2 text-secondary-900 mb-6">
            Meet Our <span className="text-gradient">Expert Team</span>
          </h2>
          <p className="text-xl text-secondary-600 leading-relaxed">
            Our diverse team of technology experts brings decades of combined experience to every project.
          </p>
        </div>

        {displayTeam.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayTeam.map((leader, index) => (
              <div 
                key={leader.id} 
                className={`card text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Profile Image */}
                <div className="relative mb-6">
                  {leader.photo ? (
                    <img
                      src={
                        leader.photo.startsWith('/assets/')
                          ? leader.photo
                          : '/assets/leaders/' + leader.photo.replace(/^.*[\\/]/, '')
                      }
                      alt={leader.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                      <UserIcon className="w-16 h-16 text-primary-600" />
                    </div>
                  )}
                  
                  {/* Online Status Indicator */}
                  <div className="absolute bottom-2 right-1/2 transform translate-x-16">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-secondary-600 leading-relaxed">
                      {leader.bio || 'Experienced technology professional dedicated to delivering exceptional results.'}
                    </p>
                  </div>

                  {/* Contact Button */}
                  <button className="btn btn-outline group-hover:btn-primary transition-all duration-300 text-sm">
                    <EnvelopeIcon className="w-4 h-4 mr-2" />
                    Get in Touch
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl p-12 max-w-lg mx-auto shadow-lg">
              <div className="w-20 h-20 bg-secondary-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-secondary-400" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Team Profiles Coming Soon</h3>
              <p className="text-secondary-600 mb-6">
                We're updating our team profiles. Check back soon to meet our experts!
              </p>
            </div>
          </div>
        )}

        {/* Team Culture Section */}
        <div className={`bg-white rounded-3xl p-12 shadow-xl ${isInView ? 'animate-scale-in' : 'opacity-0'} transition-all duration-700 delay-600`}>
          <div className="text-center mb-8">
            <h3 className="heading-3 text-secondary-900 mb-4">Our Team Culture</h3>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              We believe in collaboration, continuous learning, and delivering excellence in everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">Results-Driven</h4>
              <p className="text-secondary-600">Focused on delivering measurable outcomes that drive business success.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">Innovation-First</h4>
              <p className="text-secondary-600">Always exploring new technologies and methodologies to stay ahead.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-lg font-semibold text-secondary-900 mb-2">Collaborative</h4>
              <p className="text-secondary-600">Working together with clients as partners to achieve shared goals.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}