'use client'
import React, { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiUser, FiMessageSquare } from "react-icons/fi"
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa"

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    setLoading(true)
    setTimeout(() => {
      setSent(true)
      setLoading(false)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    }, 800)
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-primary">
        <div className="xl:px-40 px-4 py-10 xl:py-14">
          <p className="font-battambang text-blue-300 text-sm uppercase tracking-widest mb-2">ការទំនាក់ទំនង</p>
          <h1 className="font-moul text-white text-2xl xl:text-4xl">ទំនាក់ទំនងយើង</h1>
        </div>
      </div>

      <div className="xl:px-40 px-4 py-14">
        <div className="grid md:grid-cols-2 gap-12">

          {/* Left: Contact Info */}
          <div>
            <h2 className="font-moul text-primary text-2xl mb-3">ព័ត៌មានទំនាក់ទំនង</h2>
            <p className="font-battambang text-gray-500 text-sm mb-8 leading-relaxed">
              ប្រសិនបើអ្នកមានសំណួរ ចង់ដឹងព័ត៌មានបន្ថែម អំពីការចុះឈ្មោះ ឬ Course ណាមួយ
              អ្នកអាចទំនាក់ទំនងយើង តាមរបៀបខាងក្រោម
            </p>

            <div className="space-y-6 mb-8">
              {[
                {
                  icon: <FiMapPin className="text-xl text-primary" />,
                  title: "អាសយដ្ឋាន",
                  content: "ភូមិអ្នកលក់, ឃុំអ្នកលក់, ក្រុងស្ទឹងសែន,\nខេត្តកំពង់ធំ, ព្រះរាជាណាចក្រកម្ពុជា"
                },
                {
                  icon: <FiPhone className="text-xl text-primary" />,
                  title: "លេខទូរស័ព្ទ",
                  content: "(+855) 012 926 232\n(+855) 017 926 232"
                },
                {
                  icon: <FiMail className="text-xl text-primary" />,
                  title: "អ៊ីម៉ែល",
                  content: "ekhieng.pikt@gmail.com"
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-battambang font-bold text-gray-800 mb-1">{item.title}</p>
                    {item.content.split('\n').map((line, j) => (
                      <p key={j} className="font-battambang text-gray-500 text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <FiClock className="text-primary" />
                <h3 className="font-moul text-primary text-base">ម៉ោងបម្រើការ</h3>
              </div>
              <div className="space-y-2">
                {[
                  { day: "ច័ន្ទ – សុក្រ", time: "៧:០០ – ១៧:០០", active: true },
                  { day: "សៅរ៍", time: "៧:០០ – ១២:០០", active: true },
                  { day: "អាទិត្យ", time: "បិទ", active: false },
                ].map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5">
                    <span className="font-battambang text-sm text-gray-600">{h.day}</span>
                    <span className={`font-battambang text-sm font-bold ${h.active ? 'text-gray-800' : 'text-red-500'}`}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <p className="font-battambang text-gray-800 font-bold mb-3 text-sm">ធ្វើតាម Social Media</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-blue-900 transition-colors">
                  <FaFacebookF />
                </a>
                <a href="#" className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:bg-blue-900 transition-colors">
                  <FaTelegramPlane />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <h2 className="font-moul text-primary text-2xl mb-6">ផ្ញើសារមកយើង</h2>

            {sent && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-5">
                <FiSend />
                <p className="font-battambang text-sm">សូមអរគុណ! សាររបស់អ្នកបានផ្ញើដោយជោគជ័យ។ យើងនឹងឆ្លើយតបឆាប់ៗ</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-battambang text-gray-700 text-sm block mb-1.5">ឈ្មោះ *</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input name="name" value={form.name} onChange={handleChange}
                      placeholder="ឈ្មោះរបស់អ្នក"
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="font-battambang text-gray-700 text-sm block mb-1.5">អ៊ីម៉ែល</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input name="email" value={form.email} onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-battambang text-gray-700 text-sm block mb-1.5">ប្រធានបទ</label>
                <input name="subject" value={form.subject} onChange={handleChange}
                  placeholder="ប្រធានបទសារ"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
              </div>

              <div>
                <label className="font-battambang text-gray-700 text-sm block mb-1.5">សារ *</label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-3.5 text-gray-400 text-sm" />
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="សរសេរសារជូន PIKT..."
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-3 font-battambang text-sm focus:outline-hidden focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none" />
                </div>
              </div>

              <button onClick={handleSubmit} disabled={loading}
                className="w-full bg-primary text-white font-battambang py-3 rounded-xl hover:bg-blue-900 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                    </svg>
                    កំពុងផ្ញើ...
                  </span>
                ) : (
                  <><FiSend /> ផ្ញើសារ</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-14">
          <h2 className="font-moul text-primary text-2xl mb-6 text-center">ទីតាំងលើផែនទី</h2>
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-xs">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15640.46060073!2d104.953!3d12.688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDQxJzE2LjgiTiAxMDTCsDU3JzE4LjAiRQ!5e0!3m2!1skm!2skh!4v1600000000000!5m2!1skm!2skh"
              width="100%" height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="ទីតាំង PIKT"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
