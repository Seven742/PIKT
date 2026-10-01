'use client'
import React from 'react'
import { FiFileText, FiCheckCircle, FiAward, FiGlobe } from "react-icons/fi"
import { HiOutlineAcademicCap, HiOutlineBuildingLibrary } from "react-icons/hi2"
import Link from 'next/link'

const licenses = [
  {
    icon: <FiFileText className="text-2xl text-primary" />,
    title: "ច្បាប់ចេញដោយក្រសួង",
    body: "PIKT ត្រូវបានបង្កើតអំណាចសម្រេចចិត្ត ដោយក្រសួងការងារ និងបណ្ដុះបណ្ដាលវិជ្ជាជីវៈ ដើម្បីផ្ដល់ការអប់រំបច្ចេកទេស",
    date: "ទទួលបានឆ្នាំ ២០០១"
  },
  {
    icon: <FiCheckCircle className="text-2xl text-primary" />,
    title: "ចុះបញ្ជីជាផ្លូវការ",
    body: "ស្ថាប័ននេះ ត្រូវបានចុះបញ្ជីជាអចិន្ត្រៃយ៍ ក្រោមការគ្រប់គ្រងរបស់ ក្រសួងការងារ",
    date: "ចុះបញ្ជីឆ្នាំ ២០០៥"
  },
  {
    icon: <FiAward className="text-2xl text-primary" />,
    title: "សញ្ញាបត្រទទួលស្គាល់",
    body: "សញ្ញាបត្រ Associate Degree (AD) ចេញដោយ PIKT ទទួលបានការទទួលស្គាល់ ពីតំណក្រសួង ហើយមានសិទ្ធិ ដាក់ពាក្យការងារ",
    date: "ចាប់ពីឆ្នាំ ២០១៨"
  },
  {
    icon: <FiGlobe className="text-2xl text-primary" />,
    title: "ដៃគូអន្ដរជាតិ",
    body: "PIKT ទទួលបានការគាំទ្រ ហិរញ្ញវត្ថុ និងបច្ចេកទេស ពីធនាគារអភិវឌ្ឍន៍អាស៊ី (ADB) ដែលជំរុញ ការអភិវឌ្ឍ",
    date: "ជំនួយ ADB"
  },
]

const timeline = [
  { year: "២០០១", event: "PIKT ត្រូវបានបង្កើតជាផ្លូវការ ដោយក្រសួងអប់រំ" },
  { year: "២០០៥", event: "ផ្ទេរទៅក្រោមការគ្រប់គ្រងរបស់ ក្រសួងការងារ និងវិជ្ជាជីវៈ" },
  { year: "២០១០", event: "ពង្រីក Program សិក្សា ដល់ ១០+ ឯកទេស" },
  { year: "២០១៨", event: "ទទួលបានការអនុម័ត ផ្ដល់ Associate Degree (AD)" },
  { year: "២០២៤", event: "ការ Modernization លើ Curriculum និង Lab" },
]

const authorities = [
  { icon: <HiOutlineBuildingLibrary className="text-2xl" />, name: "ក្រសួងការងារ និងវិជ្ជាជីវៈ", role: "ស្ថាប័ន Supervising ចម្បង" },
  { icon: <FiGlobe className="text-2xl" />, name: "ធនាគារអភិវឌ្ឍន៍អាស៊ី (ADB)", role: "ដៃគូអន្ដរជាតិ" },
  { icon: <HiOutlineAcademicCap className="text-2xl" />, name: "ក្រសួងអប់រំ យុវវ័យ និងកីឡា", role: "ស្ថាប័ន Partner" },
]

const License = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary">
        <div className="xl:px-40 px-4 py-10 xl:py-14">
          <p className="font-battambang text-blue-300 text-sm uppercase tracking-widest mb-2">ស្ថាប័ន</p>
          <h1 className="font-moul text-white text-2xl xl:text-4xl">ការអនុម័ត និងការទទួលស្គាល់</h1>
        </div>
      </div>

      <div className="xl:px-40 px-4 py-14">
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="font-moul text-primary text-2xl xl:text-3xl mb-4">ស្ថានភាពការទទួលស្គាល់ PIKT</h2>
          <p className="font-battambang text-gray-500 max-w-2xl mx-auto leading-relaxed text-sm">
            វិទ្យាស្ថានបច្ចេកទេស កំពង់ធំ (PIKT) ត្រូវបានទទួលស្គាល់ ដោយស្ថាប័នរាជរដ្ឋាភិបាល ជាន់ខ្ពស់ ដែលធ្វើឱ្យ សញ្ញាបត្ររបស់ PIKT មានតម្លៃ ក្នុងទីផ្សារការងារ
          </p>
        </div>

        {/* License Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {licenses.map((item, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs hover:border-primary/20 hover:shadow-md transition-all duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-moul text-gray-800 text-base mb-2">{item.title}</h3>
              <p className="font-battambang text-gray-600 text-sm leading-relaxed mb-4">{item.body}</p>
              <span className="font-battambang text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{item.date}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="font-moul text-primary text-2xl mb-8 text-center">ប្រវត្តិការទទួលស្គាល់</h2>
          <div className="space-y-5 max-w-2xl mx-auto">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-center gap-5">
                <div className="bg-primary text-white font-battambang text-xs font-bold px-3 py-2 rounded-lg shrink-0 min-w-[80px] text-center">
                  {t.year}
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <p className="font-battambang text-gray-700 text-sm">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authorities */}
        <div>
          <h2 className="font-moul text-primary text-2xl mb-8 text-center">ស្ថាប័នគ្រប់គ្រង</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {authorities.map((auth, i) => (
              <div key={i} className="bg-primary text-white rounded-xl p-7 text-center hover:bg-blue-900 transition-colors duration-200">
                <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {auth.icon}
                </div>
                <h3 className="font-moul text-base mb-2 leading-relaxed">{auth.name}</h3>
                <p className="font-battambang text-blue-200 text-xs">{auth.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/contact">
            <button className="bg-primary text-white font-battambang px-8 py-3 rounded-lg hover:bg-blue-900 transition-all inline-flex items-center gap-2">
              ទំនាក់ទំនង PIKT <FiCheckCircle />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default License
