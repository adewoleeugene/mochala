'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MessageCircle, Mail, CheckCircle, AlertCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/lib/utils'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  country: z.string().min(2, 'Please enter your country'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', data)
      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const whatsappLink = generateWhatsAppLink(
    '2327898232', // Replace with actual WhatsApp number
    'Hi, I want to learn more about Mocha'
  )

  return (
    <section id="contact" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stay Connected with Mocha
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be the first to know when we launch our bot and other new features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 shadow-lg border border-border/50"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Join Our Waitlist
            </h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  WhatsApp Number
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  placeholder="Enter your WhatsApp Number"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-destructive flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium text-foreground mb-2">
                  Country
                </label>
                <input
                  {...register('country')}
                  type="text"
                  id="country"
                  placeholder="Enter the country you are located in"
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-destructive flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message (Optional)
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  placeholder="Tell us what you're looking for..."
                  className="w-full px-4 py-3 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 resize-none"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Yes, I want to keep in touch
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Thank you! We'll be in touch soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-destructive bg-destructive/10 p-3 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Something went wrong. Please try again.</span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-lg p-6 shadow-sm border border-border/50"
                  >
                    <h4 className="font-semibold text-foreground mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white"
            >
              <div className="flex items-center space-x-3 mb-4">
                <MessageCircle className="w-8 h-8" />
                <h4 className="text-xl font-bold">Try Mocha Now</h4>
              </div>
              <p className="text-green-100 mb-4">
                Experience Mocha directly on WhatsApp. No registration needed!
              </p>
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Open WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
