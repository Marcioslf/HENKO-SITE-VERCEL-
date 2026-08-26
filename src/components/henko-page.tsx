import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import Lenis from 'lenis'
import { Application } from '@splinetool/runtime'
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Code2,
  Layers3,
  Menu,
  MessageCircle,
  PenTool,
  Quote,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react'
import { TextureOverlay } from '@/components/ui/texture-overlay'
import { SiteIntroPreloader } from '@/components/ui/site-intro-preloader'
import { Card3D } from '@/components/ui/card-3d'
import { Not } from '@/components/ui/not'
import { MagicCursor } from '@/components/ui/magic-cursor'
import { BackToTop } from '@/components/ui/back-to-top'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { motion, type Variants } from 'motion/react'
import { MotionHeroTitle } from '@/components/ui/motion-hero-title'

const whatsappUrl = 'https://wa.me/5569981070561?text=Quero%20um%20or%C3%A7amento'

const services = [
  {
    icon: PenTool,
    category: 'Branding & Identidade',
    number: '01',
    title: 'Criativos de alto valor',
    text: 'Peças visuais, identidades e campanhas construídas para elevar percepção e fazer sua marca ser lembrada.',
    benefit: 'Mais valor percebido',
    whatsappMsg: 'Olá! Gostaria de solicitar um orçamento para Criativos de alto valor.',
    featured: false,
    badge: 'Alta Performance',
    sparkline: [35, 55, 45, 70, 65, 88, 95],
  },
  {
    icon: Code2,
    category: 'Web Design & Presença',
    number: '02',
    title: 'Sites profissionais',
    text: 'Sites institucionais e landing pages com direção de arte precisa, narrativa e performance real.',
    benefit: 'Presença que converte',
    whatsappMsg: 'Olá! Gostaria de solicitar um orçamento para Sites profissionais.',
    featured: true,
    badge: 'Mais Escolhido',
    sparkline: [40, 60, 55, 80, 75, 92, 100],
  },
  {
    icon: Layers3,
    category: 'Lançamentos & Conversão',
    number: '03',
    title: 'Sites de lançamento',
    text: 'Páginas de vendas e captura desenhadas para conduzir atenção, desejo e decisão em cada dobra.',
    benefit: 'Estrutura para escalar',
    whatsappMsg: 'Olá! Gostaria de solicitar um orçamento para Sites de lançamento.',
    featured: false,
    badge: 'Alta Conversão',
    sparkline: [30, 45, 60, 70, 85, 90, 98],
  },
]

const differentials = [
  {
    number: '01',
    label: 'Direção de arte em cada detalhe',
    desc: 'Cada pixel desenhado para transmitir autoridade e distinção visual imediata.',
    metric: '100% Personalizado',
    percent: 100,
  },
  {
    number: '02',
    label: 'Design orientado à conversão',
    desc: 'Narrativa visual e gatilhos de decisão focados em retorno real para o seu negócio.',
    metric: 'Foco em ROI',
    percent: 96,
  },
  {
    number: '03',
    label: 'Processo claro, sem ruído',
    desc: 'Metodologia direta com os diretores de arte, com prazos e entregas pontuais.',
    metric: 'Sem Fricção',
    percent: 98,
  },
  {
    number: '04',
    label: 'Performance e velocidade máxima',
    desc: 'Carregamento instantâneo, otimização técnica e tecnologia de ponta.',
    metric: 'Nota Máxima',
    percent: 99,
  },
]

const process = [
  {
    stage: '01',
    title: 'Briefing',
    description: 'Entendemos seu negócio, público e os objetivos de posicionamento.',
    category: 'Diagnóstico',
  },
  {
    stage: '02',
    title: 'Direção',
    description: 'Definimos o conceito visual, arquitetura de informação e narrativa.',
    category: 'Conceito',
  },
  {
    stage: '03',
    title: 'Construção',
    description: 'Desenvolvimento do design e código com rigor estético e técnico.',
    category: 'Execução',
  },
  {
    stage: '04',
    title: 'Entrega',
    description: 'Publicação, testes de responsividade e entrega completa.',
    category: 'Publicação',
  },
]

