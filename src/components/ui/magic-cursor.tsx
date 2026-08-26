import { useEffect, useRef, useState } from 'react'

export function MagicCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only enable on non-touch pointer devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const onMouseDown = () => setIsClicking(true)
    const onMouseUp = () => setIsClicking(false)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    // Smooth trailing ring loop
    const render = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      rafId = requestAnimationFrame(render)
    }

    // Detect interactive targets for hover expansion
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return

      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, .action-button, .card-3d, .nav-link, .menu-link'
      )
      setIsHovered(!!interactive)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onMouseLeave)
    document.documentElement.addEventListener('mouseenter', onMouseEnter)

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.documentElement.removeEventListener('mouseleave', onMouseLeave)
      document.documentElement.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [isVisible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <div
      id="magic-cursor"
      className={`pointer-events-none fixed inset-0 z-[99999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Precision Inner Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -ml-1.5 -mt-1.5 size-3 rounded-full bg-primary shadow-[0_0_12px_rgba(255,36,23,0.8)] transition-transform duration-75 will-change-transform ${
          isHovered ? 'scale-0' : isClicking ? 'scale-75' : 'scale-100'
        }`}
      />

      {/* Trailing Ambient Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -ml-5 -mt-5 size-10 rounded-full border border-primary/60 transition-[width,height,background-color,border-color,transform] duration-200 ease-out will-change-transform ${
          isHovered
            ? '-ml-7 -mt-7 size-14 bg-primary/20 border-primary shadow-[0_0_24px_rgba(255,36,23,0.5)] backdrop-blur-[1px]'
            : isClicking
            ? '-ml-4 -mt-4 size-8 border-primary/90 bg-primary/30 scale-90'
            : 'bg-transparent'
        }`}
      />
    </div>
  )
}
