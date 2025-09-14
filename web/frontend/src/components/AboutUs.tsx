import React, { useEffect, useState } from 'react'
import { fetchAbout, About } from '../lib/api'

export default function AboutUs() {
  const [about, setAbout] = useState<About | null>(null)
  useEffect(() => {
    fetchAbout().then(setAbout).catch(() => setAbout(null))
  }, [])
  return (
    <section id="about" className="container py-12">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      {about?.photo && (
        <img
          src={
            about.photo.startsWith('/assets/')
              ? about.photo
              : '/assets/aboutus/' + about.photo.replace(/^.*[\\/]/, '')
          }
          alt="About Us"
          className="mb-6 max-h-64 w-auto mx-auto rounded-xl object-cover"
        />
      )}
      <div className="prose max-w-none">{about?.content}</div>
    </section>
  )
}