const testimonials = [
  {
    tag: 'Projeto Verificado',
    quote: '“A Henko traduziu o valor do nosso trabalho em uma presença visual muito acima do que tínhamos.”',
    name: 'Marina Costa',
    role: 'Fundadora',
    company: 'Vértice Studio',
    initials: 'MC',
    metric: '+180% percepção de valor',
  },
  {
    tag: 'Projeto Verificado',
    quote: '“O novo site mudou a qualidade das conversas comerciais. As pessoas chegam entendendo nosso nível.”',
    name: 'Rafael Mendes',
    role: 'CEO & Founder',
    company: 'Noma Capital',
    initials: 'RM',
    metric: '3.4x mais conversão',
  },
  {
    tag: 'Projeto Verificado',
    quote: '“Direção impecável, processo objetivo e uma entrega que superou tudo o que imaginávamos.”',
    name: 'Luiza Prado',
    role: 'Head de Marketing',
    company: 'Aurora Films',
    initials: 'LP',
    metric: '100% de satisfação',
  },
]

export function HenkoPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [heroCycle, setHeroCycle] = useState(0)
  const hasScrolledDown = useRef(false)
  const heroRef = useRef<HTMLElement>(null)
  const laptopRef = useRef<HTMLDivElement>(null)
  const timelineRan = useRef(false)

  const runHeroAnimation = () => {
    if (timelineRan.current) return
    timelineRan.current = true

    // C. Split de Tipografia Cinética
    let heroTitle: SplitType | null = null
    try {
      const titleEl = document.querySelector('.hero-title')
      if (titleEl) {
        heroTitle = new SplitType('.hero-title', {
          types: 'lines,words',
          lineClass: 'split-line-wrapper',
          wordClass: 'split-word',
        })
      }
    } catch {
      // Graceful fallback
    }

    // D. Timeline GSAP de Entrada (Cinematic Reveal)
    const tl = gsap.timeline({
      defaults: {
        ease: 'power4.out',
        duration: 1.3,
      },
    })

    tl.set('.hero-container', { visibility: 'visible' })
      .fromTo(
        '.header-nav',
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, clearProps: 'transform,opacity' }
      )
      .fromTo(
        '.hero-badge',
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1, clearProps: 'all' },
        '-=0.7'
      )

    if (heroTitle?.words && heroTitle.words.length > 0) {
      tl.fromTo(
        heroTitle.words,
        { y: '140%', rotateX: -35, opacity: 0 },
        { y: '0%', rotateX: 0, opacity: 1, stagger: 0.035, duration: 1.3, clearProps: 'transform,opacity' },
        '-=0.8'
      )
    }

    tl.fromTo(
      '.hero-description',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, clearProps: 'all' },
      '-=0.8'
    ).fromTo(
      '.hero-cta-group .btn',
      { y: 25, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.9, clearProps: 'all' },
      '-=0.8'
    )
  }

  useEffect(() => {
    // A. Inicialização do Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // Safety fallback to guarantee hero text is always revealed
    const fallbackTimer = setTimeout(() => {
      runHeroAnimation()
    }, 2000)

    // B. Inicialização do Canvas Spline 3D
    const canvas = document.getElementById('canvas3d') as HTMLCanvasElement | null
    if (canvas) {
      try {
        new Application(canvas)
        gsap.to('#canvas3d', { opacity: 1, duration: 1.5, ease: 'power2.out' })
      } catch {
        // Fallback gracefully
      }
    }

    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -10% 0px' }
    )

    revealItems.forEach((item) => observer.observe(item))

    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))

    let ticking = false
    const update = () => {
      ticking = false
      const doc = document.documentElement
      const viewport = window.innerHeight
      const scrollable = Math.max(doc.scrollHeight - viewport, 1)
      const currentProgress = window.scrollY / scrollable
      setScrollProgress(currentProgress)
      doc.style.setProperty('--page-progress', currentProgress.toFixed(4))
      setScrolled(window.scrollY > 20)

      parallaxItems.forEach((item) => {
        const box = item.getBoundingClientRect()
        if (box.bottom < -200 || box.top > viewport + 200) return
        const speed = Number(item.dataset.parallax) || 0
        const distance = (box.top + box.height / 2 - viewport / 2) * -speed
        item.style.setProperty('--parallax-y', `${distance.toFixed(1)}px`)
      })

      const hero = heroRef.current
      const laptop = laptopRef.current
      if (!hero || !laptop) return
      const rect = hero.getBoundingClientRect()
      const range = Math.max(hero.offsetHeight - window.innerHeight, 1)
      const progress = Math.min(Math.max(-rect.top / range, 0), 1)
      laptop.style.setProperty('--scroll-progress', progress.toFixed(3))
    }

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
      const y = window.scrollY
      if (y > 280) {
        hasScrolledDown.current = true
      } else if (y < 40 && hasScrolledDown.current) {
        hasScrolledDown.current = false
        setHeroCycle((c) => c + 1)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      clearTimeout(fallbackTimer)
      cancelAnimationFrame(rafId)
      lenis.destroy()
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  const nav = ['Início', 'Serviços', 'Sobre', 'Contato']
  const idFor = (item: string) => `#${item.toLowerCase().replace('í', 'i')}`

  return (
    <main className="overflow-clip bg-background text-foreground selection:bg-primary selection:text-white">
      {/* MAGIC FOLLOWER CURSOR (tw-magic-cursor) */}
      <MagicCursor />

      {/* BACK TO TOP WITH CIRCULAR SCROLL TRACK */}
      <BackToTop />

      {/* 3D SCROLL PROGRESS TRACK */}
      <div className="scroll-track-3d" aria-hidden="true">
        <div className="scroll-bar-3d" />
      </div>

      {/* CINEMATIC SITE OPENING PRELOADER */}
      <SiteIntroPreloader onComplete={runHeroAnimation} />

      {/* Mobile Menu Backdrop Overlay */}
      {menuOpen && (
        <div
          className="side-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* GLOBAL HUD HEADER */}
      <header
        data-scrolled={scrolled}
        className="header-nav site-header fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-2xl"
      >
        <div className="header-inner mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-4">
            <a href="#inicio" aria-label="Henko Studio — início" className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HENKO%20LOGO-PmKPWXfVdfbvgO4L8nLfRoWCzoennM.png"
                alt="Henko Studio"
                className="h-7 sm:h-8 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex" aria-label="Navegação principal">
            {nav.map((item) => (
              <a
                key={item}
                href={idFor(item)}
                className="nav-link transition-colors hover:text-foreground py-1"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="action-button btn-glass-primary flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Orçamento</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <button
            className="flex size-10 items-center justify-center rounded-full border border-border p-2.5 text-foreground md:hidden transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {menuOpen && (
          <nav className="menu-panel flex flex-col gap-4 border-t border-border/70 bg-background/95 backdrop-blur-2xl px-5 py-6 shadow-2xl md:hidden">
            {nav.map((item, index) => (
              <a
                onClick={() => setMenuOpen(false)}
                key={item}
                href={idFor(item)}
                className="menu-link py-1.5 text-lg font-medium text-foreground transition-colors hover:text-primary"
                style={{ '--reveal-index': index } as React.CSSProperties}
              >
                {item}
              </a>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="btn-glass-primary flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold mt-2"
            >
              <span>Falar no WhatsApp</span>
              <ArrowRight className="size-4" />
            </a>
          </nav>
        )}
        <span className="scroll-progress" aria-hidden="true" />
      </header>

      {/* HERO SECTION WITH GSAP, SPLIT-TYPE & SPLINE 3D */}
      <section
        id="inicio"
        ref={heroRef}
        className="hero-container relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 pb-8 sm:pt-28 sm:pb-12 overflow-hidden"
      >
        {/* Ambient Video Background & Canvas Spline 3D */}
        <div className="canvas-wrapper pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-65 contrast-[1.12] brightness-[0.92] saturate-[1.3] transition-opacity duration-1000"
            src="/intro.mp4"
          />
          <canvas id="canvas3d" className="absolute inset-0 z-10 pointer-events-none" />
          {/* Subtle Radial Vignette & Edge Dissolves */}
          <div className="absolute inset-0 bg-radial-vignette opacity-60 z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-background/60 z-20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
        </div>

        <div data-parallax=".08" className="hero-light z-[1]" />

        {/* MAIN HERO CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 md:px-8 my-auto pt-6 sm:pt-10">
          <div className="hero-copy flex flex-col items-center text-center gap-6 sm:gap-7 md:gap-9 mx-auto">
            {/* Badge with Motion */}
            <motion.div
              key={`hero-badge-${heroCycle}`}
              initial={{ opacity: 0, y: -18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="hero-badge inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/50 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm font-medium text-foreground/90 shadow-lg tracking-wide"
            >
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span>Experiências Digitais de Alto Valor</span>
            </motion.div>

            {/* Headline H1 with 3D Motion Reveal */}
            <MotionHeroTitle key={`hero-title-${heroCycle}`} />

            {/* Description with Motion */}
            <motion.p
              key={`hero-desc-${heroCycle}`}
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
              className="hero-description max-w-2xl text-pretty text-base sm:text-lg md:text-xl leading-relaxed text-foreground/90 font-normal"
            >
              Transformamos marcas em referências visuais imediatas. Criamos sites e experiências digitais de alto padrão para negócios que competem no topo do mercado.
            </motion.p>

            {/* CTA Group with Motion */}
            <motion.div
              key={`hero-cta-${heroCycle}`}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
              className="hero-cta-group flex flex-col items-center gap-3.5 pt-2 sm:pt-4"
            >
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-glass-primary hero-btn-magnetic action-button flex items-center gap-3 rounded-full px-9 py-4 sm:px-11 sm:py-4.5 text-base sm:text-lg font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
                <span>Falar no WhatsApp</span>
                <ArrowRight className="size-4 hero-btn-arrow" aria-hidden="true" />
              </motion.a>

              <div className="btn flex items-center gap-2 text-xs text-muted-foreground/90 font-medium">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Disponibilidade imediata · Resposta em até 2h</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Link */}
        <div className="relative z-10 mx-auto mt-auto pt-8 pb-1 text-center">
          <a
            href="#servicos"
            className="hero-scroll flex items-center justify-center gap-2.5 text-xs sm:text-sm font-medium tracking-wide text-muted-foreground/80 transition-colors hover:text-foreground py-1"
          >
            <span>Explore o que fazemos</span>
            <span className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/10 glass-panel">
              <ArrowDownRight className="size-3.5 sm:size-4 text-primary" />
            </span>
          </a>
        </div>
      </section>

      {/* SERVICES SECTION (3D Motion Entrance) */}
      <section id="servicos" className="relative py-16 sm:py-24 md:py-36 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionTitle
            eyebrow="Capacidades & Serviços"
            title="Engenharia visual construída para"
            accent="gerar valor real."
          />

          <div className="mt-10 sm:mt-14 md:mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, ...service }, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.12,
                }}
                className="last:md:col-span-2 last:lg:col-span-1"
              >
                <Card3D maxTilt={10} className="rounded-2xl sm:rounded-3xl h-full">
                  <article
                    className={`glass-panel glass-card relative overflow-hidden flex min-h-80 sm:min-h-88 md:min-h-96 flex-col rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-9 h-full ${
                      service.featured ? 'border-primary/40 shadow-[0_0_40px_rgba(255,36,23,0.18)]' : ''
                    }`}
                  >
                    <TextureOverlay texture="dots" opacity={0.35} className="group-hover:opacity-60 transition-opacity duration-500 rounded-[inherit]" />
                    {/* Card Header */}
                    <div className="relative z-10 flex items-center justify-between pb-3 border-b border-border/50 text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="glass-icon transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                          <Icon className="text-primary size-5" />
                        </span>
                        <span className="text-xs font-semibold tracking-wide text-foreground/80">
                          {service.category}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${
                          service.featured
                            ? 'border-primary/40 bg-primary/10 text-primary animate-pulse'
                            : 'border-border/60 text-muted-foreground'
                        }`}
                      >
                        {service.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-auto pt-5 flex flex-col gap-4 sm:gap-5">
                      <SplitText
                        as="h3"
                        text={service.title}
                        stagger={40}
                        delay={140}
                        className="max-w-xs text-2xl sm:text-3xl font-medium tracking-tight"
                      />
                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {service.text}
                      </p>

                      {/* Visual Impact Sparkline */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="flex items-end gap-1.5 h-6">
                          {service.sparkline.map((val, i) => (
                            <motion.span
                              key={i}
                              initial={{ height: 4 }}
                              whileInView={{ height: `${val * 0.22}px` }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                              className="w-1.5 rounded-t bg-primary/60 transition-all duration-300 group-hover:bg-primary group-hover:brightness-125"
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-medium text-muted-foreground/80">
                          Alto Impacto
                        </span>
                      </div>

                      {/* Card Action */}
                      <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                          <Check className="size-3.5 shrink-0" />
                          {service.benefit}
                        </div>
                        <a
                          href={`https://wa.me/5569981070561?text=${encodeURIComponent(service.whatsappMsg)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-glass-secondary rounded-full px-3.5 py-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/90 hover:text-primary transition-all duration-300"
                        >
                          <span>Solicitar orçamento</span>
                          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </article>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS / SOBRE (3D Motion Entrance) */}
      <section id="sobre" className="py-16 sm:py-24 md:py-36 bg-background/50 border-t border-border/40">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 md:gap-14 px-4 sm:px-6 md:px-8 lg:grid-cols-[.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 sm:gap-8"
          >
            <Eyebrow text="Autoridade & Padrão" />
            <SplitText
              as="h2"
              text="O padrão visual da sua marca diz"
              accent="quanto ela vale."
              accentClassName="text-primary"
              delay={140}
              className="text-balance text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight md:leading-none tracking-[-.04em] md:tracking-[-.05em]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <Card3D maxTilt={6} glareOpacity={0.12} className="rounded-2xl sm:rounded-3xl h-full">
              <div className="glass-panel relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 h-full">
                <TextureOverlay texture="dots" opacity={0.25} className="rounded-[inherit]" />
                <div className="relative z-10 flex flex-col">
                  {differentials.map((item, index) => (
                    <motion.div
                      key={item.number}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="list-row flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 border-b border-border/70 py-4 last:border-0 hover:bg-white/[0.02] px-2 rounded-xl transition-colors"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-primary">{item.number}.</span>
                          <span className="text-base sm:text-lg font-medium text-foreground">{item.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                      </div>
                      <span className="self-start sm:self-center shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary shadow-[0_0_12px_rgba(255,36,23,0.15)]">
                        <AnimatedCounter value={item.metric} />
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </section>

      {/* PROCESS / METODOLOGIA (3D Sequential Motion) */}
      <section id="metodologia" className="hero-grid border-y border-border/60 py-16 sm:py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionTitle
            eyebrow="Metodologia de Entrega"
            title="Clareza do briefing"
            accent="à publicação."
          />

          <div className="mt-10 sm:mt-14 md:mt-16 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, y: 35, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.12,
                }}
              >
                <Card3D maxTilt={9} className="rounded-2xl sm:rounded-3xl h-full">
                  <article className="glass-panel glass-card relative overflow-hidden flex min-h-60 sm:min-h-72 flex-col rounded-2xl sm:rounded-3xl p-6 sm:p-7 h-full">
                    <TextureOverlay texture="dots" opacity={0.3} className="group-hover:opacity-55 transition-opacity duration-500 rounded-[inherit]" />
                    <div className="relative z-10 flex items-center justify-between text-xs text-muted-foreground pb-3 border-b border-border/50">
                      <span className="text-primary font-bold text-sm">Etapa {stage.stage}</span>
                      <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-muted border border-border/60">
                        {stage.category}
                      </span>
                    </div>
                    <div className="relative z-10 mt-auto pt-4">
                      <SplitText
                        as="h3"
                        text={stage.title}
                        stagger={45}
                        delay={160}
                        className="mb-2 sm:mb-3 block text-xl sm:text-2xl font-medium"
                      />
                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {stage.description}
                      </p>
                    </div>
                  </article>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / PROVA SOCIAL (3D Motion Entrance) */}
      <section id="depoimentos" className="py-16 sm:py-24 md:py-36 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionTitle
            eyebrow="Casos de Sucesso"
            title="Resultados reais de quem decidiu"
            accent="não passar despercebido."
          />

          <div className="mt-10 sm:mt-14 md:mt-16 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map(({ quote, name, role, company, initials, metric, tag }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                  delay: index * 0.14,
                }}
                className="last:md:col-span-2 last:lg:col-span-1"
              >
                <Card3D maxTilt={8} className="rounded-2xl sm:rounded-3xl h-full">
                  <figure className="glass-panel glass-card relative overflow-hidden flex min-h-80 sm:min-h-96 flex-col rounded-2xl sm:rounded-3xl p-6 sm:p-8 h-full">
                    <TextureOverlay texture="dots" opacity={0.25} className="group-hover:opacity-45 transition-opacity duration-500 rounded-[inherit]" />
                    <div className="relative z-10 flex items-center justify-between pb-3 border-b border-border/50">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{tag}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary shadow-[0_0_15px_rgba(255,36,23,0.2)]">
                        <TrendingUp className="size-3" />
                        <AnimatedCounter value={metric} />
                      </span>
                    </div>

                    <Quote className="relative z-10 quote-mark size-6 text-primary/70 mt-4" />
                    <SplitText
                      as="blockquote"
                      text={quote}
                      stagger={22}
                      delay={180}
                      className="relative z-10 mt-3 block text-pretty text-lg sm:text-xl leading-relaxed text-foreground/95"
                    />

                    <figcaption className="relative z-10 mt-auto pt-6 border-t border-border/50 flex items-center gap-3.5">
                      <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-muted/80 text-xs sm:text-sm font-semibold text-foreground">
                        {initials}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <strong className="block text-sm sm:text-base font-medium text-foreground">{name}</strong>
                          <span className="flex size-3.5 items-center justify-center rounded-full bg-primary/20 text-primary" title="Registro verificado">
                            <Check className="size-2.5" />
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {role} · <span className="text-foreground/75 font-medium">{company}</span>
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA (3D Perspective Scale Motion) */}
      <section id="contato" className="px-4 sm:px-5 py-12 md:px-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-primary cta-panel relative overflow-hidden mx-auto flex max-w-7xl flex-col items-start gap-8 sm:gap-10 rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 md:p-14 lg:p-16 text-primary-foreground shadow-2xl"
        >
          <TextureOverlay texture="dots" opacity={0.2} className="rounded-[inherit]" />
          <div className="flex w-full items-center justify-between text-xs border-b border-white/20 pb-3 font-medium">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Inicie seu projeto</span>
            </span>
            <span className="text-primary-foreground/90 font-semibold">Vagas Disponíveis</span>
          </div>

          <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Sparkles className="cta-spark size-6 sm:size-7 text-white/90 animate-spin [animation-duration:8s]" />
              <SplitText
                as="h2"
                text="Seu próximo nível visual"
                accent="começa aqui."
                delay={220}
                className="mt-6 sm:mt-8 block max-w-4xl text-balance text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight md:leading-[.95] tracking-[-.04em] md:tracking-[-.05em]"
              />
            </div>
            <motion.a
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.98 }}
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-glass-white action-button flex w-full sm:w-auto shrink-0 items-center justify-center gap-3 rounded-full px-9 py-4.5 text-sm sm:text-base font-bold shadow-[0_14px_40px_rgba(0,0,0,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary cursor-pointer"
            >
              <span>Faça seu orçamento</span>
              <ArrowRight className="size-4" />
            </motion.a>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 border-t border-white/15 pt-5 text-xs text-primary-foreground/85 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Resposta em até 2h no WhatsApp
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span>Orçamento sem compromisso</span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span>Direção sênior dedicada</span>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-8 sm:gap-12 px-4 sm:px-6 py-10 md:px-8 md:py-14 border-t border-border/40">
        <div data-reveal="fade" className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/HENKO%20LOGO-PmKPWXfVdfbvgO4L8nLfRoWCzoennM.png"
              alt="Henko Studio"
              className="h-8 sm:h-9 w-auto self-start"
            />
            <span className="text-xs text-muted-foreground">
              Estúdio de Direção Visual & Presença Digital
            </span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
            {[
              ['Serviços', '#servicos'],
              ['Sobre', '#sobre'],
              ['Contato', whatsappUrl],
              ['Instagram', '#'],
            ].map(([label, href], index) => (
              <a
                data-reveal="up"
                style={{ '--reveal-index': index + 1 } as React.CSSProperties}
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="nav-link hover:text-primary transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div data-reveal="fade" className="flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 Henko Studio. Todos os direitos reservados.</span>
          <span className="text-primary font-medium">Design & Tecnologia de Alta Performance</span>
        </div>
      </footer>
    </main>
  )
}



const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.06,
    },
  },
}

const textWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 95,
      mass: 0.8,
    },
  },
}

