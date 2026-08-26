import * as React from "react"
import { cn } from "@/lib/utils"

export type TextureType =
  | "dots"
  | "grid"
  | "noise"
  | "crosshatch"
  | "diagonal"
  | "scatteredDots"
  | "halftone"
  | "triangular"
  | "chevron"
  | "paperGrain"
  | "horizontalLines"
  | "verticalLines"

export interface TextureOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  texture?: TextureType
  opacity?: number
  className?: string
}

const textureStyles: Record<TextureType, React.CSSProperties> = {
  dots: {
    backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
    backgroundSize: "16px 16px",
    color: "rgba(255, 255, 255, 0.15)",
  },
  grid: {
    backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
    backgroundSize: "24px 24px",
    color: "rgba(255, 255, 255, 0.1)",
  },
  noise: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")`,
  },
  crosshatch: {
    backgroundImage: `repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 10px), repeating-linear-gradient(-45deg, currentColor 0, currentColor 1px, transparent 0, transparent 10px)`,
    color: "rgba(255, 255, 255, 0.1)",
  },
  diagonal: {
    backgroundImage: `repeating-linear-gradient(45deg, currentColor, currentColor 1px, transparent 1px, transparent 10px)`,
    color: "rgba(255, 255, 255, 0.12)",
  },
  scatteredDots: {
    backgroundImage: `radial-gradient(circle at 15% 25%, currentColor 1.5px, transparent 1.5px), radial-gradient(circle at 75% 35%, currentColor 1.5px, transparent 1.5px), radial-gradient(circle at 45% 65%, currentColor 1.5px, transparent 1.5px), radial-gradient(circle at 85% 85%, currentColor 1.2px, transparent 1.2px), radial-gradient(circle at 25% 85%, currentColor 1.2px, transparent 1.2px)`,
    backgroundSize: "36px 36px",
    color: "rgba(255, 255, 255, 0.14)",
  },
  halftone: {
    backgroundImage: `radial-gradient(circle at center, currentColor 1.8px, transparent 2px)`,
    backgroundSize: "8px 8px",
    color: "rgba(255, 255, 255, 0.15)",
  },
  triangular: {
    backgroundImage: `linear-gradient(60deg, currentColor 1px, transparent 1px), linear-gradient(120deg, currentColor 1px, transparent 1px), linear-gradient(0deg, currentColor 1px, transparent 1px)`,
    backgroundSize: "24px 41.56px",
    color: "rgba(255, 255, 255, 0.08)",
  },
  chevron: {
    backgroundImage: `linear-gradient(135deg, currentColor 25%, transparent 25%), linear-gradient(225deg, currentColor 25%, transparent 25%), linear-gradient(315deg, currentColor 25%, transparent 25%), linear-gradient(45deg, currentColor 25%, transparent 25%)`,
    backgroundPosition: "-10px 0, -10px 0, 0 0, 0 0",
    backgroundSize: "20px 20px",
    color: "rgba(255, 255, 255, 0.08)",
  },
  paperGrain: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.25 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
  },
  horizontalLines: {
    backgroundImage: `repeating-linear-gradient(0deg, currentColor, currentColor 1px, transparent 1px, transparent 8px)`,
    color: "rgba(255, 255, 255, 0.1)",
  },
  verticalLines: {
    backgroundImage: `repeating-linear-gradient(90deg, currentColor, currentColor 1px, transparent 1px, transparent 8px)`,
    color: "rgba(255, 255, 255, 0.1)",
  },
}

export function TextureOverlay({
  texture = "dots",
  opacity = 1,
  className,
  style,
  ...props
}: TextureOverlayProps) {
  const selectedStyle = textureStyles[texture] || textureStyles.dots

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 size-full select-none",
        className
      )}
      style={{
        ...selectedStyle,
        opacity,
        ...style,
      }}
      {...props}
    />
  )
}
