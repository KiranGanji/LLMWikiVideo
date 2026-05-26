import {interpolate, spring, useCurrentFrame} from 'remotion';
import {canvas, colors, easings, springs} from '../config/tokens';
import {Background} from '../shared/Background';
import {KnowledgeFragmentCard} from '../shared/KnowledgeFragmentCard';
import {ParticleField} from '../shared/ParticleField';
import {fragmentLayout} from '../shared/fragment-layout';
import {sineMix} from '../shared/utils';

interface Scene01Props {
  durationInFrames: number;
  fragmentCount?: number;
  glowIntensity?: number;
}

const depthMap = {
  back: {scale: 0.7, opacity: 0.5, blur: 3},
  mid: {scale: 0.9, opacity: 0.8, blur: 1},
  front: {scale: 1.1, opacity: 1, blur: 0},
} as const;

const Scene01: React.FC<Scene01Props> = ({
  durationInFrames,
  fragmentCount = 14,
  glowIntensity = 0.3,
}) => {
  const frame = useCurrentFrame();
  const coolDown = interpolate(frame, [300, 330], [1, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraScale = interpolate(frame, [0, durationInFrames], [1.08, 1], {
    easing: easings.inOutSine,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraTranslateY = interpolate(
    frame,
    [0, durationInFrames],
    [-20, 0],
    {
      easing: easings.inOutSine,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  return (
    <Background glowPosition="topLeft" intensity={glowIntensity}>
      <ParticleField
        count={60}
        opacity={0.28}
        speed={0.75}
        seed="scene01-dust"
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale}) translateY(${cameraTranslateY}px)`,
        }}
      >
        {fragmentLayout.slice(0, fragmentCount).map((fragment, index) => {
          const enterStart = index * 8;
          const enterSpring = spring({
            fps: canvas.fps,
            frame: Math.max(0, frame - enterStart),
            config: springs.gentle,
          });
          const enterOpacity = interpolate(frame, [enterStart, enterStart + 25], [0, 1], {
            easing: easings.outExpo,
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const depth = depthMap[fragment.depth];
          const x = fragment.x + sineMix(frame, fragment.period, fragment.driftX, fragment.phase);
          const y =
            fragment.y +
            sineMix(frame, fragment.period * 1.1, fragment.driftY, fragment.phase + 1.4);
          const rotation =
            fragment.angle + sineMix(frame, fragment.period * 0.92, 2.2, fragment.phase);

          return (
            <KnowledgeFragmentCard
              key={fragment.id}
              fragment={fragment}
              x={x}
              y={y}
              rotation={rotation}
              scale={depth.scale * (0.85 + enterSpring * 0.15)}
              opacity={depth.opacity * enterOpacity}
              blur={depth.blur + (1 - enterSpring) * 12}
              saturation={coolDown}
              brighten={0.96 + enterSpring * 0.08}
            />
          );
        })}
      </div>
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
        FRAGMENTED KNOWLEDGE
      </div>
    </Background>
  );
};

export default Scene01;
