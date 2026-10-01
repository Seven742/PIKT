'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiChevronLeft, FiChevronRight, FiArrowRight, FiCalendar } from 'react-icons/fi'
import { FiAward, FiUsers, FiBook, FiCheckCircle } from 'react-icons/fi'
import { HiOutlineAcademicCap } from 'react-icons/hi2'
import { MdOutlineBusinessCenter } from 'react-icons/md'
import { newsAPI } from '@/services/api'
import School from '@/assets/School/School.jpg'
import School1 from '@/assets/School/School1.jpg'
import School2 from '@/assets/School/School2.jpg'
import School3 from '@/assets/School/School3.jpg'

const slides = [
  { img: School, title: 'ស្វាគមន៍មកកាន់ PIKT', sub: 'ផ្ដល់ការអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈ ដ៏ល្អប្រសើរ' },
  { img: School1, title: 'ការអប់រំបច្ចេកទេស', sub: 'Technical & Vocational Education for Cambodia' },
  { img: School2, title: 'ពង្រឹងសមត្ថភាពធនធានមនុស្ស', sub: 'Empowering Youth Through Quality Education' },
  { img: School3, title: 'ជំរុញការអភិវឌ្ឍន៍ខេត្តកំពង់ធំ', sub: 'Driving Sustainable Development in Kampong Thom' },
]

const stats = [
  { icon: <HiOutlineAcademicCap className="text-2xl" />, num: '២០០១', label: 'ឆ្នាំបង្កើត' },
  { icon: <FiUsers className="text-2xl" />, num: '៥០+', label: 'គ្រូបង្រៀន' },
  { icon: <FiBook className="text-2xl" />, num: '១០+', label: 'ឯកទេសសិក្សា' },
  { icon: <FiAward className="text-2xl" />, num: '៥០០០+', label: 'និស្សិតបញ្ចប់' },
]

const features = [
  { icon: <HiOutlineAcademicCap className="text-3xl text-primary" />, title: 'ការអប់រំគ្រប់គ្រាន់', desc: 'កម្មវិធីសិក្សាបច្ចេកទេស ស្ដង់ដារ តាមតម្រូវការទីផ្សារការងារ' },
  { icon: <FiUsers className="text-3xl text-primary" />, title: 'គ្រូបង្រៀនជំនាញ', desc: 'គ្រូបង្រៀនមានបទពិសោធ និងចំណេះដឹងជ្រៅជ្រះ ក្នុងវិស័យនីមួយៗ' },
  { icon: <MdOutlineBusinessCenter className="text-3xl text-primary" />, title: 'ការតភ្ជាប់ការងារ', desc: 'ទំនាក់ទំនងជាមួយ ក្រុមហ៊ុន ដើម្បីជួយការងារ បន្ទាប់ពីបញ្ចប់' },
  { icon: <FiCheckCircle className="text-3xl text-primary" />, title: 'សញ្ញាបត្រទទួលស្គាល់', desc: 'ទទួលស្គាល់ ដោយក្រសួងការងារ និងបណ្ដុះបណ្ដាលវិជ្ជាជីវៈ' },
  { icon: <FiBook className="text-3xl text-primary" />, title: 'ហ្វឹកហ្វឺនជាក់ស្ដែង', desc: 'Lab ទំនើប ហ្វឹកហ្វឺនជាក់ស្ដែង បន្ទាប់ពីទ្រឹស្ដី' },
  { icon: <FiAward className="text-3xl text-primary" />, title: 'ថ្លៃសិក្សាសម', desc: 'ថ្លៃសិក្សាសមរម្យ មានអាហារូបករណ៍ សម្រាប់និស្សិតត្រូវការ' },
]

const catColor = {
  'ការចុះឈ្មោះ': 'bg-blue-100 text-blue-700', 'ព្រឹត្តិការណ៍': 'bg-green-100 text-green-700',
  'ភាពជាដៃគូ': 'bg-purple-100 text-purple-700', 'ការប្រកួត': 'bg-amber-100 text-amber-700', 'ផ្សេងៗ': 'bg-gray-100 text-gray-600',
}

