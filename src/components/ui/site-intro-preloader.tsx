import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

interface SiteIntroPreloaderProps {
  onComplete?: () => void
  videoSrc?: string
}

export function SiteIntroPreloader({
  onComplete,
  videoSrc = '/intro.mp4',
}: SiteIntroPreloaderProps) {
  const [phase, setPhase] = useState<'playing' | 'fading' | 'done'>('playing')
  const [progress, setProgress] = useState(0)
  const [hasVideo, setHasVideo] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Smooth exit transition into site
  const handleTransitionOut = () => {
    if (phase !== 'playing') return
    setPhase('fading')
    onComplete?.()
    setTimeout(() => {
      setPhase('done')
    }, 1000)
  }

  const toggleSound = () => {
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setPhase('done')
      onComplete?.()
      return
    }

    const videoEl = videoRef.current
    if (videoEl) {
      videoEl.play().catch(() => {
        // Autoplay policy fallback
      })
    }
  }, [onComplete])

  if (phase === 'done') return null

  const isFading = phase === 'fading'

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#060608] flex items-center justify-center overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFading ? 'opacity-0 scale-105 pointer-events-none filter blur-xl' : 'opacity-100 scale-100 pointer-events-auto'
      }`}
      aria-label="Abertura em vídeo da Henko Studio"
    >
      {/* Fullscreen Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted={isMuted}
        playsInline
        onCanPlay={() => setHasVideo(true)}
        onPlay={() => setHasVideo(true)}
        onTimeUpdate={(e) => {
          const el = e.currentTarget
          if (el.duration) {
            setProgress((el.currentTime / el.duration) * 100)
          }
        }}
        onEnded={handleTransitionOut}
        onError={() => {
          setHasVideo(false)
          handleTransitionOut()
        }}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-10"
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-[#060608]/80 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-40 z-20" />

      {/* Top Header Label & Sound Toggle */}
      <div className="absolute top-6 sm:top-8 inset-x-6 sm:inset-x-10 z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-foreground/90 uppercase">
            Henko Studio
          </span>
        </div>

        {hasVideo && (
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
            className="flex items-center gap-2 text-xs text-foreground/80 hover:text-white transition-all px-3 py-1.5 rounded-full border border-white/20 hover:border-primary/50 bg-black/60 hover:bg-black/90 backdrop-blur-md shadow-lg"
          >
            {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5 text-primary" />}
            <span className="hidden sm:inline">{isMuted ? 'Ativar som' : 'Som ativado'}</span>
          </button>
        )}
      </div>

      {/* Bottom Progress Line & Skip Action */}
      <div className="absolute bottom-6 sm:bottom-10 inset-x-6 sm:inset-x-12 z-30 flex flex-col items-center gap-4 max-w-4xl mx-auto">
        <div className="w-full h-1 bg-white/15 overflow-hidden relative rounded-full backdrop-blur-md">
          <div
            className="h-full bg-gradient-to-r from-primary-deep via-primary to-primary-bright shadow-[0_0_14px_rgba(255,36,23,1)] transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex w-full items-center justify-between text-xs text-muted-foreground font-medium">
          <span className="text-[11px] sm:text-xs tracking-wide">
            Henko Studio // Direção Visual
          </span>

          <button
            onClick={handleTransitionOut}
            className="text-xs text-foreground/90 hover:text-white transition-all px-4 py-1.5 rounded-full border border-white/20 hover:border-primary/50 bg-black/70 hover:bg-black/95 backdrop-blur-md shadow-xl"
          >
            Entrar no site ↗
          </button>
        </div>
      </div>
    </div>
  )
}
