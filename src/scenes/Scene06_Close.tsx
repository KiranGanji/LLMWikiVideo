import {Img, interpolate, useCurrentFrame} from 'remotion';
import {colors, fontFamilies} from '../config/tokens';
import {Background} from '../shared/Background';
import {GradientText} from '../shared/GradientText';
import {ParticleField} from '../shared/ParticleField';
import {UhgMark} from '../shared/UhgMark';
import {arcPoint, withAlpha} from '../shared/utils';

interface Scene06Props {
  durationInFrames: number;
  taglineLines?: string[];
  showLogo?: boolean;
  logoSrc?: string;
}

const centerPoint = {x: 960, y: 540};
const constellation = [
  centerPoint,
  arcPoint(centerPoint, 260, -Math.PI / 2),
  arcPoint(centerPoint, 310, -Math.PI / 4),
  arcPoint(centerPoint, 300, 0),
  arcPoint(centerPoint, 280, Math.PI / 3),
  arcPoint(centerPoint, 320, Math.PI),
  arcPoint(centerPoint, 260, Math.PI * 0.7),
];

const Scene06: React.FC<Scene06Props> = ({
  durationInFrames,
  taglineLines = [
    'Knowledge, AI-native.',
    'Built for our people.',
    'Ready for our agents.',
  ],
  showLogo = true,
  logoSrc,
}) => {
  const frame = useCurrentFrame();
  const contraction = interpolate(frame, [0, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const centerGlow = interpolate(frame, [0, 45, 75], [0.2, 1, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalFade = interpolate(frame, [138, 150], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Background glowPosition="center" intensity={0.2}>
      <ParticleField count={18} opacity={0.08} speed={0.45} seed="scene06-dust" />

      {constellation.map((point, index) => {
        const x = point.x + (centerPoint.x - point.x) * contraction;
        const y = point.y + (centerPoint.y - point.y) * contraction;
        const scale = 1 - contraction * 0.9;

        return (
          <div
            key={`constellation-${index}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 22,
              height: 22,
              marginLeft: -11,
              marginTop: -11,
              borderRadius: 999,
              background: index % 5 === 0 ? colors.optumGold : colors.cyanGlow,
              opacity: (1 - contraction) * 0.9 * finalFade,
              transform: `scale(${scale})`,
              boxShadow: `0 0 36px ${withAlpha(colors.cyanGlow, 0.32)}`,
            }}
          />
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: centerPoint.x,
          top: centerPoint.y,
          width: 34 + centerGlow * 36,
          height: 34 + centerGlow * 36,
          marginLeft: -(34 + centerGlow * 36) / 2,
          marginTop: -(34 + centerGlow * 36) / 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${withAlpha(
            '#FFFFFF',
            0.95 * finalFade,
          )} 0%, ${withAlpha(colors.cyanGlow, 0.8 * finalFade)} 36%, ${withAlpha(
            colors.brightBlue,
            0.18 * finalFade,
          )} 72%, transparent 100%)`,
          boxShadow: `0 0 ${120 * centerGlow}px ${withAlpha(colors.cyanGlow, 0.28 * finalFade)}`,
          filter: `blur(${(1 - centerGlow) * 10}px)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 322,
          transform: 'translateX(-50%)',
          width: 980,
          textAlign: 'center',
          opacity: finalFade,
        }}
      >
        {taglineLines.map((line, index) => {
          const reveal = interpolate(frame, [50 + index * 15, 68 + index * 15], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={line}
              style={{
                marginTop: index === 0 ? 0 : 24,
                fontFamily: index === 0 ? fontFamilies.display : fontFamilies.body,
                fontSize: index === 0 ? 64 : 36,
                fontWeight: index === 0 ? 700 : 500,
                color: colors.textPrimary,
                opacity: reveal,
                transform: `translateY(${(1 - reveal) * 8}px)`,
              }}
            >
              {index === 0 ? (
                <GradientText progress={reveal}>{line}</GradientText>
              ) : (
                line
              )}
            </div>
          );
        })}
      </div>

      {showLogo ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 670,
            transform: `translateX(-50%) scale(${0.92 + interpolate(frame, [90, 120], [0, 0.08], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })})`,
            opacity: interpolate(frame, [90, 120], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }) * finalFade,
          }}
        >
          {logoSrc ? (
            <Img
              src={logoSrc}
              style={{
                width: 280,
                filter: `drop-shadow(0 0 36px ${withAlpha(colors.brightBlue, 0.18)})`,
              }}
            />
          ) : (
            <UhgMark scale={0.7} />
          )}
        </div>
      ) : null}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: colors.bgDeep,
          opacity: 1 - finalFade,
        }}
      />
    </Background>
  );
};

export default Scene06;
