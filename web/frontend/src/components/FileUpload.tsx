import React from "react"

export function FileUpload({
  category,
  onUploaded,
  label = "Upload file",
}: {
  category: "leaders" | "partners" | "services" | "aboutus" | "resources"
  onUploaded: (url: string) => void
  label?: string
}) {
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return
    const formData = new FormData()
    formData.append("file", e.target.files[0])
    const res = await fetch(
      `http://localhost:8000/upload/${category}`,
      { method: "POST", body: formData }
    )
    const data = await res.json()
    if (data.url) onUploaded(data.url)
    else alert("Upload failed")
  }
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input type="file" onChange={handleChange} />
    </div>
  )
}