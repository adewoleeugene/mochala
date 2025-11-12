'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { List, X, ChatCircle } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { generateWhatsAppLink } from '@/lib/utils'
import Image from 'next/image'

const navigation = [
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'Features', href: '#features' },
  { name: 'Contact', href: '#contact' },
]

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 px-4 sm:px-4 lg:px-4 pt-4"
    >
      <nav 
        className="mx-auto max-w-8xl rounded-3xl shadow-lg"
        style={{ backgroundColor: '#593b2c' }}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Image
              src="/images/image.png"
              alt="Mocha Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: '#faf5e9' }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                className="rounded-full font-semibold"
                style={{
                  backgroundColor: '#cbc591',
                  color: '#593b2c',
                  border: 'none'
                }}
              >
                <ChatCircle size={16} weight="fill" className="mr-2" />
                Try on WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 border-t" style={{ backgroundColor: '#593b2c', borderColor: 'rgba(250, 245, 233, 0.2)' }}>
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ x: 5 }}
                  className="block px-3 py-2 text-base font-medium transition-colors duration-200"
                  style={{ color: '#faf5e9' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              <div className="pt-4">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    size="sm"
                    className="w-full rounded-full font-semibold"
                    style={{
                      backgroundColor: '#cbc591',
                      color: '#593b2c',
                      border: 'none'
                    }}
                  >
                    <ChatCircle size={16} weight="fill" className="mr-2" />
                    Try on WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}
