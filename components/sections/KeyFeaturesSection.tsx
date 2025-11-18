'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { MessageCircle, Zap, Repeat, Globe, Shield, Clock } from 'react-feather'
import { Button } from '@/components/ui/button'

const DEFAULT_PARTICLE_COUNT = 12
const DEFAULT_SPOTLIGHT_RADIUS = 300
const MOBILE_BREAKPOINT = 768

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Feature cards data with subtle background fills
const featureCards = [
  {
    id: 1,
    title: 'Send to WhatsApp',
    description: 'No registration needed. Send money to any WhatsApp number instantly.',
    icon: MessageCircle,
    stats: '100% WhatsApp compatible',
    size: 'large',
    bgColor: '#593b2c', // Brown for large cards
    hoverBgColor: '#4a3024',
    textColor: '#faf5e9', // Light cream text
  },
  {
    id: 2,
    title: 'Lightning Fast',
    description: 'Transactions are processed in seconds, not days.',
    icon: Zap,
    stats: 'Average 5-second transaction',
    size: 'small',
    bgColor: '#cbc591', // Light olive for small cards
    hoverBgColor: '#bfb885',
    textColor: '#1c1917', // Dark text
  },
  {
    id: 3,
    title: 'Currency Swap',
    description: 'Convert USDC to Leones and vice versa.',
    icon: Repeat,
    stats: '1 USD = 23.5 SLE',
    size: 'small',
    bgColor: '#cbc591', // Light olive for small cards
    hoverBgColor: '#bfb885',
    textColor: '#1c1917', // Dark text
  },
  {
    id: 4,
    title: 'Investments in US Stocks',
    description: 'Invest in US stocks and grow your wealth with global opportunities.',
    icon: Globe,
    stats: 'Global markets',
    size: 'large',
    bgColor: '#593b2c', // Brown for large cards
    hoverBgColor: '#4a3024',
    textColor: '#faf5e9', // Light cream text
  },
  {
    id: 5,
    title: 'Bank-Grade Security',
    description: 'Your funds are protected with blockchain technology.',
    icon: Shield,
    stats: 'Encrypted transactions',
    size: 'small',
    bgColor: '#cbc591', // Light olive for small cards
    hoverBgColor: '#bfb885',
    textColor: '#1c1917', // Dark text
  },
  {
    id: 6,
    title: '24/7 Available',
    description: 'Access your money anytime, anywhere.',
    icon: Clock,
    stats: 'Always on',
    size: 'small',
    bgColor: '#cbc591', // Light olive for small cards
    hoverBgColor: '#bfb885',
    textColor: '#1c1917', // Dark text
  },
]

const createParticleElement = (x: number, y: number, color: string) => {
  const el = document.createElement('div')
  el.className = 'particle'
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${color};
    box-shadow: 0 0 6px ${color};
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `
  return el
}

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
})

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect()
  const relativeX = ((mouseX - rect.left) / rect.width) * 100
  const relativeY = ((mouseY - rect.top) / rect.height) * 100

  card.style.setProperty('--glow-x', `${relativeX}%`)
  card.style.setProperty('--glow-y', `${relativeY}%`)
  card.style.setProperty('--glow-intensity', glow.toString())
  card.style.setProperty('--glow-radius', `${radius}px`)
}

interface ParticleCardProps {
  children: React.ReactNode
  className?: string
  disableAnimations?: boolean
  style?: React.CSSProperties
  particleCount?: number
  glowColor: string
  enableTilt?: boolean
  clickEffect?: boolean
  enableMagnetism?: boolean
}

const ParticleCard: React.FC<ParticleCardProps> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const isHoveredRef = useRef(false)
  const memoizedParticles = useRef<HTMLDivElement[]>([])
  const particlesInitialized = useRef(false)
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null)

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return

    const { width, height } = cardRef.current.getBoundingClientRect()
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    )
    particlesInitialized.current = true
  }, [particleCount, glowColor])

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    magnetismAnimationRef.current?.kill()

    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle)
        }
      })
    })
    particlesRef.current = []
  }, [])

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return

    if (!particlesInitialized.current) {
      initializeParticles()
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return

        const clone = particle.cloneNode(true) as HTMLDivElement
        cardRef.current.appendChild(clone)
        particlesRef.current.push(clone)

        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true
        })

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true
        })
      }, index * 100)

      timeoutsRef.current.push(timeoutId)
    })
  }, [initializeParticles])

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return

    const element = cardRef.current

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      animateParticles()

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        })
      }
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
      clearAllParticles()

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000
        })
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05
        const magnetY = (y - centerY) * 0.05

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return

      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      )

      const ripple = document.createElement('div')
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, ${hexToRgba(glowColor, 0.4)} 0%, ${hexToRgba(glowColor, 0.2)} 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `

      element.appendChild(ripple)

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove()
        }
      )
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)
    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('click', handleClick)

    return () => {
      isHoveredRef.current = false
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('click', handleClick)
      clearAllParticles()
    }
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor])

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
    >
      {children}
    </div>
  )
}

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement>
  disableAnimations?: boolean
  enabled?: boolean
  spotlightRadius?: number
  glowColor: string
}

