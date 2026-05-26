import {interpolate, spring, useCurrentFrame} from 'remotion';
import {canvas, colors, easings, fontFamilies, springs} from '../config/tokens';
import {AgentIcon} from '../shared/AgentIcon';
import {Background} from '../shared/Background';
import {KnowledgeFragmentCard} from '../shared/KnowledgeFragmentCard';
import {ParticleField} from '../shared/ParticleField';
import {fragmentLayout} from '../shared/fragment-layout';
import {sineMix, withAlpha} from '../shared/utils';

interface Scene02Props {
  durationInFrames: number;
  collisionCount?: number;
}

const barrierX = 1086;
const impactY = 520;

const rippleProgress = (frame: number, start: number) => {
  return interpolate(frame, [start, start + 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};

const Scene02: React.FC<Scene02Props> = ({
  durationInFrames,
  collisionCount = 2,
}) => {
  const frame = useCurrentFrame();
  const cameraScale = interpolate(frame, [150, 240], [1, 0.95], {
    easing: easings.inOutSine,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const barrierReveal = interpolate(frame, [60, 90], [0, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const barrierDissolve = interpolate(frame, [240, 300], [1, 0], {
    easing: easings.outExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const warmShift = interpolate(frame, [150, 240], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const orientProgress = interpolate(frame, [250, 330], [0, 1], {
    easing: easings.outExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fragmentFade = interpolate(frame, [150, 240], [1, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dotReveal = spring({
    fps: canvas.fps,
    frame: Math.max(0, frame - 246),
    config: springs.standard,
  });

  let agentX = -220;
  if (frame < 90) {
    agentX = interpolate(frame, [0, 90], [-220, 960], {
      easing: easings.outQuart,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame < 120) {
    agentX = interpolate(frame, [90, 120], [960, 840], {
      easing: easings.outExpo,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame < 145) {
    agentX = interpolate(frame, [120, 145], [840, 970], {
      easing: easings.outQuart,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame < 175) {
    agentX = interpolate(frame, [145, 175], [970, 885], {
      easing: easings.outExpo,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame < 240) {
    agentX = interpolate(frame, [175, 240], [885, 860], {
      easing: easings.inOutSine,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (frame < 330) {
    agentX = interpolate(frame, [240, 330], [860, 1122], {
      easing: easings.outExpo,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else {
    agentX = 1122 + sineMix(frame, 90, 10);
  }

  const agentY = 520 + sineMix(frame, 90, 14, 0.4);
  const firstRipple = rippleProgress(frame, 90);
  const secondRipple = rippleProgress(frame, 145);

  return (
    <Background glowPosition="topLeft" intensity={0.36}>
      <ParticleField count={54} opacity={0.2} speed={0.72} seed="scene02-dust" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale})`,
        }}
      >
        {fragmentLayout.map((fragment) => {
          const x = fragment.x + sineMix(frame, fragment.period, fragment.driftX, fragment.phase);
          const y =
            fragment.y +
            sineMix(frame, fragment.period * 1.1, fragment.driftY, fragment.phase + 1.4);
          const targetRotation = (960 - x) / 85;
          const rotation =
            fragment.angle * (1 - orientProgress) +
            targetRotation * orientProgress * 0.18 +
            sineMix(frame, fragment.period, 1.8, fragment.phase);
          const depthScale =
            fragment.depth === 'front' ? 1.04 : fragment.depth === 'mid' ? 0.9 : 0.74;
          const depthOpacity =
            fragment.depth === 'front' ? 0.94 : fragment.depth === 'mid' ? 0.72 : 0.46;
          const blur = fragment.depth === 'back' ? 2.6 : fragment.depth === 'mid' ? 0.8 : 0;

          return (
            <KnowledgeFragmentCard
              key={fragment.id}
              fragment={fragment}
              x={x}
              y={y}
              rotation={rotation}
              scale={depthScale}
              opacity={depthOpacity * fragmentFade}
              blur={blur}
              saturation={0.9}
              brighten={0.96}
            />
          );
        })}
      </div>

      {new Array(collisionCount).fill(true).map((_, collisionIndex) => {
        const start = collisionIndex === 0 ? 90 : 145;
        const progress = rippleProgress(frame, start);
        return (
          <div
            key={`ripple-${collisionIndex}`}
            style={{
              position: 'absolute',
              left: barrierX - 18,
              top: impactY - 18,
              width: 18 + progress * 220,
              height: 18 + progress * 220,
              marginLeft: -(18 + progress * 220) / 2,
              marginTop: -(18 + progress * 220) / 2,
              borderRadius: '50%',
              border: `2px solid ${withAlpha(colors.cyanGlow, 0.6 * (1 - progress))}`,
              opacity: 1 - progress,
              boxShadow: `0 0 24px ${withAlpha(colors.cyanGlow, 0.3)}`,
            }}
          />
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: barrierX - 42,
          top: 86,
          width: 84,
          height: durationInFrames > 0 ? 908 : 0,
          opacity: barrierReveal * barrierDissolve,
          borderRadius: 42,
          background: `linear-gradient(180deg, ${withAlpha(
            colors.cyanGlow,
            0.1 + warmShift * 0.06,
          )} 0%, ${withAlpha(colors.brightBlue, 0.2)} 50%, ${withAlpha(
            colors.optumGold,
            0.08 + warmShift * 0.16,
          )} 100%)`,
          boxShadow: `
            -8px 0 18px ${withAlpha(colors.cyanGlow, 0.12)},
            8px 0 18px ${withAlpha(colors.optumGold, 0.08 + warmShift * 0.1)},
            0 0 40px ${withAlpha(colors.cyanGlow, 0.16)}
          `,
          backdropFilter: 'blur(18px)',
        }}
      />

      {barrierDissolve < 1
        ? new Array(24).fill(true).map((_, index) => {
            const emberProgress = interpolate(frame, [240, 330], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const baseY = 120 + index * 34;
            const x = barrierX + sineMix(frame + index * 6, 32 + index, 28, index * 0.4);
            const y = baseY - emberProgress * (90 + index * 1.5);
            return (
              <div
                key={`ember-${index}`}
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  width: 3 + (index % 3),
                  height: 3 + (index % 3),
                  borderRadius: 999,
                  background: index % 6 === 0 ? colors.optumGold : colors.cyanGlow,
                  opacity: (1 - emberProgress) * 0.75,
                  filter: 'blur(1px)',
                }}
              />
            );
          })
        : null}

      <div
        style={{
          position: 'absolute',
          left: agentX,
          top: agentY,
          width: 150,
          height: 150,
          marginLeft: -75,
          marginTop: -75,
        }}
      >
        {new Array(5).fill(true).map((_, ghostIndex) => (
          <div
            key={`ghost-${ghostIndex}`}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `translateX(${-ghostIndex * 22}px) scale(${1 - ghostIndex * 0.04})`,
              opacity: 0.06 + (4 - ghostIndex) * 0.045,
            }}
          >
            <AgentIcon
              size={150}
              glowColor={ghostIndex === 0 ? colors.cyanGlow : colors.brightBlue}
              emphasis={ghostIndex === 0 ? 0.74 : 0.2}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 24 + dotReveal * 44,
          height: 24 + dotReveal * 44,
          marginLeft: -(24 + dotReveal * 44) / 2,
          marginTop: -(24 + dotReveal * 44) / 2,
          borderRadius: '50%',
          opacity: dotReveal,
          background: `radial-gradient(circle, ${withAlpha(
            '#FFFFFF',
            0.95,
          )} 0%, ${withAlpha(colors.cyanGlow, 0.9)} 35%, ${withAlpha(
            colors.brightBlue,
            0.2,
          )} 70%, transparent 100%)`,
          filter: `blur(${(1 - dotReveal) * 20}px)`,
          boxShadow: `0 0 ${120 * dotReveal}px ${withAlpha(colors.cyanGlow, 0.28)}`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 158,
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 14,
          opacity: interpolate(frame, [330, 390], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          color: colors.textPrimary,
          fontFamily: fontFamilies.display,
          fontSize: 40,
          fontStyle: 'italic',
          letterSpacing: 0.2,
        }}
      >
        {'What if knowledge was built for agents?'.split(' ').map((word, index) => {
          const wordOpacity = interpolate(frame, [332 + index * 5, 352 + index * 5], [0, 1], {
            easing: easings.outExpo,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <span
              key={word}
              style={{
                opacity: wordOpacity,
                transform: `translateY(${(1 - wordOpacity) * 8}px)`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </Background>
  );
};

export default Scene02;
