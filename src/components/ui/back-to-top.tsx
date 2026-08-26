import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement
      const totalScroll = doc.scrollHeight - window.innerHeight
      const current = window.scrollY

      if (totalScroll > 0) {
        setScrollProgress((current / totalScroll) * 100)
      }
      setVisible(current > 350)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      aria-label="Voltar ao topo da página"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex size-11 sm:size-12 items-center justify-center rounded-full bg-background/80 border border-white/15 text-foreground backdrop-blur-xl shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:border-primary/60 hover:text-primary active:scale-95 ${
        visible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-6 opacity-0 pointer-events-none'
      }`}
    >
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-white/10"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-primary transition-[stroke-dashoffset] duration-150"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <ArrowUp className="size-4 sm:size-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  )
}
