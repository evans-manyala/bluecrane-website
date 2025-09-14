import React, { useEffect, useState } from 'react'
import { fetchPartners, Partner } from '../lib/api'
import { useInView } from '../lib/animations'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

export default function PartnersSlider() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [ref, isInView] = useInView<HTMLDivElement>()

  useEffect(() => {
    fetchPartners()
      .then(setPartners)
      .catch(() => {
        // Default partners if API fails
        const defaultPartners = [
          { id: 1, name: 'ChamaExpert', logo: '/assets/partners/Chama Expert Logo.png', link: 'https://chamaexpert.com' },
          { id: 2, name: 'Alfajiri Motors', logo: '/assets/partners/alfajirilogo.png', link: 'https://alfajirimotors.co.ke' },
          { id: 3, name: 'Harambee Sacco', logo: '/assets/partners/Harambeesaccologo.png', link: '#' },
        ]
        setPartners(defaultPartners)
      })
  }, [])

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'free',
    slides: { 
      perView: 'auto',
      spacing: 32,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 2, spacing: 16 }
      }
    },
    created(s) {
      // Auto-play functionality
      let timeout: ReturnType<typeof setTimeout>
      let mouseOver = false
      
      function clearNextTimeout() {
        clearTimeout(timeout)
      }
      
      function nextTimeout() {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          s.next()
        }, 3000)
      }
      
      s.on('created', () => {
        s.container.addEventListener('mouseover', () => {
          mouseOver = true
          clearNextTimeout()
        })
        s.container.addEventListener('mouseout', () => {
          mouseOver = false
          nextTimeout()
        })
        nextTimeout()
      })
      
      s.on('dragStarted', clearNextTimeout)
      s.on('animationEnded', nextTimeout)
      s.on('updated', nextTimeout)
    },
  })

  if (partners.length === 0) {
    return null
  }

  return (
    <section className="section-padding-sm bg-secondary-50">
      <div className="container" ref={ref}>
        {/* Header */}
        <div className={`text-center mb-12 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="heading-3 text-secondary-900 mb-4">
            Trusted by <span className="text-gradient">Industry Leaders</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            We're proud to partner with innovative companies that share our commitment to excellence.
          </p>
        </div>

        {/* Partners Slider */}
        <div className={`${isInView ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-200`}>
          <div ref={sliderRef} className="keen-slider">
            {partners.map((partner, idx) => (
              <div key={idx} className="keen-slider__slide min-w-[200px] max-w-[240px]">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group h-32 flex items-center justify-center">
                  {partner.link && partner.link !== '#' ? (
                    <a 
                      href={partner.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    >
                      <img
                        src={
                          partner.logo?.startsWith('/assets/')
                            ? partner.logo
                            : partner.logo
                            ? '/assets/partners/' + partner.logo.replace(/^.*[\\/]/, '')
                            : '/assets/partners/default-logo.png'
                        }
                        alt={partner.name}
                        className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
                              <rect width="120" height="60" fill="#f3f4f6" rx="8"/>
                              <text x="60" y="35" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="12">${partner.name}</text>
                            </svg>
                          `)}`
                        }}
                      />
                    </a>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={
                          partner.logo?.startsWith('/assets/')
                            ? partner.logo
                            : partner.logo
                            ? '/assets/partners/' + partner.logo.replace(/^.*[\\/]/, '')
                            : '/assets/partners/default-logo.png'
                        }
                        alt={partner.name}
                        className="max-h-16 max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = `data:image/svg+xml;base64,${btoa(`
                            <svg width="120" height="60" xmlns="http://www.w3.org/2000/svg">
                              <rect width="120" height="60" fill="#f3f4f6" rx="8"/>
                              <text x="60" y="35" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="12">${partner.name}</text>
                            </svg>
                          `)}`
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership CTA */}
        <div className={`text-center mt-12 ${isInView ? 'animate-fade-in-up' : 'opacity-0'} transition-all duration-700 delay-400`}>
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-xl font-semibold text-secondary-900 mb-3">Interested in Partnership?</h3>
            <p className="text-secondary-600 mb-6">
              Join our network of trusted partners and grow your business with collaborative opportunities.
            </p>
            <a href="#contact" className="btn btn-primary">
              Explore Partnership
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}