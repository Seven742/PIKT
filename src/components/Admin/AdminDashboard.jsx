'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiFileText, FiBook, FiUsers, FiGlobe, FiArrowRight, FiTrendingUp, FiLoader } from 'react-icons/fi'
import { newsAPI, courseAPI, teacherAPI } from '@/services/api'
import { useAdmin } from '@/context/AdminContext'

const AdminDashboard = () => {
  const { cooperations } = useAdmin()
  const [counts, setCounts] = useState({ news: 0, courses: 0, teachers: 0 })
  const [recentNews, setRecentNews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [n, c, t] = await Promise.allSettled([
          newsAPI.getAll(), courseAPI.getAll(), teacherAPI.getAll()
        ])
        const newsData = n.status === 'fulfilled' ? n.value.data.data || [] : []
        const coursesData = c.status === 'fulfilled' ? c.value.data.data || [] : []
        const teachersData = t.status === 'fulfilled' ? t.value.data.data || [] : []
        setCounts({ news: newsData.length, courses: coursesData.length, teachers: teachersData.length })
        setRecentNews(newsData.slice(0, 3))
      } catch { }
      finally { setLoading(false) }
    }
    fetchAll()
  }, [])

  const stats = [
    { icon: <FiFileText className="text-2xl" />, label: 'ព័ត៌មាន', count: counts.news, to: '/admin/news', light: 'bg-blue-50 text-blue-600' },
    { icon: <FiBook className="text-2xl" />, label: 'ឯកទេសសិក្សា', count: counts.courses, to: '/admin/courses', light: 'bg-emerald-50 text-emerald-600' },
    { icon: <FiUsers className="text-2xl" />, label: 'គ្រូបង្រៀន', count: counts.teachers, to: '/admin/teachers', light: 'bg-purple-50 text-purple-600' },
    { icon: <FiGlobe className="text-2xl" />, label: 'ភាពជាដៃគូ', count: cooperations?.length || 0, to: '/admin/coop', light: 'bg-amber-50 text-amber-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-moul text-gray-800 text-2xl mb-1">ស្វាគមន៍!</h1>
        <p className="font-battambang text-gray-500 text-sm">គ្រប់គ្រង Website PIKT — វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ</p>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 py-6"><FiLoader className="animate-spin text-primary text-xl" /><p className="font-battambang text-gray-500 text-sm">កំពុងទាញទិន្នន័យ...</p></div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <Link href={s.to} key={i} className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all hover:-translate-y-0.5 group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.light}`}>{s.icon}</div>
                <FiArrowRight className="text-gray-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="font-moul text-gray-800 text-3xl mb-1">{s.count}</p>
              <p className="font-battambang text-gray-500 text-sm">{s.label}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6">
        <h2 className="font-moul text-gray-800 text-lg mb-5 flex items-center gap-2"><FiTrendingUp className="text-primary" /> សកម្មភាពរហ័ស</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            { label: 'បន្ថែមព័ត៌មាន', to: '/admin/news', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100' },
            { label: 'បន្ថែម Course', to: '/admin/courses', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-100' },
            { label: 'បន្ថែមគ្រូ', to: '/admin/teachers', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100' },
            { label: 'បន្ថែមដៃគូ', to: '/admin/coop', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-100' },
          ].map((a, i) => (
            <Link key={i} href={a.to}>
              <button className={`w-full font-battambang text-sm py-3 px-4 rounded-xl border transition-all ${a.color}`}>
                + {a.label}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent News */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-moul text-gray-800 text-lg">ព័ត៌មានថ្មីៗ</h2>
          <Link href="/admin/news" className="font-battambang text-primary text-sm hover:underline flex items-center gap-1">មើលទាំងអស់ <FiArrowRight /></Link>
        </div>
        <div className="space-y-3">
          {recentNews.length > 0 ? recentNews.map(n => (
            <div key={n.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                {n.image ? <img src={n.image} alt="" className="w-full h-full object-cover rounded-lg" />
                  : <FiFileText className="text-primary" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-battambang text-gray-800 text-sm font-bold truncate">{n.title}</p>
                <p className="font-battambang text-gray-500 text-xs">{n.category} · {new Date(n.created_at).toLocaleDateString('km-KH')}</p>
              </div>
            </div>
          )) : <p className="font-battambang text-gray-400 text-sm text-center py-4">មិនទាន់មានព័ត៌មាន</p>}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
