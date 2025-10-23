'use client'

import React from 'react'

interface SilkBackgroundFallbackProps {
  className?: string
  color?: string
  speed?: number
}

export function SilkBackgroundFallback({ 
  className = '', 
  color = '#8B7355',
  speed = 1 
}: SilkBackgroundFallbackProps) {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* Multiple animated layers for silk effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, ${color}40 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, ${color}30 0%, transparent 50%),
            radial-gradient(ellipse at 40% 80%, ${color}20 0%, transparent 50%)
          `,
          animation: `silkFloat1 ${8 / speed}s ease-in-out infinite alternate`
        }}
      />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse at 60% 30%, ${color}30 0%, transparent 50%),
            radial-gradient(ellipse at 30% 70%, ${color}20 0%, transparent 50%)
          `,
          animation: `silkFloat2 ${12 / speed}s ease-in-out infinite alternate`
        }}
      />
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: `
            radial-gradient(ellipse at 70% 60%, ${color}25 0%, transparent 50%),
            radial-gradient(ellipse at 10% 40%, ${color}15 0%, transparent 50%)
          `,
          animation: `silkFloat3 ${15 / speed}s ease-in-out infinite alternate`
        }}
      />
      
      <style jsx>{`
        @keyframes silkFloat1 {
          0% { transform: translateX(-10px) translateY(-5px) scale(1); }
          100% { transform: translateX(10px) translateY(5px) scale(1.1); }
        }
        
        @keyframes silkFloat2 {
          0% { transform: translateX(5px) translateY(-10px) scale(1.05); }
          100% { transform: translateX(-5px) translateY(10px) scale(0.95); }
        }
        
        @keyframes silkFloat3 {
          0% { transform: translateX(-8px) translateY(8px) scale(0.9); }
          100% { transform: translateX(8px) translateY(-8px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

export default SilkBackgroundFallback
