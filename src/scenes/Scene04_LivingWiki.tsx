import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fontFamilies, scenePadding} from '../config/tokens';
import {AgentIcon} from '../shared/AgentIcon';
import {Background} from '../shared/Background';
import {ConnectionLine} from '../shared/ConnectionLine';
import {IndexCore} from '../shared/IndexCore';
import {NodeChip} from '../shared/NodeChip';
import {ParticleField} from '../shared/ParticleField';
import {primaryNodeData} from '../shared/wiki-data';
import {
  createControlPoint,
  percentToPoint,
  pointOnQuadratic,
  quadPath,
  withAlpha,
} from '../shared/utils';

interface Scene04Props {
  durationInFrames: number;
  streamLabels?: {top: string; right: string; bottom: string; left: string};
  updateFrequency?: number;
  showRajCallback?: boolean;
}

const streamDefaults = {
  top: 'Policy updates',
  right: 'Change tickets',
  bottom: 'SME conversations',
  left: 'System migrations',
} as const;

const streamSources = {
  top: {x: 960, y: 70},
  right: {x: 1800, y: 420},
  bottom: {x: 980, y: 1000},
  left: {x: 100, y: 470},
} as const;

const ingestionPoint = {x: 960, y: 330};
const centerPoint = {x: 960, y: 540};

const updateEvents = [
  {frame: 156, node: 'Policy intent', color: colors.brightBlue},
  {frame: 204, node: 'System mappings', color: colors.cyanGlow},
  {frame: 246, node: 'Filters', color: colors.brightBlue},
  {frame: 288, node: 'Adjudication logic', color: colors.cyanGlow},
  {frame: 330, node: 'Table definitions', color: colors.optumGold},
  {frame: 378, node: 'Edit rationale', color: colors.brightBlue},
  {frame: 432, node: 'Exclusions', color: colors.cyanGlow},
  {frame: 486, node: 'Policy intent', color: colors.optumGold},
  {frame: 534, node: 'Exclusions', color: colors.cyanGlow},
] as const;

const particleForStream = (
  frame: number,
  source: {x: number; y: number},
  target: {x: number; y: number},
  index: number,
  delay: number,
  cadence: number,
  cycle: number,
) => {
  const local = frame - delay - index * cadence;
  if (local < 0) {
    return null;
  }

  const progress = ((local % cycle) / cycle) % 1;
  const control = createControlPoint(source, target, source.x < target.x ? 140 : -140);
  return {
    progress,
    point: pointOnQuadratic(source, control, target, progress),
  };
};

