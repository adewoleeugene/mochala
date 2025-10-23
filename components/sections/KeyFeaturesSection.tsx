'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ArrowLeftRight, Globe, CreditCard, Shield, Zap, Clock, Users } from 'lucide-react'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { FeatureIcon } from '@/components/ui/FeatureIcon'

const features = [
  {
    id: 1,
    title: 'Send to WhatsApp',
    description: 'No registration needed. Send money to any WhatsApp number instantly.',
    icon: MessageCircle,
    color: 'primary',
    benefits: [
      'No account required',
      'Works with any phone number',
      'Instant notifications',
      'Secure end-to-end encryption'
    ],
    stats: '100% WhatsApp compatible'
  },
  {
    id: 2,
    title: 'Currency Swap',
    description: 'Convert USDC to Leones and vice versa with transparent, real-time rates.',
    icon: ArrowLeftRight,
    color: 'secondary',
    benefits: [
      'Real-time exchange rates',
      'No hidden fees',
      'Instant conversion',
      'Best rates guaranteed'
    ],
    stats: '1 USD = 23.5 SLE'
  },
  {
    id: 3,
    title: 'Remittance & B2B',
    description: 'Fast international payments for individuals and businesses.',
    icon: Globe,
    color: 'accent',
    benefits: [
      'Global reach',
      'Business accounts',
      'Bulk payments',
      'Compliance ready'
    ],
    stats: '160+ countries'
  },
  {
    id: 4,
    title: 'Send Now, Pay Later',
    description: 'Advanced payment options with flexible settlement terms.',
    icon: CreditCard,
    color: 'primary',
    benefits: [
      'Flexible payment terms',
      'Credit scoring',
      'Automated settlements',
      'Risk management'
    ],
    stats: 'Coming soon'
  }
]

const additionalFeatures = [
  {
    icon: Shield,
    title: 'Bank-Grade Security',
    description: 'Your funds are protected with blockchain technology'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Transactions complete in seconds, not days'
  },
  {
    icon: Clock,
    title: '24/7 Available',
    description: 'Send money anytime, anywhere in the world'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built for and by the Sierra Leone community'
  }
]

export function KeyFeaturesSection() {
  return (
    <section id="features" className="py-20">
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
            Key Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to send money to Sierra Leone with confidence and ease.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <AnimatedCard
              key={feature.id}
              delay={index * 0.1}
              className="group hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-6"
                >
                  <FeatureIcon 
                    icon={feature.icon} 
                    size="lg" 
                    variant={feature.color as any}
                  />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  {/* Benefits List */}
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <motion.li
                        key={benefitIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1 + benefitIndex * 0.05 
                        }}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="pt-4 border-t border-border/50"
                  >
                    <div className="text-sm font-semibold text-primary">
                      {feature.stats}
                    </div>
                  </motion.div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-muted/30 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Why Choose Mocha?
            </h3>
            <p className="text-muted-foreground">
              Built with Sierra Leone in mind, powered by cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300"
                >
                  <feature.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h4 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
