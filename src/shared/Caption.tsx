import {interpolate, useCurrentFrame} from 'remotion';
import {colors, fontFamilies, scenePadding} from '../config/tokens';
import type {CaptionSegment} from '../config/narration';

interface CaptionProps {
  segments: CaptionSegment[];
}

export const Caption: React.FC<CaptionProps> = ({segments}) => {
  const frame = useCurrentFrame();
  const activeSegment = segments.find(
    (segment) => frame >= segment.start && frame <= segment.end,
  );

  if (!activeSegment) {
    return null;
  }

  const opacity = interpolate(
    frame,
    [activeSegment.start, activeSegment.start + 10, activeSegment.end - 10, activeSegment.end],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const isCentered = activeSegment.align === 'center';

  return (
    <div
      style={{
        position: 'absolute',
        left: isCentered ? '50%' : scenePadding.x,
        bottom: 72,
        transform: `translate(${isCentered ? '-50%' : '0'}, ${(1 - opacity) * 8}px)`,
        maxWidth: isCentered ? 920 : 760,
        padding: '14px 18px',
        borderRadius: 18,
        border: `1px solid rgba(255,255,255,0.08)`,
        background: 'rgba(7, 11, 31, 0.68)',
        backdropFilter: 'blur(18px)',
        fontFamily: fontFamilies.body,
        fontSize: 28,
        fontWeight: 500,
        color: colors.textPrimary,
        letterSpacing: 0.1,
        lineHeight: 1.35,
        opacity,
        textAlign: isCentered ? 'center' : 'left',
      }}
    >
      {activeSegment.text}
    </div>
  );
};
