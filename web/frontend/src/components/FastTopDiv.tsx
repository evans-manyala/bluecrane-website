import React from 'react'

export default function FastTopDiv() {
  return (
    <div className="flex justify-end gap-2 p-2 bg-gray-100">
      <a
        href="https://chamaexpert.com"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
      >
        ChamaExpert
      </a>
      <a
        href="https://alfajirimotors.co.ke"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
      >
        Alfajiri Motors
      </a>
    </div>
  )
}
