'use client'

import { motion } from 'framer-motion'

const faqs = [
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
  return (
    <section className="relative flex items-center justify-center pt-2 pb-4 px-3 sm:px-4 md:px-6 lg:px-8 2xl:px-12">
      <div className="relative z-10 w-full max-w-8xl rounded-3xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-16 sm:py-20 md:py-24 lg:py-32" style={{ backgroundColor: '#cbc591' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#593b2c' }}>
            FAQ
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="rounded-2xl p-6 shadow-sm"
                    style={{ backgroundColor: '#faf5e9' }}
                  >
                    <h4 className="font-semibold mb-2" style={{ color: '#593b2c' }}>
                      {faq.question}
                    </h4>
                    <p className="text-sm" style={{ color: '#593b2c', opacity: 0.8 }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