function SectionTitle({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <div className="grid gap-4 md:gap-6 lg:grid-cols-[.45fr_1fr] items-start">
      <Eyebrow text={eyebrow} />
      <SplitText
        as="h2"
        text={title}
        accent={accent}
        accentClassName="text-primary drop-shadow-[0_0_25px_rgba(255,36,23,0.35)]"
        className="max-w-4xl text-balance text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-[-.04em]"
      />
    </div>
  )
}

function Eyebrow({ text, className = '' }: { text: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex h-fit flex-col gap-2.5 sm:gap-3 ${className}`}
    >
      <p className="text-xs sm:text-sm uppercase font-semibold tracking-[.22em] text-primary">
        {text}
      </p>
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="reveal-line h-0.5 w-16 bg-gradient-to-r from-primary to-transparent origin-left"
      />
    </motion.div>
  )
}

type SplitTextProps = {
  text: string
  accent?: string
  accentClassName?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'blockquote' | 'span'
  mode?: 'words' | 'chars'
  stagger?: number
  delay?: number
  className?: string
}

function SplitText({
  text,
  accent,
  accentClassName = '',
  as: Tag = 'span',
  className = '',
}: SplitTextProps) {
  const words = [
    ...text.split(' ').map((val) => ({ val, isAccent: false })),
    ...(accent ? accent.split(' ').map((val) => ({ val, isAccent: true })) : []),
  ]

  const MotionComponent = (motion as unknown as Record<string, React.ComponentType<{
    variants?: unknown
    initial?: string
    whileInView?: string
    viewport?: unknown
    style?: React.CSSProperties
    className?: string
    children?: React.ReactNode
  }>>)[Tag] || motion.span

  return (
    <MotionComponent
      variants={textContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={`inline-block ${className}`}
    >
      <span className="sr-only">{accent ? `${text} ${accent}` : text}</span>
      {words.map((item, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden pb-1 -mb-1 align-top"
          aria-hidden="true"
        >
          <motion.span
            variants={textWordVariants}
            className={`inline-block mr-[0.25em] will-change-transform ${
              item.isAccent ? accentClassName : 'text-foreground'
            }`}
          >
            {item.val}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  )
}
