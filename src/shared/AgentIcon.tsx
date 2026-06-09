import {useCurrentFrame} from 'remotion';
import {colors} from '../config/tokens';
import {polygonPoints, withAlpha} from './utils';

interface AgentIconProps {
  size?: number;
  glowColor?: string;
  emphasis?: number;
  variant?: 'query' | 'ingest';
}

export const AgentIcon: React.FC<AgentIconProps> = ({
  size = 140,
  glowColor = colors.cyanGlow,
  emphasis = 0.45,
  variant = 'query',
}) => {
  const frame = useCurrentFrame();
  const center = size / 2;
  const ringRotation = frame / (variant === 'query' ? 36 : 48);
  const pulse = 1 + ((Math.sin(frame / 12) + 1) / 2) * 0.04 + emphasis * 0.03;

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `scale(${pulse})`,
        filter: `drop-shadow(0 0 ${18 + emphasis * 22}px ${withAlpha(
          glowColor,
          0.5,
        )})`,
      }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{width: '100%', height: '100%', overflow: 'visible'}}
      >
        {variant === 'query' ? (
          <>
            {[0, 1, 2].map((ring) => {
              const radius = size * (0.29 + ring * 0.1);
              return (
                <ellipse
                  key={ring}
                  cx={center}
                  cy={center}
                  rx={radius}
                  ry={radius * (0.42 + ring * 0.05)}
                  fill="none"
                  stroke={withAlpha(glowColor, 0.18 + ring * 0.06)}
                  strokeWidth={1.6}
                  transform={`rotate(${ringRotation * (ring % 2 === 0 ? 1 : -1)} ${center} ${center})`}
                />
              );
            })}
            <polygon
              points={polygonPoints({x: center, y: center}, size * 0.18, 6)}
              fill={withAlpha(colors.brightBlue, 0.26)}
              stroke={withAlpha(glowColor, 0.8)}
              strokeWidth={2.2}
            />
            <polygon
              points={polygonPoints({x: center, y: center}, size * 0.1, 6)}
              fill={withAlpha(colors.bgDeep, 0.88)}
              stroke={withAlpha(colors.textPrimary, 0.34)}
              strokeWidth={1}
            />
          </>
        ) : (
          <>
            <polygon
              points={`${center},${size * 0.12} ${size * 0.78},${size * 0.74} ${size * 0.22},${size * 0.74}`}
              fill={withAlpha(colors.brightBlue, 0.12)}
              stroke={withAlpha(glowColor, 0.7)}
              strokeWidth={2}
            />
            <polygon
              points={`${center},${size * 0.22} ${size * 0.64},${size * 0.66} ${size * 0.36},${size * 0.66}`}
              fill={withAlpha(glowColor, 0.28)}
              stroke={withAlpha(colors.textPrimary, 0.26)}
              strokeWidth={1.2}
            />
            <circle
              cx={center}
              cy={size * 0.5}
              r={size * 0.05}
              fill={withAlpha(colors.optumGold, 0.7)}
            />
          </>
        )}
      </svg>
    </div>
  );
};
