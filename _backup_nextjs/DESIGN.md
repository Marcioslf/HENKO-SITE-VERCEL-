# DESIGN SYSTEM & BRAND GUIDELINES — HENKO STUDIO

Este documento é a fonte de verdade visual e arquitetural do **Henko Studio**. Ele documenta o design system, padrões estéticos, paleta de cores, tipografia, regras de movimento e componentes da landing page atual.

---

## 1. Visão Geral e Posicionamento da Marca

- **Nome da Marca:** HENKO Studio
- **Conceito & Atmosfera:** **Cyber-Aviation Tactical HUD / Cockpit de Alta Precisão** — Combinação de telemetria aeroespacial, design suíço minimalista e acabamento de luxo digital.
- **Proposta de Valor:** Estúdio criativo e de desenvolvimento focado em criar peças visuais, sites institucionais e páginas de lançamento de altíssimo valor percebido e engenharia de conversão.
- **Assinatura / Slogan:** *"Design que muda percepção."* / *"Sites que fazem sua marca parecer inevitável."*
- **Público-Alvo:** Empreendedores, marcas de luxo, infoprodutores de elite e empresas que buscam autoridade imediata, alta conversão e presença digital diferenciada.
- **Tom de Voz:** Cirúrgico, assertivo, sofisticado, confiante, com foco em valor de negócio e maestria visual.

---

## 2. Paleta de Cores e Tokens (CSS Variables)

O sistema adota um tema escuro profundo (*Deep Dark Obsidian*) com iluminação atmosférica e acento em vermelho carmim vibrante (*Electric Crimson*).

### Cores Base & Superfícies

| Token | Valor Hex / Definição | Descrição / Uso |
| :--- | :--- | :--- |
| `--background` | `#050507` | Fundo principal da página (Obsidian Black) |
| `--card` | `#111114` | Fundo base para cartões e blocos elevados |
| `--foreground` | `#f7f6f5` | Texto principal e elementos de contraste claro |
| `--muted` | `#17171a` | Superfícies secundárias e fundos sutis |
| `--muted-foreground` | `#9d9ca1` | Texto secundário, legendas e metadados |
| `--border` | `#29292e` | Linhas divisórias e bordas sutis de componentes |
| `--ring` | `#ff291b` | Anéis de foco e destaque |

### Destaques & Acentos (Brand Accents)

| Token | Valor Hex | Descrição |
| :--- | :--- | :--- |
| `--primary` | `#ff2417` | Vermelho carmim vivo (Cor primária da marca) |
| `--primary-bright` | `#ff6740` | Coral/Ember vibrante para brilhos e gradientes |
| `--primary-deep` | `#8d0711` | Borgonha profundo para sombras e contrastes |
| `--primary-foreground` | `#ffffff` | Texto em botões e superfícies primárias |

### Gradientes e Efeitos Cromáticos

- **Gradient Primary (`.gradient-primary`):**  
  `linear-gradient(135deg, #ff6740, #ff2417 48%, #8d0711)`  
  *Glow associado:* `box-shadow: 0 14px 46px rgba(255, 36, 23, 0.26)`
- **Gradient Text (`.gradient-text`):**  
  `linear-gradient(120deg, #fff 5%, #ff6740 35%, #ff2417 70%, #a50715)`  
  *Animação:* `gradient-drift 11s ease-in-out infinite alternate`
- **Hero Ambient Lights (`.hero-light`):**  
  Gradientes radiais pontuais que projetam luz vermelha difusa no backdrop.

---

## 3. Tipografia

A tipografia do projeto é baseada na família **Geist** (`Geist Sans` e `Geist Mono`), com pesos e espaçamentos cirúrgicos.

```css
--font-sans: var(--font-geist);
--font-mono: var(--font-geist-mono);
```

### Hierarquia Tipográfica

| Elemento | Família | Peso | Tracking | Leading | Estilo / Observações |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display (H1)** | `Geist Sans` | 500 (Medium) | `-0.065em` | `0.92` | `text-balance`, `5xl` a `8xl`, destaque em `--primary` |
| **Títulos de Seção (H2)** | `Geist Sans` | 500 (Medium) | `-0.04em` a `-0.05em` | `1.0` a `1.1` | Destaques de palavras em `--primary` |
| **Subtítulos de Cards (H3)** | `Geist Sans` | 500 (Medium) | `-0.02em` | `1.2` | `2xl` a `3xl` |
| **Corpo de Texto (Body)** | `Geist Sans` | 400 (Regular) | Normal | `1.6` (Relaxed) | `text-pretty`, cor `--muted-foreground` |
| **Eyebrows / Kicker** | `Geist Sans` | 500 (Medium) | `0.2em` a `0.24em` | Normal | Caixa alta (UPPERCASE), cor `--primary` |
| **Números / Índices** | `Geist Mono` | 400 / 600 | Normal | Normal | Prefixo numérico (`01`, `02`, etc.) e telemetria |


---

## 4. Sistema Espacial e Raios de Borda

