'use client'
import React, { useState, useEffect } from 'react'
import { FiSearch, FiChevronLeft, FiChevronRight, FiLoader, FiAlertCircle, FiRefreshCw } from 'react-icons/fi'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import { teacherAPI } from '@/services/api'

const PER_PAGE = 12

const Teacher = () => {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const fetchTeachers = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await teacherAPI.getAll()
      setTeachers(res.data.data || [])
    } catch (err) {
      setError('មិនអាចទាញគ្រូបង្រៀនពី Server បាន។ សូមពិនិត្យ Backend!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTeachers() }, [])

  const filtered = teachers.filter(t =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.subject?.toLowerCase().includes(search.toLowerCase()) ||
    t.position?.toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const shown = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSearch = e => { setSearch(e.target.value); setPage(1) }

  return (
    <div>
      {/* Header */}
      <div className="bg-primary">
        <div className="xl:px-40 px-4 py-10 xl:py-14">
          <p className="font-battambang text-blue-300 text-sm uppercase tracking-widest mb-2">ការអប់រំ</p>
          <h1 className="font-moul text-white text-2xl xl:text-4xl">គ្រូបង្រៀន</h1>
        </div>
      </div>

      <div className="xl:px-40 px-4 py-12">

        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <HiOutlineAcademicCap className="text-primary text-2xl" />
            </div>
            <div>
              <p className="font-moul text-primary text-base">ក្រុមគ្រូបង្រៀន</p>
              <p className="font-battambang text-gray-500 text-sm">
                {loading ? 'កំពុងទាញ...' : `${filtered.length} / ${teachers.length} នាក់`}
              </p>
            </div>
          </div>
          <div className="relative max-w-sm w-full">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={handleSearch}
              placeholder="ស្វែងរកតាមឈ្មោះ ឬ ជំនាញ..."
              className="w-full border border-gray-200 focus:border-primary rounded-xl pl-10 pr-4 py-3 font-battambang text-sm outline-hidden focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <FiLoader className="animate-spin text-primary text-4xl" />
            <p className="font-battambang text-gray-500">កំពុងទាញយកគ្រូបង្រៀន...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 max-w-lg w-full">
              <FiAlertCircle className="shrink-0 text-2xl" />
              <p className="font-battambang text-sm">{error}</p>
            </div>
            <button
              onClick={fetchTeachers}
              className="flex items-center gap-2 bg-primary text-white font-battambang px-6 py-2.5 rounded-xl hover:bg-blue-900 transition-all"
            >
              <FiRefreshCw /> សាកល្បងម្ដងទៀត
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && teachers.length === 0 && (
          <div className="text-center py-24">
            <HiOutlineAcademicCap className="text-gray-200 text-7xl mx-auto mb-4" />
            <p className="font-moul text-gray-400 text-lg mb-2">មិនទាន់មានគ្រូបង្រៀន</p>
            <p className="font-battambang text-gray-300 text-sm">សូម Admin បន្ថែមគ្រូបង្រៀន នៅក្នុង Admin Panel</p>
          </div>
        )}

        {/* Teacher Grid */}
        {!loading && !error && shown.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {shown.map(t => (
              <div key={t.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                {/* Photo */}
                <div className="relative overflow-hidden h-72 bg-gray-50">
                  {t.photo
                    ? <img
                      src={t.photo}
                      alt={t.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    : <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <HiOutlineAcademicCap className="text-gray-200 text-6xl" />
                      <span className="font-battambang text-xs text-gray-300">មិនមានរូប</span>
                    </div>
                  }
                  {/* Gender badge */}
                  <span className={`absolute top-2 right-2 text-xs font-battambang px-2 py-0.5 rounded-full
                    ${t.gender === 'female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                    {t.gender === 'female' ? 'ស្រី' : 'ប្រុស'}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 text-center">
                  <h3 className="font-moul text-primary text-xs mb-1 leading-relaxed">{t.name}</h3>
                  <p className="font-battambang text-gray-500 text-xs mb-2">{t.position}</p>
                  {t.subject && (
                    <span className="inline-block font-battambang text-xs bg-blue-50 text-primary px-2.5 py-1 rounded-full border border-blue-100">
                      {t.subject}
                    </span>
                  )}
                  {t.phone && (
                    <p className="font-battambang text-gray-400 text-xs mt-2">{t.phone}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No search result */}
        {!loading && !error && teachers.length > 0 && filtered.length === 0 && (
          <div className="text-center py-20">
            <FiSearch className="text-gray-200 text-5xl mx-auto mb-4" />
            <p className="font-battambang text-gray-400 text-lg mb-2">រកមិនឃើញ «{search}»</p>
            <button
              onClick={() => { setSearch(''); setPage(1) }}
              className="font-battambang text-primary text-sm hover:underline"
            >
              លុបការស្វែងរក
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setPage(p => p - 1)}
              disabled={page === 1}
              className="w-10 h-10 rounded-xl border flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-all"
            >
              <FiChevronLeft />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1
              // Show limited page buttons for large sets
              if (totalPages > 7 && p !== 1 && p !== totalPages && Math.abs(p - page) > 2) {
                if (p === 2 || p === totalPages - 1) return <span key={p} className="font-battambang text-gray-400">...</span>
                return null
              }
              return (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl font-battambang text-sm transition-all
                    ${page === p ? 'bg-primary text-white shadow-xs' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {p}
                </button>
              )
            })}

            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-xl border flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition-all"
            >
              <FiChevronRight />
            </button>
          </div>
        )}

        {/* Page info */}
        {totalPages > 1 && (
          <p className="text-center font-battambang text-gray-400 text-xs mt-3">
            ទំព័រ {page} / {totalPages} · សរុប {filtered.length} នាក់
          </p>
        )}
      </div>
    </div>
  )
}

export default Teacher
