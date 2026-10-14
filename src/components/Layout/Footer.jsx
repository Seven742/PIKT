'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { FiPhone, FiMail, FiMapPin, FiClock, FiChevronRight, FiArrowUp } from 'react-icons/fi'
import { FaFacebookF, FaYoutube, FaTelegramPlane, FaTiktok } from 'react-icons/fa'
import Logo from '@/assets/Logo.png'

const Footer = () => (
  <>
    <footer className="bg-[#002560] text-white">
      <div className="xl:px-40 px-4 py-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Image src={Logo} alt="PIKT" className="h-14 w-14 object-contain bg-white rounded-full p-1" />
            <div>
              <p className="font-moul text-white text-sm leading-tight">វិទ្យាស្ថានពហុបច្ចេកទេស</p>
              <p className="font-moul text-white text-sm">ខេត្តកំពង់ធំ (PIKT)</p>
            </div>
          </div>
          <p className="font-battambang text-blue-200 text-sm leading-relaxed mb-6">
            ឧទ្ទិសដល់ការអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈ ដ៏ល្អប្រសើរ ដើម្បីអភិវឌ្ឍ ធនធានមនុស្សសម្រាប់ប្រទេសកម្ពុជា
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: <FaFacebookF />, hover: 'hover:bg-blue-600' },
              { icon: <FaYoutube />, hover: 'hover:bg-red-600' },
              { icon: <FaTelegramPlane />, hover: 'hover:bg-sky-500' },
              { icon: <FaTiktok />, hover: 'hover:bg-gray-700' },
            ].map((s, i) => (
              <a key={i} href="#" className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-sm ${s.hover} transition-colors duration-200`}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-moul text-white text-base mb-5 pb-3 border-b border-white/10">តំណភ្ជាប់</h3>
          <ul className="space-y-2.5">
            {[
              { label: 'ទំព័រដើម', to: '/' },
              { label: 'ប្រវត្តិ PIKT', to: '/history' },
              { label: 'អំពីយើង', to: '/about' },
              { label: 'គ្រូបង្រៀន', to: '/teacher' },
              { label: 'ព័ត៌មាន', to: '/news' },
              { label: 'ភាពសហប្រតិបត្តិការ', to: '/cooperation' },
              { label: 'ទំនាក់ទំនង', to: '/contact' },
            ].map((l, i) => (
              <li key={i}>
                <Link href={l.to} className="flex items-center gap-2 font-battambang text-sm text-blue-200 hover:text-white transition-colors group">
                  <FiChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />{l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="font-moul text-white text-base mb-5 pb-3 border-b border-white/10">ឯកទេសសិក្សា</h3>
          <ul className="space-y-2.5">
            {['បច្ចេកវិទ្យាព័ត៌មាន', 'អគ្គិសនី', 'យន្តសាស្ត្រ', 'គ្រប់គ្រងពាណិជ្ជកម្ម', 'គណនេយ្យ', 'កសិកម្ម'].map((l, i) => (
              <li key={i}>
                <Link href="/courses" className="flex items-center gap-2 font-battambang text-sm text-blue-200 hover:text-white transition-colors group">
                  <FiChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />{l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-moul text-white text-base mb-5 pb-3 border-b border-white/10">ទំនាក់ទំនង</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <FiMapPin className="text-blue-300 shrink-0 mt-0.5" />
              <p className="font-battambang text-sm text-blue-200 leading-relaxed">ភូមិអ្នកលក់, ឃុំអ្នកលក់<br />ក្រុងស្ទឹងសែន, ខេត្តកំពង់ធំ</p>
            </li>
            <li className="flex gap-3 items-center">
              <FiPhone className="text-blue-300 shrink-0" />
              <a href="tel:+85512926232" className="font-battambang text-sm text-blue-200 hover:text-white transition-colors">(+855) 012 926 232</a>
            </li>
            <li className="flex gap-3 items-center">
              <FiMail className="text-blue-300 shrink-0" />
              <a href="mailto:ekhieng.pikt@gmail.com" className="font-battambang text-sm text-blue-200 hover:text-white transition-colors break-all">ekhieng.pikt@gmail.com</a>
            </li>
            <li className="flex gap-3 items-start">
              <FiClock className="text-blue-300 shrink-0 mt-0.5" />
              <div className="font-battambang text-sm text-blue-200">
                <p>ច័ន្ទ – សុក្រ: ៧:០០ – ១៧:០០</p>
                <p>សៅរ៍: ៧:០០ – ១២:០០</p>
                <p className="text-red-400">អាទិត្យ: បិទ</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 xl:px-40 px-4 py-4 flex items-center justify-between">
        <p className="font-battambang text-xs text-blue-300">© ២០២៦ វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ (PIKT) — រក្សាសិទ្ធិគ្រប់យ៉ាង</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
          <FiArrowUp className="text-white text-sm" />
        </button>
      </div>
    </footer>
  </>
)

export default Footer
