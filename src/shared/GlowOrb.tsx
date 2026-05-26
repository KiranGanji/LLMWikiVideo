import {useCurrentFrame} from 'remotion';
import {sineMix, withAlpha} from './utils';

interface GlowOrbProps {
  left: string;
  top: string;
  size: number;
  color?: string;
  intensity?: number;
  blur?: number;
}

export const GlowOrb: React.FC<GlowOrbProps> = ({
  left,
  top,
  size,
  color = '#1A2868',
  intensity = 0.5,
  blur = 70,
}) => {
  const frame = useCurrentFrame();
  const scale = 1 + sineMix(frame, 110, 0.045) + sineMix(frame, 250, 0.03, 1.2);
  const driftX = sineMix(frame, 180, 18, 0.8);
  const driftY = sineMix(frame, 220, 14, 2.1);

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        borderRadius: '50%',
        transform: `translate(${driftX}px, ${driftY}px) scale(${scale})`,
        background: `radial-gradient(circle, ${withAlpha(
          color,
          0.55 * intensity,
        )} 0%, ${withAlpha(color, 0.18 * intensity)} 36%, transparent 72%)`,
        filter: `blur(${blur}px)`,
        opacity: 0.95,
      }}
    />
  );
};
