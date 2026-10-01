'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdmin } from '@/context/AdminContext'
import AdminLayout from '@/components/Admin/AdminLayout'

// Replaces <ProtectedRoute> from the old React Router setup.
export default function PanelLayout({ children }) {
  const { isLoggedIn, ready } = useAdmin()
  const router = useRouter()

  useEffect(() => {
    if (ready && !isLoggedIn) router.replace('/admin/login')
  }, [ready, isLoggedIn, router])

  if (!ready || !isLoggedIn) return null
  return <AdminLayout>{children}</AdminLayout>
}
