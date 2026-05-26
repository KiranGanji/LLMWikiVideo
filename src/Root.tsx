import {Composition} from 'remotion';
import {Main} from './Main';
import {canvas} from './config/tokens';
import {timing} from './config/timing';

const totalDuration =
  timing.scene06.start + timing.scene06.duration - timing.scene01.start;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Main}
        durationInFrames={totalDuration}
        fps={canvas.fps}
        width={canvas.width}
        height={canvas.height}
      />
    </>
  );
};
