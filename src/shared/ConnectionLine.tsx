import {useCurrentFrame} from 'remotion';
import {colors} from '../config/tokens';
import {
  Point,
  createControlPoint,
  pointOnQuadratic,
  quadPath,
  withAlpha,
} from './utils';

interface ConnectionLineProps {
  from: Point;
  to: Point;
  progress?: number;
  packetProgress?: number | null;
  pulsing?: boolean;
  color?: string;
  strokeWidth?: number;
  opacity?: number;
  bend?: number;
  highlight?: number;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({
  from,
  to,
  progress = 1,
  packetProgress = null,
  pulsing = false,
  color = colors.brightBlue,
  strokeWidth = 3,
  opacity = 0.3,
  bend = 120,
  highlight = 0,
}) => {
  const frame = useCurrentFrame();
  const control = createControlPoint(from, to, bend);
  const path = quadPath(from, control, to);
  const pulseOpacity =
    opacity + highlight * 0.5 + (pulsing ? ((Math.sin(frame / 16) + 1) / 2) * 0.08 : 0);
  const packetPoint =
    packetProgress === null
      ? null
      : pointOnQuadratic(from, control, to, Math.min(1, Math.max(0, packetProgress)));

  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <path
        d={path}
        pathLength={1}
        fill="none"
        stroke={withAlpha(color, pulseOpacity)}
        strokeWidth={strokeWidth}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
        strokeLinecap="round"
        style={{
          filter: `drop-shadow(0 0 ${12 + highlight * 16}px ${withAlpha(
            color,
            0.4 + highlight * 0.3,
          )})`,
        }}
      />
      {packetPoint ? (
        <g>
          <circle
            cx={packetPoint.x}
            cy={packetPoint.y}
            r={10}
            fill={withAlpha(color, 0.18)}
          />
          <circle cx={packetPoint.x} cy={packetPoint.y} r={4} fill={color} />
        </g>
      ) : null}
    </svg>
  );
};
