'use client'

import { useEffect, useRef, useState } from 'react'
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

const whatsappUrl = 'https://wa.me/5569981070561?text=Quero%20um%20or%C3%A7amento'

const services = [
  {
    icon: PenTool,
    code: 'MOD.01 // BRANDING',
    number: '01',
    title: 'Criativos de alto valor',
    text: 'Peças visuais, identidades e campanhas construídas para elevar percepção e fazer sua marca ser lembrada.',
    benefit: 'Mais valor percebido',
    whatsappMsg: 'Olá! Gostaria de solicitar um orçamento para Criativos de alto valor.',
    featured: false,
    calib: 'CALIB. 100%',
    sparkline: [35, 55, 45, 70, 65, 88, 95],
  },
  {
    icon: Code2,
    code: 'MOD.02 // ARCHITECTURE',
    number: '02',
    title: 'Sites profissionais',
    text: 'Sites institucionais e landing pages com direção de arte precisa, narrativa e performance real.',
    benefit: 'Presença que converte',
    whatsappMsg: 'Olá! Gostaria de solicitar um orçamento para Sites profissionais.',
    featured: true,
    calib: 'CORE SPEC // HERO',
    sparkline: [40, 60, 55, 80, 75, 92, 100],
  },
  {
    icon: Layers3,
    code: 'MOD.03 // LAUNCH SYSTEM',
    number: '03',
    title: 'Sites de lançamento',
    text: 'Páginas de vendas e captura desenhadas para conduzir atenção, desejo e decisão em cada dobra.',
    benefit: 'Estrutura para escalar',
    whatsappMsg: 'Olá! Gostaria de solicitar um orçamento para Sites de lançamento.',
    featured: false,
    calib: 'CALIB. 100%',
    sparkline: [30, 45, 60, 70, 85, 90, 98],
  },
]

const differentials = [
  {
    code: 'PARAM.01',
    label: 'Direção de arte em cada detalhe',
    desc: 'Cada pixel desenhado para transmitir autoridade e distinção.',
    metric: 'PRECISÃO 100%',
    percent: 100,
  },
  {
    code: 'PARAM.02',
    label: 'Design orientado à conversão',
    desc: 'Narrativa visual e gatilhos de decisão focados em ROI real.',
    metric: 'HIGH-ROI',
    percent: 96,
  },
  {
    code: 'PARAM.03',
    label: 'Processo claro, sem ruído',
    desc: 'Metodologia direta com os diretores de arte, sem intermediários.',
    metric: 'ZERO-FRICTION',
    percent: 98,
  },
  {
    code: 'PARAM.04',
    label: 'Performance desde o primeiro pixel',
    desc: 'Carregamento instantâneo, Core Web Vitals e stack de ponta.',
    metric: 'GRADE A+',
    percent: 99,
  },
]

const process = [
  {
    stage: 'STAGE.01',
    title: 'Briefing',
    description: 'Entendemos contexto, objetivos e o que precisa mudar.',
    category: 'DIAGNÓSTICO',
  },
  {
    stage: 'STAGE.02',
    title: 'Direção',
    description: 'Definimos conceito visual, linguagem e arquitetura.',
    category: 'CONCEPT',
  },
  {
    stage: 'STAGE.03',
    title: 'Construção',
    description: 'Design e desenvolvimento avançam com precisão.',
    category: 'EXECUÇÃO',
  },
  {
    stage: 'STAGE.04',
    title: 'Entrega',
    description: 'Publicamos, validamos e deixamos tudo pronto para crescer.',
    category: 'DEPLOY',
  },
]

