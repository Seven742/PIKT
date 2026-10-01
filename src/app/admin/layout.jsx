import { AdminProvider } from '@/context/AdminContext'

export const metadata = {
  title: { default: 'PIKT Admin', template: '%s | PIKT Admin' },
  robots: { index: false, follow: false },
}

export default function AdminRootLayout({ children }) {
  return <AdminProvider>{children}</AdminProvider>
}