const GlobalSpotlight: React.FC<GlobalSpotlightProps> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null)
  const isInsideSection = useRef(false)

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return

    const spotlight = document.createElement('div')
    spotlight.className = 'global-spotlight'
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        ${hexToRgba(glowColor, 0.15)} 0%,
        ${hexToRgba(glowColor, 0.08)} 15%,
        ${hexToRgba(glowColor, 0.04)} 25%,
        ${hexToRgba(glowColor, 0.02)} 40%,
        ${hexToRgba(glowColor, 0.01)} 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `
    document.body.appendChild(spotlight)
    spotlightRef.current = spotlight

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return

      const section = gridRef.current.closest('.bento-section')
      const rect = section?.getBoundingClientRect()
      const mouseInside =
        rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom

      isInsideSection.current = mouseInside || false
      const cards = gridRef.current.querySelectorAll('.card')

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
        cards.forEach(card => {
          ;(card as HTMLElement).style.setProperty('--glow-intensity', '0')
        })
        return
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius)
      let minDistance = Infinity

      cards.forEach(card => {
        const cardElement = card as HTMLElement
        const cardRect = cardElement.getBoundingClientRect()
        const centerX = cardRect.left + cardRect.width / 2
        const centerY = cardRect.top + cardRect.height / 2
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2
        const effectiveDistance = Math.max(0, distance)

        minDistance = Math.min(minDistance, effectiveDistance)

        let glowIntensity = 0
        if (effectiveDistance <= proximity) {
          glowIntensity = 1
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity)
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius)
      })

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      })

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      isInsideSection.current = false
      gridRef.current?.querySelectorAll('.card').forEach(card => {
        ;(card as HTMLElement).style.setProperty('--glow-intensity', '0')
      })
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current)
    }
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor])

  return null
}

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

export function KeyFeaturesSection() {
  const gridRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobileDetection()
  const shouldDisableAnimations = isMobile

  const glowColor = '#daffde' // Accent green from your design system

  return (
    <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 relative overflow-hidden bento-section">
      <style jsx global>{`
        .bento-section {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
        }

        .card--border-glow {
          transition: background-color 0.3s ease;
        }

        .card--border-glow:hover {
          background-color: var(--hover-bg) !important;
        }

        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 6px;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
              ${hexToRgba(glowColor, 0.8)} 0%,
              ${hexToRgba(glowColor, 0.4)} 30%,
              transparent 60%);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        .card--border-glow:hover::after {
          opacity: 1;
        }

        .card--border-glow:hover {
          box-shadow: 0 4px 20px rgba(218, 255, 222, 0.4), 0 0 30px ${hexToRgba(glowColor, 0.2)};
        }
      `}</style>

      <GlobalSpotlight
        gridRef={gridRef}
        disableAnimations={shouldDisableAnimations}
        enabled={true}
        spotlightRadius={DEFAULT_SPOTLIGHT_RADIUS}
        glowColor={glowColor}
      />

      <div className="mx-auto max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16"
        >
          <h2 className="text-sm sm:text-base md:text-lg font-semibold mb-3 sm:mb-4 tracking-wide" style={{ color: '#593b2c' }}>
            KEY FEATURES
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl mx-auto">
            Everything you need to <br />
            <span style={{ color: '#593b2c' }}>send money to Sierra Leone</span>
          </p>
        </motion.div>

        {/* Bento Grid - Asymmetric layout matching screenshot */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[260px] gap-2 sm:gap-2 md:gap-2 lg:gap-2 xl:gap-3 2xl:gap-3 mb-10 sm:mb-12 md:mb-14 lg:mb-16 2xl:mb-20"
        >
          {featureCards.map((card, index) => {
            const Icon = card.icon
            const isLarge = card.size === 'large'

            // Define specific grid positioning for bento layout
            let gridClass = ''
            if (index === 0) {
              // Send to WhatsApp - Large card spanning 2 rows on right (rows 1-2, cols 3-4)
              gridClass = 'lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:row-span-2'
            } else if (index === 1) {
              // Lightning Fast - Small card (row 1, col 1)
              gridClass = 'lg:col-start-1 lg:row-start-1'
            } else if (index === 2) {
              // Currency Swap - Small card (row 1, col 2)
              gridClass = 'lg:col-start-2 lg:row-start-1'
            } else if (index === 3) {
              // Remittance - Large card spanning 2 rows on left (rows 2-3, cols 1-2)
              gridClass = 'lg:col-start-1 lg:col-span-2 lg:row-start-2 lg:row-span-2'
            } else if (index === 4) {
              // Security - Small card (row 3, col 3)
              gridClass = 'lg:col-start-3 lg:row-start-3'
            } else if (index === 5) {
              // 24/7 - Small card (row 3, col 4)
              gridClass = 'lg:col-start-4 lg:row-start-3'
            }

            return (
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
                className={gridClass}
              >
                <ParticleCard
                  className={`card card--border-glow h-full flex flex-col justify-between relative w-full ${isLarge ? 'p-5 lg:p-6' : 'p-4 lg:p-5'} rounded-3xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.01] group`}
                  style={{
                    backgroundColor: card.bgColor,
                    color: card.textColor,
                    border: 'none',
                    minHeight: '120px',
                    ['--hover-bg' as string]: card.hoverBgColor,
                  }}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={8}
                  glowColor='rgba(89, 59, 44, 0.3)'
                  enableTilt={false}
                  clickEffect={false}
                  enableMagnetism={false}
                >
                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <div>
                      {/* Icon and Title Inline */}
                      <div className="flex items-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 20
                          }}
                        >
                          <Icon
                            size={isLarge ? 24 : 20}
                            color={card.textColor}
                            className="transition-all duration-300 flex-shrink-0"
                            strokeWidth={2}
                          />
                        </motion.div>
                        <h3
                          className={`font-bold leading-tight tracking-tight ${
                            isLarge ? 'text-xl lg:text-2xl' : 'text-base lg:text-lg'
                          }`}
                          style={{ color: card.textColor }}
                        >
                          {card.title}
                        </h3>
                      </div>
                      <p
                        className={`leading-snug ${
                          isLarge ? 'text-sm lg:text-base' : 'text-xs lg:text-sm'
                        }`}
                        style={{ color: card.textColor, opacity: 0.8 }}
                      >
                        {card.description}
                      </p>
                    </div>

                    {/* Stats */}
                    {card.stats && (
                      <div
                        className={`${isLarge ? 'pt-3 lg:pt-4' : 'pt-2 lg:pt-3'} border-t mt-auto`}
                        style={{ borderColor: `${card.textColor}20` }}
                      >
                        <div
                          className={`font-semibold tracking-wide ${
                            isLarge ? 'text-xs lg:text-sm' : 'text-xs'
                          }`}
                          style={{ color: card.textColor, opacity: 0.7 }}
                        >
                          {card.stats}
                        </div>
                      </div>
                    )}
                  </div>
                </ParticleCard>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 sm:mt-12 md:mt-14 lg:mt-16 2xl:mt-20"
        >
          <div className="bg-secondary rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-7 md:p-8 lg:p-10 xl:p-12 2xl:p-14 text-secondary-foreground">
            <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6 2xl:mb-8">
              Ready to experience the future <br />
              of money transfers?
            </h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl text-secondary-foreground/80 mb-5 sm:mb-6 md:mb-7 lg:mb-8 2xl:mb-10 max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl 2xl:max-w-4xl mx-auto leading-relaxed">
              Join thousands of users who trust Mocha for their international money transfers.
              Fast, secure, and built for Sierra Leone.
            </p>
            <div className="flex justify-center">
              <a href="https://wa.me/23273938372?text=Hi%2C%20I%20want%20to%20learn%20more%20about%20Mocha" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="px-5 sm:px-6 md:px-7 lg:px-8 xl:px-9 2xl:px-10 py-2.5 sm:py-3 md:py-3.5 lg:py-4 2xl:py-5 text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-medium rounded-full"
                  style={{
                    backgroundColor: '#593b2c',
                    color: '#faf5e9'
                  }}
                >
                  Get Started Today
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
