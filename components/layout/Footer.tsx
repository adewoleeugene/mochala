'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Mail, Twitter, Instagram } from 'lucide-react'

const socialLinks = [
  { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/23273938372', color: '#25D366' },
  { name: 'Email', icon: Mail, href: 'mailto:mocha@christex.foundation', color: '#EA4335' },
  { name: 'Twitter', icon: Twitter, href: 'https://x.com/getmochala', color: '#1DA1F2' },
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/getmochala?igsh=MWtibnhxa256bW92cg%3D%3D&utm_source=qr', color: '#E4405F' },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#593b2c', color: '#faf5e9' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center space-y-5 sm:space-y-6"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: '#faf5e9' }}
          >
            Mocha
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg max-w-md leading-relaxed"
            style={{ color: '#faf5e9', opacity: 0.9 }}
          >
            Send, spend, and earn with stablecoins — right on WhatsApp.
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.1,
                  type: 'spring',
                  stiffness: 200
                }}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group p-3 sm:p-3.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(250, 245, 233, 0.1)',
                }}
              >
                <social.icon
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300"
                  style={{ color: '#faf5e9' }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 sm:mt-12 pt-8 sm:pt-10"
          style={{ borderTop: '1px solid rgba(250, 245, 233, 0.2)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-5">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm sm:text-base"
              style={{ color: 'rgba(250, 245, 233, 0.8)' }}
            >
              © 2025 Mocha. All rights reserved.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="text-sm sm:text-base" style={{ color: 'rgba(250, 245, 233, 0.8)' }}>
                Made with
              </span>
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="text-lg"
              >
                ❤️
              </motion.span>
               <span className="text-sm sm:text-base" style={{ color: 'rgba(250, 245, 233, 0.8)' }}>
                 from Sierra Leone
               </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
