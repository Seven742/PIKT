'use client'
import Image from 'next/image'
import React from 'react'
import { FiTarget, FiEye, FiStar, FiArrowRight } from "react-icons/fi"
import { HiOutlineAcademicCap } from "react-icons/hi2"
import { MdOutlineHandshake } from "react-icons/md"
import Link from 'next/link'
import Logo from "@/assets/Logo.png"

const values = [
  "ភាពស្មោះត្រង់ និងតម្លាភាព",
  "ការប្ដេជ្ញាចិត្ត ខ្ពស់ដល់ការអប់រំ",
  "ភាពច្នៃប្រឌិត និង Innovation",
  "ការគោរព ភាពចម្រុះ",
  "ការបម្រើ សង្គម ដោយស្មោះ",
]

const About = () => {
  return (
    <div>
      {/* Header */}
      <div className="bg-primary">
        <div className="xl:px-40 px-4 py-10 xl:py-14">
          <p className="font-battambang text-blue-300 text-sm uppercase tracking-widest mb-2">ស្វែងយល់</p>
          <h1 className="font-moul text-white text-2xl xl:text-4xl">អំពីយើង</h1>
        </div>
      </div>

      {/* Intro */}
      <div className="xl:px-40 px-4 py-14">
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <Image src={Logo} alt="PIKT Logo" className="w-36 h-36 object-contain shrink-0" />
          <div>
            <h2 className="font-moul text-primary text-2xl xl:text-3xl mb-4 leading-relaxed">
              វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ (PIKT)
            </h2>
            <p className="font-battambang text-gray-600 text-base leading-loose">
              វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ (PIKT) គឺជាស្ថាប័នអប់រំបច្ចេកទេស ដែលឧទ្ទិស ដល់ការផ្ដល់ការអប់រំ និងការបណ្ដុះបណ្ដាលវិជ្ជាជីវៈ ដ៏ល្អប្រសើរ ដើម្បីស្ថាបនាធនធានមនុស្ស សម្រាប់ការអភិវឌ្ឍ ប្រទេសកម្ពុជា
            </p>
          </div>
        </div>

        {/* Vision Mission Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* Vision */}
          <div className="bg-primary text-white rounded-xl p-8 shadow-lg">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-5">
              <FiEye className="text-2xl" />
            </div>
            <h3 className="font-moul text-xl mb-4">ចក្ខុវិស័យ</h3>
            <p className="font-battambang text-blue-100 text-sm leading-loose">
              ក្លាយជាស្ថាប័នអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈ ដ៏ល្អប្រសើរ ក្នុងខេត្តកំពង់ធំ ទទួលស្គាល់ ក្នុងការបណ្ដុះបណ្ដាល ធនធានមនុស្ស ប្រកបដោយជំនាញ ដើម្បីជំរុញ ការអភិវឌ្ឍន៍ ប្រទេសជាតិ
            </p>
          </div>

          {/* Mission */}
          <div className="border-2 border-primary rounded-xl p-8 shadow-xs">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
              <FiTarget className="text-2xl text-primary" />
            </div>
            <h3 className="font-moul text-primary text-xl mb-4">បេសកកម្ម</h3>
            <ul className="space-y-3">
              {[
                "ផ្ដល់ការអប់រំបច្ចេកទេស ប្រកបដោយគុណភាព",
                "បណ្ដុះបណ្ដាលជំនាញ សម្រាប់ទីផ្សារការងារ",
                "ជំរុញ Innovation និងការស្រាវជ្រាវ",
                "ពង្រឹងភាពជាដៃគូ ជាមួយវិស័យឯកជន",
              ].map((m, i) => (
                <li key={i} className="flex items-start gap-2 font-battambang text-gray-600 text-sm">
                  <FiArrowRight className="text-primary shrink-0 mt-0.5" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Values */}
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
              <FiStar className="text-2xl text-primary" />
            </div>
            <h3 className="font-moul text-primary text-xl mb-4">គុណតម្លៃ</h3>
            <ul className="space-y-3">
              {values.map((v, i) => (
                <li key={i} className="flex items-start gap-2 font-battambang text-gray-600 text-sm">
                  <FiArrowRight className="text-primary shrink-0 mt-0.5" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <h2 className="font-moul text-primary text-2xl text-center mb-8">ដៃគូ និងអ្នកគ្រប់គ្រង</h2>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              {
                icon: <MdOutlineHandshake className="text-2xl text-primary" />,
                title: "ក្រសួងការងារ និងបណ្ដុះបណ្ដាលវិជ្ជាជីវៈ",
                desc: "ស្ថាប័ន Supervising ចម្បង ដែលគ្រប់គ្រង និងតាមដានការអប់រំ នៅ PIKT"
              },
              {
                icon: <HiOutlineAcademicCap className="text-2xl text-primary" />,
                title: "ធនាគារអភិវឌ្ឍន៍អាស៊ី (ADB)",
                desc: "ដៃគូអន្ដរជាតិ ដែលផ្ដល់ ជំនួយហិរញ្ញវត្ថុ ក្នុងការបង្កើត និងអភិវឌ្ឍ ស្ថាប័ននេះ"
              },
            ].map((p, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-xs flex gap-4 hover:border-primary/20 hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">{p.icon}</div>
                <div>
                  <h3 className="font-battambang font-bold text-gray-800 mb-1">{p.title}</h3>
                  <p className="font-battambang text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-10 text-center max-w-xl mx-auto">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-5">
            <FiTarget className="text-white text-2xl" />
          </div>
          <h3 className="font-moul text-primary text-xl mb-3">ទីតាំងស្ថាប័ន</h3>
          <p className="font-battambang text-gray-600 leading-loose mb-6">
            ភូមិអ្នកលក់, ឃុំអ្នកលក់, ក្រុងស្ទឹងសែន,<br />
            ខេត្តកំពង់ធំ, ព្រះរាជាណាចក្រកម្ពុជា
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+85512926232">
              <button className="bg-primary text-white font-battambang px-6 py-2.5 rounded-lg hover:bg-blue-900 transition-all flex items-center gap-2 justify-center">
                <HiOutlineAcademicCap /> ០១២ ៩២៦ ២៣២
              </button>
            </a>
            <Link href="/contact">
              <button className="border-2 border-primary text-primary font-battambang px-6 py-2.5 rounded-lg hover:bg-primary hover:text-white transition-all">
                ទំនាក់ទំនងផ្ទាល់
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
