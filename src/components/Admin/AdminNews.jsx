'use client'
import React, { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiFileText, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { newsAPI } from '@/services/api'

const cats = ['ការចុះឈ្មោះ','ព្រឹត្តិការណ៍','ភាពជាដៃគូ','ការប្រកួត','ផ្សេងៗ']
const empty = { title:'', content:'', category:'ព្រឹត្តិការណ៍', author:'Admin PIKT', image:null, imagePreview:'' }

const Modal = ({ item, onClose, onSaved, isEdit }) => {
  const [form, setForm]       = useState({ ...item, imagePreview: item.image || '' })
  const [saving, setSaving]   = useState(false)
  const [err, setErr]         = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleImg = (e) => {
    const file = e.target.files[0]
    if (!file) return
    set('imageFile', file)
    set('imagePreview', URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!form.title || !form.content) { setErr('ចំណងជើង និង មាតិកា មិនអាចទទេ!'); return }
    setSaving(true); setErr('')
    try {
      const fd = new FormData()
      fd.append('title',     form.title)
      fd.append('content',   form.content)
      fd.append('category',  form.category)
      fd.append('author',    form.author)
      if (form.imageFile) fd.append('image', form.imageFile)

      let res
      if (isEdit) res = await newsAPI.update(item.id, fd)
      else        res = await newsAPI.create(fd)

      onSaved(res.data.data, isEdit)
      onClose()
    } catch (e) {
      setErr(e.response?.data?.message || 'មានបញ្ហា! សូមសាកល្បងម្ដងទៀត')
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="font-moul text-primary text-lg">{isEdit ? 'កែប្រែព័ត៌មាន' : 'បន្ថែមព័ត៌មាន'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><FiX /></button>
        </div>
        <div className="p-6 space-y-4">
          {err && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 font-battambang text-sm"><FiAlertCircle />{err}</div>}
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">ចំណងជើង *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="ចំណងជើងព័ត៌មាន"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">ប្រភេទ</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary">
                {cats.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="font-battambang text-gray-700 text-sm block mb-1.5">អ្នកសរសេរ</label>
              <input value={form.author} onChange={e => set('author', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary" />
            </div>
          </div>
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">មាតិកា *</label>
            <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={5}
              placeholder="សរសេរមាតិកាព័ត៌មាន..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary resize-none" />
          </div>
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">រូបភាព</label>
            <input type="file" accept="image/*" onChange={handleImg} className="font-battambang text-sm text-gray-600" />
            {form.imagePreview && <img src={form.imagePreview} className="mt-2 h-32 rounded-lg object-cover" alt="preview" />}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex-1 bg-primary text-white font-battambang py-3 rounded-xl hover:bg-blue-900 flex items-center justify-center gap-2 transition-all disabled:opacity-60">
              {saving ? <FiLoader className="animate-spin" /> : <FiSave />}
              {isEdit ? 'រក្សាទុក' : 'បន្ថែម'}
            </button>
            <button onClick={onClose} className="px-6 border border-gray-200 text-gray-600 font-battambang py-3 rounded-xl hover:bg-gray-50 transition-all"><FiX /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

const AdminNews = () => {
  const [news, setNews]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [modal, setModal]     = useState(null)
  const [delId, setDelId]     = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchNews = async () => {
    try { setLoading(true); setError(null)
      const res = await newsAPI.getAll()
      setNews(res.data.data || [])
    } catch { setError('មិនអាចភ្ជាប់ Backend បាន!') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchNews() }, [])

  const handleSaved = (item, isEdit) => {
    if (isEdit) setNews(prev => prev.map(n => n.id === item.id ? item : n))
    else        setNews(prev => [item, ...prev])
  }

  const handleDelete = async () => {
    setDeleting(true)
    try { await newsAPI.delete(delId); setNews(prev => prev.filter(n => n.id !== delId)); setDelId(null) }
    catch { alert('មានបញ្ហាក្នុងការលុប!') }
    finally { setDeleting(false) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-moul text-gray-800 text-xl">គ្រប់គ្រងព័ត៌មាន</h1>
          <p className="font-battambang text-gray-500 text-sm">{news.length} ព័ត៌មានសរុប</p>
        </div>
        <button onClick={() => setModal('add')}
          className="bg-primary text-white font-battambang px-5 py-2.5 rounded-xl hover:bg-blue-900 flex items-center gap-2 transition-all">
          <FiPlus /> បន្ថែមព័ត៌មាន
        </button>
      </div>

      {loading && <div className="flex items-center justify-center py-20 gap-3"><FiLoader className="animate-spin text-primary text-2xl" /><p className="font-battambang text-gray-500">កំពុងទាញ...</p></div>}
      {error  && <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-5"><FiAlertCircle className="shrink-0" /><p className="font-battambang text-sm">{error}</p></div>}

      {!loading && !error && (
        <div className="space-y-3">
          {news.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
              <FiFileText className="text-gray-200 text-5xl mx-auto mb-3" />
              <p className="font-battambang text-gray-400">មិនទាន់មានព័ត៌មាន</p>
            </div>
          )}
          {news.map(item => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-xs flex items-start gap-4">
              {item.image
                ? <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                : <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center shrink-0"><FiFileText className="text-primary text-2xl" /></div>
              }
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-battambang font-bold text-gray-800 text-sm leading-snug">{item.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => setModal(item)} className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center"><FiEdit2 className="text-sm" /></button>
                    <button onClick={() => setDelId(item.id)} className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center"><FiTrash2 className="text-sm" /></button>
                  </div>
                </div>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <span className="font-battambang text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{item.category}</span>
                  <span className="font-battambang text-xs text-gray-400">{item.author}</span>
                  <span className="font-battambang text-xs text-gray-400">{new Date(item.created_at).toLocaleDateString('km-KH')}</span>
                </div>
                <p className="font-battambang text-gray-500 text-xs mt-1 line-clamp-1">{item.content}</p>
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
            <h3 className="font-moul text-gray-800 text-lg mb-2">លុបព័ត៌មាន?</h3>
            <p className="font-battambang text-gray-500 text-sm mb-6">មិនអាចដកវិញបាន!</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} disabled={deleting}
                className="flex-1 bg-red-500 text-white font-battambang py-2.5 rounded-xl hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-60">
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

export default AdminNews
