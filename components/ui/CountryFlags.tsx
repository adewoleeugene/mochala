'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface CountryFlagsProps {
  countries: string[]
  className?: string
}

const countryEmojis: Record<string, string> = {
  'USA': '🇺🇸',
  'UK': '🇬🇧',
  'Nigeria': '🇳🇬',
  'South Africa': '🇿🇦',
  'UAE': '🇦🇪',
  'Ghana': '🇬🇭',
  'France': '🇫🇷',
  'Italy': '🇮🇹',
  'Canada': '🇨🇦',
  'Germany': '🇩🇪',
  'Netherlands': '🇳🇱',
  'Sierra Leone': '🇸🇱'
}

export function CountryFlags({ countries, className }: CountryFlagsProps) {
  return (
    <div className={cn('flex flex-wrap gap-4 justify-center', className)}>
      {countries.map((country, index) => (
        <motion.div
          key={country}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.1 
          }}
          whileHover={{ scale: 1.2 }}
          className="text-3xl cursor-pointer transition-transform duration-200 bg-white/20 backdrop-blur-sm rounded-full p-2 shadow-md border border-white/30"
          title={country}
        >
          {countryEmojis[country] || '🌍'}
        </motion.div>
      ))}
    </div>
  )
}
