import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fontFamilies} from '../config/tokens';
import {Background} from '../shared/Background';
import {GradientText} from '../shared/GradientText';
import {ParticleField} from '../shared/ParticleField';
import {arcPoint, withAlpha} from '../shared/utils';

interface Scene06Props {
  durationInFrames: number;
  taglineLines?: string[];
  showBrandName?: boolean;
  brandName?: string;
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
  showBrandName = true,
  brandName = 'UHG',
}) => {
  const frame = useCurrentFrame();
  const scale = (value: number) => (value / 150) * durationInFrames;
  const contraction = interpolate(frame, [0, scale(45)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const centerGlow = interpolate(frame, [0, scale(45), scale(75)], [0.2, 1, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalFade = interpolate(frame, [scale(138), scale(150)], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <Background glowPosition="center" intensity={0.18}>
      <ParticleField count={12} opacity={0.06} speed={0.42} seed="scene06-dust" />

      {constellation.map((point, index) => {
        const x = point.x + (centerPoint.x - point.x) * contraction;
        const y = point.y + (centerPoint.y - point.y) * contraction;
        const scaleDown = 1 - contraction * 0.9;

        return (
          <div
            key={`constellation-${index}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 20,
              height: 20,
              marginLeft: -10,
              marginTop: -10,
              borderRadius: 999,
              background: index % 5 === 0 ? colors.optumGold : colors.cyanGlow,
              opacity: (1 - contraction) * 0.9 * finalFade,
              transform: `scale(${scaleDown})`,
              boxShadow: `0 0 32px ${withAlpha(colors.cyanGlow, 0.28)}`,
            }}
          />
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: centerPoint.x,
          top: centerPoint.y,
          width: 28 + centerGlow * 30,
          height: 28 + centerGlow * 30,
          marginLeft: -(28 + centerGlow * 30) / 2,
          marginTop: -(28 + centerGlow * 30) / 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${withAlpha(
            '#FFFFFF',
            0.95 * finalFade,
          )} 0%, ${withAlpha(colors.cyanGlow, 0.8 * finalFade)} 36%, ${withAlpha(
            colors.brightBlue,
            0.16 * finalFade,
          )} 72%, transparent 100%)`,
          boxShadow: `0 0 ${90 * centerGlow}px ${withAlpha(colors.cyanGlow, 0.24 * finalFade)}`,
          filter: `blur(${(1 - centerGlow) * 10}px)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 344,
          transform: 'translateX(-50%)',
          width: 980,
          textAlign: 'center',
          opacity: finalFade,
        }}
      >
        {taglineLines.map((line, index) => {
          const reveal = interpolate(
            frame,
            [scale(50 + index * 15), scale(68 + index * 15)],
            [0, 1],
            {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            },
          );

          return (
            <div
              key={line}
              style={{
                marginTop: index === 0 ? 0 : 18,
                fontFamily: index === 0 ? fontFamilies.display : fontFamilies.body,
                fontSize: index === 0 ? 56 : 32,
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

      {showBrandName ? (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 650,
            transform: 'translateX(-50%)',
            color: colors.textSecondary,
            fontFamily: fontFamilies.display,
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: 10,
            opacity:
              interpolate(frame, [scale(90), scale(120)], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }) * finalFade,
            textTransform: 'uppercase',
          }}
        >
          {brandName}
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
