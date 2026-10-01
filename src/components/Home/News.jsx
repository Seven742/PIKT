'use client'
import React, { useState, useEffect } from 'react'
import { FiCalendar, FiTag, FiUser, FiSearch, FiArrowRight, FiLoader, FiAlertCircle } from 'react-icons/fi'
import { newsAPI } from '@/services/api'

const categories = ['ទាំងអស់', 'ការចុះឈ្មោះ', 'ព្រឹត្តិការណ៍', 'ភាពជាដៃគូ', 'ការប្រកួត', 'ផ្សេងៗ']

const catColor = {
  'ការចុះឈ្មោះ': 'bg-blue-100 text-blue-700',
  'ព្រឹត្តិការណ៍': 'bg-green-100 text-green-700',
  'ភាពជាដៃគូ':   'bg-purple-100 text-purple-700',
  'ការប្រកួត':   'bg-amber-100 text-amber-700',
  'ផ្សេងៗ':      'bg-gray-100 text-gray-600',
}

const Modal = ({ item, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
      {item.image
        ? <img src={item.image} alt={item.title} className="w-full h-56 object-cover rounded-t-2xl" />
        : <div className="w-full h-32 bg-gradient-to-br from-primary to-blue-700 rounded-t-2xl flex items-center justify-center">
            <span className="font-moul text-white text-2xl">PIKT</span>
          </div>
      }
      <div className="p-7">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className={`font-battambang text-xs px-2.5 py-1 rounded-full ${catColor[item.category] || 'bg-gray-100 text-gray-600'}`}>{item.category}</span>
          <span className="flex items-center gap-1 font-battambang text-xs text-gray-400">
            <FiCalendar className="text-xs" />
            {item.created_at ? new Date(item.created_at).toLocaleDateString('km-KH') : item.date}
          </span>
          <span className="flex items-center gap-1 font-battambang text-xs text-gray-400">
            <FiUser className="text-xs" />{item.author}
          </span>
        </div>
        <h2 className="font-moul text-primary text-xl mb-5 leading-relaxed">{item.title}</h2>
        <p className="font-battambang text-gray-700 text-sm leading-loose whitespace-pre-wrap">{item.content}</p>
        <button onClick={onClose} className="mt-6 w-full bg-primary text-white font-battambang py-3 rounded-xl hover:bg-blue-900 transition-all">បិទ</button>
      </div>
    </div>
  </div>
)

const NewsCard = ({ item, onClick }) => (
  <div onClick={() => onClick(item)}
    className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
    <div className="h-48 bg-gradient-to-br from-primary/10 to-blue-50 flex items-center justify-center overflow-hidden">
      {item.image
        ? <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        : <div className="text-primary/30 text-6xl font-moul select-none">ព</div>
      }
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className={`font-battambang text-xs px-2.5 py-1 rounded-full ${catColor[item.category] || 'bg-gray-100 text-gray-600'}`}>
          {item.category}
        </span>
        <span className="flex items-center gap-1 font-battambang text-xs text-gray-400">
          <FiCalendar className="text-xs" />
          {item.created_at ? new Date(item.created_at).toLocaleDateString('km-KH') : ''}
        </span>
      </div>
      <h3 className="font-moul text-gray-800 text-sm leading-relaxed mb-2 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
      <p className="font-battambang text-gray-500 text-xs leading-relaxed line-clamp-3 mb-4">{item.content}</p>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 font-battambang text-xs text-gray-400"><FiUser className="text-xs" />{item.author}</span>
        <span className="flex items-center gap-1 font-battambang text-xs text-primary font-bold">អានបន្ត <FiArrowRight className="text-xs" /></span>
      </div>
    </div>
  </div>
)

const News = () => {
  const [news, setNews]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [cat, setCat]         = useState('ទាំងអស់')
  const [search, setSearch]   = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true); setError(null)
        const res = await newsAPI.getAll()
        setNews(res.data.data || [])
      } catch (err) {
        setError('មិនអាចទាញយកព័ត៌មានបាន។ សូមពិនិត្យ Backend Server!')
      } finally { setLoading(false) }
    }
    fetchNews()
  }, [])

  const filtered = news.filter(n =>
    (cat === 'ទាំងអស់' || n.category === cat) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.content?.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div>
      <div className="bg-primary">
        <div className="xl:px-40 px-4 py-10 xl:py-14">
          <p className="font-battambang text-blue-300 text-sm uppercase tracking-widest mb-2">ព័ត៌មាន</p>
          <h1 className="font-moul text-white text-2xl xl:text-4xl">ព័ត៌មាន និងសកម្មភាព</h1>
        </div>
      </div>

      <div className="xl:px-40 px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="ស្វែងរកព័ត៌មាន..."
              className="w-full border border-gray-200 focus:border-primary rounded-xl pl-10 pr-4 py-3 font-battambang text-sm outline-hidden focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`font-battambang px-3 py-2 rounded-full text-xs border transition-all ${cat === c ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 gap-3">
            <FiLoader className="animate-spin text-primary text-2xl" />
            <p className="font-battambang text-gray-500">កំពុងទាញយកព័ត៌មាន...</p>
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
            <p className="font-battambang text-gray-400 text-sm mb-6">រកឃើញ {filtered.length} ព័ត៌មាន</p>
            {filtered.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(item => <NewsCard key={item.id} item={item} onClick={setSelected} />)}
              </div>
            ) : (
              <div className="text-center py-20">
                <FiSearch className="text-gray-200 text-6xl mx-auto mb-4" />
                <p className="font-battambang text-gray-400">រកមិនឃើញព័ត៌មាន</p>
              </div>
            )}
          </>
        )}
      </div>
      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default News
