
export interface Spring {
  damping: number
  stiffness: number
}

export interface TypeStyle {
  size: number
  line: number
  weight: number
  tracking: number
  width?: number
}

export const seed = '#1c71d8'

export const tertiarySeed = '#3d7fe0'

export const shape = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  'lg-up': 20,
  xl: 28,
  'xl-up': 32,
  '2xl': 48,
  full: 9999,
} as const

export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
} as const

export const size = {
  icon: 24,
  'icon-sm': 20,
  'icon-lg': 32,
  'icon-xl': 40,
  target: 48,
  'target-sm': 40,
  bar: 64,
  'button-s': 40,
  'button-m': 56,
  'button-l': 96,
  rail: 96,
  measure: 680,
  'measure-wide': 1200,
  'measure-full': 1440,
  hairline: 1,
  stroke: 4,
  focus: 3,
} as const

export const breakpoints = {
  medium: 600,
  expanded: 840,
  large: 1200,
} as const

export const type: Record<string, TypeStyle> = {
  'display-l': { size: 57, line: 64, weight: 411, tracking: -0.25 },
  'display-m': { size: 45, line: 52, weight: 411, tracking: 0 },
  'display-s': { size: 36, line: 44, weight: 411, tracking: 0 },
  'headline-l': { size: 32, line: 40, weight: 411, tracking: 0 },
  'headline-m': { size: 28, line: 36, weight: 411, tracking: 0 },
  'headline-s': { size: 24, line: 32, weight: 411, tracking: 0 },
  'title-l': { size: 22, line: 28, weight: 550, tracking: 0 },
  'title-m': { size: 16, line: 24, weight: 550, tracking: 0.15 },
  'title-s': { size: 14, line: 20, weight: 550, tracking: 0.1 },
  'body-l': { size: 16, line: 24, weight: 467, tracking: 0.5 },
  'body-m': { size: 14, line: 20, weight: 467, tracking: 0.25 },
  'body-s': { size: 12, line: 16, weight: 467, tracking: 0.4 },
  'label-l': { size: 14, line: 20, weight: 550, tracking: 0.1 },
  'label-m': { size: 12, line: 16, weight: 550, tracking: 0.5 },
  'label-s': { size: 11, line: 16, weight: 550, tracking: 0.5 },
}

export const weights = { book: 411, normal: 467, medium: 550, semibold: 631, bold: 720 } as const

export const emphasisWeight = 631

export const springs: Record<string, Spring> = {
  'spatial-fast': { damping: 0.6, stiffness: 800 },
  'spatial': { damping: 0.8, stiffness: 380 },
  'spatial-slow': { damping: 0.8, stiffness: 200 },
  'effects-fast': { damping: 1, stiffness: 3800 },
  'effects': { damping: 1, stiffness: 1600 },
  'effects-slow': { damping: 1, stiffness: 800 },
}

export const easings = {
  out: [0.3, 0, 0, 1],
  ios: [0.32, 0.72, 0, 1],
} as const

export const durations = { reveal: 700, intro: 950 } as const

export const stagger = 70

export const elevation = [0, 1, 3, 6, 8, 12] as const

export const state = {
  hover: 0.08,
  focus: 0.1,
  press: 0.1,
  drag: 0.16,
  disabled: 0.38,
} as const