const Hero = () => {
  const [current, setCurrent] = useState(0)
  const [news, setNews] = useState([])
  const latestNews = Array.isArray(news) ? news.slice(0, 3) : []

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    newsAPI.getAll().then(res => setNews(res.data.data || [])).catch(() => setNews([]))
  }, [])

  return (
    <div>
      {/* Slideshow */}
      <div className="relative w-full h-[440px] md:h-[540px] xl:h-[640px] overflow-hidden">
        {slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}>
            <Image src={s.img} alt={s.title} sizes="100vw" priority={i === 0} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-center xl:px-40 px-6">
          <div className="max-w-2xl text-white">
            <p className="font-battambang text-blue-300 text-sm mb-3 tracking-widest uppercase">វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ</p>
            {slides.map((s, i) => (
              <div key={i} className={`transition-all duration-700 ${i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute'}`}>
                <h1 className="font-moul text-3xl md:text-4xl xl:text-5xl leading-relaxed my-6">{s.title}</h1>
                <p className="font-battambang text-lg text-gray-200 mb-8">{s.sub}</p>
              </div>
            ))}
            <div className="flex gap-3 flex-wrap mt-16 md:mt-20">
              <Link href="/courses">
                <button className="bg-primary hover:bg-blue-900 text-white font-battambang px-7 py-3 rounded-lg flex items-center gap-2 transition-all">
                  ស្វែងយល់ Course <FiArrowRight />
                </button>
              </Link>
              <Link href="/history">
                <button className="border-2 border-white/70 hover:border-white hover:bg-white/10 text-white font-battambang px-7 py-3 rounded-lg transition-all">
                  ប្រវត្តិ PIKT
                </button>
              </Link>
            </div>
          </div>
        </div>
        <button onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all">
          <FiChevronLeft className="text-xl" />
        </button>
        <button onClick={() => setCurrent(c => (c + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all">
          <FiChevronRight className="text-xl" />
        </button>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/40'}`} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-primary">
        <div className="xl:px-40 px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center text-white">
              <div className="flex justify-center mb-2 opacity-70">{s.icon}</div>
              <p className="font-moul text-3xl xl:text-4xl mb-1">{s.num}</p>
              <p className="font-battambang text-blue-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="xl:px-40 px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-battambang text-primary text-sm uppercase tracking-widest mb-3">អំពីស្ថាប័ន</p>
            <h2 className="font-moul text-primary text-2xl xl:text-3xl leading-relaxed mb-5">វិទ្យាស្ថានពហុបច្ចេកទេស<br />ខេត្តកំពង់ធំ (PIKT)</h2>
            <p className="font-battambang text-gray-600 leading-loose mb-4">
              វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ (PIKT) ត្រូវបានបង្កើតឡើង នៅថ្ងៃទី ១១ ខែមិថុនា ឆ្នាំ ២០០១ ដោយការគាំទ្រ ហិរញ្ញវត្ថុពីធនាគារអភិវឌ្ឍន៍អាស៊ី (ADB) ក្នុងគោលដៅ ផ្ដល់ការអប់រំបច្ចេកទេស
            </p>
            <p className="font-battambang text-gray-600 leading-loose mb-7">
              ស្ថាប័ននេះ ស្ថិតក្នុងក្រុងស្ទឹងសែន ខេត្តកំពង់ធំ ហើយបានរួមចំណែក ក្នុងការអភិវឌ្ឍ ធនធានមនុស្សសម្រាប់ ខេត្ត និងប្រទេសជាតិ
            </p>
            <Link href="/history">
              <button className="bg-primary text-white font-battambang px-7 py-3 rounded-lg hover:bg-blue-900 flex items-center gap-2 transition-all">
                អានប្រវត្តិ PIKT <FiArrowRight />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Image src={School1} alt="PIKT" className="rounded-xl object-cover h-52 w-full" />
            <Image src={School2} alt="PIKT" className="rounded-xl object-cover h-52 w-full mt-6" />
            <Image src={School3} alt="PIKT" className="rounded-xl object-cover h-52 w-full -mt-3" />
            <Image src={School} alt="PIKT" className="rounded-xl object-cover h-52 w-full mt-3" />
          </div>
        </div>
      </div>

      {/* Latest News */}
      {latestNews.length > 0 && (
        <div className="bg-gray-50 xl:px-40 px-4 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="font-battambang text-primary text-sm uppercase tracking-widest mb-2">ព័ត៌មានថ្មីៗ</p>
              <h2 className="font-moul text-primary text-2xl xl:text-3xl">ព័ត៌មាន និងសកម្មភាព</h2>
            </div>
            <Link href="/news">
              <button className="font-battambang text-primary text-sm border border-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-all flex items-center gap-2">
                មើលទាំងអស់ <FiArrowRight />
              </button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {latestNews.map(item => (
              <Link href="/news" key={item.id}>
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                  <div className="h-44 bg-gradient-to-br from-primary/10 to-blue-50 flex items-center justify-center overflow-hidden">
                    {item.image
                      ? <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <span className="font-moul text-primary/20 text-6xl select-none">ព</span>}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`font-battambang text-xs px-2.5 py-1 rounded-full ${catColor[item.category] || 'bg-gray-100 text-gray-600'}`}>{item.category}</span>
                      <span className="flex items-center gap-1 font-battambang text-xs text-gray-400"><FiCalendar className="text-xs" />{item.date}</span>
                    </div>
                    <h3 className="font-moul text-gray-800 text-sm leading-relaxed line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Why PIKT */}
      <div className="xl:px-40 px-4 py-16">
        <div className="text-center mb-12">
          <p className="font-battambang text-primary text-sm uppercase tracking-widest mb-3">ហេតុអ្វីបានជាជ្រើសរើស PIKT</p>
          <h2 className="font-moul text-primary text-2xl xl:text-3xl">គុណភាព ដែលអ្នកជឿទុកចិត្ត</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all duration-300 group">
              <div className="mb-4 group-hover:scale-110 transition-transform duration-200">{f.icon}</div>
              <h3 className="font-moul text-gray-800 text-base mb-2">{f.title}</h3>
              <p className="font-battambang text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary xl:px-40 px-4 py-14 text-center">
        <h2 className="font-moul text-white text-2xl xl:text-3xl mb-4">ចុះឈ្មោះសិក្សានៅ PIKT ថ្ងៃនេះ</h2>
        <p className="font-battambang text-blue-200 mb-8 max-w-xl mx-auto leading-relaxed">
          ចាប់ផ្ដើមអនាគតរបស់អ្នក ជាមួយការអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈ ដ៏មានគុណភាព
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/contact">
            <button className="bg-white text-primary font-battambang px-8 py-3 rounded-lg hover:bg-gray-100 transition-all font-bold flex items-center gap-2">
              ទំនាក់ទំនងយើង <FiArrowRight />
            </button>
          </Link>
          <Link href="/courses">
            <button className="border-2 border-white text-white font-battambang px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-all">
              មើល Course ទាំងអស់
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
