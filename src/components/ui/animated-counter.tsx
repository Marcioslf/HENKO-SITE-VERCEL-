import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  value: string
  className?: string
}

export function AnimatedCounter({ value, className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Extract numeric parts and symbols (e.g., "+180%" -> prefix="+", num=180, suffix="%")
    const match = value.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/)
    if (!match) return

    const prefix = match[1] || ''
    const targetNum = parseFloat(match[2])
    const suffix = match[3] || ''
    const isDecimal = match[2].includes('.')
    const decimals = isDecimal ? (match[2].split('.')[1] || '').length : 0

    let animationFrameId: number | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start = 0
            const duration = 1400
            const startTime = performance.now()

            const update = (now: number) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              // EaseOutExpo
              const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
              const currentNum = start + (targetNum - start) * easeProgress

              setDisplayValue(
                `${prefix}${currentNum.toFixed(decimals)}${suffix}`
              )

              if (progress < 1) {
                animationFrameId = requestAnimationFrame(update)
              } else {
                setDisplayValue(value)
              }
            }

            if (animationFrameId) cancelAnimationFrame(animationFrameId)
            animationFrameId = requestAnimationFrame(update)
          } else {
            // Reset when leaving view so it counts up again when scrolled into view
            if (animationFrameId) cancelAnimationFrame(animationFrameId)
            setDisplayValue(`${prefix}0${suffix}`)
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(el)
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  )
}
