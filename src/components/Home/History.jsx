'use client'
import Image from 'next/image'
import React from 'react'
import { FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi"
import { HiOutlineAcademicCap } from "react-icons/hi2"
import Link from 'next/link'
import School from "@/assets/School/School.jpg"
import School1 from "@/assets/School/School1.jpg"

const timeline = [
  { year: "២០០១", title: "ការបង្កើត PIKT", desc: "វិទ្យាស្ថានបច្ចេកទេស កំពង់ធំ ត្រូវបានបង្កើតជាផ្លូវការ នៅថ្ងៃទី ១១ ខែមិថុនា ឆ្នាំ ២០០១ ក្រោម យុទ្ធសាស្ត្រកាត់បន្ថយភាពក្រីក្ររបស់រាជរដ្ឋាភិបាល ដោយមានការគាំទ្រហិរញ្ញវត្ថុ ពីធនាគារអភិវឌ្ឍន៍អាស៊ី (ADB)" },
  { year: "២០០១–២០០៤", title: "ក្រោមការគ្រប់គ្រងក្រសួងអប់រំ", desc: "ក្នុងឆ្នាំដំបូង ស្ថាប័ននេះ ស្ថិតក្រោមការគ្រប់គ្រង នៃក្រុមប្រឹក្សាខេត្ត នាយកដ្ឋានអប់រំ យុវវ័យ និងកីឡា ដែលបានដឹកនាំការអប់រំ ក្នុងដំណាក់កាលដំបូង" },
  { year: "២០០៥", title: "ផ្ទេរទៅក្រសួងការងារ", desc: "PIKT ត្រូវបានផ្ទេរជាផ្លូវការ ទៅក្រោមការគ្រប់គ្រងរបស់ នាយកដ្ឋានការងារ និងបណ្ដុះបណ្ដាលវិជ្ជាជីវៈ ខេត្ត ក្រោមការត្រួតពិនិត្យ ដោយក្រសួងការងារ និងបណ្ដុះបណ្ដាលវិជ្ជាជីវៈ" },
  { year: "២០១០", title: "ពង្រីកកម្មវិធីសិក្សា", desc: "ស្ថាប័នបានពង្រីកកម្មវិធីសិក្សា ដល់ ១០+ ឯកទេស ដើម្បីបំពេញតម្រូវការ ទីផ្សារការងារ ក្នុងខេត្ត និងប្រទេសជាតិ" },
  { year: "២០១៨", title: "ផ្ដល់សញ្ញាបត្រ Associate Degree", desc: "PIKT ទទួលបានការអនុម័ត ផ្ដល់ Associate Degree (AD) ដែលត្រូវបានទទួលស្គាល់ ដោយស្ថាប័នអប់រំ ជាន់ខ្ពស់ក្នុងប្រទេស" },
  { year: "២០២៤", title: "ការធ្វើ Modernization", desc: "ការធ្វើ Modernization លើ Curriculum និង Lab ឧបករណ៍ ដើម្បីឆ្លើយតបនឹង ការផ្លាស់ប្ដូរ ក្នុងបច្ចេកវិទ្យា និងទីផ្សារការងារ" },
]

const History = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary">
        <div className="xl:px-40 px-4 py-10 xl:py-14">
          <p className="font-battambang text-blue-300 text-sm uppercase tracking-widest mb-2">ស្វែងយល់</p>
          <h1 className="font-moul text-white text-2xl xl:text-4xl">ប្រវត្តិ PIKT</h1>
        </div>
      </div>

      {/* Intro with image */}
      <div className="xl:px-40 px-4 py-14">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="font-moul text-primary text-2xl mb-6 leading-relaxed">
              វិទ្យាស្ថានពហុបច្ចេកទេស<br />កំពង់ធំ (PIKT)
            </h2>
            <div className="space-y-5 font-battambang text-gray-700 text-base leading-loose">
              <p>
                វិទ្យាស្ថានបច្ចេកទេស កំពង់ធំ (PIKT) ត្រូវបានបង្កើតឡើងជាផ្លូវការ នៅថ្ងៃទី ១១ ខែមិថុនា ឆ្នាំ ២០០១ ក្រោមយុទ្ធសាស្ត្រ កាត់បន្ថយភាពក្រីក្ររបស់រាជរដ្ឋាភិបាលកម្ពុជា ដោយមានការគាំទ្រ ហិរញ្ញវត្ថុ ពីធនាគារអភិវឌ្ឍន៍អាស៊ី (ADB)
              </p>
              <p>
                ស្ថាប័ននេះ ស្ថិតក្នុងភូមិអ្នកលក់ ឃុំអ្នកលក់ ក្រុងស្ទឹងសែន ខេត្តកំពង់ធំ ត្រូវបានបង្កើត ដើម្បីក្លាយជាមជ្ឈមណ្ឌលអប់រំ បច្ចេកទេស និងវិជ្ជាជីវៈ សម្រាប់ ប្រជាជនខេត្ត ហើយរួមចំណែក ក្នុងការអភិវឌ្ឍ ធនធានមនុស្ស សម្រាប់ ឧស្សាហកម្ម និងសេដ្ឋកិច្ចជាតិ
              </p>
              <p>
                តាំងតែពីការបង្កើតមក PIKT បានឧទ្ទិស ដល់ការបំពាក់ ជំនាញ ដល់យុវវ័យ ខ្មែរ តាមរយៈការអប់រំ ការហ្វឹកហ្វឺន និងការអភិវឌ្ឍ ជំនាញវិជ្ជាជីវៈ ដែលរួមចំណែកដល់ ការបង្កើន ភាពរឹងមាំ សម្រាប់ ប្រទេសជាតិ
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <Image src={School} alt="PIKT School" className="rounded-xl w-full h-64 object-cover" />
            <Image src={School1} alt="PIKT School" className="rounded-xl w-full h-48 object-cover" />
          </div>
        </div>

        {/* Key Info */}
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            { icon: <FiCalendar className="text-2xl text-primary" />, title: "ថ្ងៃបង្កើត", value: "១១ មិថុនា ២០០១" },
            { icon: <FiMapPin className="text-2xl text-primary" />, title: "ទីតាំង", value: "ក្រុងស្ទឹងសែន, ខេត្តកំពង់ធំ" },
            { icon: <HiOutlineAcademicCap className="text-2xl text-primary" />, title: "ប្រភេទ", value: "ការអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈ" },
          ].map((item, i) => (
            <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <div className="mb-3">{item.icon}</div>
              <p className="font-battambang text-gray-500 text-sm mb-1">{item.title}</p>
              <p className="font-moul text-primary text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div>
          <h2 className="font-moul text-primary text-2xl xl:text-3xl text-center mb-12">ប្រវត្តិរៀបរាប់តាមឆ្នាំ</h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary/20" />

            <div className="space-y-10">
              {timeline.map((t, i) => (
                <div key={i} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-md shrink-0 mt-1" />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-5/12 bg-white border border-gray-100 rounded-xl p-6 shadow-xs hover:shadow-md transition-shadow ${i % 2 === 0 ? 'md:mr-auto md:ml-0 md:pr-10' : 'md:ml-auto md:mr-0 md:pl-10'}`}>
                    <span className="inline-block font-battambang text-xs bg-primary/10 text-primary px-3 py-1 rounded-full mb-3">{t.year}</span>
                    <h3 className="font-moul text-gray-800 text-base mb-2">{t.title}</h3>
                    <p className="font-battambang text-gray-600 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 xl:px-40 px-4 py-12 text-center">
        <h2 className="font-moul text-primary text-xl mb-3">ចង់ដឹងព័ត៌មានបន្ថែម?</h2>
        <p className="font-battambang text-gray-600 mb-6 text-sm">ស្វែងយល់ពី Course សិក្សា ឬទំនាក់ទំនងផ្ទាល់</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/courses">
            <button className="bg-primary text-white font-battambang px-7 py-3 rounded-lg hover:bg-blue-900 flex items-center gap-2 transition-all">
              Course ទាំងអស់ <FiArrowRight />
            </button>
          </Link>
          <Link href="/contact">
            <button className="border-2 border-primary text-primary font-battambang px-7 py-3 rounded-lg hover:bg-primary hover:text-white transition-all">
              ទំនាក់ទំនងយើង
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default History
