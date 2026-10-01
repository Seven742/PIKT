'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FiHome, FiFileText, FiBook, FiUsers, FiGlobe, FiLogOut, FiMenu, FiX, FiExternalLink, FiLock } from 'react-icons/fi'
import { useAdmin } from '@/context/AdminContext'
import Logo from '@/assets/Logo.png'

const navItems = [
  { to: '/admin',              icon: <FiHome />,     label: 'ផ្ទាំងគ្រប់គ្រង', exact: true },
  { to: '/admin/news',         icon: <FiFileText />, label: 'ព័ត៌មាន' },
  { to: '/admin/courses',      icon: <FiBook />,     label: 'ឯកទេសសិក្សា' },
  { to: '/admin/teachers',     icon: <FiUsers />,    label: 'គ្រូបង្រៀន' },
  { to: '/admin/coop',         icon: <FiGlobe />,    label: 'ភាពជាដៃគូ' },
  { to: '/admin/change-password', icon: <FiLock />,  label: 'ផ្លាស់ Password' },
]

const AdminLayout = ({ children }) => {
  const { logout, adminInfo } = useAdmin()
  const pathname  = usePathname()
  const router    = useRouter()
  const [sideOpen, setSideOpen] = useState(false)

  const handleLogout = () => { logout(); router.push('/admin/login') }
  const isActive = (to, exact) => exact ? pathname === to : pathname === to

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image src={Logo} alt="PIKT" className="w-10 h-10 object-contain bg-white rounded-full p-1" />
          <div>
            <p className="font-moul text-white text-sm">PIKT Admin</p>
            <p className="font-battambang text-blue-300 text-xs">
              {adminInfo?.name || adminInfo?.username || 'Admin'}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const active = item.exact ? pathname === item.to : pathname === item.to
          return (
            <Link key={item.to} href={item.to} onClick={() => setSideOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-battambang text-sm transition-all
                ${active ? 'bg-white text-primary font-bold shadow-xs' : 'text-blue-100 hover:bg-white/10'}`}>
              {item.icon} {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <a href="/" target="_blank" rel="noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-battambang text-sm text-blue-200 hover:bg-white/10 transition-all">
          <FiExternalLink /> មើល Website
        </a>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-battambang text-sm text-red-300 hover:bg-red-500/20 transition-all">
          <FiLogOut /> ចេញពីប្រព័ន្ធ
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-primary shrink-0 fixed left-0 top-0 bottom-0 z-40">
        {SidebarContent()}
      </aside>

      {/* Mobile Sidebar */}
      {sideOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-64 bg-primary flex flex-col">{SidebarContent()}</div>
          <div className="flex-1 bg-black/50" onClick={() => setSideOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button onClick={() => setSideOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600">
              <FiMenu className="text-xl" />
            </button>
            <h2 className="font-moul text-primary text-base">
              {navItems.find(n => n.exact ? pathname === n.to : pathname === n.to)?.label || 'Admin'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-battambang text-gray-500 text-sm hidden md:block">
              {adminInfo?.username || ''}
            </span>
            <button onClick={handleLogout}
              className="flex items-center gap-2 font-battambang text-sm text-red-500 hover:text-red-700 transition-colors">
              <FiLogOut /> ចេញ
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
