import React, { useEffect, useState } from 'react'
import {
  login, fetchServices, createService, updateService, deleteService, listTickets, Service,
  fetchAbout, updateAbout, About,
  fetchLeaders, createLeader, updateLeader, deleteLeader, Leader,
  fetchResources, createResource, updateResource, deleteResource, Resource,
  fetchPartners, createPartner, updatePartner, deletePartner, Partner
} from '../lib/api'
import { FileUpload } from './FileUpload'

// --- Login Form ---
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('change-me')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      await login(username, password)
      onSuccess()
    } catch (e: any) {
      setErr(e.message || 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="card max-w-md mx-auto space-y-4">
      <h3 className="text-lg font-semibold">Admin Login</h3>
      <div>
        <label className="block text-sm font-medium">Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"/>
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"/>
      </div>
      <button disabled={busy} className="btn btn-primary">{busy?'Signing in...':'Sign in'}</button>
      {err && <p className="text-red-600">{err}</p>}
    </form>
  )
}

// --- About CMS ---
function AboutCMS() {
  const [about, setAbout] = useState<About | null>(null)
  const [content, setContent] = useState('')
  const [photo, setPhoto] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    fetchAbout().then(a => {
      setAbout(a)
      setContent(a.content)
      setPhoto(a.photo && a.photo.startsWith('/assets/')
        ? a.photo
        : a.photo
        ? '/assets/aboutus/' + a.photo.replace(/^.*[\\/]/, '')
        : ''
      )
    }).catch(() => setAbout(null))
  }, [])

  async function save() {
    setBusy(true); setErr('')
    try {
      const updated = await updateAbout({ content, photo })
      setAbout(updated)
    } catch (e: any) {
      setErr(e.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold">About Us</h3>
      <textarea
        rows={6}
        value={content}
        onChange={e => setContent(e.target.value)}
        className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2"
      />
      <div className="mt-2">
        <FileUpload category="aboutus" onUploaded={setPhoto} label="About Us Image" />
        {photo && (
          <img
            src={photo.startsWith('/assets/') ? photo : '/assets/aboutus/' + photo.replace(/^.*[\\/]/, '')}
            alt="About"
            className="h-24 mt-2"
          />
        )}
      </div>
      <button onClick={save} disabled={busy} className="btn btn-primary mt-2">{busy ? 'Saving...' : 'Save'}</button>
      {err && <p className="text-red-600 mt-2">{err}</p>}
    </div>
  )
}

// --- Leader CMS ---
function LeaderForm({ initial, onSave, onCancel }: { initial?: Partial<Leader>, onSave: (l: Omit<Leader, 'id'>) => Promise<void>, onCancel: () => void }) {
  const [name, setName] = useState(initial?.name || '')
  const [photo, setPhoto] = useState(
    initial?.photo
      ? initial.photo.startsWith('/assets/')
        ? initial.photo
        : '/assets/leaders/' + initial.photo.replace(/^.*[\\/]/, '')
      : ''
  )
  const [bio, setBio] = useState(initial?.bio || '')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      await onSave({ name, photo, bio })
    } catch (e: any) {
      setErr(e.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input required value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <FileUpload category="leaders" onUploaded={setPhoto} label="Leader Photo" />
        {photo && (
          <img
            src={photo.startsWith('/assets/') ? photo : '/assets/leaders/' + photo.replace(/^.*[\\/]/, '')}
            alt="Preview"
            className="h-16 mt-2"
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Bio</label>
        <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
      </div>
      <div className="flex gap-2">
        <button disabled={busy} className="btn btn-primary">{busy ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} className="btn btn-outline">Cancel</button>
      </div>
      {err && <p className="text-red-600">{err}</p>}
    </form>
  )
}

function LeadersCMS() {
  const [list, setList] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Leader | null>(null)
  const [creating, setCreating] = useState(false)
  const [err, setErr] = useState('')

  async function load() {
    setLoading(true)
    try {
      setList(await fetchLeaders())
    } catch (e: any) { setErr(e.message) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  async function doCreate(l: Omit<Leader, 'id'>) {
    await createLeader(l)
    setCreating(false)
    await load()
  }
  async function doUpdate(l: Omit<Leader, 'id'>) {
    if (!editing) return
    await updateLeader(editing.id, l)
    setEditing(null)
    await load()
  }
  async function doDelete(id: number) {
    if (!confirm('Delete this leader?')) return
    await deleteLeader(id)
    await load()
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Leadership</h3>
        <button className="btn btn-primary" onClick={() => { setCreating(true); setEditing(null) }}>New Leader</button>
      </div>
      {loading ? <p className="mt-4">Loading...</p> : (
        <div className="mt-4 space-y-3">
          {list.map(l => (
            <div key={l.id} className="border rounded-xl p-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{l.name}</div>
                {l.photo && <img src={l.photo} alt={l.name} className="h-16 w-16 rounded-full object-cover mt-2" />}
                <div className="text-gray-600 text-sm mt-1">{l.bio}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline" onClick={() => { setEditing(l); setCreating(false) }}>Edit</button>
                <button className="btn btn-outline" onClick={() => doDelete(l.id)}>Delete</button>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-gray-600">No leaders yet.</p>}
        </div>
      )}
      {creating && (
        <div className="mt-6">
          <LeaderForm onSave={doCreate} onCancel={() => setCreating(false)} />
        </div>
      )}
      {editing && (
        <div className="mt-6">
          <LeaderForm initial={editing} onSave={doUpdate} onCancel={() => setEditing(null)} />
        </div>
      )}
      {err && <p className="text-red-600 mt-2">{err}</p>}
    </div>
  )
}

// --- Service CMS ---
function ServiceForm({ initial, onSave, onCancel }:{
  initial?: Partial<Service>,
  onSave:(s:Omit<Service,'id'>)=>Promise<void>,
  onCancel:()=>void
}) {
  const [name, setName] = useState(initial?.name || '')
  const [slug, setSlug] = useState(initial?.slug || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [price, setPrice] = useState(initial?.price ?? 0)
  const [photo, setPhoto] = useState(
    initial?.photo
      ? initial.photo.startsWith('/assets/')
        ? initial.photo
        : '/assets/services/' + initial.photo.replace(/^.*[\\/]/, '')
      : ''
  )
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      await onSave({ name, slug, description, price, photo })
    } catch (e:any) {
      setErr(e.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input required value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"/>
        </div>
        <div>
          <label className="block text-sm font-medium">Slug</label>
          <input required value={slug} onChange={e=>setSlug(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"/>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea required rows={3} value={description} onChange={e=>setDescription(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"/>
      </div>
      <div>
        <label className="block text-sm font-medium">Price (USD)</label>
        <input type="number" step="0.01" value={price} onChange={e=>setPrice(parseFloat(e.target.value))} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2"/>
      </div>
      <div>
        <FileUpload category="services" onUploaded={setPhoto} label="Service Image" />
        {photo && (
          <img
            src={photo.startsWith('/assets/') ? photo : '/assets/services/' + photo.replace(/^.*[\\/]/, '')}
            alt="Service"
            className="h-16 mt-2"
          />
        )}
      </div>
      <div className="flex gap-2">
        <button disabled={busy} className="btn btn-primary">{busy?'Saving...':'Save'}</button>
        <button type="button" onClick={onCancel} className="btn btn-outline">Cancel</button>
      </div>
      {err && <p className="text-red-600">{err}</p>}
    </form>
  )
}

function ServicesCMS() {
  const [list, setList] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Service|null>(null)
  const [creating, setCreating] = useState(false)
  const [err, setErr] = useState('')

  async function load() {
    setLoading(true)
    try {
      setList(await fetchServices())
    } catch (e:any) { setErr(e.message) } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  async function doCreate(s: Omit<Service,'id'>) {
    await createService(s)
    setCreating(false)
    await load()
  }
  async function doUpdate(s: Omit<Service,'id'>) {
    if (!editing) return
    await updateService(editing.id, s)
    setEditing(null)
    await load()
  }
  async function doDelete(id:number) {
    if (!confirm('Delete this service?')) return
    await deleteService(id)
    await load()
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Services</h3>
        <button className="btn btn-primary" onClick={()=>{setCreating(true); setEditing(null)}}>New Service</button>
      </div>
      {loading ? <p className="mt-4">Loading...</p> : (
        <div className="mt-4 space-y-3">
          {list.map(s => (
            <div key={s.id} className="border rounded-xl p-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{s.name} <span className="text-gray-500">/ {s.slug}</span></div>
                <div className="text-gray-600 text-sm mt-1">{s.description}</div>
                <div className="mt-2 font-semibold">${s.price?.toFixed?.(2) ?? '0.00'}</div>
                {s.photo && <img src={s.photo} alt={s.name} className="h-16 mt-2" />}
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline" onClick={()=>{setEditing(s); setCreating(false)}}>Edit</button>
                <button className="btn btn-outline" onClick={()=>doDelete(s.id)}>Delete</button>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-gray-600">No services yet.</p>}
        </div>
      )}
      {creating && (
        <div className="mt-6">
          <ServiceForm onSave={doCreate} onCancel={()=>setCreating(false)} />
        </div>
      )}
      {editing && (
        <div className="mt-6">
          <ServiceForm initial={editing} onSave={doUpdate} onCancel={()=>setEditing(null)} />
        </div>
      )}
      {err && <p className="text-red-600 mt-2">{err}</p>}
    </div>
  )
}

// --- Resource CMS ---
function ResourceForm({ initial, onSave, onCancel }: { initial?: Partial<Resource>, onSave: (r: Omit<Resource, 'id'>) => Promise<void>, onCancel: () => void }) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [type, setType] = useState(initial?.type || '')
  const [url, setUrl] = useState(
    initial?.url
      ? initial.url.startsWith('/assets/')
        ? initial.url
        : '/assets/resources/' + initial.url.replace(/^.*[\\/]/, '')
      : ''
  )
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      await onSave({ title, description, type, url })
    } catch (e: any) {
      setErr(e.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input required value={title} onChange={e => setTitle(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium">Type</label>
        <input required value={type} onChange={e => setType(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" placeholder="e.g. article, brochure, policy, news" />
      </div>
      <div>
        <FileUpload category="resources" onUploaded={setUrl} label="Resource File" />
        {url && (
          <a
            href={url.startsWith('/assets/') ? url : '/assets/resources/' + url.replace(/^.*[\\/]/, '')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-2"
          >
            Open Uploaded
          </a>
        )}
      </div>
      <div className="flex gap-2">
        <button disabled={busy} className="btn btn-primary">{busy ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} className="btn btn-outline">Cancel</button>
      </div>
      {err && <p className="text-red-600">{err}</p>}
    </form>
  )
}

function ResourcesCMS() {
  const [list, setList] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Resource | null>(null)
  const [creating, setCreating] = useState(false)
  const [err, setErr] = useState('')

  async function load() {
    setLoading(true)
    try {
      setList(await fetchResources())
    } catch (e: any) { setErr(e.message) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  async function doCreate(r: Omit<Resource, 'id'>) {
    await createResource(r)
    setCreating(false)
    await load()
  }
  async function doUpdate(r: Omit<Resource, 'id'>) {
    if (!editing) return
    await updateResource(editing.id, r)
    setEditing(null)
    await load()
  }
  async function doDelete(id: number) {
    if (!confirm('Delete this resource?')) return
    await deleteResource(id)
    await load()
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Resources</h3>
        <button className="btn btn-primary" onClick={() => { setCreating(true); setEditing(null) }}>New Resource</button>
      </div>
      {loading ? <p className="mt-4">Loading...</p> : (
        <div className="mt-4 space-y-3">
          {list.map(r => (
            <div key={r.id} className="border rounded-xl p-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{r.title} <span className="text-gray-500">/ {r.type}</span></div>
                <div className="text-gray-600 text-sm mt-1">{r.description}</div>
                {r.url && (
                  <a
                    href={r.url.startsWith('/assets/') ? r.url : '/assets/resources/' + r.url.replace(/^.*[\\/]/, '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline mt-2"
                  >
                    Open
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline" onClick={() => { setEditing(r); setCreating(false) }}>Edit</button>
                <button className="btn btn-outline" onClick={() => doDelete(r.id)}>Delete</button>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-gray-600">No resources yet.</p>}
        </div>
      )}
      {creating && (
        <div className="mt-6">
          <ResourceForm onSave={doCreate} onCancel={() => setCreating(false)} />
        </div>
      )}
      {editing && (
        <div className="mt-6">
          <ResourceForm initial={editing} onSave={doUpdate} onCancel={() => setEditing(null)} />
        </div>
      )}
      {err && <p className="text-red-600 mt-2">{err}</p>}
    </div>
  )
}

// --- Partner CMS ---
function PartnerForm({ initial, onSave, onCancel }: { initial?: Partial<Partner>, onSave: (p: Omit<Partner, 'id'>) => Promise<void>, onCancel: () => void }) {
  const [name, setName] = useState(initial?.name || '')
  const [logo, setLogo] = useState(
    initial?.logo
      ? initial.logo.startsWith('/assets/')
        ? initial.logo
        : '/assets/partners/' + initial.logo.replace(/^.*[\\/]/, '')
      : ''
  )
  const [link, setLink] = useState(initial?.link || '')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      await onSave({ name, logo, link })
    } catch (e: any) {
      setErr(e.message || 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input required value={name} onChange={e => setName(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
      </div>
      <div>
        <FileUpload category="partners" onUploaded={setLogo} label="Partner Logo" />
        {logo && (
          <img
            src={logo.startsWith('/assets/') ? logo : '/assets/partners/' + logo.replace(/^.*[\\/]/, '')}
            alt="Logo"
            className="h-12 mt-2"
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Website Link</label>
        <input value={link} onChange={e => setLink(e.target.value)} className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2" />
      </div>
      <div className="flex gap-2">
        <button disabled={busy} className="btn btn-primary">{busy ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} className="btn btn-outline">Cancel</button>
      </div>
      {err && <p className="text-red-600">{err}</p>}
    </form>
  )
}

function PartnersCMS() {
  const [list, setList] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Partner | null>(null)
  const [creating, setCreating] = useState(false)
  const [err, setErr] = useState('')

  async function load() {
    setLoading(true)
    try {
      setList(await fetchPartners())
    } catch (e: any) { setErr(e.message) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  async function doCreate(p: Omit<Partner, 'id'>) {
    await createPartner(p)
    setCreating(false)
    await load()
  }
  async function doUpdate(p: Omit<Partner, 'id'>) {
    if (!editing) return
    await updatePartner(editing.id, p)
    setEditing(null)
    await load()
  }
  async function doDelete(id: number) {
    if (!confirm('Delete this partner?')) return
    await deletePartner(id)
    await load()
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Partners</h3>
        <button className="btn btn-primary" onClick={() => { setCreating(true); setEditing(null) }}>New Partner</button>
      </div>
      {loading ? <p className="mt-4">Loading...</p> : (
        <div className="mt-4 space-y-3">
          {list.map(p => (
            <div key={p.id} className="border rounded-xl p-4 flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{p.name}</div>
                {p.logo && <img src={p.logo} alt={p.name} className="h-12 object-contain mt-2" />}
                <div className="text-gray-600 text-sm mt-1">{p.link}</div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-outline" onClick={() => { setEditing(p); setCreating(false) }}>Edit</button>
                <button className="btn btn-outline" onClick={() => doDelete(p.id)}>Delete</button>
              </div>
            </div>
          ))}
          {list.length === 0 && <p className="text-gray-600">No partners yet.</p>}
        </div>
      )}
      {creating && (
        <div className="mt-6">
          <PartnerForm onSave={doCreate} onCancel={() => setCreating(false)} />
        </div>
      )}
      {editing && (
        <div className="mt-6">
          <PartnerForm initial={editing} onSave={doUpdate} onCancel={() => setEditing(null)} />
        </div>
      )}
      {err && <p className="text-red-600 mt-2">{err}</p>}
    </div>
  )
}

// --- TicketsPanel ---
function TicketsPanel() {
  const [tickets, setTickets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    (async () => {
      try {
        setTickets(await listTickets())
      } catch (e: any) { setErr(e.message) }
      finally { setLoading(false) }
    })()
  }, [])

  return (
    <div className="card">
      <h3 className="text-lg font-semibold">Tickets</h3>
      {loading ? <p className="mt-4">Loading...</p> : (
        <div className="mt-4 space-y-3">
          {tickets.map(t => (
            <div key={t.id} className="border rounded-xl p-4">
              <div className="font-semibold">{t.subject}</div>
              <div className="text-sm text-gray-600">{t.name} • {t.email}</div>
              <p className="mt-2">{t.message}</p>
              <div className="text-xs text-gray-500 mt-1">Status: {t.status}</div>
            </div>
          ))}
          {tickets.length === 0 && <p className="text-gray-600">No tickets yet.</p>}
        </div>
      )}
      {err && <p className="text-red-600 mt-2">{err}</p>}
    </div>
  )
}

// --- Main Admin Export ---
export default function Admin() {
  const [authed, setAuthed] = useState<boolean>(!!localStorage.getItem('token'))
  function logout() { localStorage.removeItem('token'); setAuthed(false) }
  if (!authed) return <div className="py-12 container"><LoginForm onSuccess={() => setAuthed(true)} /></div>
  return (
    <section className="py-12 container space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <button onClick={logout} className="btn btn-outline">Log out</button>
      </div>
      <AboutCMS />
      <LeadersCMS />
      <ServicesCMS />
      <ResourcesCMS />
      <PartnersCMS />
      <TicketsPanel />
    </section>
  )
}