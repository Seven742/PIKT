'use client'
import React, { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiGlobe, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { coopAPI } from '@/services/api'

const typeList = ['ហិរញ្ញប្បទាន', 'ដឹកនាំ', 'ដៃគូ', 'បច្ចេកទេស', 'ហ្វឹកហ្វឺន', 'អភិវឌ្ឍន៍', 'ផ្សេងៗ']
const empty = { name: '', country: 'កម្ពុជា', type: 'ដៃគូ', description: '' }

const Modal = ({ item, onClose, onSaved, isEdit }) => {
  const [form, setForm] = useState({ ...item, logoPreview: item.logo || '' })
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const handleImg = (e) => {
    const file = e.target.files[0]; if (!file) return
    set('logoFile', file); set('logoPreview', URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!form.name) { setErr('ឈ្មោះ មិនអាចទទេ!'); return }
    setSaving(true); setErr('')
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('country', form.country)
      fd.append('type', form.type)
      fd.append('description', form.description || '')
      if (form.logoFile) fd.append('logo', form.logoFile)

      let res
      if (isEdit) res = await coopAPI.update(item.id, fd)
      else res = await coopAPI.create(fd)

      onSaved(res.data.data, isEdit); onClose()
    } catch (e) { setErr(e.response?.data?.message || 'មានបញ្ហា!') }
    finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-moul text-primary text-lg">{isEdit ? 'កែប្រែដៃគូ' : 'បន្ថែមដៃគូ'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><FiX /></button>
        </div>
        <div className="p-6 space-y-4">
          {err && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 font-battambang text-sm"><FiAlertCircle />{err}</div>}
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">ឈ្មោះ *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="ឈ្មោះស្ថាប័ន"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">ប្រទេស</label>
              <input value={form.country} onChange={e => set('country', e.target.value)} placeholder="កម្ពុជា"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary" />
            </div>
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">ប្រភេទ</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary">
                {typeList.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">ការពិពណ៌នា</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
              placeholder="ពណ៌នាអំពីភាពជាដៃគូ..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary resize-none" />
          </div>
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">Logo</label>
            <input type="file" accept="image/*" onChange={handleImg} className="font-battambang text-sm text-gray-600" />
            {form.logoPreview && <img src={form.logoPreview} className="mt-2 h-16 rounded-lg object-contain" alt="logo" />}
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

const AdminCoop = () => {
  const [coops, setCoops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(null)
  const [delId, setDelId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try { setLoading(true); const res = await coopAPI.getAll(); setCoops(res.data.data || []) }
      catch { setError('មិនអាចភ្ជាប់ Backend បាន!') }
      finally { setLoading(false) }
    }
    fetch()
  }, [])

  const handleSaved = (item, isEdit) => {
    if (isEdit) setCoops(prev => prev.map(c => c.id === item.id ? item : c))
    else setCoops(prev => [...prev, item])
  }

  const handleDelete = async () => {
    setDeleting(true)
    try { await coopAPI.delete(delId); setCoops(prev => prev.filter(c => c.id !== delId)); setDelId(null) }
    catch { alert('មានបញ្ហាក្នុងការលុប!') }
    finally { setDeleting(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-moul text-gray-800 text-xl">គ្រប់គ្រងភាពជាដៃគូ</h1>
          <p className="font-battambang text-gray-500 text-sm">{coops.length} ដៃគូ (ពី Database)</p>
        </div>
        <button onClick={() => setModal('add')}
          className="bg-primary text-white font-battambang px-5 py-2.5 rounded-xl hover:bg-blue-900 flex items-center gap-2 transition-all">
          <FiPlus /> បន្ថែមដៃគូ
        </button>
      </div>

      {loading && <div className="flex items-center justify-center py-20 gap-3"><FiLoader className="animate-spin text-primary text-2xl" /><p className="font-battambang text-gray-500">កំពុងទាញ...</p></div>}
      {error && <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-5"><FiAlertCircle className="shrink-0" /><p className="font-battambang text-sm">{error}</p></div>}

      {!loading && !error && (
        <div className="grid md:grid-cols-2 gap-4">
          {coops.length === 0 && (
            <div className="col-span-2 text-center py-16 bg-white rounded-xl border border-gray-100">
              <FiGlobe className="text-gray-200 text-5xl mx-auto mb-3" />
              <p className="font-battambang text-gray-400">មិនទាន់មានដៃគូ</p>
            </div>
          )}
          {coops.map(c => (
            <div key={c.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                {c.logo ? <img src={c.logo} alt={c.name} className=" object-contain" />
                  : <HiOutlineBuildingOffice2 className="text-primary text-2xl" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-battambang font-bold text-gray-800 text-sm mb-1">{c.name}</h3>
                <div className="flex gap-2 mb-2 flex-wrap">
                  <span className="font-battambang text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{c.type}</span>
                  <span className="flex items-center gap-1 font-battambang text-xs text-gray-400"><FiGlobe className="text-xs" />{c.country}</span>
                </div>
                <p className="font-battambang text-gray-500 text-xs mb-3 line-clamp-2">{c.description}</p>
                <div className="flex gap-2">
                  <button onClick={() => setModal(c)} className="flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 font-battambang text-xs px-3 py-1.5 rounded-lg transition-all"><FiEdit2 className="text-xs" /> កែប្រែ</button>
                  <button onClick={() => setDelId(c.id)} className="flex items-center gap-1 bg-red-50 text-red-500 hover:bg-red-100 font-battambang text-xs px-3 py-1.5 rounded-lg transition-all"><FiTrash2 className="text-xs" /> លុប</button>
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
            <h3 className="font-moul text-gray-800 text-lg mb-2">លុបដៃគូ?</h3>
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

export default AdminCoop
