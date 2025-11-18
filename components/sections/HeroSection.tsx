'use client'

import { motion } from 'framer-motion'
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
    <section className="relative min-h-screen flex items-center justify-center pt-2 pb-4 px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">
      <div className="relative z-10 w-full max-w-8xl rounded-3xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-0 min-h-screen flex items-center justify-center" style={{ backgroundColor: '#593b2c' }}>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-28 2xl:gap-40 items-center max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-[90rem] mx-auto relative z-10 w-full">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 2xl:space-y-16"
          >
            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 2xl:space-y-12"
            >
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[7rem] font-black leading-[1.1] lg:leading-[1.1] 2xl:leading-[1.05] tracking-tight"
                style={{
                  color: '#faf5e9',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                BANKING THAT LIVES IN YOUR WHATSAPP
              </h1>
              <p
                className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl leading-relaxed font-normal"
                style={{
                  color: '#faf5e9',
                  opacity: 0.95
                }}
              >
                Bringing you a simple, instant, and efficient way to send and receive money through WhatsApp. No registration, no account needed: just choose a number and send!
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Demo Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto lg:mx-0"
          >
            <div
              className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden"
              style={{
                paddingBottom: '125%', // 4:5 aspect ratio for shorter video
                boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.25), 0 10px 30px -10px rgba(0, 0, 0, 0.1)',
                border: '1.5px solid rgba(250, 245, 233, 0.15)'
              }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/Dltf1vfGOjQ?autoplay=1&mute=1&loop=1&playlist=Dltf1vfGOjQ&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                title="Mocha Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  borderRadius: 'inherit'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
