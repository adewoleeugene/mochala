'use client'

import { motion } from 'framer-motion'

export function WhyMochaSection() {
  return (
    <section id="why-mocha" className="py-20" style={{ backgroundColor: '#faf5e9' }}>
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
            WHY MOCHA?
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight max-w-4xl mx-auto">
            Experience seamless <br />
            financial transactions with our<br />
            <span style={{ color: '#593b2c' }}>money transfer service</span>
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Easy to use */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl p-8 h-full"
            style={{ backgroundColor: '#cbc591' }}
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#1c1917' }}>
              Easy to use
            </h3>
            <p className="text-base" style={{ color: '#1c1917' }}>
              Enjoy simplicity, whether using our App or card.
            </p>
          </motion.div>

          {/* Card 2: Low cost */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl p-8 h-full"
            style={{ backgroundColor: '#593b2c' }}
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#faf5e9' }}>
              Low cost
            </h3>
            <p className="text-base" style={{ color: '#faf5e9' }}>
              Enjoy competitive rates and transparent pricing with no hidden charges.
            </p>
          </motion.div>

          {/* Card 3: Safe & secure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl p-8 h-full"
            style={{ backgroundColor: '#1c1917' }}
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4" style={{ color: '#daffde' }}>
              Safe & secure
            </h3>
            <p className="text-base" style={{ color: '#daffde' }}>
              Your transactions and personal information are safeguarded.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