const testimonials = [
  {
    callsign: 'FLIGHT.REC // VÉRTICE',
    quote: '“A Henko traduziu o valor do nosso trabalho em uma presença visual muito acima do que tínhamos.”',
    name: 'Marina Costa',
    role: 'Fundadora',
    company: 'Vértice Studio',
    initials: 'MC',
    metric: '+180% percepção de valor',
  },
  {
    callsign: 'FLIGHT.REC // NOMA',
    quote: '“O novo site mudou a qualidade das conversas comerciais. As pessoas chegam entendendo nosso nível.”',
    name: 'Rafael Mendes',
    role: 'CEO & Founder',
    company: 'Noma Capital',
    initials: 'RM',
    metric: '3.4x mais conversão',
  },
  {
    callsign: 'FLIGHT.REC // AURORA',
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
  const heroRef = useRef<HTMLElement>(null)
  const laptopRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
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
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
    }
  }, [])

  const nav = ['Início', 'Serviços', 'Sobre', 'Contato']
  const idFor = (item: string) => `#${item.toLowerCase().replace('í', 'i')}`

  return (
    <main className="overflow-clip bg-background text-foreground selection:bg-primary selection:text-white">
      {/* GLOBAL HUD HEADER */}
      <header
        data-scrolled={scrolled}
        className="site-header fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-2xl"
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
            <div className="hidden xl:flex items-center gap-2 font-mono text-[10px] sm:text-[11px] text-muted-foreground border border-border/60 bg-muted/40 rounded-full px-2.5 py-0.5 tabular-nums">
              <span className="hud-led hud-led-green animate-pulse" />
              <span>SYS.ONLINE // BRT</span>
            </div>
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

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="gradient-primary action-button hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground md:flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span>Solicitar orçamento</span>
            <ArrowDownRight className="-rotate-90 size-4" />
          </a>

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
            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground pb-2 border-b border-border/40">
              <span className="flex items-center gap-1.5">
                <span className="hud-led hud-led-green animate-pulse" /> COCKPIT // MENU
              </span>
              <span>SYS.READY</span>
            </div>
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
              className="gradient-primary action-button mt-2 flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-primary-foreground"
            >
              Solicitar orçamento <ArrowRight className="size-4" />
            </a>
          </nav>
        )}
        <span className="scroll-progress" aria-hidden="true" />
      </header>

      {/* HERO SECTION */}
      <section id="inicio" ref={heroRef} className="laptop-hero relative min-h-screen h-[170vh] md:h-[190vh]">
        <div className="hero-grid sticky top-0 flex h-screen items-center overflow-hidden pt-16 sm:pt-20">
          <div data-parallax=".08" className="hero-light" />

          <div className="hero-stack relative mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
            <div className="hero-copy flex flex-col items-center gap-3 sm:gap-4 md:gap-5 text-center">
              {/* Eyebrow */}
              <div
                data-reveal="fade"
                className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-mono uppercase tracking-[.18em] sm:tracking-[.22em] text-muted-foreground"
              >
                <span className="text-primary font-bold">[+]</span>
                <span>SPEC.01 // EXPERIÊNCIAS DIGITAIS DE ALTO VALOR</span>
                <span className="text-primary font-bold">[+]</span>
              </div>

              {/* Headline H1 */}
              <SplitText
                as="h1"
                text="Sites que fazem sua marca parecer"
                accent="inevitável."
                accentClassName="text-accent-carmine font-medium"
                delay={90}
                className="hero-title max-w-5xl text-balance text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.0] sm:leading-[.94] md:leading-[.92] tracking-[-.04em] sm:tracking-[-.065em]"
              />

              {/* Subtitle */}
              <SplitText
                text="Direção visual premium, estratégia e tecnologia para negócios que não aceitam passar despercebidos."
                as="p"
                stagger={16}
                delay={480}
                className="max-w-xl text-pretty text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground"
              />

              {/* CTA Button */}
              <a
                data-reveal="up"
                style={{ '--reveal-delay': '900ms' } as React.CSSProperties}
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="gradient-primary action-button mt-1 flex items-center gap-2 rounded-full px-5 py-3.5 sm:px-6 sm:py-4 text-xs sm:text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <MessageCircle className="size-4 sm:size-5" aria-hidden="true" />
                <span>Falar no WhatsApp</span>
                <ArrowRight className="size-3.5 sm:size-4" aria-hidden="true" />
              </a>
            </div>

            {/* Central 3D Laptop Display */}
            <div className="relative">
              <LaptopMockup laptopRef={laptopRef} />
            </div>

            {/* Scroll Link */}
            <a
              href="#servicos"
              className="hero-scroll mx-auto flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-[.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-primary font-bold">[+]</span>
              <span>Explore o Painel</span>
              <span className="flex size-8 sm:size-10 items-center justify-center rounded-full border border-border glass-panel">
                <ArrowDownRight className="size-4 sm:size-5 text-primary" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="servicos" className="relative py-16 sm:py-24 md:py-36 border-t border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionTitle
            eyebrow="MOD.SYSTEM // CAPABILITIES"
            title="Engenharia visual construída para"
            accent="gerar valor real."
          />

          <div className="mt-10 sm:mt-14 md:mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, ...service }, index) => (
              <article
                data-reveal="card"
                style={{ '--reveal-index': index } as React.CSSProperties}
                key={service.number}
                className={`glass-panel glass-card hud-bracket group flex min-h-80 sm:min-h-88 md:min-h-96 flex-col rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-9 last:md:col-span-2 last:lg:col-span-1 ${
                  service.featured ? 'border-primary/40 shadow-[0_0_40px_rgba(255,36,23,0.15)]' : ''
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-border/50 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="glass-icon">
                      <Icon className="text-primary size-5" />
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-wider text-foreground/80">
                      {service.code}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[11px] px-2 py-0.5 rounded border ${
                      service.featured
                        ? 'border-primary/40 bg-primary/10 text-primary font-semibold'
                        : 'border-border/60 text-muted-foreground'
                    }`}
                  >
                    {service.calib}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-auto pt-5 flex flex-col gap-4 sm:gap-5">
                  <SplitText
                    as="h3"
                    text={service.title}
                    stagger={40}
                    delay={140}
                    className="max-w-xs text-2xl sm:text-3xl font-medium tracking-tight"
                  />
                  <p
                    data-reveal="up"
                    style={{ '--reveal-delay': '320ms' } as React.CSSProperties}
                    className="text-sm sm:text-base leading-relaxed text-muted-foreground"
                  >
                    {service.text}
                  </p>

                  {/* Telemetry Visual Graph */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-end gap-1 h-5">
                      {service.sparkline.map((val, i) => (
                        <span
                          key={i}
                          className="w-1.5 rounded-t bg-primary/60 transition-all duration-300 group-hover:bg-primary group-hover:brightness-110"
                          style={{
                            height: `${val * 0.2}px`,
                            transitionDelay: `${i * 35}ms`,
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground/75 tracking-wider">
                      CALIB. 100%
                    </span>
                  </div>

                  {/* Card Action */}
                  <div
                    data-reveal="up"
                    style={{ '--reveal-delay': '440ms' } as React.CSSProperties}
                    className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-primary">
                      <Check className="size-3.5 shrink-0" />
                      {service.benefit}
                    </div>
                    <a
                      href={`https://wa.me/5569981070561?text=${encodeURIComponent(service.whatsappMsg)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-foreground/90 hover:text-primary transition-colors py-1"
                    >
                      <span>[CONTRATAR]</span>
                      <ArrowRight className="size-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIALS / SOBRE */}
      <section id="sobre" className="py-16 sm:py-24 md:py-36 bg-background/50 border-t border-border/40">
        <div className="mx-auto grid max-w-7xl gap-8 sm:gap-10 md:gap-14 px-4 sm:px-6 md:px-8 lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex flex-col gap-6 sm:gap-8">
            <Eyebrow text="TELEMETRY // AUTORIDADE" />
            <SplitText
              as="h2"
              text="O padrão visual da sua marca diz"
              accent="quanto ela vale."
              accentClassName="text-primary"
              delay={140}
              className="text-balance text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight md:leading-none tracking-[-.04em] md:tracking-[-.05em]"
            />
          </div>

          <div data-reveal="right" className="glass-panel hud-bracket rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8">
            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground pb-4 mb-2 border-b border-border/60">
              <span>PARÂMETRO OPERACIONAL</span>
              <span>CALIBRAÇÃO</span>
            </div>
            {differentials.map((item, index) => (
              <div
                data-reveal="up"
                style={{ '--reveal-index': index + 1 } as React.CSSProperties}
                key={item.code}
                className="list-row flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 border-b border-border/70 py-4 last:border-0"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-primary font-semibold">{item.code}</span>
                    <span className="text-base sm:text-lg font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-0.5">{item.desc}</span>
                </div>
                <span className="self-start sm:self-center shrink-0 font-mono text-xs font-semibold px-2 py-1 rounded bg-muted/60 border border-border/60 text-primary tabular-nums">
                  {item.metric}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS / METODOLOGIA */}
      <section className="hero-grid border-y border-border/60 py-16 sm:py-24 md:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionTitle
            eyebrow="FLIGHT.PLAN // METODOLOGIA"
            title="Clareza do briefing"
            accent="à publicação."
          />

          <div className="mt-10 sm:mt-14 md:mt-16 grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((stage, index) => (
              <article
                data-reveal="card"
                style={{ '--reveal-index': index } as React.CSSProperties}
                key={stage.stage}
                className="glass-panel glass-card hud-bracket flex min-h-60 sm:min-h-72 flex-col rounded-2xl sm:rounded-3xl p-6 sm:p-7"
              >
                <div className="flex items-center justify-between font-mono text-xs text-muted-foreground pb-3 border-b border-border/50">
                  <span className="font-mono text-primary font-semibold">{stage.stage}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted border border-border/60 uppercase">
                    {stage.category}
                  </span>
                </div>
                <div className="mt-auto pt-4">
                  <SplitText
                    as="h3"
                    text={stage.title}
                    stagger={45}
                    delay={160}
                    className="mb-2 sm:mb-3 block text-xl sm:text-2xl font-medium"
                  />
                  <p
                    data-reveal="up"
                    style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
                    className="text-sm sm:text-base leading-relaxed text-muted-foreground"
                  >
                    {stage.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / PROVA SOCIAL */}
      <section className="py-16 sm:py-24 md:py-36 border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <SectionTitle
            eyebrow="FLIGHT.LOGS // DEBRIEF"
            title="Resultados reais de quem decidiu"
            accent="não passar despercebido."
          />

          <div className="mt-10 sm:mt-14 md:mt-16 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map(({ quote, name, role, company, initials, metric, callsign }, index) => (
              <figure
                data-reveal="card"
                style={{ '--reveal-index': index } as React.CSSProperties}
                key={name}
                className="glass-panel glass-card hud-bracket flex min-h-80 sm:min-h-96 flex-col rounded-2xl sm:rounded-3xl p-6 sm:p-8 last:md:col-span-2 last:lg:col-span-1"
              >
                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                  <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
                    <span className="hud-led hud-led-red" />
                    <span>{callsign}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    <TrendingUp className="size-3" />
                    {metric}
                  </span>
                </div>

                <Quote className="quote-mark size-6 text-primary/70 mt-4" />
                <SplitText
                  as="blockquote"
                  text={quote}
                  stagger={22}
                  delay={180}
                  className="mt-3 block text-pretty text-lg sm:text-xl leading-relaxed text-foreground/95"
                />

                <figcaption
                  data-reveal="up"
                  style={{ '--reveal-delay': '520ms' } as React.CSSProperties}
                  className="mt-auto pt-6 border-t border-border/50 flex items-center gap-3.5"
                >
                  <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-muted/80 font-mono text-xs sm:text-sm font-semibold text-foreground">
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <strong className="block text-sm sm:text-base font-medium text-foreground">{name}</strong>
                      <span className="flex size-3.5 items-center justify-center rounded-full bg-primary/20 text-primary" title="Registro verificado">
                        <Check className="size-2.5" />
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {role} · <span className="text-foreground/75 font-medium">{company}</span>
                    </span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contato" className="px-4 sm:px-5 py-12 md:px-8 md:py-16">
        <div
          data-reveal="scale"
          className="gradient-primary cta-panel hud-bracket mx-auto flex max-w-7xl flex-col items-start gap-8 sm:gap-10 rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 md:p-14 lg:p-16 text-primary-foreground shadow-2xl"
        >
          <div className="flex w-full items-center justify-between font-mono text-xs border-b border-white/20 pb-3">
            <span className="flex items-center gap-2">
              <span className="hud-led hud-led-green animate-pulse" />
              <span>PROTOCOL // ENGAGE MISSION</span>
            </span>
            <span className="text-primary-foreground/80 font-semibold">[SLOT: DISPONÍVEL]</span>
          </div>

          <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Sparkles data-parallax=".05" className="cta-spark size-6 sm:size-7 text-white/90" />
              <SplitText
                as="h2"
                text="Seu próximo nível visual"
                accent="começa aqui."
                delay={220}
                className="mt-6 sm:mt-8 block max-w-4xl text-balance text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight md:leading-[.95] tracking-[-.04em] md:tracking-[-.05em]"
              />
            </div>
            <a
              data-reveal="up"
              style={{ '--reveal-delay': '620ms' } as React.CSSProperties}
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="action-button flex w-full sm:w-auto shrink-0 items-center justify-center gap-3 rounded-full bg-foreground px-7 py-4 font-mono text-sm sm:text-base font-semibold text-background transition-all hover:bg-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <span>ACIONE SEU PROJETO</span>
              <ArrowRight className="size-4" />
            </a>
          </div>

          <div
            data-reveal="fade"
            className="flex flex-wrap items-center gap-y-2 gap-x-4 sm:gap-x-6 border-t border-white/15 pt-5 text-xs text-primary-foreground/85 font-mono"
          >
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              RESPOSTA: &lt;2H NO WHATSAPP
            </span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span>ORÇAMENTO SEM COMPROMISSO</span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span>DIREÇÃO: C-LEVEL TEAM</span>
          </div>
        </div>
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
            <span className="font-mono text-[10px] text-muted-foreground/70">
              SYS.BUILD: 2026.4 // LATENCY: OPTIMAL
            </span>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 font-mono text-xs text-muted-foreground">
            {[
              ['[01] SERVIÇOS', '#servicos'],
              ['[02] SOBRE', '#sobre'],
              ['[03] CONTATO', whatsappUrl],
              ['[04] INSTAGRAM', '#'],
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
        <div data-reveal="fade" className="flex flex-col gap-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>© 2026 HENKO STUDIO // TODOS OS DIREITOS RESERVADOS.</span>
          <span className="text-primary">[+] ENGENHARIA VISUAL DE ALTA PRECISÃO</span>
        </div>
      </footer>
    </main>
  )
}

function LaptopMockup({ laptopRef }: { laptopRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div ref={laptopRef} className="laptop-scene" aria-label="Notebook exibindo um site criado pela Henko Studio">
      <div className="laptop-lid">
        <div className="laptop-camera" />
        <div className="laptop-screen">
          <div className="mock-site">
            <div className="mock-nav">
              <span className="mock-mark">H/</span>
              <div className="mock-links">
                <span>Studio</span>
                <span>Expertise</span>
                <span>Contato</span>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mock-pill">
                Iniciar projeto
              </a>
            </div>
            <div className="mock-body">
              <p>ESTRATÉGIA · DESIGN · TECNOLOGIA</p>
              <h2>
                Transformamos<br />
                presença em <em>impacto.</em>
              </h2>
              <div className="mock-bottom">
                <span>Experiências digitais para marcas que lideram.</span>
                <div className="mock-stats">
                  <b>12+</b>
                  <small>anos criando</small>
                  <b>98%</b>
                  <small>de aprovação</small>
                </div>
              </div>
            </div>
          </div>
          <div className="screen-glare" />
        </div>
      </div>
      <div className="laptop-hinge" />
      <div className="laptop-base">
        <div className="keyboard-surface" />
        <div className="trackpad" />
      </div>
      <div className="laptop-lip" />
      <div className="laptop-shadow" />
    </div>
  )
}

function SectionTitle({ eyebrow, title, accent }: { eyebrow: string; title: string; accent?: string }) {
  return (
    <div className="grid gap-4 md:gap-6 lg:grid-cols-[.45fr_1fr]">
      <Eyebrow text={eyebrow} />
      <SplitText
        as="h2"
        text={title}
        accent={accent}
        accentClassName="text-primary"
        delay={120}
        className="max-w-4xl text-balance text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-[-.04em]"
      />
    </div>
  )
}

function Eyebrow({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`flex h-fit flex-col gap-2.5 sm:gap-3 ${className}`}>
      <SplitText as="p" text={text} mode="chars" stagger={22} className="text-xs sm:text-sm uppercase tracking-[.2em] text-primary" />
      <span data-reveal="fade" className="reveal-line" />
    </div>
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
  mode = 'words',
  stagger,
  delay = 0,
  className,
}: SplitTextProps) {
  const units =
    mode === 'chars'
      ? Array.from(text).map((value) => ({ value, accent: false }))
      : [
          ...text.split(' ').map((value) => ({ value, accent: false })),
          ...(accent ? accent.split(' ').map((value) => ({ value, accent: true })) : []),
        ]
  const style = {
    '--reveal-delay': `${delay}ms`,
    '--split-stagger': `${stagger ?? (mode === 'chars' ? 26 : 55)}ms`,
  } as React.CSSProperties

  return (
    <Tag data-reveal={mode} style={style} className={className}>
      <span className="sr-only">{accent ? `${text} ${accent}` : text}</span>
      {units.map((unit, index) =>
        mode === 'chars' ? (
          <span
            aria-hidden="true"
            key={index}
            className="split-char"
            style={{ '--split-index': index } as React.CSSProperties}
          >
            {unit.value}
          </span>
        ) : (
          <span
            aria-hidden="true"
            key={index}
            className="split-mask"
            style={{ '--split-index': index } as React.CSSProperties}
          >
            <span className={`split-word ${unit.accent ? accentClassName : ''}`}>{unit.value}&nbsp;</span>
          </span>
        )
      )}
    </Tag>
  )
}