const Scene04: React.FC<Scene04Props> = ({
  durationInFrames,
  streamLabels = streamDefaults,
  updateFrequency = 1.5,
  showRajCallback = true,
}) => {
  const frame = useCurrentFrame();
  const scale = (value: number) => (value / 600) * durationInFrames;
  const scaledUpdateEvents = updateEvents.map((event) => ({
    ...event,
    frame: scale(event.frame),
  }));
  const sceneOpacity = interpolate(frame, [0, scale(60)], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelFade = interpolate(frame, [scale(30), scale(60)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lastEventFrame = [...scaledUpdateEvents]
    .reverse()
    .find((event) => frame >= event.frame)?.frame;
  const secondsSinceUpdate =
    lastEventFrame === undefined
      ? Math.floor(Math.max(0, frame - scale(60)) / 30)
      : Math.floor((frame - lastEventFrame) / 30);
  const timestampFlash = lastEventFrame
    ? interpolate(frame, [lastEventFrame, lastEventFrame + scale(12)], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;
  const agentPulse = scaledUpdateEvents.reduce((max, event) => {
    const pulse = interpolate(frame, [event.frame, event.frame + scale(16)], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return Math.max(max, pulse);
  }, 0);
  const rajVisible =
    showRajCallback &&
    frame >= scale(492) &&
    frame <= scale(552);
  const rajOpacity = rajVisible
    ? interpolate(frame, [scale(492), scale(504), scale(540), scale(552)], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <Background glowPosition="center" intensity={0.46}>
      <ParticleField count={44} opacity={0.2} speed={0.7} seed="scene04-dust" />
      <div
        style={{
          position: 'absolute',
          left: centerPoint.x - 170,
          top: centerPoint.y - 170,
          width: 340,
          height: 340,
          opacity: sceneOpacity * 0.78,
          transform: 'scale(1.05)',
        }}
      >
        <IndexCore size={340} intensity={0.9} />
      </div>

      {primaryNodeData.map((node) => {
        const point = percentToPoint(node.position);
        const latestPulse = scaledUpdateEvents
          .filter((event) => event.node === node.label)
          .reduce((max, event) => {
            const progress = interpolate(
              frame,
              [event.frame + scale(24), event.frame + scale(40)],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              },
            );
            return Math.max(max, progress);
          }, 0);

        return (
          <div key={node.label}>
            <ConnectionLine
              from={centerPoint}
              to={point}
              progress={1}
              opacity={0.16}
              bend={node.cluster === 'business' ? -100 : 100}
              highlight={latestPulse * 0.2}
            />
            <div
              style={{
                position: 'absolute',
                left: point.x,
                top: point.y,
                transform: 'translate(-50%, -50%)',
                opacity: sceneOpacity * 0.88,
              }}
            >
              <NodeChip
                label={node.label}
                state={latestPulse > 0.1 ? 'updating' : 'idle'}
                activity={latestPulse}
                glowColor={latestPulse > 0.1 ? colors.optumGold : colors.cyanGlow}
              />
            </div>
            {rajOpacity > 0 && node.label === 'Policy intent' ? (
              <div
                style={{
                  position: 'absolute',
                  left: point.x,
                  top: point.y + 62,
                  transform: 'translateX(-50%)',
                  padding: '6px 10px',
                  borderRadius: 999,
                  background: withAlpha(colors.optumGold, 0.12),
                  border: `1px solid ${withAlpha(colors.optumGold, 0.2)}`,
                  fontFamily: fontFamilies.body,
                  fontSize: 16,
                  color: colors.textPrimary,
                  opacity: rajOpacity,
                }}
              >
                From: Raj&apos;s morning sync
              </div>
            ) : null}
          </div>
        );
      })}

      {scaledUpdateEvents.map((event, index) => {
        const point = percentToPoint(
          primaryNodeData.find((node) => node.label === event.node)!.position,
        );
        const packetProgress = interpolate(
          frame,
          [event.frame, event.frame + scale(36)],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          },
        );
        const active =
          frame >= event.frame && frame <= event.frame + scale(40);

        if (!active) {
          return null;
        }

        return (
          <ConnectionLine
            key={`update-${event.node}-${index}`}
            from={ingestionPoint}
            to={point}
            progress={1}
            packetProgress={packetProgress}
            color={event.color}
            opacity={0.12}
            bend={point.x < ingestionPoint.x ? -90 : 90}
            highlight={0.55}
          />
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: ingestionPoint.x - 78,
          top: ingestionPoint.y - 78,
          width: 156,
          height: 156,
        }}
      >
        <AgentIcon
          size={156}
          variant="ingest"
          glowColor={colors.cyanGlow}
          emphasis={0.5 + agentPulse * 0.5}
        />
      </div>

      {([
        ['top', colors.brightBlue],
        ['right', colors.cyanGlow],
        ['bottom', colors.optumGold],
        ['left', colors.brightBlue],
      ] as const).map(([direction, color]) => {
        const source = streamSources[direction];
        const control = createControlPoint(
          source,
          ingestionPoint,
          direction === 'left' || direction === 'bottom' ? -160 : 160,
        );
        const path = quadPath(source, control, ingestionPoint);

        return (
          <div key={direction}>
            <svg
              viewBox="0 0 1920 1080"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <path
                d={path}
                fill="none"
                stroke={withAlpha(color, 0.08)}
                strokeWidth={2}
                strokeDasharray="6 14"
              />
            </svg>
            {new Array(Math.max(4, Math.round(updateFrequency * 4))).fill(true).map((_, index) => {
              const particle = particleForStream(
                frame,
                source,
                ingestionPoint,
                index,
                scale(30),
                scale(20),
                scale(180),
              );
              if (!particle) {
                return null;
              }

              return new Array(4).fill(true).map((__, trailIndex) => {
                const trailProgress = Math.max(0, particle.progress - trailIndex * 0.03);
                const trailPoint = pointOnQuadratic(source, control, ingestionPoint, trailProgress);
                return (
                  <div
                    key={`${direction}-${index}-${trailIndex}`}
                    style={{
                      position: 'absolute',
                      left: trailPoint.x,
                      top: trailPoint.y,
                      width: 8 - trailIndex,
                      height: 8 - trailIndex,
                      marginLeft: -(8 - trailIndex) / 2,
                      marginTop: -(8 - trailIndex) / 2,
                      borderRadius: 999,
                      background: color,
                      opacity: (0.28 - trailIndex * 0.05) * labelFade,
                      filter: 'blur(1px)',
                    }}
                  />
                );
              });
            })}
            <div
              style={{
                position: 'absolute',
                left:
                  direction === 'left'
                    ? 84
                    : direction === 'right'
                      ? 1620
                      : 860,
                top:
                  direction === 'top'
                    ? 102
                    : direction === 'bottom'
                      ? 930
                      : direction === 'left'
                        ? 404
                        : 354,
                color,
                opacity: labelFade,
                fontFamily: fontFamilies.body,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 0.2,
              }}
            >
              {streamLabels[direction]}
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 74,
          transform: `translateX(-50%) scale(${1 + timestampFlash * 0.05})`,
          color: withAlpha(colors.textSecondary, 0.84),
          fontFamily: fontFamilies.mono,
          fontSize: 22,
          letterSpacing: 0.4,
          opacity: 0.8,
        }}
      >
        Last updated: {secondsSinceUpdate}s ago
      </div>

      <div
        style={{
          position: 'absolute',
          left: scenePadding.x,
          top: 76,
          color: colors.textMuted,
          fontSize: 16,
          letterSpacing: 4,
          fontWeight: 700,
          opacity: 0.7,
        }}
      >
        THE LIVING WIKI
      </div>

    </Background>
  );
};

export default Scene04;
