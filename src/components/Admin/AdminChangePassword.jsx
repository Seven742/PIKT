'use client'
import React, { useState } from 'react'
import { FiLock, FiEye, FiEyeOff, FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { authAPI } from '@/services/api'

const AdminChangePassword = () => {
  const [form, setForm]     = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [show, setShow]     = useState({ cur: false, new: false, con: false })
  const [loading, setLoading] = useState(false)
  const [err, setErr]       = useState('')
  const [success, setSuccess] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const toggleShow = (k) => setShow(s => ({ ...s, [k]: !s[k] }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr(''); setSuccess('')
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setErr('សូមបំពេញគ្រប់ fields!'); return
    }
    if (form.newPassword.length < 6) {
      setErr('Password ថ្មី ត្រូវតែ ៦ តួអក្សរ ឬ ច្រើនជាងនេះ!'); return
    }
    if (form.newPassword !== form.confirmPassword) {
      setErr('Password ថ្មី មិនដូចគ្នា!'); return
    }
    setLoading(true)
    try {
      await authAPI.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      setSuccess('ផ្លាស់ប្ដូរ Password ដោយជោគជ័យ!')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      setErr(err.response?.data?.message || 'មានបញ្ហា! សូមសាកល្បងម្ដងទៀត')
    } finally { setLoading(false) }
  }

  const fields = [
    { key: 'currentPassword', showKey: 'cur', label: 'Password ចាស់ *', placeholder: '••••••••' },
    { key: 'newPassword',     showKey: 'new', label: 'Password ថ្មី *',  placeholder: 'យ៉ាងហោចណាស់ ៦ តួ' },
    { key: 'confirmPassword', showKey: 'con', label: 'បញ្ជាក់ Password ថ្មី *', placeholder: 'ដូច Password ថ្មី' },
  ]

  return (
    <div className="max-w-md">
      <h1 className="font-moul text-gray-800 text-xl mb-1">ផ្លាស់ប្ដូរ Password</h1>
      <p className="font-battambang text-gray-500 text-sm mb-7">ផ្លាស់ប្ដូរ Password Admin សម្រាប់ PIKT</p>

      {err     && <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-5 font-battambang text-sm"><FiAlertCircle className="shrink-0" />{err}</div>}
      {success && <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-5 font-battambang text-sm"><FiCheckCircle className="shrink-0" />{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
        {fields.map(f => (
          <div key={f.key}>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">{f.label}</label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={show[f.showKey] ? 'text' : 'password'}
                value={form[f.key]}
                onChange={e => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
              <button type="button" onClick={() => toggleShow(f.showKey)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {show[f.showKey] ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
        ))}

        <div className="pt-1">
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-white font-battambang py-3 rounded-xl hover:bg-blue-900 flex items-center justify-center gap-2 disabled:opacity-60 transition-all">
            {loading
              ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>
              : <><FiSave /> រក្សាទុក Password</>
            }
          </button>
        </div>
      </form>

      <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="font-battambang text-amber-700 text-xs leading-relaxed">
          ⚠️ ការណែនាំ: Password ល្អ គួរតែ ៨ តួ ឬ ច្រើន, មាន អក្សរធំ-តូច + លេខ + សញ្ញា (ឧ. Pikt@2025)
        </p>
      </div>
    </div>
  )
}

export default AdminChangePassword
