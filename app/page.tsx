'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { KeyFeaturesSection } from '@/components/sections/KeyFeaturesSection'
import { WhyMochaSection } from '@/components/sections/WhyMochaSection'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhyMochaSection />
        <HowItWorksSection />
        <KeyFeaturesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
