'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, Twitter, Instagram, Facebook } from 'lucide-react'
import { generateWhatsAppLink } from '@/lib/utils'

const socialLinks = [
  { name: 'WhatsApp', icon: MessageCircle, href: '#', color: 'text-green-500' },
  { name: 'Email', icon: Mail, href: 'mailto:hello@mocha.sl', color: 'text-blue-500' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'text-blue-400' },
  { name: 'Instagram', icon: Instagram, href: '#', color: 'text-pink-500' },
  { name: 'Facebook', icon: Facebook, href: '#', color: 'text-blue-600' },
]

const footerLinks = {
  company: [
    { name: 'About Us', href: '#' },
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Contact', href: '#contact' },
  ],
  legal: [
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Support', href: '#' },
  ],
}

export function Footer() {
  const whatsappLink = generateWhatsAppLink(
    '2327898232', // Replace with actual WhatsApp number
    'Hi, I want to learn more about Mocha'
  )

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="text-2xl font-bold">Mocha</div>
              <p className="text-sm text-primary-foreground/80">
                Send, spend, and earn with stablecoins — right on WhatsApp.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.name === 'WhatsApp' ? whatsappLink : social.href}
                    target={social.name === 'WhatsApp' ? '_blank' : '_self'}
                    rel={social.name === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors duration-200 ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-primary-foreground/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/80">
              © 2025 Mocha. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <span className="text-sm text-primary-foreground/80">
                Made with ❤️ for Sierra Leone
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
