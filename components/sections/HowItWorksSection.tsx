'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    id: 1,
    title: 'Deposit',
    description: 'Add funds via mobile money, bank transfer, or crypto wallet'
  },
  {
    id: 2,
    title: 'Send',
    description: 'Transfer USDC instantly via WhatsApp to any number'
  },
  {
    id: 3,
    title: 'Withdraw',
    description: 'Cash out to Leones or keep as stablecoins'
  }
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20" style={{ backgroundColor: '#faf5e9' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#593b2c' }}>
            HOW IT WORKS
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight max-w-4xl mx-auto">
            Three simple steps to <br />
            <span style={{ color: '#593b2c' }}>send money instantly</span>
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl p-8 h-full"
              style={{ backgroundColor: step.id === 1 ? '#cbc591' : step.id === 2 ? '#daffde' : '#1c1917' }}
            >
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: step.id === 2 ? '#593b2c' : step.id === 3 ? '#daffde' : '#1c1917' }}>
                {step.title}
              </h3>
              <p className="text-base" style={{ color: step.id === 2 ? '#593b2c' : step.id === 3 ? '#daffde' : '#1c1917' }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
