'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X, ChatCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/lib/utils'
import Image from 'next/image'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const whatsappLink = generateWhatsAppLink(
    '2327898232', // Replace with actual WhatsApp number
    'Hi, I want to learn more about Mocha'
  )

  const navigation = [
    { name: 'How it Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Contact', href: whatsappLink, target: '_blank', rel: 'noopener noreferrer' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 px-4 sm:px-4 lg:px-4 pt-4"
    >
      <nav
        className={`mx-auto max-w-8xl rounded-3xl transition-all duration-500 ease-out ${
          scrolled ? 'shadow-2xl' : 'shadow-lg'
        }`}
        style={{
          backgroundColor: scrolled ? 'rgba(89, 59, 44, 0.7)' : '#593b2c',
          backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
          border: scrolled ? '1px solid rgba(250, 245, 233, 0.2)' : 'none',
          boxShadow: scrolled
            ? '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
            : '0 4px 16px 0 rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="flex items-center"
          >
            <Image
              src="/images/image.png"
              alt="Mocha Logo"
              width={80}
              height={80}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
             {navigation.map((item) => (
               <motion.a
                 key={item.name}
                 href={item.href}
                 target={item.target}
                 rel={item.rel}
                 whileHover={{ y: -2 }}
                 transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                 className="text-sm font-medium transition-all duration-200 hover:opacity-80"
                 style={{ color: '#faf5e9' }}
               >
                 {item.name}
               </motion.a>
             ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Button
                  size="sm"
                  className="rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: '#faf5e9',
                    color: '#593b2c',
                    border: 'none'
                  }}
                >
                  <ChatCircle size={16} weight="fill" className="mr-2" />
                  Try on WhatsApp
                </Button>
              </motion.div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="transition-transform duration-200"
              style={{ color: '#faf5e9' }}
            >
              {mobileMenuOpen ? (
                <X size={20} weight="fill" />
              ) : (
                <List size={20} weight="fill" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div
                className="px-2 pt-2 pb-3 space-y-1 border-t"
                style={{
                  backgroundColor: scrolled ? 'rgba(89, 59, 44, 0.7)' : '#593b2c',
                  borderColor: 'rgba(250, 245, 233, 0.2)'
                }}
              >
                 {navigation.map((item, index) => (
                   <motion.a
                     key={item.name}
                     href={item.href}
                     target={item.target}
                     rel={item.rel}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: index * 0.1, duration: 0.3 }}
                     whileHover={{ x: 4 }}
                     className="block px-3 py-2.5 text-base font-medium transition-all duration-200 rounded-lg hover:bg-white/5"
                     style={{ color: '#faf5e9' }}
                     onClick={() => setMobileMenuOpen(false)}
                   >
                     {item.name}
                   </motion.a>
                 ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="pt-4 px-3"
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                    <Button
                      size="sm"
                      className="w-full rounded-full font-semibold"
                      style={{
                        backgroundColor: '#faf5e9',
                        color: '#593b2c',
                        border: 'none'
                      }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ChatCircle size={16} weight="fill" className="mr-2" />
                      Try on WhatsApp
                    </Button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
