import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Pricing from '@/components/sections/Pricing'
import CTA from '@/components/sections/CTA'
import Contact from '@/components/sections/Contact'
import Booking from '@/components/sections/Booking'
import Footer from '@/components/sections/Footer'

export default function Home() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      {calendlyUrl && <Booking calendlyUrl={calendlyUrl} />}
      <CTA />
      <Contact />
      <Footer />
    </main>
  )
}
