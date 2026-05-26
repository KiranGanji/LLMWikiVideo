import {useCurrentFrame} from 'remotion';
import {canvas, colors} from '../config/tokens';
import {seeded, sineMix, withAlpha} from './utils';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  speed?: number;
  opacity?: number;
  seed?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 80,
  color = colors.cyanGlow,
  speed = 1,
  opacity = 0.3,
  seed = 'default-particles',
}) => {
  const frame = useCurrentFrame();

  return (
    <>
      {new Array(count).fill(true).map((_, index) => {
        const layer = index % 3;
        const layerScale = [0.8, 1, 1.25][layer];
        const baseX = seeded(`${seed}-x-${index}`, 0, canvas.width);
        const offset = seeded(`${seed}-offset-${index}`, 0, 420);
        const period = seeded(`${seed}-period-${index}`, 90, 160);
        const drift = seeded(`${seed}-drift-${index}`, 18, 55);
        const size = seeded(`${seed}-size-${index}`, 1.2, 4.4) * layerScale;
        const blur = [2.5, 1.5, 0.5][layer];
        const travel =
          ((frame * (1.15 + layer * 0.32) * speed + offset) %
            (canvas.height + 260)) -
          120;
        const y = canvas.height - travel;
        const x = baseX + sineMix(frame + index * 3, period, drift);
        const twinkle =
          0.35 +
          ((Math.sin(frame / (18 + layer * 6) + index * 1.4) + 1) / 2) * 0.65;

        return (
          <div
            key={`${seed}-${index}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: 999,
              backgroundColor: withAlpha(color, opacity * twinkle),
              boxShadow: `0 0 ${10 + layer * 8}px ${withAlpha(color, 0.35)}`,
              filter: `blur(${blur}px)`,
              transform: `scale(${layerScale})`,
            }}
          />
        );
      })}
    </>
  );
};
