import {CSSProperties} from 'react';
import {colors} from '../config/tokens';

interface GradientTextProps {
  children: React.ReactNode;
  progress?: number;
  style?: CSSProperties;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  progress = 1,
  style,
}) => {
  const translateY = (1 - progress) * 12;
  const blur = (1 - progress) * 10;

  return (
    <span
      style={{
        display: 'inline-block',
        backgroundImage: `linear-gradient(120deg, ${colors.textPrimary} 0%, ${colors.uhgBlue} 52%, ${colors.brightBlue} 100%)`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        opacity: progress,
        filter: `blur(${blur}px)`,
        transform: `translateY(${translateY}px)`,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
