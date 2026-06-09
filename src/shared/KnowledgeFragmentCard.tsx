import {FragmentDefinition} from './fragment-layout';
import {colors, fontFamilies, shadows} from '../config/tokens';
import {withAlpha} from './utils';

interface KnowledgeFragmentCardProps {
  fragment: FragmentDefinition;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  blur: number;
  saturation?: number;
  brighten?: number;
}

const badgeByKind: Record<FragmentDefinition['kind'], string | null> = {
  default: null,
  mono: 'SQL',
  note: 'NOTE',
  confluence: 'CF',
  pdf: 'PDF',
};

export const KnowledgeFragmentCard: React.FC<KnowledgeFragmentCardProps> = ({
  fragment,
  x,
  y,
  rotation,
  scale,
  opacity,
  blur,
  saturation = 1,
  brighten = 1,
}) => {
  const badge = badgeByKind[fragment.kind];
  const isMono = fragment.kind === 'mono';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 286,
        minHeight: 96,
        borderRadius: 24,
        padding: '18px 20px',
        border: `1px solid ${colors.nodeBorder}`,
        background: `linear-gradient(180deg, ${withAlpha(
          '#FFFFFF',
          0.9,
        )} 0%, ${withAlpha(colors.bgDeep, 0.74)} 100%)`,
        backdropFilter: 'blur(14px)',
        boxShadow: shadows.soft,
        transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
        filter: `blur(${blur}px) saturate(${saturation}) brightness(${brighten})`,
        opacity,
      }}
    >
      {badge ? (
        <div
          style={{
            display: 'inline-flex',
            padding: '4px 8px',
            borderRadius: 999,
            background: withAlpha(colors.brightBlue, 0.12),
            color: colors.uhgBlue,
            fontFamily: fontFamilies.mono,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.1,
            marginBottom: 10,
          }}
        >
          {badge}
        </div>
      ) : null}
      <div
        style={{
          color:
            fragment.kind === 'note' ? colors.textPrimary : colors.textSecondary,
          fontFamily: isMono ? fontFamilies.mono : fontFamilies.body,
          fontSize: isMono ? 17 : 19,
          fontWeight: isMono ? 500 : 500,
          lineHeight: 1.3,
          letterSpacing: isMono ? 0 : 0.15,
        }}
      >
        {fragment.label}
      </div>
    </div>
  );
};
