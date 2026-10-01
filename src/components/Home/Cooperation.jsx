'use client'
import React, { useState, useEffect } from 'react'
import { FiGlobe, FiArrowRight, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import Link from 'next/link'
import { coopAPI } from '@/services/api'

const typeColor = {
  'ហិរញ្ញប្បទាន': 'bg-green-100 text-green-700',
  'ដឹកនាំ': 'bg-blue-100 text-blue-700',
  'ដៃគូ': 'bg-purple-100 text-purple-700',
  'បច្ចេកទេស': 'bg-amber-100 text-amber-700',
  'ហ្វឹកហ្វឺន': 'bg-pink-100 text-pink-700',
  'អភិវឌ្ឍន៍': 'bg-teal-100 text-teal-700',
}

const Cooperation = () => {
  const [coops, setCoops] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true); setError(null)
        const res = await coopAPI.getAll()
        setCoops(res.data.data || [])
      } catch {
        setError('មិនអាចទាញយកព័ត៌មានដៃគូបាន!')
      } finally { setLoading(false) }
    }
    fetch()
  }, [])

  return (
    <div>
      <div className="bg-primary">
        <div className="xl:px-40 px-4 py-10 xl:py-14">
          <p className="font-battambang text-blue-300 text-sm uppercase tracking-widest mb-2">ភាពជាដៃគូ</p>
          <h1 className="font-moul text-white text-2xl xl:text-4xl">ភាពសហប្រតិបត្តិការ</h1>
        </div>
      </div>

      <div className="xl:px-40 px-4 py-14">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-moul text-primary text-2xl xl:text-3xl mb-4">ដៃគូ និងអ្នកគាំទ្រ PIKT</h2>
          <p className="font-battambang text-gray-500 text-sm leading-relaxed">
            PIKT ទទួលបានការគាំទ្រ ពីស្ថាប័នជាច្រើន ទាំងក្នុង និងក្រៅប្រទេស
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { num: coops.length || '6+', label: "ដៃគូ" },
            { num: "២", label: "ដៃគូអន្ដរជាតិ" },
            { num: "៤", label: "ក្រសួង" },
            { num: "២០០១", label: "ឆ្នាំចាប់ផ្ដើម" },
          ].map((s, i) => (
            <div key={i} className="bg-primary text-white rounded-xl p-5 text-center">
              <p className="font-moul text-2xl xl:text-3xl mb-1">{s.num}</p>
              <p className="font-battambang text-blue-200 text-xs">{s.label}</p>
            </div>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 gap-3">
            <FiLoader className="animate-spin text-primary text-2xl" />
            <p className="font-battambang text-gray-500">កំពុងទាញ...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 mb-6">
            <FiAlertCircle className="shrink-0" />
            <p className="font-battambang text-sm">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-14">
            {coops.map(c => (
              <div key={c.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs hover:shadow-md hover:border-primary/20 transition-all duration-200 group">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden group-hover:bg-primary/10 transition-colors">
                    {c.logo
                      ? <img src={c.logo} alt={c.name} className=" object-contain" />
                      : <HiOutlineBuildingOffice2 className="text-primary text-2xl" />
                    }
                  </div>
                  <div className="flex-1">
                    <h3 className="font-moul text-gray-800 text-sm leading-relaxed mb-1">{c.name}</h3>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`font-battambang text-xs px-2 py-0.5 rounded-full ${typeColor[c.type] || 'bg-gray-100 text-gray-600'}`}>{c.type}</span>
                      <span className="flex items-center gap-1 font-battambang text-xs text-gray-400">
                        <FiGlobe className="text-xs" />{c.country}
                      </span>
                    </div>
                    <p className="font-battambang text-gray-500 text-xs leading-relaxed">{c.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl p-10 text-center">
          <h2 className="font-moul text-primary text-2xl mb-4">ចង់ក្លាយជាដៃគូ PIKT?</h2>
          <p className="font-battambang text-gray-600 text-sm leading-relaxed mb-7 max-w-xl mx-auto">
            PIKT ស្វាគមន៍ ដៃគូថ្មី ទាំងក្រុមហ៊ុន ស្ថាប័ន និងអង្គការ
          </p>
          <Link href="/contact">
            <button className="bg-primary text-white font-battambang px-8 py-3 rounded-xl hover:bg-blue-900 inline-flex items-center gap-2 transition-all">
              ទំនាក់ទំនង PIKT <FiArrowRight />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cooperation
