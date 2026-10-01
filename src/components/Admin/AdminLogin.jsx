'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiUser, FiLock, FiEye, FiEyeOff, FiLogIn, FiAlertCircle } from 'react-icons/fi'
import { useAdmin } from '@/context/AdminContext'
import { authAPI } from '@/services/api'
import Logo from '@/assets/Logo.png'

const AdminLogin = () => {
  const { isLoggedIn, loginSuccess } = useAdmin()
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [show, setShow] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { if (isLoggedIn) router.replace('/admin') }, [isLoggedIn, router])
  if (isLoggedIn) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.username || !form.password) { setErr('សូមបញ្ចូល Username និង Password!'); return }
    setErr(''); setLoading(true)
    try {
      const res = await authAPI.login({ username: form.username, password: form.password })
      loginSuccess(res.data.token, res.data.admin)
      router.push('/admin')
    } catch (err) {
      setErr(err.response?.data?.message || 'មានបញ្ហា! សូមពិនិត្យ Server')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-blue-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Image src={Logo} alt="PIKT" className="w-20 h-20 object-contain mx-auto mb-4" />
          <h1 className="font-moul text-primary text-2xl mb-1">PIKT Admin</h1>
          <p className="font-battambang text-gray-500 text-sm">ចូលប្រព័ន្ធគ្រប់គ្រង</p>
        </div>

        {err && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 mb-5 font-battambang text-sm">
            <FiAlertCircle className="shrink-0" /> {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">ឈ្មោះអ្នកប្រើ</label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                placeholder="admin" autoComplete="username"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
          </div>
          <div>
            <label className="font-battambang text-gray-700 text-sm block mb-1.5">លេខសំងាត់</label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type={show ? 'text' : 'password'} value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••" autoComplete="current-password"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-11 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {show ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="w-full bg-primary text-white font-battambang py-3 rounded-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60">
            {loading
              ? <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
              : <><FiLogIn /> ចូលប្រព័ន្ធ</>
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