```css
--radius: 1rem;       /* 16px */
--radius-sm: 0.65rem; /* ~10px */
--radius-md: 0.8rem;  /* ~13px */
--radius-lg: 1rem;    /* 16px */
--radius-xl: 1.4rem;  /* ~22px */
--radius-2xl: 1.8rem; /* ~29px */
--radius-3xl: 2.2rem; /* ~35px */
```

- **Pill Badges & CTA:** `rounded-full` (9999px)
- **Cards Principais:** `rounded-3xl` (2.2rem)
- **Painel de Contato / Destaque:** `rounded-[2rem]`
- **Grid de Seção:** Max-width `max-w-7xl` com padding horizontal de `px-5 md:px-8`
- **Espaçamento entre seções:** `py-24 md:py-36`

---

## 5. Componentes e Padrões de Interface

### 5.1 Glassmorphism (`.glass-panel`)
Superfície translúcida com iluminação especular interior:
- **Background:** `linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.025) 38%, rgba(255,35,22,.025)), rgba(12,12,15,.58)`
- **Filtro:** `backdrop-filter: blur(28px) saturate(135%)`
- **Borda:** `1px solid rgba(255,255,255,.14)`
- **Sombra interna:** `inset 0 1px 0 rgba(255,255,255,.12)`

### 5.2 Glass Cards Interativos (`.glass-card`)
- **Hover State:** Elevação `translateY(-8px)`, borda sutilmente iluminada `rgba(255,80,50,.42)` e brilho vermelho inferior.
- **Sweep Effect (`::after`):** Varredura de brilho luminoso a 115º ao passar o mouse.
- **Ícones (`.glass-icon`):** Caixa `3rem x 3rem` com fundo translúcido e rotação de `-6deg` no hover.

### 5.3 Botões de Ação (`.action-button`)
- Formato pílula (`rounded-full`), padding generoso (`px-6 py-4`).
- Transição com curva customizada `cubic-bezier(.16,1,.3,1)`.
- No hover: `translateY(-3px)` com translação da seta (`translateX(5px)`).

### 5.4 Header Dinâmico com Barra de Progresso
- Fixo no topo com `backdrop-blur-2xl`.
- Detecta scroll para compactar a altura (`5rem` -> `4.25rem`) e intensificar o fundo escuro.
- Linha inferior de progresso de leitura da página (`.scroll-progress`) com gradiente `--primary` proporcional ao scroll.

### 5.5 Hero Laptop 3D (`.laptop-scene`)
- Mockup de notebook 3D renderizado em CSS puro com perspectiva `1500px`.
- Reage ao scroll do usuário: dobra/abre a tampa conforme o scroll progride (`--scroll-progress`).
- Reflexo luminoso animado no ecrã (`.screen-glare`).

---

## 6. Motion, Animações e Revelação

### Easing Padrão
Toda transição do sistema utiliza a curva de desaceleração suave:
```css
--ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
```

### Sistema de Revelação por Scroll (`[data-reveal]`)
Os elementos são disparados via `IntersectionObserver`:
- `data-reveal="up"`: Deslocamento vertical de `44px` com blur de `8px`.
- `data-reveal="card"`: Deslocamento de `72px`, escala `0.965` e blur `12px`.
- `data-reveal="fade"`: Desfoque de `7px` para opacidade total.
- `data-reveal="scale"`: Escala de `0.93` para `1.0`.

### Split Text (Máscaras de Palavras e Caracteres)
- **Modo Palavras (`mode="words"`):** Cada palavra desliza de baixo para cima (`translate3d(0, 108%, 0)`) com leve rotação de `3deg` dentro de um container com máscara (`overflow: hidden`).
- **Modo Caracteres (`mode="chars"`):** Entrada escalonada por caractere com desfoque progressivo (usado em *Eyebrows*).

### Acessibilidade de Movimento (`prefers-reduced-motion`)
Quando o usuário opta por redução de movimento no sistema operacional:
- Animações e durações de transição são reduzidas a `0.01ms`.
- Efeitos de parallax e rotação 3D são neutralizados.
- Todos os elementos iniciam em estado revelado (`opacity: 1`, `transform: none`).

---

## 7. Estrutura de Conteúdo e Conversão

1. **Header / Navbar:** Logo Henko, navegação âncora e botão principal de orçamento via WhatsApp.
2. **Hero:** Eyebrow com linhas animadas, Headline com SplitText, CTA direto, Mockup 3D interativo e indicador de scroll.
3. **Serviços (01 Criativos / 02 Sites profissionais / 03 Lançamento):** Cards em grid de 3 colunas com ícones translúcidos e benefícios destacados.
4. **Diferenciais / Sobre:** Lista comparativa de autoridade e valor percebido.
5. **Processo (01 Briefing / 02 Direção / 03 Construção / 04 Entrega):** Etapas numeradas com tipografia mono e cards com glassmorphism.
6. **Depoimentos / Prova Social:** Citações com aspas estilizadas em vermelho e identificação de clientes/cargos.
7. **CTA Final:** Painel em gradiente vermelho com faísca animada e botão invertido de alto contraste.
8. **Footer:** Logotipo, links institucionais e direitos autorais.
