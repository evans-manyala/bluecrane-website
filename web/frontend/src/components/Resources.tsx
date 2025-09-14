import React, { useEffect, useState } from 'react'
import { fetchResources, Resource } from '../lib/api'

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([])
  useEffect(() => {
    fetchResources().then(setResources)
  }, [])
  return (
    <section id="resources" className="container py-12">
      <h2 className="text-2xl font-bold mb-4">Resources</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {resources.map(res => (
          <div key={res.id} className="card p-4">
            <h3 className="font-semibold">{res.title}</h3>
            <p className="text-gray-600">{res.description}</p>
            <a
              href={
                res.url.startsWith('/assets/')
                  ? res.url
                  : '/assets/resources/' + res.url.replace(/^.*[\\/]/, '')
              }
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-2"
              download={res.type === 'file'}
            >
              {res.type === 'file' ? 'Download' : 'Read More'}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
