'use client'

import { motion } from 'framer-motion'
import { SendCalculator } from '@/components/ui/SendCalculator'
import dynamic from 'next/dynamic'

// Dynamically import Silk with fallback
const Silk = dynamic(() => import('@/components/ui/SilkBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 w-full h-full bg-transparent" />
})

const SilkFallback = dynamic(() => import('@/components/ui/SilkBackgroundFallback'), {
  ssr: false
})

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-2 pb-4 px-4 sm:px-4 lg:px-4">
      <div className="relative z-10 w-full max-w-8xl rounded-3xl px-6 sm:px-8 lg:px-12 py-24 min-h-screen" style={{ backgroundColor: '#593b2c' }}>
        {/* Silk animated background with fallback */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <Silk 
            className="w-full h-full opacity-40"
            speed={3}
            scale={1.2}
            color="#8B7355"
            noiseIntensity={1.2}
            rotation={0.1}
          />
          <SilkFallback 
            className="w-full h-full opacity-40"
            color="#8B7355"
            speed={1.5}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto relative z-10">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-7xl font-black leading-[1.1] tracking-tight" style={{ color: '#faf5e9' }}>
                BANKING THAT LIVES IN YOUR WHATSAPP
              </h1>
              <p className="text-xl md:text-xl max-w-2xl leading-relaxed font-regular" style={{ color: '#faf5e9' }}>
                Bringing you a simple, instant, and efficient way to send and receive money through WhatsApp. No registration, no account needed: just choose a number and send!
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Send Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <SendCalculator />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
