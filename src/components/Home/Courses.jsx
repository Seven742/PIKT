'use client'
import React, { useState, useEffect } from 'react'
import { FiClock, FiArrowRight, FiBook, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import Link from 'next/link'
import { courseAPI } from '@/services/api'

const catColors = {
  'បច្ចេកវិទ្យា':       { bg: 'bg-blue-50',    border: 'border-blue-100',    badge: 'bg-blue-100 text-blue-700' },
  'ហេដ្ឋារចនាសម្ព័ន្ធ': { bg: 'bg-amber-50',   border: 'border-amber-100',   badge: 'bg-amber-100 text-amber-700' },
  'ពាណិជ្ជកម្ម':         { bg: 'bg-emerald-50', border: 'border-emerald-100', badge: 'bg-emerald-100 text-emerald-700' },
  'កសិកម្ម':             { bg: 'bg-green-50',   border: 'border-green-100',   badge: 'bg-green-100 text-green-700' },
  'ភាសា':                { bg: 'bg-purple-50',  border: 'border-purple-100',  badge: 'bg-purple-100 text-purple-700' },
}
const defaultColor = { bg: 'bg-gray-50', border: 'border-gray-100', badge: 'bg-gray-100 text-gray-600' }

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [active, setActive]   = useState('ទាំងអស់')

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true); setError(null)
        const res = await courseAPI.getAll()
        setCourses(res.data.data || [])
      } catch (err) {
        setError('មិនអាចទាញយក Course បាន។ សូមពិនិត្យ Backend Server!')
      } finally { setLoading(false) }
    }
    fetchCourses()
  }, [])

  const cats = ['ទាំងអស់', ...Array.from(new Set(courses.map(c => c.category)))]
  const displayed = active === 'ទាំងអស់' ? courses : courses.filter(c => c.category === active)

  const grouped = displayed.reduce((acc, c) => {
    if (!acc[c.category]) acc[c.category] = []
    acc[c.category].push(c)
    return acc
  }, {})

  return (
    <div>
      <div className="bg-primary">
        <div className="xl:px-40 px-4 py-10 xl:py-14">
          <p className="font-battambang text-blue-300 text-sm uppercase tracking-widest mb-2">ការសិក្សា</p>
          <h1 className="font-moul text-white text-2xl xl:text-4xl">ឯកទេសសិក្សា</h1>
        </div>
      </div>

      <div className="xl:px-40 px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="font-moul text-primary text-2xl mb-3">ជ្រើសរើសឯកទេសសិក្សារបស់អ្នក</h2>
          <p className="font-battambang text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
            PIKT មានកម្មវិធីសិក្សា {courses.length}+ ឯកទេស ក្នុងវិស័យបច្ចេកទេស ពាណិជ្ជកម្ម និងកសិកម្ម
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 gap-3">
            <FiLoader className="animate-spin text-primary text-2xl" />
            <p className="font-battambang text-gray-500">កំពុងទាញយក Course...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 mb-6">
            <FiAlertCircle className="shrink-0 text-xl" />
            <p className="font-battambang text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {cats.map(c => (
                <button key={c} onClick={() => setActive(c)}
                  className={`font-battambang px-4 py-2 rounded-full text-sm border transition-all ${active === c ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'}`}>
                  {c}
                </button>
              ))}
            </div>

            {/* Grouped Cards */}
            {Object.entries(grouped).map(([cat, items]) => {
              const col = catColors[cat] || defaultColor
              return (
                <div key={cat} className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <FiBook className="text-primary" />
                    <h3 className="font-moul text-primary text-xl">{cat}</h3>
                    <div className="flex-1 h-px bg-primary/10" />
                  </div>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {items.map(course => (
                      <div key={course.id} className={`border ${col.border} ${col.bg} rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}>
                        <div className="h-44 bg-white/60 flex items-center justify-center overflow-hidden">
                          {course.image
                            ? <img src={course.image} alt={course.name} className="w-full h-full object-cover" />
                            : <div className="flex flex-col items-center gap-2 text-primary/30">
                                <HiOutlineAcademicCap className="text-5xl" />
                                <span className="font-battambang text-xs">មិនទាន់មានរូបភាព</span>
                              </div>
                          }
                        </div>
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-battambang font-bold text-gray-800 text-sm leading-snug flex-1 pr-2">{course.name}</h4>
                            <span className={`font-battambang text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${col.badge}`}>{course.level}</span>
                          </div>
                          <p className="font-battambang text-gray-500 text-xs leading-relaxed mb-4">{course.description}</p>
                          <span className="flex items-center gap-1 font-battambang text-xs text-gray-500 bg-white/80 px-3 py-1.5 rounded-lg border w-fit">
                            <FiClock className="text-primary" /> {course.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            {displayed.length === 0 && (
              <div className="text-center py-16">
                <HiOutlineAcademicCap className="text-gray-200 text-6xl mx-auto mb-3" />
                <p className="font-battambang text-gray-400">មិនទាន់មាន Course</p>
              </div>
            )}
          </>
        )}

        {/* Degree Info */}
        <div className="mt-10 bg-gray-50 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <HiOutlineAcademicCap className="text-primary text-2xl" />
            <h3 className="font-moul text-primary text-xl">ព័ត៌មានអំពីសញ្ញាបត្រ</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: "Associate Degree (AD)", desc: "រយៈពេល ៣ ឆ្នាំ ទទួលស្គាល់ ដោយក្រសួងការងារ" },
              { title: "ការហ្វឹកហ្វឺន", desc: "ទ្រឹស្ដី ៦០% និង Lab ៤០% ជាក់ស្ដែង" },
              { title: "ការងារ", desc: "Job Placement ជាមួយ ក្រុមហ៊ុន Partner" },
            ].map((info, i) => (
              <div key={i} className="bg-white rounded-lg p-5 border border-gray-100">
                <h4 className="font-moul text-primary text-sm mb-2">{info.title}</h4>
                <p className="font-battambang text-gray-600 text-sm leading-relaxed">{info.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-primary rounded-xl p-8 text-center text-white">
          <h3 className="font-moul text-xl mb-3">ចង់ចុះឈ្មោះសិក្សា?</h3>
          <p className="font-battambang text-blue-200 mb-5 text-sm">ទំនាក់ទំនង ឬចូលមកដោយផ្ទាល់ នៅ PIKT</p>
          <Link href="/contact">
            <button className="bg-white text-primary font-battambang px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-flex items-center gap-2 transition-all">
              ទំនាក់ទំនងឥឡូវ <FiArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Courses
