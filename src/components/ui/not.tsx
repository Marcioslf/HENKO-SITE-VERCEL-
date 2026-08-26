import React, { useEffect, useState } from 'react'
import { RotateCcw } from 'lucide-react'

const whatsappUrl =
  'https://wa.me/5569981070561?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20o%20meu%20projeto%20com%20a%20Henko%20Studio.'

export interface NotProps {
  laptopRef?: React.RefObject<HTMLDivElement | null>
  className?: string
}

export function Not({ laptopRef, className = '' }: NotProps) {
  const [bootState, setBootState] = useState<'booting' | 'ready'>('booting')
  const [progress, setProgress] = useState(0)

  const startBootSequence = () => {
    setBootState('booting')
    setProgress(0)

    const t1 = setTimeout(() => {
      setProgress(35)
    }, 280)

    const t2 = setTimeout(() => {
      setProgress(72)
    }, 700)

    const t3 = setTimeout(() => {
      setProgress(100)
    }, 1150)

    const t4 = setTimeout(() => {
      setBootState('ready')
    }, 1600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }

  useEffect(() => {
    const cleanup = startBootSequence()
    return cleanup
  }, [])

  return (
    <div
      ref={laptopRef}
      className={`laptop-scene select-none group/laptop ${className}`}
      aria-label="Notebook exibindo site criado pela Henko Studio"
    >
      {/* MacBook Pro Display Lid */}
      <div className="laptop-lid">
        <div className="laptop-camera">
          <div className="camera-lens" />
        </div>

        <div className="laptop-screen">
          {/* Preload / Boot-Up Animation Layer */}
          <div
            className="screen-boot-layer"
            data-loaded={bootState === 'ready'}
          >
            {/* Center Logo with Pulse */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="boot-logo-pulse flex items-center justify-center size-12 sm:size-14 rounded-2xl bg-gradient-to-br from-primary/30 to-black/80 border border-primary/50 shadow-[0_0_24px_rgba(255,36,23,0.4)]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HENKO%20LOGO-PmKPWXfVdfbvgO4L8nLfRoWCzoennM.png"
                  alt="Henko"
                  className="h-5 sm:h-6 w-auto"
                />
              </div>

              {/* Progress bar */}
              <div className="w-32 sm:w-44 h-1 bg-zinc-900 border border-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-deep via-primary to-primary-bright shadow-[0_0_8px_rgba(255,36,23,0.8)] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[10px] text-muted-foreground font-medium tabular-nums">
                {progress}%
              </span>
            </div>
          </div>

          {/* Actual Site Interface (Revealed) */}
          <div className="mock-site" data-revealed={bootState === 'ready'}>
            {/* Screen Navigation */}
            <div className="mock-nav">
              <span className="mock-mark">Henko</span>
              <div className="mock-links">
                <span>Studio</span>
                <span>Expertise</span>
                <span>Contato</span>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mock-pill">
                Iniciar projeto
              </a>
            </div>

            {/* Screen Hero Body */}
            <div className="mock-body">
              <div className="mock-badge">ESTRATÉGIA · DESIGN · TECNOLOGIA</div>
              <h2>
                Transformamos<br />
                presença em <em>impacto.</em>
              </h2>
              <div className="mock-bottom">
                <span className="mock-caption">Experiências digitais para marcas que lideram.</span>
                <div className="mock-stats">
                  <div className="stat-item">
                    <b>12+</b>
                    <small>anos criando</small>
                  </div>
                  <div className="stat-item">
                    <b>98%</b>
                    <small>de aprovação</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Replay Button on Hover */}
          {bootState === 'ready' && (
            <button
              onClick={(e) => {
                e.preventDefault()
                startBootSequence()
              }}
              title="Reiniciar animação de preload"
              className="absolute top-2 right-2 z-30 opacity-0 group-hover/laptop:opacity-100 transition-all duration-200 flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-foreground bg-black/80 hover:bg-black border border-white/20 hover:border-primary/40 rounded-full px-2.5 py-1 backdrop-blur-sm shadow-md"
            >
              <RotateCcw className="size-2.5 text-primary" />
              <span>Replay</span>
            </button>
          )}

          <div className="screen-glare" />
        </div>
      </div>

      {/* MacBook Pro Aluminum Chassis Base */}
      <div className="laptop-chassis">
        <div className="laptop-base">
          <div className="laptop-lip" />
        </div>
      </div>

      {/* Realistic Shadow & Subtle Glow */}
      <div className="laptop-shadow" />
    </div>
  )
}

export default Not
