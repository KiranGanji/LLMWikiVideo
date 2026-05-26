import {useEasedFrame} from './useEasedFrame';

interface UseStaggerOptions {
  start: number;
  index: number;
  staggerBy: number;
  duration: number;
  easing?: (input: number) => number;
}

export const useStagger = ({
  start,
  index,
  staggerBy,
  duration,
  easing,
}: UseStaggerOptions) => {
  const staggerStart = start + index * staggerBy;
  return useEasedFrame({
    start: staggerStart,
    end: staggerStart + duration,
    easing,
  });
};
