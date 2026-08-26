import { motion, type Variants } from 'motion/react'

interface MotionHeroTitleProps {
  className?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.15,
    },
  },
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -35,
    scale: 0.94,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 90,
      mass: 0.8,
    },
  },
}

const line1 = ['Sites', 'que', 'fazem']
const line2 = ['sua', 'marca']
const line3 = ['parecer']

export function MotionHeroTitle({ className = '' }: MotionHeroTitleProps) {
  return (
    <motion.h1
      className={`hero-title max-w-4xl text-balance text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] font-medium leading-[1.04] sm:leading-[0.98] md:leading-[0.94] tracking-[-0.045em] sm:tracking-[-0.055em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {/* Line 1 */}
      <span className="block overflow-hidden pb-1 -mb-1">
        {line1.map((word, i) => (
          <motion.span
            key={`l1-${i}`}
            variants={wordVariants}
            className="inline-block mr-[0.25em] will-change-transform text-foreground"
          >
            {word}
          </motion.span>
        ))}
      </span>

      {/* Line 2 */}
      <span className="block overflow-hidden pb-1 -mb-1">
        {line2.map((word, i) => (
          <motion.span
            key={`l2-${i}`}
            variants={wordVariants}
            className="inline-block mr-[0.25em] will-change-transform text-foreground"
          >
            {word}
          </motion.span>
        ))}
      </span>

      {/* Line 3 with Highlight Accent */}
      <span className="block overflow-hidden pb-1 -mb-1">
        {line3.map((word, i) => (
          <motion.span
            key={`l3-${i}`}
            variants={wordVariants}
            className="inline-block mr-[0.25em] will-change-transform text-foreground"
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          variants={wordVariants}
          className="inline-block will-change-transform text-accent-carmine font-medium drop-shadow-[0_0_35px_rgba(255,36,23,0.5)]"
        >
          inevitável.
        </motion.span>
      </span>
    </motion.h1>
  )
}
