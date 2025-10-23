'use client'

import { motion } from 'framer-motion'
import { Card, CardProps } from './Card'
import { cn } from '@/lib/utils'

export interface AnimatedCardProps extends CardProps {
  delay?: number
  children: React.ReactNode
}

export function AnimatedCard({ 
  className, 
  children, 
  delay = 0,
  ...props 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card
        className={cn(
          'h-full transition-all duration-300 hover:shadow-lg',
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  )
}
