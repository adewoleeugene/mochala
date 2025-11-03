'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ArrowLeftRight, Globe, CreditCard, Shield, Zap, Clock } from 'lucide-react'

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Helper function to create gradient overlays
const createGradientOverlay = (textColor: string, opacity: number = 0.15) => {
  return `linear-gradient(135deg, ${hexToRgba(textColor, opacity)} 0%, transparent 100%)`
}

// Bento box card data with size specifications and enhanced visual properties
const bentoCards = [
  {
    id: 1,
    title: 'Send to WhatsApp',
    description: 'No registration needed. Send money to any WhatsApp number instantly.',
    icon: MessageCircle,
    color: 'primary',
    bgColor: '#593b2c', // Primary brown
    textColor: '#faf5e9', // Light cream
    benefits: [
      'No account required',
      'Works with any phone number',
      'Instant notifications',
      'Secure end-to-end encryption'
    ],
    stats: '100% WhatsApp compatible',
    size: 'large', // 2x2 grid span
    gridColSpan: 'md:col-span-2',
    gridRowSpan: 'md:row-span-2',
    position: 'md:col-start-1 md:row-start-1',
    iconGradient: 'linear-gradient(135deg, rgba(250, 245, 233, 0.25) 0%, rgba(250, 245, 233, 0.1) 100%)',
    hasPattern: true
  },
  {
    id: 2,
    title: 'Lightning Fast',
    description: 'Transactions are processed in seconds, not days.',
    icon: Zap,
    color: 'secondary',
    bgColor: '#cbc591', // Secondary beige
    textColor: '#1c1917', // Dark text
    stats: 'Average 5-second transaction',
    size: 'medium',
    gridColSpan: '',
    gridRowSpan: '',
    position: 'md:col-start-3 md:row-start-1',
    iconGradient: 'linear-gradient(135deg, rgba(28, 25, 23, 0.15) 0%, rgba(28, 25, 23, 0.05) 100%)',
    hasPattern: false
  },
  {
    id: 3,
    title: 'Currency Swap',
    description: 'Convert USDC to Leones and vice versa.',
    icon: ArrowLeftRight,
    color: 'secondary',
    bgColor: '#faf5e9', // Background color
    textColor: '#1c1917',
    stats: '1 USD = 23.5 SLE',
    size: 'small',
    gridColSpan: '',
    gridRowSpan: '',
    position: 'md:col-start-4 md:row-start-1',
    iconGradient: 'linear-gradient(135deg, rgba(28, 25, 23, 0.12) 0%, rgba(28, 25, 23, 0.04) 100%)',
    hasPattern: false
  },
  {
    id: 4,
    title: 'Remittance & B2B',
    description: 'Fast international payments for individuals and businesses.',
    icon: Globe,
    color: 'accent',
    bgColor: '#daffde', // Accent green
    textColor: '#0b262b', // Dark green text
    stats: 'Global reach',
    size: 'medium',
    gridColSpan: '',
    gridRowSpan: '',
    position: 'md:col-start-4 md:row-start-2',
    iconGradient: 'linear-gradient(135deg, rgba(11, 38, 43, 0.2) 0%, rgba(11, 38, 43, 0.08) 100%)',
    hasPattern: false
  },
  {
    id: 5,
    title: 'Bank-Grade Security',
    description: 'Your funds are protected with blockchain technology.',
    icon: Shield,
    color: 'primary',
    bgColor: '#593b2c', // Dark brown (same as Send to WhatsApp)
    textColor: '#faf5e9', // Light cream
    stats: 'Encrypted transactions',
    size: 'small',
    gridColSpan: '',
    gridRowSpan: '',
    position: 'md:col-start-1 md:row-start-3',
    iconGradient: 'linear-gradient(135deg, rgba(250, 245, 233, 0.25) 0%, rgba(250, 245, 233, 0.1) 100%)',
    hasPattern: false
  },
  {
    id: 6,
    title: '24/7 Available',
    description: 'Access your money anytime, anywhere.',
    icon: Clock,
    color: 'accent',
    bgColor: '#cbc591', // Secondary beige
    textColor: '#1c1917',
    stats: 'Always on',
    size: 'small',
    gridColSpan: '',
    gridRowSpan: '',
    position: 'md:col-start-2 md:row-start-3',
    iconGradient: 'linear-gradient(135deg, rgba(28, 25, 23, 0.15) 0%, rgba(28, 25, 23, 0.05) 100%)',
    hasPattern: false
  },
  {
    id: 7,
    title: 'Send Now, Pay Later',
    description: 'Flexible payment options for your convenience.',
    icon: CreditCard,
    color: 'primary',
    bgColor: '#faf5e9', // Light background
    textColor: '#593b2c',
    stats: 'Flexible payments',
    size: 'medium',
    gridColSpan: 'md:col-span-2',
    gridRowSpan: '',
    position: 'md:col-start-3 md:row-start-3',
    iconGradient: 'linear-gradient(135deg, rgba(89, 59, 44, 0.15) 0%, rgba(89, 59, 44, 0.05) 100%)',
    hasPattern: false
  }
]

