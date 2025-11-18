'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    id: 1,
    title: 'Deposit',
    description: 'Add funds via mobile money, bank transfer, or crypto wallet',
    bgColor: '#cbc591',
    textColor: '#1c1917',
    accentColor: '#593b2c'
  },
  {
    id: 2,
    title: 'Send',
    description: 'Transfer USDC instantly via WhatsApp to any number',
    bgColor: '#daffde',
    textColor: '#1c1917',
    accentColor: '#0b262b'
  },
  {
    id: 3,
    title: 'Withdraw',
    description: 'Cash out to Leones or keep as stablecoins',
    bgColor: '#1c1917',
    textColor: '#daffde',
    accentColor: '#daffde'
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32" style={{ backgroundColor: '#faf5e9' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base font-semibold mb-4 sm:mb-5 tracking-widest uppercase"
            style={{ color: '#593b2c', letterSpacing: '0.1em' }}
          >
            HOW IT WORKS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto"
            style={{ color: '#1c1917' }}
          >
            Three simple steps to <br />
            <span style={{ color: '#593b2c' }}>send money instantly</span>
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-3xl p-8 sm:p-9 md:p-10 lg:p-11 h-full relative overflow-hidden group cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: step.bgColor,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Hover overlay effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                style={{ backgroundColor: step.accentColor }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Step number badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-5 sm:mb-6 font-bold text-base sm:text-lg"
                  style={{
                    backgroundColor: step.textColor,
                    color: step.bgColor
                  }}
                >
                  {step.id}
                </motion.div>

                <h3
                  className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 tracking-tight"
                  style={{ color: step.textColor }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-base sm:text-lg md:text-lg leading-relaxed"
                  style={{ color: step.textColor, opacity: step.id === 3 ? 0.95 : 0.85 }}
                >
                  {step.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl"
                style={{ backgroundColor: step.accentColor }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
