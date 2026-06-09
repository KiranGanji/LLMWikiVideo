import {Easing} from 'remotion';

export const canvas = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const colors = {
  bgDeep: '#F6FAFD',
  bgMid: '#EAF2FA',
  bgGlow: '#D8E7F8',
  uhgBlue: '#27589F',
  brightBlue: '#2D8DC9',
  cyanGlow: '#57A9D2',
  optumGold: '#C69237',
  nodeSurface: 'rgba(255,255,255,0.82)',
  nodeBorder: 'rgba(39, 88, 159, 0.22)',
  nodeBorderHot: 'rgba(45, 141, 201, 0.62)',
  textPrimary: '#132742',
  textSecondary: '#3E5876',
  textMuted: '#70849B',
  barrier: 'rgba(87, 169, 210, 0.28)',
  barrierWarm: 'rgba(198, 146, 55, 0.3)',
} as const;

export const fontFamilies = {
  display: 'Inter',
  body: 'Inter',
  mono: '"JetBrains Mono"',
} as const;

export const easings = {
  outExpo: Easing.bezier(0.16, 1, 0.3, 1),
  outQuart: Easing.bezier(0.25, 1, 0.5, 1),
  inOutSine: Easing.bezier(0.37, 0, 0.63, 1),
} as const;

export const springs = {
  gentle: {damping: 20, stiffness: 90, mass: 1},
  standard: {damping: 18, stiffness: 120, mass: 1},
  snappy: {damping: 14, stiffness: 180, mass: 0.8},
} as const;

export const shadows = {
  soft: '0 24px 80px rgba(45, 74, 110, 0.14)',
  glow: '0 0 36px rgba(87, 169, 210, 0.18)',
  intenseGlow: '0 0 72px rgba(45, 141, 201, 0.24)',
} as const;

export const scenePadding = {
  x: 96,
  y: 84,
} as const;
