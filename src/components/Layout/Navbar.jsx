'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiPhone, FiMail, FiMapPin, FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { FaFacebookF, FaYoutube, FaTelegramPlane, FaTiktok } from 'react-icons/fa'
import Logo from '@/assets/Logo.png'

const navLinks = [
  {
    label: 'អំពីយើង',
    children: [
      { label: 'ប្រវត្តិ PIKT', to: '/history' },
      { label: 'ចក្ខុវិស័យ & បេសកកម្ម', to: '/about' },
      { label: 'គ្រូបង្រៀន', to: '/teacher' },
      { label: 'ការទទួលស្គាល់', to: '/license' },
    ]
  },
  {
    label: 'ឯកទេសសិក្សា',
    children: [
      { label: 'Course ទាំងអស់', to: '/courses' },
      { label: 'ព័ត៌មានវិទ្យា (IT)', to: '/courses' },
      { label: 'អគ្គិសនី', to: '/courses' },
      { label: 'ពាណិជ្ជកម្ម', to: '/courses' },
      { label: 'កសិកម្ម', to: '/courses' },
    ]
  },
  { label: 'ព័ត៌មាន', to: '/news' },
  { label: 'ភាពសហប្រតិបត្តិការ', to: '/cooperation' },
  { label: 'ទំនាក់ទំនង', to: '/contact' },
]

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setMobileDropdown(null) }, [pathname])

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-primary text-white text-sm">
        <div className="xl:px-40 px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+85512926232" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
              <FiPhone className="text-xs" /><span className="font-battambang">(+855) 012 926 232</span>
            </a>
            <a href="mailto:ekhieng.pikt@gmail.com" className="flex items-center gap-1.5 hover:text-blue-200 transition-colors">
              <FiMail className="text-xs" /><span className="font-battambang">ekhieng.pikt@gmail.com</span>
            </a>
            <span className="flex items-center gap-1.5 text-blue-200">
              <FiMapPin className="text-xs" /><span className="font-battambang">ស្ទឹងសែន, ខេត្តកំពង់ធំ</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-blue-300 transition-colors"><FaFacebookF /></a>
            <a href="#" className="hover:text-red-400 transition-colors"><FaYoutube /></a>
            <a href="#" className="hover:text-blue-300 transition-colors"><FaTelegramPlane /></a>
            <a href="#" className="hover:text-gray-300 transition-colors"><FaTiktok /></a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-xs border-b border-gray-100'}`}>
        <div className="xl:px-40 px-4 flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image src={Logo} alt="PIKT" className="h-14 w-14 object-contain" />
            <div className="">
              <p className="font-moul text-primary text-sm leading-tight">វិទ្យាស្ថានពហុបច្ចេកទេស</p>
              <p className="font-moul text-primary text-sm">ខេត្តកំពង់ធំ (PIKT)</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) =>
              link.children ? (
                <div key={i} className="relative"
                  onMouseEnter={() => setActiveMenu(i)}
                  onMouseLeave={() => setActiveMenu(null)}>
                  <button className={`flex items-center gap-1 px-3 py-2.5 font-battambang text-sm rounded-lg transition-colors ${activeMenu === i ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>
                    {link.label}
                    <FiChevronDown className={`text-xs transition-transform duration-200 ${activeMenu === i ? 'rotate-180' : ''}`} />
                  </button>
                  {activeMenu === i && (
                    <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      {link.children.map((child, j) => (
                        <Link key={j} href={child.to}
                          className="block px-4 py-2.5 font-battambang text-sm text-gray-700 hover:text-primary hover:bg-blue-50 transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={i} href={link.to}
                  className={`px-3 py-2.5 font-battambang text-sm rounded-lg transition-colors ${pathname === link.to ? 'text-primary bg-blue-50' : 'text-gray-700 hover:text-primary hover:bg-gray-50'}`}>
                  {link.label}
                </Link>
              )
            )}
            <Link href="/contact">
              <button className="ml-2 bg-primary text-white font-battambang text-sm px-5 py-2.5 rounded-lg hover:bg-blue-900 transition-all duration-200">
                ចុះឈ្មោះសិក្សា
              </button>
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-primary">
            {mobileOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-3 px-4">
            {navLinks.map((link, i) =>
              link.children ? (
                <div key={i}>
                  <button onClick={() => setMobileDropdown(mobileDropdown === i ? null : i)}
                    className="flex items-center justify-between w-full px-3 py-3 font-battambang text-sm text-gray-700 hover:text-primary rounded-lg">
                    {link.label}
                    <FiChevronDown className={`transition-transform ${mobileDropdown === i ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileDropdown === i && (
                    <div className="ml-4 border-l-2 border-blue-100 pl-3 mb-1">
                      {link.children.map((child, j) => (
                        <Link key={j} href={child.to}
                          className="block py-2.5 font-battambang text-sm text-gray-600 hover:text-primary transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={i} href={link.to}
                  className={`block px-3 py-3 font-battambang text-sm rounded-lg transition-colors ${pathname === link.to ? 'text-primary font-bold' : 'text-gray-700 hover:text-primary'}`}>
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <Link href="/contact">
                <button className="w-full bg-primary text-white font-battambang py-3 rounded-lg text-sm hover:bg-blue-900 transition-all">
                  ចុះឈ្មោះសិក្សា
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navbar
