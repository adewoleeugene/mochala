'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FeatureIconProps {
  icon: LucideIcon
  size?: 'sm' | 'md' | 'lg'
  className?: string
  variant?: 'default' | 'primary' | 'secondary' | 'accent'
}

export function FeatureIcon({ 
  icon: Icon, 
  size = 'md', 
  className,
  variant = 'default'
}: FeatureIconProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  const variantClasses = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={cn(
        'flex items-center justify-center rounded-full transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <Icon className={cn(
        size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-8 h-8'
      )} />
    </motion.div>
  )
}
