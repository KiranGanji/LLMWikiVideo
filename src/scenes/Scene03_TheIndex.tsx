import {interpolate, spring, useCurrentFrame} from 'remotion';
import {canvas, colors, easings, fontFamilies, springs} from '../config/tokens';
import {AgentIcon} from '../shared/AgentIcon';
import {Background} from '../shared/Background';
import {ConnectionLine} from '../shared/ConnectionLine';
import {IndexCore} from '../shared/IndexCore';
import {NodeChip} from '../shared/NodeChip';
import {ParticleField} from '../shared/ParticleField';
import {
  WikiNodeData,
  placeholderAngles,
  primaryNodeData,
} from '../shared/wiki-data';
import {arcPoint, percentToPoint, withAlpha} from '../shared/utils';

interface Scene03Props {
  durationInFrames: number;
  nodeData?: WikiNodeData[];
  showAgentQuery?: boolean;
  placeholderCount?: number;
}

const corePoint = {x: 960, y: 540};
const selectedQueryLabel = 'Exclusions';

const Scene03: React.FC<Scene03Props> = ({
  durationInFrames,
  nodeData = primaryNodeData,
  showAgentQuery = true,
  placeholderCount = 6,
}) => {
  const frame = useCurrentFrame();
  const labelOpacity = interpolate(frame, [390, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const queryProgress = interpolate(frame, [610, 670], [0, 1], {
    easing: easings.outExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const agentProgress = interpolate(frame, [600, 650], [0, 1], {
    easing: easings.outQuart,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const queryFlash = interpolate(frame, [632, 648, 668], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const expansionPulse = interpolate(frame, [560, 590, 620], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const queryAgentX = interpolate(frame, [600, 650], [710, 906], {
    easing: easings.outExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const queryAgentY = interpolate(frame, [600, 650], [812, 680], {
    easing: easings.outExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Background glowPosition="center" intensity={0.44}>
      <ParticleField count={54} opacity={0.22} speed={0.75} seed="scene03-dust" />
      <div
        style={{
          position: 'absolute',
          left: 96,
          top: 76,
          color: colors.textMuted,
          fontSize: 16,
          letterSpacing: 4,
          fontWeight: 700,
          opacity: 0.7,
        }}
      >
        THE INDEX
      </div>

      <div
        style={{
          position: 'absolute',
          left: corePoint.x - 210,
          top: corePoint.y - 210,
          width: 420,
          height: 420,
          transform: `scale(${1 + expansionPulse * 0.08})`,
        }}
      >
        <IndexCore size={420} intensity={1 + queryFlash * 0.45} queryPulse={queryProgress} />
      </div>

      {nodeData.map((node) => {
        const point = percentToPoint(node.position);
        const appear = spring({
          fps: canvas.fps,
          frame: Math.max(0, frame - node.appearAtFrame),
          config: springs.standard,
        });
        const lineProgress = interpolate(
          frame,
          [node.appearAtFrame, node.appearAtFrame + 24],
          [0, 1],
          {
            easing: easings.outExpo,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          },
        );
        const initialPacket = interpolate(
          frame,
          [node.appearAtFrame + 10, node.appearAtFrame + 28],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          },
        );
        const isQueryNode = node.label === selectedQueryLabel;
        const queryPacket = isQueryNode && showAgentQuery ? queryProgress : null;
        const queryNodeGlow =
          isQueryNode && showAgentQuery
            ? interpolate(frame, [655, 678, 690], [0, 1, 0.25], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 0;

        return (
          <div key={node.label}>
            <ConnectionLine
              from={corePoint}
              to={point}
              progress={lineProgress}
              packetProgress={
                frame < node.appearAtFrame + 36 ? initialPacket : queryPacket
              }
              pulsing={frame < node.appearAtFrame + 40}
              bend={node.cluster === 'business' ? -100 : 100}
              highlight={queryNodeGlow}
            />
            <div
              style={{
                position: 'absolute',
                left: point.x,
                top: point.y,
                transform: `translate(-50%, -50%) scale(${appear})`,
                opacity: appear,
              }}
            >
              <NodeChip
                label={node.label}
                size={node.label === 'Exclusions' ? 'lg' : 'md'}
                state={queryNodeGlow > 0.1 ? 'queried' : 'idle'}
                activity={queryNodeGlow}
              />
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: 188,
          top: 802,
          opacity: labelOpacity,
          color: colors.textSecondary,
          fontFamily: fontFamilies.body,
          fontSize: 18,
          letterSpacing: 3.2,
        }}
      >
        BUSINESS
      </div>
      <div
        style={{
          position: 'absolute',
          right: 188,
          top: 802,
          opacity: labelOpacity,
          color: colors.textSecondary,
          fontFamily: fontFamilies.body,
          fontSize: 18,
          letterSpacing: 3.2,
        }}
      >
        DATA
      </div>

      <div
        style={{
          position: 'absolute',
          left: 160,
          top: 280,
          width: 440,
          height: 450,
          borderRadius: '50%',
          border: `1px solid ${withAlpha(colors.cyanGlow, 0.08)}`,
          opacity: labelOpacity,
          transform: 'rotate(-10deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 120,
          top: 240,
          width: 520,
          height: 500,
          borderRadius: '50%',
          border: `1px solid ${withAlpha(colors.cyanGlow, 0.08)}`,
          opacity: labelOpacity,
          transform: 'rotate(8deg)',
        }}
      />

      {placeholderAngles.slice(0, placeholderCount).map((angle, index) => {
        const point = arcPoint(corePoint, 380 + (index % 2) * 56, (angle * Math.PI) / 180);
        const revealStart = index === 0 ? 520 : index < 3 ? 545 : 570;
        const placeholderOpacity = interpolate(frame, [revealStart, revealStart + 24], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={`placeholder-${angle}`}
            style={{
              position: 'absolute',
              left: point.x,
              top: point.y,
              width: 52,
              height: 52,
              marginLeft: -26,
              marginTop: -26,
              borderRadius: 999,
              border: `1px solid ${withAlpha(colors.cyanGlow, 0.16)}`,
              background: withAlpha(colors.cyanGlow, 0.04),
              color: withAlpha(colors.textPrimary, 0.7),
              display: 'grid',
              placeItems: 'center',
              fontSize: 26,
              opacity: placeholderOpacity * (index < 3 ? 0.32 : 0.18),
            }}
          >
            +
          </div>
        );
      })}

      {showAgentQuery ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: queryAgentX - 48,
              top: queryAgentY - 48,
              width: 96,
              height: 96,
              opacity: agentProgress,
            }}
          >
            <AgentIcon size={96} emphasis={0.6 + queryFlash * 0.4} />
          </div>
          <ConnectionLine
            from={{x: queryAgentX + 20, y: queryAgentY - 18}}
            to={corePoint}
            progress={interpolate(frame, [626, 646], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
            packetProgress={interpolate(frame, [626, 646], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
            opacity={0.18}
            bend={-40}
            highlight={queryFlash}
          />
        </>
      ) : null}

    </Background>
  );
};

export default Scene03;
