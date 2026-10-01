'use client'
import React, { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiBook, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import { courseAPI } from '@/services/api'

const catList = ['បច្ចេកវិទ្យា','ហេដ្ឋារចនាសម្ព័ន្ធ','ពាណិជ្ជកម្ម','កសិកម្ម','ភាសា','ផ្សេងៗ']
const empty = { name:'', category:'បច្ចេកវិទ្យា', duration:'3 ឆ្នាំ', level:'AD', description:'' }

const Modal = ({ item, onClose, onSaved, isEdit }) => {
  const [form, setForm]     = useState({ ...item, imagePreview: item.image || '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr]       = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const handleImg = (e) => {
    const file = e.target.files[0]; if (!file) return
    set('imageFile', file); set('imagePreview', URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!form.name) { setErr('ឈ្មោះ Course មិនអាចទទេ!'); return }
    setSaving(true); setErr('')
    try {
      const fd = new FormData()
      fd.append('name',        form.name)
      fd.append('category',    form.category)
      fd.append('duration',    form.duration)
      fd.append('level',       form.level)
      fd.append('description', form.description || '')
      if (form.imageFile) fd.append('image', form.imageFile)

      let res
      if (isEdit) res = await courseAPI.update(item.id, fd)
      else        res = await courseAPI.create(fd)

      onSaved(res.data.data, isEdit); onClose()
    } catch (e) { setErr(e.response?.data?.message || 'មានបញ្ហា!') }
    finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-moul text-primary text-lg">{isEdit ? 'កែប្រែ Course' : 'បន្ថែម Course'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><FiX /></button>
        </div>
        <div className="p-6 space-y-4">
          {err && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 font-battambang text-sm"><FiAlertCircle />{err}</div>}
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">ឈ្មោះ Course *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="ឈ្មោះ Course"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">ប្រភេទ</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary">
                {catList.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">Level</label>
              <select value={form.level} onChange={e => set('level', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm focus:outline-hidden focus:border-primary">
                <option>AD</option><option>Certificate</option><option>Diploma</option>
              </select>
            </div>
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">រយៈពេល</label>
              <input value={form.duration} onChange={e => set('duration', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">ការពិពណ៌នា</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
              placeholder="ពណ៌នាអំពី Course..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary resize-none" />
          </div>
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">រូបភាព Course</label>
            <input type="file" accept="image/*" onChange={handleImg} className="font-battambang text-sm text-gray-600" />
            {form.imagePreview && <img src={form.imagePreview} className="mt-2 h-32 rounded-lg object-cover" alt="preview" />}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex-1 bg-primary text-white font-battambang py-3 rounded-xl hover:bg-blue-900 flex items-center justify-center gap-2 disabled:opacity-60 transition-all">
              {saving ? <FiLoader className="animate-spin" /> : <FiSave />}
              {isEdit ? 'រក្សាទុក' : 'បន្ថែម'}
            </button>
            <button onClick={onClose} className="px-6 border border-gray-200 font-battambang py-3 rounded-xl hover:bg-gray-50"><FiX /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

const AdminCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [modal, setModal]     = useState(null)
  const [delId, setDelId]     = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try { setLoading(true); const res = await courseAPI.getAll(); setCourses(res.data.data || []) }
      catch { setError('មិនអាចភ្ជាប់ Backend បាន!') }
      finally { setLoading(false) }
    }
    fetch()
  }, [])

  const handleSaved = (item, isEdit) => {
    if (isEdit) setCourses(prev => prev.map(c => c.id === item.id ? item : c))
    else        setCourses(prev => [...prev, item])
  }

  const handleDelete = async () => {
    setDeleting(true)
    try { await courseAPI.delete(delId); setCourses(prev => prev.filter(c => c.id !== delId)); setDelId(null) }
    catch { alert('មានបញ្ហាក្នុងការលុប!') }
    finally { setDeleting(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-moul text-gray-800 text-xl">គ្រប់គ្រង Course</h1>
          <p className="font-battambang text-gray-500 text-sm">{courses.length} Course សរុប</p>
        </div>
        <button onClick={() => setModal('add')}
          className="bg-primary text-white font-battambang px-5 py-2.5 rounded-xl hover:bg-blue-900 flex items-center gap-2 transition-all">
          <FiPlus /> បន្ថែម Course
        </button>
      </div>

      {loading && <div className="flex items-center justify-center py-20 gap-3"><FiLoader className="animate-spin text-primary text-2xl" /><p className="font-battambang text-gray-500">កំពុងទាញ...</p></div>}
      {error   && <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-5"><FiAlertCircle className="shrink-0" /><p className="font-battambang text-sm">{error}</p></div>}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.length === 0 && (
            <div className="col-span-3 text-center py-16 bg-white rounded-xl border border-gray-100">
              <FiBook className="text-gray-200 text-5xl mx-auto mb-3" />
              <p className="font-battambang text-gray-400">មិនទាន់មាន Course</p>
            </div>
          )}
          {courses.map(c => (
            <div key={c.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs">
              <div className="h-36 bg-gray-50 flex items-center justify-center overflow-hidden">
                {c.image ? <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  : <HiOutlineAcademicCap className="text-gray-200 text-5xl" />}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-battambang font-bold text-gray-800 text-sm">{c.name}</h3>
                  <span className="font-battambang text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">{c.level}</span>
                </div>
                <p className="font-battambang text-xs text-gray-400 mb-3">{c.category} · {c.duration}</p>
                <div className="flex gap-2">
                  <button onClick={() => setModal(c)} className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 font-battambang text-xs py-2 rounded-lg transition-all"><FiEdit2 /> កែប្រែ</button>
                  <button onClick={() => setDelId(c.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-500 hover:bg-red-100 font-battambang text-xs py-2 rounded-lg transition-all"><FiTrash2 /> លុប</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal === 'add' && <Modal item={empty} onClose={() => setModal(null)} onSaved={handleSaved} isEdit={false} />}
      {modal && modal !== 'add' && <Modal item={modal} onClose={() => setModal(null)} onSaved={handleSaved} isEdit={true} />}

      {delId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl text-center">
            <FiTrash2 className="text-red-400 text-4xl mx-auto mb-4" />
            <h3 className="font-moul text-gray-800 text-lg mb-2">លុប Course?</h3>
            <p className="font-battambang text-gray-500 text-sm mb-6">មិនអាចដកវិញបាន!</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 bg-red-500 text-white font-battambang py-2.5 rounded-xl hover:bg-red-600 flex items-center justify-center gap-2 disabled:opacity-60 transition-all">
                {deleting ? <FiLoader className="animate-spin" /> : null} លុប
              </button>
              <button onClick={() => setDelId(null)} className="flex-1 border border-gray-200 font-battambang py-2.5 rounded-xl hover:bg-gray-50">បោះបង់</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCourses
