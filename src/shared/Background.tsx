import {noise2D} from '@remotion/noise';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {colors} from '../config/tokens';
import {GlowOrb} from './GlowOrb';
import {sineMix, withAlpha} from './utils';

interface BackgroundProps {
  glowPosition?: 'center' | 'topLeft' | 'topRight';
  intensity?: number;
  accentColor?: string;
  children?: React.ReactNode;
}

const glowMap = {
  center: {left: '50%', top: '48%'},
  topLeft: {left: '18%', top: '14%'},
  topRight: {left: '76%', top: '16%'},
} as const;

const grainDataUrl = (() => {
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72">';
  for (let y = 0; y < 72; y += 4) {
    for (let x = 0; x < 72; x += 4) {
      const value = (noise2D('uhg-grain', x / 18, y / 18) + 1) / 2;
      const opacity = (0.02 + value * 0.12).toFixed(3);
      const fill = value > 0.55 ? '#FFFFFF' : '#A9CAE0';
      svg += `<rect x="${x}" y="${y}" width="4" height="4" fill="${fill}" fill-opacity="${opacity}" />`;
    }
  }

  svg += '</svg>';
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
})();

export const Background: React.FC<BackgroundProps> = ({
  glowPosition = 'center',
  intensity = 0.4,
  accentColor = colors.cyanGlow,
  children,
}) => {
  const frame = useCurrentFrame();
  const position = glowMap[glowPosition];
  const driftX = sineMix(frame, 280, 26, 0.4);
  const driftY = sineMix(frame, 340, 18, 1.2);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        background: `
          radial-gradient(circle at 50% 20%, ${withAlpha(
            colors.bgGlow,
            0.58 * intensity,
          )} 0%, transparent 44%),
          radial-gradient(circle at 20% 12%, ${withAlpha(
            accentColor,
            0.14 * intensity,
          )} 0%, transparent 30%),
          linear-gradient(180deg, ${colors.bgMid} 0%, ${colors.bgDeep} 54%, #EEF5FB 100%)
        `,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -120,
          transform: `translate(${driftX}px, ${driftY}px) scale(1.06)`,
          background:
            'radial-gradient(circle at center, rgba(255,255,255,0.28) 0%, transparent 58%)',
          opacity: 0.72,
        }}
      />
      <GlowOrb
        left={position.left}
        top={position.top}
        size={760}
        color={accentColor}
        intensity={intensity}
      />
      <GlowOrb
        left="54%"
        top="72%"
        size={520}
        color={colors.uhgBlue}
        intensity={intensity * 0.8}
        blur={90}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: grainDataUrl,
          opacity: 0.03,
          mixBlendMode: 'multiply',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, transparent 42%, rgba(76,102,132,0.08) 100%)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
