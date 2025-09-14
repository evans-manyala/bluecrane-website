export type Service = {
  id: number
  name?: string
  title?: string
  slug?: string
  description: string
  long_description?: string
  price: number
  photo?: string
  features?: string[]
  category?: string
  popular?: boolean
}

export type TicketPayload = {
  name: string
  email: string
  subject: string
  message: string
}

export type About = {
  id: number
  content: string
}

export type Leader = {
  id: number
  name: string
  photo?: string
  bio?: string
}

export type Resource = {
  id: number
  title: string
  description?: string
  type: string
  url: string
}

export type Partner = {
  id: number
  name: string
  logo?: string
  link?: string
}

const apiBase = '/api'

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('token')
  return token ? { 'Authorization': `Bearer ${token}` } : {}
}

// --- Auth ---
export async function login(username: string, password: string) {
  const r = await fetch(`${apiBase}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ username, password }),
  })
  if (!r.ok) throw new Error('Login failed')
  const data = await r.json()
  localStorage.setItem('token', data.token)
  return data
}

// --- Services ---
export async function fetchServices(): Promise<Service[]> {
  const r = await fetch(`${apiBase}/services`)
  if (!r.ok) throw new Error('Failed to fetch services')
  return r.json()
}

export async function createService(svc: Omit<Service, 'id'>): Promise<Service> {
  const r = await fetch(`${apiBase}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(svc),
  })
  if (!r.ok) throw new Error('Failed to create service')
  return r.json()
}

export async function updateService(id: number, svc: Omit<Service, 'id'>): Promise<Service> {
  const r = await fetch(`${apiBase}/services/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(svc),
  })
  if (!r.ok) throw new Error('Failed to update service')
  return r.json()
}

export async function deleteService(id: number) {
  const r = await fetch(`${apiBase}/services/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!r.ok) throw new Error('Failed to delete service')
  return true
}

// --- Tickets ---
export async function listTickets() {
  const r = await fetch(`${apiBase}/tickets`, { headers: { ...authHeaders() } })
  if (!r.ok) throw new Error('Failed to load tickets')
  return r.json()
}

export async function createTicket(payload: TicketPayload) {
  const r = await fetch(`${apiBase}/tickets`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(payload)
  })
  if (!r.ok) throw new Error('Failed to submit ticket')
  return r.json()
}

// --- About ---
export async function fetchAbout(): Promise<About> {
  const r = await fetch(`${apiBase}/about`)
  if (!r.ok) throw new Error('Failed to fetch about')
  return r.json()
}

export async function updateAbout(content: string): Promise<About> {
  const r = await fetch(`${apiBase}/about`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ content }),
  })
  if (!r.ok) throw new Error('Failed to update about')
  return r.json()
}

// --- Leaders ---
export async function fetchLeaders(): Promise<Leader[]> {
  const r = await fetch(`${apiBase}/leaders`)
  if (!r.ok) throw new Error('Failed to fetch leaders')
  return r.json()
}

export async function createLeader(data: Omit<Leader, 'id'>): Promise<Leader> {
  const r = await fetch(`${apiBase}/leaders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!r.ok) throw new Error('Failed to create leader')
  return r.json()
}

export async function updateLeader(id: number, data: Omit<Leader, 'id'>): Promise<Leader> {
  const r = await fetch(`${apiBase}/leaders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!r.ok) throw new Error('Failed to update leader')
  return r.json()
}

export async function deleteLeader(id: number) {
  const r = await fetch(`${apiBase}/leaders/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!r.ok) throw new Error('Failed to delete leader')
  return true
}

// --- Resources ---
export async function fetchResources(): Promise<Resource[]> {
  const r = await fetch(`${apiBase}/resources`)
  if (!r.ok) throw new Error('Failed to fetch resources')
  return r.json()
}

export async function createResource(data: Omit<Resource, 'id'>): Promise<Resource> {
  const r = await fetch(`${apiBase}/resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!r.ok) throw new Error('Failed to create resource')
  return r.json()
}

export async function updateResource(id: number, data: Omit<Resource, 'id'>): Promise<Resource> {
  const r = await fetch(`${apiBase}/resources/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!r.ok) throw new Error('Failed to update resource')
  return r.json()
}

export async function deleteResource(id: number) {
  const r = await fetch(`${apiBase}/resources/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!r.ok) throw new Error('Failed to delete resource')
  return true
}

// --- Partners ---
export async function fetchPartners(): Promise<Partner[]> {
  const r = await fetch(`${apiBase}/partners`)
  if (!r.ok) throw new Error('Failed to fetch partners')
  return r.json()
}

export async function createPartner(data: Omit<Partner, 'id'>): Promise<Partner> {
  const r = await fetch(`${apiBase}/partners`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!r.ok) throw new Error('Failed to create partner')
  return r.json()
}

export async function updatePartner(id: number, data: Omit<Partner, 'id'>): Promise<Partner> {
  const r = await fetch(`${apiBase}/partners/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
  if (!r.ok) throw new Error('Failed to update partner')
  return r.json()
}

export async function deletePartner(id: number) {
  const r = await fetch(`${apiBase}/partners/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  })
  if (!r.ok) throw new Error('Failed to delete partner')
  return true

}

// Add this helper for file uploads
export async function uploadFile(category: "leaders" | "partners" | "services" | "aboutus" | "resources", file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`http://localhost:8000/upload/${category}`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  if (!data.url) throw new Error("Upload failed");
  return data.url;
}