import {interpolate, spring, useCurrentFrame} from 'remotion';
import {
  canvas,
  colors,
  easings,
  fontFamilies,
  scenePadding,
  springs,
} from '../config/tokens';
import {AgentIcon} from '../shared/AgentIcon';
import {Background} from '../shared/Background';
import {ConnectionLine} from '../shared/ConnectionLine';
import {GradientText} from '../shared/GradientText';
import {IndexCore} from '../shared/IndexCore';
import {NodeChip} from '../shared/NodeChip';
import {ParticleField} from '../shared/ParticleField';
import {withAlpha} from '../shared/utils';

interface Scene05Props {
  durationInFrames: number;
}

const ragHub = {x: 500, y: 560};
const ragQueryAgent = {x: 290, y: 760};
const lookupCore = {x: 1380, y: 500};
const lookupAgent = {x: 1560, y: 780};

const ragDocuments = [
  {label: 'Policy PDF', x: 300, y: 270},
  {label: 'SME transcript', x: 560, y: 230},
  {label: 'Change ticket', x: 370, y: 430},
  {label: 'System table', x: 660, y: 400},
];

const lookupNodes = [
  {label: 'Policy intent', x: 1185, y: 310},
  {label: 'SME context', x: 1160, y: 540},
  {label: 'System mappings', x: 1585, y: 330},
  {label: 'Exclusions', x: 1595, y: 610},
];

const ingestSources = [
  {label: 'Policy shift', x: 1250, y: 110, color: colors.brightBlue, node: 'Policy intent', start: 30},
  {label: 'SME note', x: 1050, y: 650, color: colors.optumGold, node: 'SME context', start: 58},
  {label: 'System change', x: 1710, y: 220, color: colors.cyanGlow, node: 'System mappings', start: 86},
] as const;

