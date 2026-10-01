import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'

export default function SiteLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
