import {useCurrentFrame} from 'remotion';
import {colors} from '../config/tokens';
import {Point, polygonPoints, withAlpha} from './utils';

interface IndexCoreProps {
  size?: number;
  intensity?: number;
  simplified?: boolean;
  queryPulse?: number;
}

const cellOffsets: Point[] = [
  {x: 0, y: 0},
  {x: -44, y: -26},
  {x: 44, y: -26},
  {x: -44, y: 26},
  {x: 44, y: 26},
  {x: 0, y: -52},
  {x: 0, y: 52},
];

export const IndexCore: React.FC<IndexCoreProps> = ({
  size = 360,
  intensity = 1,
  simplified = false,
  queryPulse = 0,
}) => {
  const frame = useCurrentFrame();
  const center = size / 2;
  const rotation = frame / 36;
  const breath = 1 + Math.sin(frame / 46) * 0.02;
  const flicker =
    0.76 +
    ((Math.sin(frame / 8) + Math.sin(frame / 13 + 1.8) + Math.sin(frame / 21 + 0.4)) /
      6) *
      0.4;
  const scale = simplified ? 0.72 : 1;

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `scale(${breath * scale})`,
        filter: `drop-shadow(0 0 ${54 * intensity}px ${withAlpha(
          colors.cyanGlow,
          0.3,
        )})`,
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
          transform: `rotate(${rotation * (simplified ? 0.45 : 1)}deg)`,
        }}
      >
        {[0, 1, 2].map((ring) => {
          const radius = size * (0.22 + ring * 0.09);
          return (
            <ellipse
              key={`orbit-${ring}`}
              cx={center}
              cy={center}
              rx={radius + ring * 8}
              ry={(radius + ring * 8) * (0.44 + ring * 0.06)}
              fill="none"
              stroke={withAlpha(colors.cyanGlow, 0.16 + ring * 0.08)}
              strokeWidth={1.2}
              transform={`rotate(${rotation * (ring % 2 === 0 ? 1 : -1) * 2} ${center} ${center})`}
            />
          );
        })}
        <polygon
          points={polygonPoints({x: center, y: center}, size * 0.32, 6)}
          fill={withAlpha(colors.brightBlue, 0.08)}
          stroke={withAlpha(colors.cyanGlow, 0.66)}
          strokeWidth={2.6}
        />
        <polygon
          points={polygonPoints({x: center, y: center}, size * 0.24, 6)}
          fill={withAlpha('#FFFFFF', 0.04)}
          stroke={withAlpha(colors.brightBlue, 0.48)}
          strokeWidth={1.8}
        />
        {!simplified
          ? cellOffsets.map((offset, index) => {
              const cellPulse = Math.max(
                0,
                1 - Math.abs(queryPulse - index / (cellOffsets.length - 1)) * 4,
              );

              return (
                <polygon
                  key={`cell-${index}`}
                  points={polygonPoints(
                    {x: center + offset.x, y: center + offset.y},
                    size * 0.07,
                    6,
                  )}
                  fill={withAlpha(colors.cyanGlow, 0.06 + flicker * 0.08 + cellPulse * 0.18)}
                  stroke={withAlpha(colors.textPrimary, 0.2 + cellPulse * 0.3)}
                  strokeWidth={1}
                />
              );
            })
          : null}
        <circle
          cx={center}
          cy={center}
          r={size * 0.06}
          fill={withAlpha(colors.optumGold, 0.12 + flicker * 0.14)}
          stroke={withAlpha('#FFFFFF', 0.26)}
          strokeWidth={1.2}
        />
      </svg>
    </div>
  );
};
