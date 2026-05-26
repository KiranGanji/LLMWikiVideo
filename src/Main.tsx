import {AbsoluteFill, Sequence} from 'remotion';
import {timing} from './config/timing';
import {colors} from './config/tokens';
import Scene01 from './scenes/Scene01_TheHeadwind';
import Scene02 from './scenes/Scene02_TheWall';
import Scene03 from './scenes/Scene03_TheIndex';
import Scene04 from './scenes/Scene04_LivingWiki';
import Scene05 from './scenes/Scene05_Blueprint';
import Scene06 from './scenes/Scene06_Close';

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: colors.bgDeep}}>
      <Sequence
        from={timing.scene01.start}
        durationInFrames={timing.scene01.duration}
      >
        <Scene01 durationInFrames={timing.scene01.duration} />
      </Sequence>
      <Sequence
        from={timing.scene02.start}
        durationInFrames={timing.scene02.duration}
      >
        <Scene02 durationInFrames={timing.scene02.duration} />
      </Sequence>
      <Sequence
        from={timing.scene03.start}
        durationInFrames={timing.scene03.duration}
      >
        <Scene03 durationInFrames={timing.scene03.duration} />
      </Sequence>
      <Sequence
        from={timing.scene04.start}
        durationInFrames={timing.scene04.duration}
      >
        <Scene04 durationInFrames={timing.scene04.duration} />
      </Sequence>
      <Sequence
        from={timing.scene05.start}
        durationInFrames={timing.scene05.duration}
      >
        <Scene05 durationInFrames={timing.scene05.duration} />
      </Sequence>
      <Sequence
        from={timing.scene06.start}
        durationInFrames={timing.scene06.duration}
      >
        <Scene06 durationInFrames={timing.scene06.duration} />
      </Sequence>
    </AbsoluteFill>
  );
};
