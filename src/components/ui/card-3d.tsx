import React, { useRef, useState } from 'react'

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  maxTilt?: number
  glareOpacity?: number
}

export function Card3D({
  children,
  className = '',
  maxTilt = 8,
  glareOpacity = 0.18,
  style,
  ...props
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
    )
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: glareOpacity,
    })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlarePos((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease, opacity 750ms var(--ease-out-soft, ease), filter 750ms var(--ease-out-soft, ease)',
      }}
      className={`relative group ${className}`}
      {...props}
    >
      {/* 3D Inner Content */}
      <div className="w-full h-full" style={{ transform: 'translateZ(18px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>

      {/* Dynamic Cursor Glare */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 36, 23, ${glarePos.opacity * 0.4}), rgba(255, 255, 255, ${glarePos.opacity * 0.6}), transparent 80%)`,
        }}
      />
    </div>
  )
}
