import {interpolate, useCurrentFrame} from 'remotion';
import {easings} from '../../config/tokens';

interface EasedFrameOptions {
  start: number;
  end: number;
  easing?: (input: number) => number;
}

export const useEasedFrame = ({
  start,
  end,
  easing = easings.outExpo,
}: EasedFrameOptions) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [start, end], [0, 1], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
};