export function KeyFeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Key Features
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to send money to Sierra Leone with confidence and ease.
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-4 sm:gap-5 md:gap-6 mb-16 auto-rows-fr">
          {bentoCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: 'easeOut' }
              }}
              className={`group relative h-full rounded-3xl overflow-hidden ${card.gridColSpan} ${card.gridRowSpan} ${card.position}`}
              style={{
                backgroundColor: card.bgColor,
                color: card.textColor,
                boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
              }}
            >
              {/* Subtle border glow on hover */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: `inset 0 0 0 1px ${hexToRgba(card.textColor, 0.2)}`,
                }}
              />
              
              {/* Subtle background pattern for large card */}
              {card.hasPattern && (
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, ${card.textColor} 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />
              )}

              {/* Gradient overlay on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: createGradientOverlay(card.textColor, 0.15),
                }}
              />

              {/* Enhanced shadow on hover */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                style={{
                  boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)`,
                  filter: 'blur(8px)',
                  transform: 'translateY(8px)',
                }}
              />

              <div className={`relative h-full flex flex-col z-10 ${
                card.size === 'large' ? 'p-8 md:p-10 lg:p-12' : 
                card.size === 'medium' ? 'p-6 md:p-7 lg:p-8' : 
                'p-5 md:p-6'
              }`}>
                {/* Enhanced Icon with gradient */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [0, -5, 5, -5, 0] }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 300, 
                    damping: 20,
                    duration: 0.5 
                  }}
                  className={card.size === 'large' ? 'mb-6 md:mb-8' : card.size === 'medium' ? 'mb-4 md:mb-5' : 'mb-3 md:mb-4'}
                >
                  <motion.div 
                    className={`rounded-2xl flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                      card.size === 'large' ? 'w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24' : 
                      card.size === 'medium' ? 'w-14 h-14 md:w-16 md:h-16' : 
                      'w-12 h-12 md:w-14 md:h-14'
                    } group-hover:scale-110`}
                    style={{ 
                      background: card.iconGradient,
                      boxShadow: `0 4px 12px ${card.textColor}15, inset 0 1px 0 ${card.textColor}20`,
                    }}
                    whileHover={{
                      boxShadow: `0 8px 16px ${card.textColor}25, inset 0 1px 0 ${card.textColor}30`,
                    }}
                  >
                    <card.icon 
                      className={`transition-all duration-300 ${
                        card.size === 'large' ? 'w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12' : 
                        card.size === 'medium' ? 'w-7 h-7 md:w-8 md:h-8' : 
                        'w-6 h-6 md:w-7 md:h-7'
                      }`}
                      style={{ color: card.textColor }}
                    />
                  </motion.div>
                </motion.div>

                {/* Enhanced Content */}
                <div className="flex-1 flex flex-col space-y-3 md:space-y-4">
                  <div>
                    <motion.h3 
                      className={`font-bold mb-2 md:mb-3 leading-tight tracking-tight ${
                        card.size === 'large' ? 'text-2xl md:text-3xl lg:text-4xl' : 
                        card.size === 'medium' ? 'text-xl md:text-2xl lg:text-3xl' : 
                        'text-lg md:text-xl lg:text-2xl'
                      }`} 
                      style={{ color: card.textColor }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 + 0.1 }}
                    >
                      {card.title}
                    </motion.h3>
                    {card.description && (
                      <motion.p 
                        className={`leading-relaxed ${
                          card.size === 'large' ? 'text-base md:text-lg lg:text-xl' : 
                          card.size === 'small' ? 'text-sm md:text-base' : 
                          'text-base md:text-lg'
                        }`} 
                        style={{ 
                          color: card.textColor,
                          opacity: 0.85 
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.85 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.08 + 0.15 }}
                      >
                        {card.description}
                      </motion.p>
                    )}
                  </div>

                  {/* Enhanced Benefits List */}
                  {card.benefits && (
                    <ul className="space-y-2.5 md:space-y-3 flex-1 pt-2">
                      {card.benefits.map((benefit, benefitIndex) => (
                        <motion.li
                          key={benefitIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.08 + 0.2 + benefitIndex * 0.05,
                            ease: 'easeOut'
                          }}
                          className="flex items-start space-x-2.5 md:space-x-3 group/benefit"
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 transition-all duration-300 group-hover/benefit:scale-125" 
                            style={{ 
                              backgroundColor: card.textColor,
                              boxShadow: `0 0 8px ${card.textColor}40`
                            }} 
                          />
                          <span 
                            className="leading-relaxed text-sm md:text-base lg:text-lg" 
                            style={{ 
                              color: card.textColor,
                              opacity: 0.9 
                            }}
                          >
                            {benefit}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Enhanced Stats */}
                  {card.stats && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.08 + 0.4,
                        ease: 'easeOut'
                      }}
                      className={`${card.size === 'large' ? 'pt-6 md:pt-8' : 'pt-4 md:pt-5'} border-t mt-auto`}
                      style={{ 
                        borderColor: `${card.textColor}25`,
                        borderWidth: '1px'
                      }}
                    >
                      <div 
                        className={`font-semibold tracking-wide ${
                          card.size === 'large' ? 'text-base md:text-lg lg:text-xl' : 
                          'text-sm md:text-base'
                        }`} 
                        style={{ 
                          color: card.textColor,
                          opacity: 0.95 
                        }}
                      >
                        {card.stats}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-primary-foreground">
            <h3 className="text-2xl font-bold mb-4">
              Ready to experience the future of money transfers?
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
              Join thousands of users who trust Mocha for their international money transfers. 
              Fast, secure, and built for Sierra Leone.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-primary-foreground text-primary rounded-lg font-medium hover:bg-primary-foreground/90 transition-colors duration-200"
              >
                Get Started Today
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center px-6 py-3 border border-primary-foreground/20 text-primary-foreground rounded-lg font-medium hover:bg-primary-foreground/10 transition-colors duration-200"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
