'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface StatsCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function StatsCounter({ 
  end, 
  duration = 2, 
  prefix = '', 
  suffix = '',
  className 
}: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * end))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, end, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn('text-4xl font-bold text-primary', className)}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.div>
  )
}
