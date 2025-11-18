'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Why does Mocha use WhatsApp?',
    answer: 'WhatsApp is easy to use and widely trusted, so Mocha brings fast, secure payments to a platform you already know and love, saving you the steep learning curve of downloading another app.'
  },
  {
    question: 'Do you have a physical office location?',
    answer: 'Yes, our office is located at Christex Foundation, Lower Faculty - FBC, Freetown, Sierra Leone.'
  },
  {
    question: 'How do I create a Mocha account?',
    answer: 'You don\'t need an account to use Mocha. With your WhatsApp number you can seamlessly send and receive money from anywhere in the world.'
  },
  {
    question: 'What withdrawal methods are available?',
    answer: 'You can withdraw funds at MoneyGram locations worldwide. If you\'re in Sierra Leone, you can withdraw your funds through the various mobile money service or pickup cash at Christex Foundation - FBC.'
  },
  {
    question: 'How does Mocha protect my money and personal information?',
    answer: 'Mocha utilises blockchain technology to safeguard user funds and personal data.'
  },
  {
    question: 'What countries can I remit to?',
    answer: 'We remit to any country, except for those in the US financial danger zones list and countries without MoneyGram remittance services.'
  }
]

export function ContactSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="contact" className="relative flex items-center justify-center pt-2 pb-4 px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">
      <div className="relative z-10 w-full max-w-8xl rounded-3xl px-6 sm:px-8 md:px-10 lg:px-16 xl:px-20 2xl:px-24 py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32" style={{ backgroundColor: '#cbc591' }}>
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4"
            style={{ color: '#593b2c' }}
          >
            FAQ
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: '#593b2c', opacity: 0.8 }}
          >
            Find answers to common questions about Mocha
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 sm:space-y-5"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: '#faf5e9',
                  boxShadow: openIndex === index
                    ? '0 8px 24px rgba(0, 0, 0, 0.12)'
                    : '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
                onClick={() => toggleFAQ(index)}
              >
                <div className="p-5 sm:p-6 md:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <h4
                      className="font-semibold text-base sm:text-lg md:text-xl flex-1 text-left"
                      style={{ color: '#593b2c' }}
                    >
                      {faq.question}
                    </h4>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-shrink-0"
                    >
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                        style={{
                          backgroundColor: openIndex === index ? '#593b2c' : 'rgba(89, 59, 44, 0.1)'
                        }}
                      >
                        <ChevronDown
                          size={20}
                          style={{
                            color: openIndex === index ? '#faf5e9' : '#593b2c'
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <motion.p
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          exit={{ y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm sm:text-base md:text-lg mt-4 sm:mt-5 leading-relaxed"
                          style={{ color: '#593b2c', opacity: 0.85 }}
                        >
                          {faq.answer}
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
