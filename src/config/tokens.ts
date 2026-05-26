import {Easing} from 'remotion';

export const canvas = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const colors = {
  bgDeep: '#070B1F',
  bgMid: '#0E1742',
  bgGlow: '#1A2868',
  uhgBlue: '#002677',
  brightBlue: '#00B0E2',
  cyanGlow: '#7EE8FA',
  optumGold: '#F2B544',
  nodeSurface: 'rgba(255,255,255,0.06)',
  nodeBorder: 'rgba(126, 232, 250, 0.25)',
  nodeBorderHot: 'rgba(126, 232, 250, 0.72)',
  textPrimary: '#F4F7FF',
  textSecondary: '#A9B4D4',
  textMuted: '#5D6B8F',
  barrier: 'rgba(126, 232, 250, 0.35)',
  barrierWarm: 'rgba(242, 181, 68, 0.4)',
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
  soft: '0 25px 90px rgba(0, 0, 0, 0.28)',
  glow: '0 0 40px rgba(126, 232, 250, 0.25)',
  intenseGlow: '0 0 80px rgba(0, 176, 226, 0.32)',
} as const;

export const scenePadding = {
  x: 96,
  y: 84,
} as const;
