import {colors, fontFamilies} from '../config/tokens';
import {withAlpha} from './utils';

interface UhgMarkProps {
  scale?: number;
}

export const UhgMark: React.FC<UhgMarkProps> = ({scale = 1}) => {
  const size = 120 * scale;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 18 * scale,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: 28 * scale,
          background: `linear-gradient(160deg, ${withAlpha(
            colors.brightBlue,
            0.9,
          )} 0%, ${colors.uhgBlue} 100%)`,
          boxShadow: `0 0 ${48 * scale}px ${withAlpha(colors.brightBlue, 0.22)}`,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <svg
          viewBox="0 0 120 120"
          style={{width: size * 0.72, height: size * 0.72}}
        >
          <path
            d="M26 86V32h18v38c0 9 4 14 16 14s16-5 16-14V32h18v54"
            fill="none"
            stroke="white"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M92 36c-8-10-20-16-34-16"
            fill="none"
            stroke={withAlpha('#FFFFFF', 0.72)}
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        style={{
          color: colors.textPrimary,
          fontFamily: fontFamilies.display,
          fontWeight: 700,
          fontSize: 42 * scale,
          letterSpacing: 3 * scale,
        }}
      >
        UHG
      </div>
    </div>
  );
};
