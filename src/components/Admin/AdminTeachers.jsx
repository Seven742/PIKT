'use client'
import React, { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiUsers, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import { teacherAPI } from '@/services/api'

const posList = ['នាយក','នាយករង','គ្រូបង្រៀន','បុគ្គលិក']
const empty = { name:'', gender:'male', phone:'', email:'', position:'គ្រូបង្រៀន', subject:'' }

const Modal = ({ item, onClose, onSaved, isEdit }) => {
  const [form, setForm]     = useState({ ...item, imagePreview: item.photo || '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr]       = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const handleImg = (e) => {
    const file = e.target.files[0]; if (!file) return
    set('photoFile', file); set('imagePreview', URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!form.name) { setErr('ឈ្មោះ មិនអាចទទេ!'); return }
    setSaving(true); setErr('')
    try {
      const fd = new FormData()
      fd.append('name',     form.name)
      fd.append('gender',   form.gender)
      fd.append('phone',    form.phone || '')
      fd.append('email',    form.email || '')
      fd.append('position', form.position)
      fd.append('subject',  form.subject || '')
      if (form.photoFile) fd.append('photo', form.photoFile)

      let res
      if (isEdit) res = await teacherAPI.update(item.id, fd)
      else        res = await teacherAPI.create(fd)

      onSaved(res.data.data, isEdit); onClose()
    } catch (e) { setErr(e.response?.data?.message || 'មានបញ្ហា!') }
    finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-moul text-primary text-lg">{isEdit ? 'កែប្រែគ្រូ' : 'បន្ថែមគ្រូ'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><FiX /></button>
        </div>
        <div className="p-6 space-y-4">
          {err && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 font-battambang text-sm"><FiAlertCircle />{err}</div>}
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">ឈ្មោះ *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="ឈ្មោះ នាម"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">ភេទ</label>
              <select value={form.gender} onChange={e => set('gender', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary">
                <option value="male">ប្រុស</option>
                <option value="female">ស្រី</option>
              </select>
            </div>
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">តួនាទី</label>
              <select value={form.position} onChange={e => set('position', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary">
                {posList.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">ជំនាញ / មុខវិជ្ជា</label>
            <input value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="ព័ត៌មានវិទ្យា"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">លេខទូរស័ព្ទ</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="0xx xxx xxx"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-primary" />
            </div>
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">អ៊ីម៉ែល</label>
              <input value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@pikt.edu.kh"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">រូបថត</label>
            <input type="file" accept="image/*" onChange={handleImg} className="font-battambang text-sm text-gray-600" />
            {form.imagePreview && <img src={form.imagePreview} className="mt-2 h-32 w-24 rounded-lg object-cover object-top" alt="preview" />}
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

const AdminTeachers = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [modal, setModal]       = useState(null)
  const [delId, setDelId]       = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try { setLoading(true); const res = await teacherAPI.getAll(); setTeachers(res.data.data || []) }
      catch { setError('មិនអាចភ្ជាប់ Backend បាន!') }
      finally { setLoading(false) }
    }
    fetch()
  }, [])

  const handleSaved = (item, isEdit) => {
    if (isEdit) setTeachers(prev => prev.map(t => t.id === item.id ? item : t))
    else        setTeachers(prev => [...prev, item])
  }

  const handleDelete = async () => {
    setDeleting(true)
    try { await teacherAPI.delete(delId); setTeachers(prev => prev.filter(t => t.id !== delId)); setDelId(null) }
    catch { alert('មានបញ្ហាក្នុងការលុប!') }
    finally { setDeleting(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-moul text-gray-800 text-xl">គ្រប់គ្រងគ្រូបង្រៀន</h1>
          <p className="font-battambang text-gray-500 text-sm">{teachers.length} នាក់ (ពី Database) + ៤៧ នាក់ (builtin)</p>
        </div>
        <button onClick={() => setModal('add')}
          className="bg-primary text-white font-battambang px-5 py-2.5 rounded-xl hover:bg-blue-900 flex items-center gap-2 transition-all">
          <FiPlus /> បន្ថែមគ្រូ
        </button>
      </div>

      {loading && <div className="flex items-center justify-center py-20 gap-3"><FiLoader className="animate-spin text-primary text-2xl" /><p className="font-battambang text-gray-500">កំពុងទាញ...</p></div>}
      {error   && <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-5"><FiAlertCircle className="shrink-0" /><p className="font-battambang text-sm">{error}</p></div>}

      {!loading && !error && (
        teachers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <FiUsers className="text-gray-200 text-5xl mx-auto mb-3" />
            <p className="font-battambang text-gray-400 mb-1">មិនទាន់មានគ្រូក្នុង Database</p>
            <p className="font-battambang text-gray-300 text-xs">គ្រូ ៤៧ នាក់ builtin Active នៅ Teacher Page</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {teachers.map(t => (
              <div key={t.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-xs flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
                  {t.photo ? <img src={t.photo} alt={t.name} className="w-full h-full object-cover object-top" />
                    : <HiOutlineAcademicCap className="text-gray-300 text-2xl" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-battambang font-bold text-gray-800 text-sm truncate">{t.name}</h3>
                  <p className="font-battambang text-xs text-gray-500">{t.position}</p>
                  <p className="font-battambang text-xs text-primary mb-2">{t.subject}</p>
                  {t.phone && <p className="font-battambang text-xs text-gray-400">{t.phone}</p>}
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setModal(t)} className="flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 font-battambang text-xs px-2.5 py-1.5 rounded-lg transition-all"><FiEdit2 className="text-xs" /> កែ</button>
                    <button onClick={() => setDelId(t.id)} className="flex items-center gap-1 bg-red-50 text-red-500 hover:bg-red-100 font-battambang text-xs px-2.5 py-1.5 rounded-lg transition-all"><FiTrash2 className="text-xs" /> លុប</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {modal === 'add' && <Modal item={empty} onClose={() => setModal(null)} onSaved={handleSaved} isEdit={false} />}
      {modal && modal !== 'add' && <Modal item={modal} onClose={() => setModal(null)} onSaved={handleSaved} isEdit={true} />}

      {delId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-7 max-w-sm w-full shadow-2xl text-center">
            <FiTrash2 className="text-red-400 text-4xl mx-auto mb-4" />
            <h3 className="font-moul text-gray-800 text-lg mb-2">លុបគ្រូ?</h3>
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

export default AdminTeachers
