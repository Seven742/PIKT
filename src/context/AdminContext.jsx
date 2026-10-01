'use client'
import { createContext, useContext, useEffect, useState } from 'react'

// Auth only. All data (teachers, news, courses, cooperations) is fetched from /api.
const AdminContext = createContext(null)

export const AdminProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [adminInfo, setAdminInfo] = useState(null)
  // localStorage only exists in the browser, so we read it after mount.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const token = localStorage.getItem('pikt_token')
      const info = localStorage.getItem('pikt_admin')
      /* eslint-disable react-hooks/set-state-in-effect */
      setIsLoggedIn(!!token)
      setAdminInfo(info ? JSON.parse(info) : null)
    } catch {}
    setReady(true)
  }, [])

  const loginSuccess = (token, admin) => {
    localStorage.setItem('pikt_token', token)
    localStorage.setItem('pikt_admin', JSON.stringify(admin))
    setIsLoggedIn(true)
    setAdminInfo(admin)
  }

  const logout = () => {
    localStorage.removeItem('pikt_token')
    localStorage.removeItem('pikt_admin')
    setIsLoggedIn(false)
    setAdminInfo(null)
  }

  return (
    <AdminContext.Provider value={{ isLoggedIn, adminInfo, ready, loginSuccess, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext)
