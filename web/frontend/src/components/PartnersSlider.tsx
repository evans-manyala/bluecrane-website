import React, { useEffect, useState } from 'react'
import { fetchPartners, Partner } from '../lib/api'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

export default function PartnersSlider() {
  const [partners, setPartners] = useState<Partner[]>([])
  useEffect(() => {
    fetchPartners().then(setPartners)
  }, [])
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 4, spacing: 16 },
    breakpoints: { '(max-width: 768px)': { slides: { perView: 2, spacing: 8 } } },
  })
  return (
    <section className="py-8 bg-gray-50">
      <h2 className="text-center text-xl font-bold mb-4">Our Partners</h2>
      <div ref={sliderRef} className="keen-slider">
        {partners.length === 0 && (
          <div className="text-center text-gray-400 w-full">No partners to display.</div>
        )}
        {partners.map((partner, idx) => (
          <div className="keen-slider__slide flex justify-center items-center" key={idx}>
            <a href={partner.link} target="_blank" rel="noopener noreferrer">
              <img
                src={
                  partner.logo.startsWith('/assets/')
                    ? partner.logo
                    : '/assets/partners/' + partner.logo.replace(/^.*[\\/]/, '')
                }
                alt={partner.name}
                className="h-16 object-contain"
                style={{ maxWidth: 160 }}
              />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}