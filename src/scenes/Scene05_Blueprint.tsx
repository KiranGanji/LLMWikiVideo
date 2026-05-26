import {interpolate, spring, useCurrentFrame} from 'remotion';
import {colors, easings, fontFamilies, scenePadding, springs} from '../config/tokens';
import {AgentIcon} from '../shared/AgentIcon';
import {Background} from '../shared/Background';
import {ConnectionLine} from '../shared/ConnectionLine';
import {IndexCore} from '../shared/IndexCore';
import {ParticleField} from '../shared/ParticleField';
import {sisterWikiLabels} from '../shared/wiki-data';
import {arcPoint, withAlpha} from '../shared/utils';

interface Scene05Props {
  durationInFrames: number;
  sisterWikis?: {label: string; angle: number; radius?: number}[];
  showSatelliteAgents?: boolean;
  canopyIntensity?: number;
}

const centerPoint = {x: 960, y: 520};

const MiniWiki: React.FC<{
  label: string;
  center: {x: number; y: number};
  progress: number;
}> = ({label, center, progress}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: center.x,
        top: center.y,
        transform: `translate(-50%, -50%) scale(${0.7 + progress * 0.3})`,
        opacity: progress * 0.85,
      }}
    >
      <div style={{position: 'relative', width: 190, height: 190}}>
        <div style={{position: 'absolute', inset: 0}}>
          <IndexCore size={190} simplified intensity={0.7} />
        </div>
        {[
          {x: 42, y: 48},
          {x: 138, y: 54},
          {x: 50, y: 134},
          {x: 142, y: 126},
        ].map((node, index) => (
          <div
            key={`${label}-node-${index}`}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y,
              width: 14,
              height: 14,
              marginLeft: -7,
              marginTop: -7,
              borderRadius: 999,
              background: index === 2 ? colors.optumGold : colors.cyanGlow,
              boxShadow: `0 0 18px ${withAlpha(colors.cyanGlow, 0.28)}`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 8,
          textAlign: 'center',
          color: colors.textSecondary,
          fontFamily: fontFamilies.body,
          fontSize: 18,
          letterSpacing: 3,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const Scene05: React.FC<Scene05Props> = ({
  durationInFrames,
  sisterWikis = sisterWikiLabels.map((wiki) => ({
    label: wiki.label,
    angle: wiki.angle,
    radius: wiki.radius,
  })),
  showSatelliteAgents = true,
  canopyIntensity = 0.4,
}) => {
  const frame = useCurrentFrame();
  const pullbackScale = interpolate(frame, [0, 120], [1, 0.35], {
    easing: easings.outQuart,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const paymentLabelOpacity = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const canopyOpacity = interpolate(frame, [360, 480], [0, canopyIntensity], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const constellationPoints = sisterWikis.map((wiki) =>
    arcPoint(centerPoint, wiki.radius ?? 310, (wiki.angle * Math.PI) / 180),
  );
  const allPoints = [centerPoint, ...constellationPoints];

  return (
    <Background glowPosition="center" intensity={0.42}>
      <ParticleField count={84} opacity={0.26} speed={0.9} seed="scene05-dust" />
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
        THE BLUEPRINT
      </div>

      <div
        style={{
          position: 'absolute',
          left: centerPoint.x,
          top: centerPoint.y,
          transform: `translate(-50%, -50%) scale(${pullbackScale})`,
          opacity: 1,
        }}
      >
        <div style={{position: 'relative', width: 360, height: 360}}>
          <IndexCore size={360} intensity={1} />
        </div>
        <div
          style={{
            marginTop: 8,
            textAlign: 'center',
            color: colors.textSecondary,
            fontFamily: fontFamilies.body,
            fontSize: 18,
            letterSpacing: 3,
            opacity: paymentLabelOpacity,
          }}
        >
          PAYMENT INTEGRITY
        </div>
      </div>

      {sisterWikis.map((wiki, index) => {
        const point = constellationPoints[index];
        const progress = spring({
          fps: 30,
          frame: Math.max(0, frame - (90 + index * 25)),
          config: springs.gentle,
        });

        return (
          <MiniWiki key={wiki.label} label={wiki.label} center={point} progress={progress} />
        );
      })}

      {allPoints.map((point, index) => {
        const next = allPoints[(index + 1) % allPoints.length];
        const drawProgress = interpolate(frame, [240 + index * 12, 270 + index * 12], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <ConnectionLine
            key={`federation-${index}`}
            from={point}
            to={next}
            progress={drawProgress}
            opacity={0.2}
            strokeWidth={2}
            bend={index % 2 === 0 ? 40 : -40}
          />
        );
      })}

      {constellationPoints.map((point, index) => {
        const drawProgress = interpolate(frame, [250 + index * 10, 292 + index * 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <ConnectionLine
            key={`center-link-${index}`}
            from={centerPoint}
            to={point}
            progress={drawProgress}
            opacity={0.12}
            strokeWidth={1.8}
            bend={0}
          />
        );
      })}

      {showSatelliteAgents
        ? constellationPoints
            .filter((_, index) => index % 2 === 0)
            .map((point, index) => {
              const appear = interpolate(frame, [300 + index * 22, 360 + index * 22], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const orbit = frame / 30 + index;
              const x = point.x + Math.cos(orbit) * 48;
              const y = point.y + Math.sin(orbit) * 24;

              return (
                <div
                  key={`satellite-${index}`}
                  style={{
                    position: 'absolute',
                    left: x - 18,
                    top: y - 18,
                    width: 36,
                    height: 36,
                    opacity: appear * 0.9,
                  }}
                >
                  <AgentIcon size={36} emphasis={0.4} />
                </div>
              );
            })
        : null}

      <div
        style={{
          position: 'absolute',
          left: -220,
          top: -160,
          width: 2360,
          height: 620,
          borderRadius: '50%',
          background: `radial-gradient(circle at center top, ${withAlpha(
            colors.uhgBlue,
            canopyOpacity,
          )} 0%, transparent 72%)`,
          opacity: canopyOpacity,
          filter: 'blur(20px)',
        }}
      />

    </Background>
  );
};

export default Scene05;
