import {ReactNode} from 'react';
import {useCurrentFrame} from 'remotion';
import {colors, fontFamilies, shadows} from '../config/tokens';
import {sineMix, withAlpha} from './utils';

export interface NodeChipProps {
  label: string;
  icon?: ReactNode;
  state?: 'idle' | 'pulsing' | 'updating' | 'queried';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: string;
  activity?: number;
}

const sizeMap = {
  sm: {paddingX: 18, paddingY: 12, fontSize: 18},
  md: {paddingX: 24, paddingY: 16, fontSize: 22},
  lg: {paddingX: 30, paddingY: 18, fontSize: 26},
} as const;

export const NodeChip: React.FC<NodeChipProps> = ({
  label,
  icon,
  state = 'idle',
  size = 'md',
  glowColor = colors.cyanGlow,
  activity = 0,
}) => {
  const frame = useCurrentFrame();
  const sizing = sizeMap[size];
  const ambientPulse = 0.55 + ((Math.sin(frame / 22) + 1) / 2) * 0.45;
  const stateBoost =
    state === 'updating'
      ? Math.max(activity, ambientPulse)
      : state === 'queried'
        ? 0.65 + ambientPulse * 0.35
        : state === 'pulsing'
          ? ambientPulse * 0.8
          : activity * 0.4;
  const haloOpacity = 0.08 + stateBoost * 0.34;
  const borderColor =
    state === 'updating' || state === 'queried'
      ? withAlpha(glowColor, 0.48 + stateBoost * 0.38)
      : colors.nodeBorder;

  return (
    <div
      className="rounded-[28px] border bg-white/[0.03] backdrop-blur-md"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: `${sizing.paddingY}px ${sizing.paddingX}px`,
        borderColor,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
        boxShadow: `${shadows.soft}, 0 0 32px ${withAlpha(
          glowColor,
          haloOpacity,
        )}`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -18,
          borderRadius: 40,
          background: `radial-gradient(circle, ${withAlpha(
            glowColor,
            haloOpacity,
          )} 0%, transparent 65%)`,
          opacity: stateBoost,
          filter: `blur(${26 - stateBoost * 8}px)`,
          transform: `scale(${1 + stateBoost * 0.12})`,
        }}
      />
      {icon ? <div style={{position: 'relative', zIndex: 1}}>{icon}</div> : null}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: fontFamilies.body,
          fontSize: sizing.fontSize,
          fontWeight: 500,
          color: colors.textPrimary,
          letterSpacing: 0.2,
          textShadow:
            state === 'queried'
              ? `0 0 16px ${withAlpha(glowColor, 0.4)}`
              : undefined,
        }}
      >
        {label}
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 28,
          background: `linear-gradient(120deg, transparent 20%, ${withAlpha(
            '#FFFFFF',
            0.06 + sineMix(frame, 45, 0.03, 0.6),
          )} 44%, transparent 70%)`,
          opacity: 0.8,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};
