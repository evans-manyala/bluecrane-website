import React, { useEffect, useState } from 'react'
import { fetchLeaders, Leader } from '../lib/api'

export default function Leadership() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  useEffect(() => {
    fetchLeaders().then(setLeaders)
  }, [])
  return (
    <section id="leadership" className="container py-12">
      <h2 className="text-2xl font-bold mb-4">Leadership</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {leaders.map(leader => (
          <div key={leader.id} className="card p-4 text-center">
            {leader.photo && (
              <img
                src={
                  leader.photo.startsWith('/assets/')
                    ? leader.photo
                    : '/assets/leaders/' + leader.photo.replace(/^.*[\\/]/, '')
                }
                alt={leader.name}
                className="mx-auto h-32 w-32 rounded-full object-cover mb-4"
              />
            )}
            <h3 className="font-semibold text-lg">{leader.name}</h3>
            <p className="text-gray-600">{leader.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