const Scene05: React.FC<Scene05Props> = ({durationInFrames}) => {
  const frame = useCurrentFrame();
  const scale = (value: number) => (value / 160) * durationInFrames;
  const leftStart = scale(6);
  const rightStart = leftStart + canvas.fps * 10;
  const leftDurationInFrames = Math.max(1, rightStart - leftStart);
  const rightDurationInFrames = Math.max(1, durationInFrames - rightStart);
  const scaleLeft = (value: number) => (value / 160) * leftDurationInFrames;
  const leftFrame = Math.max(0, frame - leftStart);
  const scaleRight = (value: number) => (value / 160) * rightDurationInFrames;
  const rightFrame = Math.max(0, frame - rightStart);
  const leftReveal = spring({
    fps: canvas.fps,
    frame: leftFrame,
    config: springs.gentle,
  });
  const rightReveal = spring({
    fps: canvas.fps,
    frame: rightFrame,
    config: springs.gentle,
  });
  const querySearch = interpolate(leftFrame, [scaleLeft(52), scaleLeft(94)], [0, 1], {
    easing: easings.outExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const queryLookup = interpolate(rightFrame, [scaleRight(102), scaleRight(128)], [0, 1], {
    easing: easings.outExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lookupReturn = interpolate(rightFrame, [scaleRight(122), scaleRight(148)], [0, 1], {
    easing: easings.outExpo,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headlineReveal = interpolate(rightFrame, [scaleRight(118), scaleRight(154)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ragFade = interpolate(frame, [rightStart - 18, rightStart + 132], [1, 0.58], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const comparisonLabel =
    frame < rightStart ? 'TRADITIONAL RAG' : 'TRADITIONAL RAG VS. VECTOR-LESS';

  const selectedLookupNode = lookupNodes.find((node) => node.label === 'Exclusions')!;

  return (
    <Background glowPosition="center" intensity={0.4}>
      <ParticleField count={52} opacity={0.2} speed={0.78} seed="scene05-compare" />

      <div
        style={{
          position: 'absolute',
          left: scenePadding.x,
          top: 76,
          color: colors.textMuted,
          fontSize: 16,
          letterSpacing: 4,
          fontWeight: 700,
          opacity: 0.7,
        }}
      >
        {comparisonLabel}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 955,
          top: 180,
          width: 1,
          height: 620,
          background: `linear-gradient(180deg, transparent 0%, ${withAlpha(
            colors.cyanGlow,
            0.18,
          )} 18%, ${withAlpha(colors.cyanGlow, 0.18)} 82%, transparent 100%)`,
          opacity: rightReveal * 0.8,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 208,
          top: 132,
          color: '#FFFFFF',
          fontFamily: fontFamilies.display,
          fontSize: 40,
          fontWeight: 700,
          letterSpacing: 0.8,
          opacity: leftReveal,
          textShadow: `0 0 28px ${withAlpha(colors.cyanGlow, 0.14)}`,
        }}
      >
        Traditional RAG
      </div>
      <div
        style={{
          position: 'absolute',
          left: 208,
          top: 172,
          color: withAlpha('#FFFFFF', 0.9),
          fontFamily: fontFamilies.body,
          fontSize: 24,
          letterSpacing: 0.2,
          lineHeight: 1.35,
          maxWidth: 500,
          opacity: leftReveal * 0.9,
        }}
      >
        Documents stay as vectors. Connections are computed when the query arrives.
      </div>

      <div
        style={{
          position: 'absolute',
          left: 1120,
          top: 132,
          color: colors.textPrimary,
          fontFamily: fontFamilies.display,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: 0.8,
          opacity: rightReveal,
          textAlign: 'left',
        }}
      >
        Vector-less RAG
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1120,
          top: 172,
          color: colors.textSecondary,
          fontFamily: fontFamilies.body,
          fontSize: 18,
          letterSpacing: 0.2,
          opacity: rightReveal * 0.9,
          textAlign: 'left',
          maxWidth: 440,
          lineHeight: 1.35,
        }}
      >
        New information lands already linked to the nodes it changes.
      </div>

      {ragDocuments.map((doc, index) => {
        const docReveal = interpolate(
          leftFrame,
          [scaleLeft(6 + index * 10), scaleLeft(24 + index * 10)],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          },
        );

        return (
          <div
            key={doc.label}
            style={{
              position: 'absolute',
              left: doc.x,
              top: doc.y,
              width: 224,
              padding: '18px 20px',
              borderRadius: 24,
              border: `1px solid ${withAlpha(colors.textPrimary, 0.22)}`,
              background: withAlpha(colors.bgMid, 0.88),
              boxShadow: `0 18px 40px ${withAlpha('#000000', 0.24)}`,
              color: '#FFFFFF',
              fontFamily: fontFamilies.body,
              fontSize: 22,
              fontWeight: 600,
              opacity: docReveal * ragFade,
              transform: `translate(-50%, -50%) scale(${0.92 + docReveal * 0.08})`,
            }}
          >
            {doc.label}
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: ragHub.x - 44,
          top: ragHub.y - 44,
          width: 88,
          height: 88,
          borderRadius: '50%',
          border: `1px solid ${withAlpha(colors.textSecondary, 0.2)}`,
          background: withAlpha(colors.bgDeep, 0.72),
          opacity: leftReveal * ragFade,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: ragHub.x - 12,
          top: ragHub.y - 12,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: colors.textSecondary,
          boxShadow: `0 0 32px ${withAlpha(colors.textSecondary, 0.24)}`,
          opacity: leftReveal * ragFade,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: ragHub.x - (32 + querySearch * 120),
          top: ragHub.y - (32 + querySearch * 120),
          width: 64 + querySearch * 240,
          height: 64 + querySearch * 240,
          borderRadius: '50%',
          border: `2px solid ${withAlpha(colors.textSecondary, 0.45 * (1 - querySearch))}`,
          opacity: querySearch * ragFade,
        }}
      />

      {ragDocuments.map((doc, index) => {
        const progress = interpolate(
          leftFrame,
          [scaleLeft(68 + index * 6), scaleLeft(96 + index * 6)],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          },
        );

        return (
          <ConnectionLine
            key={`rag-line-${doc.label}`}
            from={ragHub}
            to={{x: doc.x, y: doc.y}}
            progress={progress}
            packetProgress={progress}
            color={colors.textSecondary}
            opacity={0.22 * ragFade}
            bend={index % 2 === 0 ? -50 : 50}
          />
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: ragQueryAgent.x - 34,
          top: ragQueryAgent.y - 34,
          width: 68,
          height: 68,
          opacity: querySearch * ragFade,
        }}
      >
        <AgentIcon size={68} glowColor={colors.textSecondary} emphasis={0.3} />
      </div>
      <ConnectionLine
        from={{x: ragQueryAgent.x + 20, y: ragQueryAgent.y - 18}}
        to={ragHub}
        progress={querySearch}
        packetProgress={querySearch}
        color={colors.textSecondary}
        opacity={0.18 * ragFade}
        bend={-20}
      />

      <div
        style={{
          position: 'absolute',
          left: 230,
          bottom: 210,
          color: withAlpha('#FFFFFF', 0.88),
          fontFamily: fontFamilies.body,
          fontSize: 22,
          letterSpacing: 2.2,
          opacity: querySearch * ragFade,
        }}
      >
        SEARCH AT QUERY TIME
      </div>

      <div
        style={{
          position: 'absolute',
          left: lookupCore.x - 160,
          top: lookupCore.y - 160,
          width: 320,
          height: 320,
          opacity: rightReveal,
        }}
      >
        <IndexCore size={320} intensity={1} queryPulse={lookupReturn} />
      </div>

      {lookupNodes.map((node, index) => {
        const nodeGlow =
          node.label === selectedLookupNode.label
            ? interpolate(rightFrame, [scaleRight(126), scaleRight(144), scaleRight(160)], [0, 1, 0.35], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 0;

        return (
          <div key={node.label}>
            <ConnectionLine
              from={lookupCore}
              to={{x: node.x, y: node.y}}
              progress={rightReveal}
              packetProgress={node.label === selectedLookupNode.label ? lookupReturn : null}
              color={colors.cyanGlow}
              opacity={0.18}
              bend={index < 2 ? -80 : 80}
              highlight={nodeGlow}
            />
            <div
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                transform: `translate(-50%, -50%) scale(${0.88 + rightReveal * 0.12})`,
                opacity: rightReveal,
              }}
            >
              <NodeChip
                label={node.label}
                size={node.label === 'Exclusions' ? 'lg' : 'md'}
                state={nodeGlow > 0.08 ? 'queried' : 'idle'}
                activity={nodeGlow}
              />
            </div>
          </div>
        );
      })}

      {ingestSources.map((source, index) => {
        const target = lookupNodes.find((node) => node.label === source.node)!;
        const ingestProgress = interpolate(
          rightFrame,
          [scaleRight(source.start), scaleRight(source.start + 24)],
          [0, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          },
        );
        const active =
          rightFrame >= scaleRight(source.start) &&
          rightFrame <= scaleRight(source.start + 36);

        return (
          <div key={source.label}>
            <div
              style={{
                position: 'absolute',
                left: source.x,
                top: source.y,
                color: source.color,
                fontFamily: fontFamilies.body,
                fontSize: 17,
                fontWeight: 600,
                opacity: rightReveal * 0.9,
              }}
            >
              {source.label}
            </div>
            {active ? (
              <>
                <ConnectionLine
                  from={{x: source.x, y: source.y + 18}}
                  to={lookupCore}
                  progress={1}
                  packetProgress={ingestProgress}
                  color={source.color}
                  opacity={0.16}
                  bend={index === 1 ? -90 : 70}
                  highlight={0.3}
                />
                <ConnectionLine
                  from={lookupCore}
                  to={{x: target.x, y: target.y}}
                  progress={1}
                  packetProgress={ingestProgress}
                  color={source.color}
                  opacity={0.12}
                  bend={target.x < lookupCore.x ? -70 : 70}
                  highlight={0.4}
                />
              </>
            ) : null}
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          left: lookupAgent.x - 34,
          top: lookupAgent.y - 34,
          width: 68,
          height: 68,
          opacity: queryLookup,
        }}
      >
        <AgentIcon size={68} emphasis={0.52} />
      </div>
      <ConnectionLine
        from={{x: lookupAgent.x - 10, y: lookupAgent.y - 16}}
        to={lookupCore}
        progress={queryLookup}
        packetProgress={queryLookup}
        color={colors.cyanGlow}
        opacity={0.2}
        bend={20}
        highlight={0.35}
      />

      <div
        style={{
          position: 'absolute',
          left: 1120,
          bottom: 210,
          color: colors.cyanGlow,
          fontFamily: fontFamilies.body,
          fontSize: 18,
          letterSpacing: 2.2,
          opacity: Math.max(rightReveal, queryLookup),
          textAlign: 'left',
        }}
      >
        CONNECTIONS MADE ON ARRIVAL
      </div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 88,
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: headlineReveal,
        }}
      >
        <GradientText
          progress={headlineReveal}
          style={{
            fontFamily: fontFamilies.display,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: 0.4,
          }}
        >
          LOOKUP, NOT SEARCH.
        </GradientText>
        <div
          style={{
            marginTop: 10,
            color: colors.textSecondary,
            fontFamily: fontFamilies.body,
            fontSize: 22,
          }}
        >
          Vector-less by design. Structured, current, and built for agents.
        </div>
      </div>
    </Background>
  );
};

export default Scene05;
