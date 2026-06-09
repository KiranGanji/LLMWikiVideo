# UHG LLM Wiki — Explainer Video Spec

A 90-second cinematic explainer built in Remotion for senior leadership. Modular scene architecture so individual scenes can be edited in isolation. Premium motion design — confident, not flashy — with deliberate use of light, particles, and camera depth to make the concept feel as significant as it is.

---

## 1. Project Overview

| Item | Value |
|---|---|
| Total duration | 90 seconds (2700 frames @ 30fps) |
| Resolution | 1920 × 1080 |
| FPS | 30 |
| Framework | Remotion 4.x |
| Language | TypeScript |
| Audience | UHG senior leadership |
| Tone | Premium, confident, cinematic — never gimmicky |

---

## 2. Tech Stack

- **Remotion 4.x** (`@remotion/core`, `@remotion/cli`, `@remotion/bundler`)
- **TypeScript** (strict mode)
- **Tailwind CSS** via `@remotion/tailwind` for utility styling
- **@remotion/google-fonts** for typography loading
- **@remotion/noise** for grain/dust textures
- **react-spring** (optional, for some scenes) — most motion uses Remotion's native `spring()` and `interpolate()`

Install:
```bash
npm create video@latest llm-wiki-video -- --template=blank-typescript
npm i @remotion/tailwind @remotion/google-fonts @remotion/noise
```

---

## 3. Project Structure

```
src/
├── Root.tsx                      # Composition registration
├── Main.tsx                      # Master composition — wires scenes together
├── config/
│   ├── tokens.ts                 # Colors, fonts, spacing, easings
│   ├── timing.ts                 # Frame ranges per scene (single source of truth)
│   └── narration.ts              # All voiceover text with timing markers
├── shared/
│   ├── Background.tsx            # Reusable layered gradient + noise background
│   ├── ParticleField.tsx         # Configurable particle/dust system
│   ├── GlowOrb.tsx               # Animated radial glow
│   ├── GradientText.tsx          # Animated gradient text reveal
│   ├── NodeChip.tsx              # Reusable wiki node component
│   ├── ConnectionLine.tsx        # Animated SVG line between nodes
│   ├── Caption.tsx               # Lower-third narration caption (optional)
│   └── hooks/
│       ├── useEasedFrame.ts      # Eased interpolation helper
│       └── useStagger.ts         # Stagger child animations
└── scenes/
    ├── Scene01_TheHeadwind.tsx
    ├── Scene02_TheWall.tsx
    ├── Scene03_TheIndex.tsx
    ├── Scene04_LivingWiki.tsx
    ├── Scene05_Blueprint.tsx
    └── Scene06_Close.tsx
```

**Modularity rule:** every scene is a self-contained component that receives only `durationInFrames` as a prop and reads from `config/tokens.ts` and `config/timing.ts`. To edit a scene, the agent (or you) should only need to touch one file.

---

## 4. Design System

### 4.1 Color Tokens (`config/tokens.ts`)

```ts
export const colors = {
  // Backgrounds
  bgDeep:     '#070B1F',  // deepest navy — outer space
  bgMid:      '#0E1742',  // mid navy — main scene bg
  bgGlow:     '#1A2868',  // subtle radial highlight

  // Brand
  uhgBlue:    '#002677',  // UHG primary
  brightBlue: '#00B0E2',  // accent — main glow/highlight
  cyanGlow:   '#7EE8FA',  // hot edges, particle highlights
  optumGold:  '#F2B544',  // sparingly — for "alive" pulse moments

  // Surfaces
  nodeSurface:  'rgba(255,255,255,0.06)',
  nodeBorder:   'rgba(126, 232, 250, 0.25)',
  nodeBorderHot:'rgba(126, 232, 250, 0.7)',

  // Text
  textPrimary:   '#F4F7FF',
  textSecondary: '#A9B4D4',
  textMuted:     '#5D6B8F',
} as const;
```

### 4.2 Typography

- **Display:** *Inter Display* (700, 600) — for headlines and the closing tagline
- **Body / Captions:** *Inter* (500, 400)
- **Mono (code/data snippets in Scene 1):** *JetBrains Mono* (500)

Sizes (1080p baseline):
- Hero headline: 84px
- Sub headline: 48px
- Body / caption: 28px
- Node label: 22px
- Mono snippet: 18px

### 4.3 Motion Principles

1. **Spring physics over linear tweens.** Default to `spring({ frame, fps, config: { damping: 18, stiffness: 120, mass: 1 } })`.
2. **Stagger.** When multiple elements enter together, offset each by 3–5 frames. Movement should feel choreographed, not synchronized.
3. **Easing.** For non-spring interpolations, use `Easing.bezier(0.16, 1, 0.3, 1)` (ease-out expo) — confident deceleration.
4. **Camera.** Implement camera moves as a parent `<div>` with `transform: scale() translate()`. Camera should always be moving subtly (drift, slow dolly), never frozen.
5. **No bounce.** Avoid playful overshoot. This is leadership-grade.
6. **Light reveals.** Most reveals should feel like *light arriving*, not objects sliding in — opacity + blur + scale, not just translate.

### 4.4 Easings (`config/tokens.ts`)

```ts
import { Easing } from 'remotion';

export const easings = {
  outExpo:   Easing.bezier(0.16, 1, 0.3, 1),
  outQuart:  Easing.bezier(0.25, 1, 0.5, 1),
  inOutSine: Easing.bezier(0.37, 0, 0.63, 1),
};

export const springs = {
  gentle:    { damping: 20, stiffness: 90,  mass: 1 },
  standard:  { damping: 18, stiffness: 120, mass: 1 },
  snappy:    { damping: 14, stiffness: 180, mass: 0.8 },
};
```

---

## 5. Master Composition (`Main.tsx`)

Single source of truth for scene wiring. Edit `config/timing.ts` to reflow timing.

```ts
// config/timing.ts
export const timing = {
  scene01: { start: 0,    duration: 390 }, // 0:00 – 0:13
  scene02: { start: 390,  duration: 390 }, // 0:13 – 0:26
  scene03: { start: 780,  duration: 690 }, // 0:26 – 0:49
  scene04: { start: 1470, duration: 600 }, // 0:49 – 1:09
  scene05: { start: 2070, duration: 480 }, // 1:09 – 1:25
  scene06: { start: 2550, duration: 150 }, // 1:25 – 1:30
};
```

```tsx
// Main.tsx
import { AbsoluteFill, Sequence } from 'remotion';
import { timing } from './config/timing';
import Scene01 from './scenes/Scene01_TheHeadwind';
// ...etc

export const Main = () => (
  <AbsoluteFill style={{ backgroundColor: '#070B1F' }}>
    <Sequence from={timing.scene01.start} durationInFrames={timing.scene01.duration}>
      <Scene01 />
    </Sequence>
    <Sequence from={timing.scene02.start} durationInFrames={timing.scene02.duration}>
      <Scene02 />
    </Sequence>
    {/* ... */}
  </AbsoluteFill>
);
```

Each scene uses its **local** frame (via `useCurrentFrame()` inside the `Sequence`), so scenes are timing-agnostic and reusable.

---

## 6. Shared Components

### 6.1 `Background.tsx`
Three layered elements always present, varying intensity per scene via props:
1. Base color fill (`bgDeep`)
2. Radial gradient orb behind action (`bgGlow` at 40% opacity, position prop)
3. Subtle film grain via `@remotion/noise` at 4% opacity

Props: `glowPosition?: 'center' | 'topLeft' | 'topRight'`, `intensity?: number`

### 6.2 `ParticleField.tsx`
Renders N particles drifting upward with parallax. Each particle has random:
- Size (1–4px)
- Speed (slow drift)
- Opacity oscillation
- Depth layer (3 layers — closer = larger + faster + more blur)

Props: `count?: number = 80`, `color?: string`, `speed?: number = 1`

### 6.3 `NodeChip.tsx`
The atomic wiki node. Reused in Scenes 3, 4, 5.

Props:
```ts
interface NodeChipProps {
  label: string;
  icon?: ReactNode;
  state?: 'idle' | 'pulsing' | 'updating' | 'queried';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: string;
}
```

Visual: rounded-2xl pill with frosted glass effect (`backdrop-blur-md`), thin cyan border, label inside, optional icon. When `state='updating'`, border flashes brightly and a soft halo expands and fades.

### 6.4 `ConnectionLine.tsx`
Animated SVG path between two `{x, y}` points. Draws on with `stroke-dasharray` animation. Can pulse a "data packet" (small glowing circle) along the path when `pulsing=true`.

---

## 7. Scene-by-Scene Specification

> **Each scene below is independently editable.** The visual concept, animation breakdown, and narration are self-contained.

---

### SCENE 01 — *The Headwind*
**File:** `scenes/Scene01_TheHeadwind.tsx`
**Duration:** 390 frames (0:00 – 0:13)
**Narration:**
> "Every day, our Payment Integrity teams work against a quiet headwind. The knowledge we need — claim adjudication logic, edit rules, exclusion criteria, where the data actually lives — is real. It's just scattered. Across decks, wikis, tickets, and the heads of a few people who've been here long enough to remember."

#### Visual Concept
We open in a deep, dimensional dark-navy space. Twelve to fifteen "knowledge fragments" — small floating cards rendered as frosted-glass tiles — drift slowly through 3D space at three depth layers. Each card shows a real artifact: a Confluence snippet, a SQL fragment, a policy PDF cover, a Slack message, a sticky note that reads *"ask Tom?"*. They are disconnected, slightly tilted at random angles, drifting on independent vectors. The whole frame feels like an attic of knowledge — valuable, but ungoverned.

#### Animation Breakdown

**Frames 0–60 (0:00–0:02): Establish**
- Camera starts at `scale: 1.08, translateY: -20px` and slowly returns to neutral over the full 13s (subtle dolly-in).
- Background `GlowOrb` at top-left, 30% intensity, pulses very slowly (8s cycle).
- Particle field of 60 dust particles at 30% opacity, drifting upward.

**Frames 0–180 (0:00–0:06): Fragments fade in, staggered**
- 14 fragment cards. Each enters with:
  - `opacity: 0 → 1` over 25 frames, eased `outExpo`
  - `scale: 0.85 → 1` over 25 frames, spring `gentle`
  - `blur: 12px → 0px` over 25 frames
- Stagger: 8 frames between each fragment. Total stagger range: 0–112 frames.
- Each fragment is positioned in a loose, organic grid — *not* uniform. Use a deterministic pseudo-random layout (seeded) so it's stable across re-renders.

**Frames 60–390 (0:02–0:13): Continuous drift**
- Each fragment has independent `translateX` and `translateY` oscillations using `Math.sin(frame / period + phase)` with periods between 180–300 frames.
- Subtle individual rotation oscillation (±2deg).
- Three depth layers:
  - Back (4 fragments): `scale 0.7`, `opacity 0.5`, `blur 3px`
  - Mid (6 fragments): `scale 0.9`, `opacity 0.8`, `blur 1px`
  - Front (4 fragments): `scale 1.1`, `opacity 1.0`, `blur 0`

**Frames 300–390 (0:10–0:13): Words highlight**
- As the narration says "scattered," all fragments tint slightly cooler (saturation drop 20%) over 30 frames — emotionally underscoring the problem without being heavy-handed.

#### Fragment Content (the actual text on the cards)
Use a mix of these:
- *"Edit 4023: Mod-25 + E&M same DOS"* (mono)
- *"COSMOS.CLM_DTL"* (mono)
- *"Exclusion list — Q2 refresh?"*
- *"Policy update: see Tom's email"*
- *"FWAE intake form"*
- *"Adjudication routing — Tier 3"*
- *"SELECT * FROM clm WHERE ..."* (mono)
- *"Slack: #pi-investigations"*
- *"Provider taxonomy mapping"*
- *"Galaxy → NDB join key?"*
- *"Vendor edits — last updated 2023?"*
- Confluence-style logo icon on 2 cards
- PDF icon on 2 cards

#### Wow factor
The subtle 3D parallax combined with the slow camera dolly creates a depth-of-field feel that says "cinematic," not "PowerPoint." The fragments must *breathe* — never still.

#### Props interface
```ts
interface Scene01Props {
  fragmentCount?: number;     // default 14
  glowIntensity?: number;     // default 0.3
}
```

---

### SCENE 02 — *The Wall*
**File:** `scenes/Scene02_TheWall.tsx`
**Duration:** 390 frames (0:13 – 0:26)
**Narration:**
> "This became especially clear as we built automations under AI Defense to identify fraud. The models and agents were capable — but they kept hitting the same wall. They didn't have the right context. So we stopped trying to patch context in case by case, and asked a bigger question: what if we structured our knowledge from the ground up so agents could work with it natively?"

#### Visual Concept
The drifting fragments from Scene 1 still occupy the space, but now an *agent* enters frame from the left as a clean geometric icon — a glowing hexagonal core with thin orbital rings. It moves toward the fragments. A translucent barrier — visualized as a vertical sheet of distorted light — sits between the agent and the knowledge. The agent collides with the barrier. Ripples. Tries again. Ripples again. Then: the barrier dissolves and the agent floats forward. A bright pinpoint of light ignites at the center of the frame. A line of text appears: *"What if knowledge was built for agents?"*

#### Animation Breakdown

**Frames 0–60 (0:00–0:02): Agent enters**
- Inherit fragment positions from Scene 1's final state (use shared `fragmentLayout()` deterministic function).
- Agent icon enters from left edge (`translateX: -200 → 400`) with `spring snappy`.
- Trail of fading copies behind the agent (5 ghosted copies, each at lower opacity) — creates motion blur effect.
- Agent has slow rotation on its orbital rings (continuous, 1 rev / 4s).

**Frames 60–150 (0:02–0:05): First collision**
- Barrier appears (a vertical translucent rectangle, full height of frame, ~80px wide, positioned just past center).
  - Built with: linear gradient (vertical) + animated noise + chromatic aberration on edges.
  - Enters with `opacity: 0 → 0.6` and a brief flash.
- Agent hits barrier at frame 90.
  - Ripple effect: SVG circle expands from impact point, `r: 0 → 200px`, `opacity: 0.8 → 0` over 30 frames.
  - Agent's `translateX` springs back (`x: 400 → 320`) with damped spring.
- Agent re-attempts at frame 120. Same ripple. Slightly weaker bounce.

**Frames 150–240 (0:05–0:08): Realization**
- Camera pulls back slightly (`scale: 1 → 0.95`) — a moment of stepping back to think.
- All motion slows. Fragments dim to 30% opacity. Agent slows.
- Barrier color shifts subtly from cool blue to a warmer amber tint (signaling "the problem is real").

**Frames 240–330 (0:08–0:11): The reframe**
- Barrier *dissolves* — not breaks. Particles disperse upward like embers, `opacity: 0.6 → 0` over 45 frames.
- A single bright dot ignites at center of frame.
  - `scale: 0 → 1`, `blur: 20 → 0`, `opacity: 0 → 1` over 30 frames with spring `standard`.
  - Followed by a soft radial bloom (200px diameter, fades out over 60 frames).
- Fragments begin to orient — each card slowly rotates so its "face" points toward the central light point.

**Frames 330–390 (0:11–0:13): The question**
- Text appears, center-low: *"What if knowledge was built for agents?"*
- Reveal: per-word fade + slight `translateY: 8 → 0`, stagger 5 frames per word.
- Text color: `textPrimary`, italicized for emphasis, 40px.

#### Wow factor
The barrier collision moment is the emotional anchor. The ripple + bounce-back must feel *physical* — like the agent has real momentum. Use chromatic aberration on the barrier edges (subtle R/G/B channel offset) for a "wrong reality" feel that resolves when the barrier dissolves.

#### Props interface
```ts
interface Scene02Props {
  collisionCount?: number;    // default 2
  showCaptionText?: boolean;  // default true
}
```

---

### SCENE 03 — *The Index*
**File:** `scenes/Scene03_TheIndex.tsx`
**Duration:** 690 frames (0:26 – 0:49) — *longest scene, the explanatory heart*
**Narration:**
> "That's the LLM Wiki. At its core sits an index — a map that knows where every piece of knowledge lives and how to retrieve it. Adjudication logic, policy intent, edit rationale, system mappings, table definitions, filters, exclusions — each becomes a node the index can point an agent to, instantly. Today the wiki organizes this knowledge across two aspects: the business and the data. Tomorrow it can grow to three, five, ten — whatever the work demands. The structure is built to expand."

#### Visual Concept
The central pinpoint of light from Scene 2 expands into a glowing geometric **Index Core** — a rotating hexagonal lattice with internal light, sitting in the center of frame. As the narrator names each type of knowledge, a corresponding **Node Chip** materializes around the core and a **glowing connection line** draws from the core to the node. The nodes organize themselves into two clusters — labeled subtly as "Business" on the left, "Data" on the right. Then, when the narration says *"grow to three, five, ten"*, additional ghostly placeholder nodes (3, 5, 10) fade in further out, indicating extensibility — the wiki visibly has room to expand.

Finally, an agent (same icon from Scene 2) appears, queries the index, and we watch a path **light up** through the index to a specific node, demonstrating retrieval.

#### Animation Breakdown

**Frames 0–90 (0:00–0:03): Index Core births**
- The pinpoint from Scene 2 expands into the Index Core.
- Core is a hexagonal lattice rendered in SVG:
  - Outer hexagon (200px radius)
  - Inner hexagons forming a honeycomb (3 layers deep)
  - Internal glow color: gradient from `cyanGlow` core → `brightBlue` edges
  - Slow continuous rotation: 1 rev / 12s
  - Subtle "breathing": scale oscillation 0.98 ↔ 1.02 (3s period)
- Around the core: 3 thin orbital rings at different inclinations, also rotating

**Frames 60–390 (0:02–0:13): Nodes materialize, narrator-synchronized**
- 7 primary nodes appear in sequence, each as the narrator says its name:
  - F~75: **"Adjudication logic"** (Business cluster, upper-left)
  - F~120: **"Policy intent"** (Business cluster, mid-left)
  - F~165: **"Edit rationale"** (Business cluster, lower-left)
  - F~210: **"System mappings"** (Data cluster, upper-right)
  - F~255: **"Table definitions"** (Data cluster, mid-right)
  - F~300: **"Filters"** (Data cluster, lower-right)
  - F~345: **"Exclusions"** (Data cluster, far-right)

Each node:
- Enters with `scale: 0 → 1` spring `standard`, `opacity: 0 → 1` over 20 frames
- Simultaneously: a `ConnectionLine` draws from Index Core to the node:
  - `stroke-dasharray` animates from `0 → fullLength` over 25 frames
  - Then a small "data packet" (4px glowing circle) travels the line once, core → node, completing as the node finishes entering
  - Line stays at 30% opacity once drawn

**Frames 390–510 (0:13–0:17): Cluster labels resolve**
- Two subtle text labels fade in:
  - *"BUSINESS"* (left side, small caps, 18px, `textSecondary`, opacity 0.6)
  - *"DATA"* (right side, same treatment)
- A faint translucent arc behind each cluster (very subtle, opacity 0.08) groups the nodes visually.

**Frames 510–600 (0:17–0:20): Extensibility moment**
- As narrator says "three, five, ten" — synchronized:
  - F~520: A ghostly placeholder node fades in at top of frame, labeled with just *"+"* (or *"·  ·  ·"*), opacity 0.3
  - F~545: Two more placeholders fade in at other positions
  - F~570: A few more, even further out, even more ghosted (opacity 0.15)
- This visualizes "room to grow" without literal numbers cluttering the frame.
- The Index Core itself pulses brighter (`scale: 1 → 1.08 → 1` over 30 frames) at the moment "the structure is built to expand."

**Frames 600–690 (0:20–0:23): Agent retrieval demo**
- Agent icon enters from bottom-left (smaller now, 60% size — the focus is the wiki, not the agent).
- Agent floats up to the Index Core (translates to a position just below it).
- A query pulse: small particle emits from agent → reaches core → core "lights up" briefly (`brightness: 1 → 1.5 → 1` over 20 frames).
- The core sends a return pulse along one specific connection line (e.g., the line to "Exclusions") — the packet travels visibly, the destination node flashes bright cyan, holds for 15 frames, then settles back.
- This visually says: *agent asks → index routes → exact node returns.*

#### Layout (positions, percent-of-frame, anchor: center)
```
Index Core:              (50%, 50%)
Adjudication logic:      (25%, 28%)
Policy intent:           (20%, 50%)
Edit rationale:          (25%, 72%)
System mappings:         (75%, 28%)
Table definitions:       (80%, 50%)
Filters:                 (75%, 72%)
Exclusions:              (88%, 60%)
Cluster label "BUSINESS":(15%, 90%)
Cluster label "DATA":    (85%, 90%)
Placeholders:            scattered outer ring at 35° intervals
```

#### Wow factor
The Index Core is the visual signature of the entire video. Treat it like a hero asset:
- Internal light should *flicker* organically — not perfectly periodic, but with subtle randomness (use a few overlaid sine waves at different frequencies on the internal glow opacity)
- The honeycomb edges should have a chromatic glow (slight cyan-to-magenta separation on the outer edges, very subtle, 1–2px)
- When a query pulse travels, the path should *light up the lattice* it passes through — small hexagons in the core illuminate sequentially as the pulse moves

#### Props interface
```ts
interface Scene03Props {
  nodeData?: NodeData[];          // override which nodes appear & in what order
  showAgentQuery?: boolean;       // default true
  placeholderCount?: number;      // default 6
}

interface NodeData {
  label: string;
  cluster: 'business' | 'data' | 'other';
  position: { x: number; y: number }; // percent
  appearAtFrame: number;
}
```

This is the scene most likely to need post-review edits, so making node positions and labels prop-driven is critical.

---

### SCENE 04 — *The Living Wiki*
**File:** `scenes/Scene04_LivingWiki.tsx`
**Duration:** 600 frames (0:49 – 1:09)
**Narration:**
> "And here's where it becomes truly transformative. A dedicated agent continuously ingests new signal — policy changes, system migrations, new exclusions, SME conversations — and rewrites the affected nodes in real time. The wiki maintains itself. Documentation stops aging the moment it's written. Tribal knowledge stops being tribal."

#### Visual Concept
The wiki structure from Scene 3 persists, but now we focus on **flow**. Four labeled particle streams flow inward from the edges of the frame — each labeled at its source. The streams hit a central "Ingestion Agent" (a smaller distinct icon, separate from the query agent), which transforms them into pulses that travel into the wiki and update specific nodes. Each updated node flashes brightly and refreshes. A subtle "last updated: just now" timestamp ticks at the bottom of the frame, with the time recalculating every second.

#### Animation Breakdown

**Frames 0–60 (0:00–0:02): Carry-over and refocus**
- The wiki structure from Scene 3 fades in at 70% opacity (lower than Scene 3 — we're focused on flow now, not structure).
- All placeholder/ghost nodes from Scene 3 are removed.
- Camera shifts slightly: `scale: 1.05` so the structure feels more present.

**Frames 30–600 (0:01–0:20): Four particle streams**
Streams enter from four edges, each labeled at source:
- **Top:** *"Policy updates"* — particles tinted `brightBlue`
- **Right:** *"Change tickets"* — particles tinted `cyanGlow`
- **Bottom:** *"SME conversations"* — particles tinted `optumGold` (warm — human source)
- **Left:** *"System migrations"* — particles tinted `brightBlue`

Each stream:
- Label fades in at edge at scene frame ~30
- Particles emit at a rate of ~2 per second
- Each particle travels along a curved path (Bezier) toward the central Ingestion Agent
- Particles have trails (5 fading copies behind)
- Speed varies slightly per particle (organic feel)

**Frames 90–600 (0:03–0:20): Ingestion Agent**
- Position: center-frame, slightly above the wiki structure
- Visual: a smaller, distinct icon from the query agent — a downward-pointing triangular crystal with internal light. This signals "ingest/write," vs. the query agent's "retrieve."
- When a particle hits it: the agent pulses briefly, then emits an outbound pulse to a specific wiki node
- Continuous subtle rotation, internal light flickering

**Frames 150–600 (0:05–0:20): Node updates**
- As pulses arrive at nodes, the affected node:
  - Border flashes from `nodeBorder` → `nodeBorderHot` over 8 frames
  - Halo expands (`r: 0 → 60px`, `opacity: 0.6 → 0`, over 25 frames)
  - Label text very briefly increases brightness (10 frames)
- Updates should look like "the node is being refreshed," not "explosion."
- Roughly 8–10 node updates across the scene, distributed across different nodes — feels constant but never frantic.

**Frames 60–600 (0:02–0:20): Timestamp ticker**
- Bottom-center, small monospace text: *"Last updated: 0s ago"*
- Re-renders every 30 frames (every second) and increments
- BUT — every time a node update fires, the timestamp resets to *"0s ago"* and flashes briefly
- This creates the visual punchline: *the timestamp never gets old, because the wiki updates itself.*
- Font: JetBrains Mono, 22px, `textSecondary`, opacity 0.7

**Frames 480–600 (0:16–0:20): Tribal knowledge moment**
- As narrator says "Tribal knowledge stops being tribal," subtly emphasize the "SME conversations" stream — it pulses brighter, more particles flow, and a single update lands on a node that briefly shows the text *"From: Tom's morning sync"* under it (the same "Tom" referenced in Scene 1's sticky note — a callback).
- The callback should be subtle — leadership will notice it on second watch, which makes the video reward re-watching.

#### Wow factor
The **callback to "Tom"** from Scene 1 is the emotional landing. It transforms the abstract "tribal knowledge" into a person. Don't overdo the callback — small label text, 1.5 seconds, then it fades. The fact that it's there is what matters.

Beyond that: the **streams must feel alive.** Each particle should have slight variance — speed, opacity, path curvature. Avoid any sense of regular emission rate. Think of it like rain or fireflies, not a conveyor belt.

#### Props interface
```ts
interface Scene04Props {
  streamLabels?: { top: string; right: string; bottom: string; left: string };
  updateFrequency?: number;       // updates per 100 frames, default 1.5
  showTomCallback?: boolean;      // default true
}
```

---

### SCENE 05 — *The Blueprint*
**File:** `scenes/Scene05_Blueprint.tsx`
**Duration:** 480 frames (1:09 – 1:25)
**Narration:**
> "We're starting in Payment Integrity because the impact is immediate — faster investigations, fewer false positives, analysts productive in days instead of months. But the capability we've built reaches much further. It can serve as the blueprint for an organization-wide wiki at UHG, the foundation for any complex business use case, and a context engineering layer for every team building agents of their own."

#### Visual Concept
Camera pulls back dramatically. The Payment Integrity wiki — now seen from a distance — is revealed as one node in a much larger constellation. As the camera continues to retreat, other wiki structures fade into view across the frame, each labeled with a UHG function (Claims, Clinical, Optum Rx, Provider Operations, Actuarial, Network, Member Experience). All share the same architecture. Thin connection lines form between them, suggesting a federated network. Small satellite agent icons appear around several wikis, signaling "teams building on this." Finally, a soft UHG-blue canopy/dome forms above the constellation.

#### Animation Breakdown

**Frames 0–120 (0:00–0:04): The pullback**
- The Scene 4 wiki structure begins shrinking via camera scale: `scale: 1 → 0.35` over 120 frames, eased `outQuart`.
- A subtle "PAYMENT INTEGRITY" label fades in *under* the shrinking wiki at frame 60.
- Background particle field intensifies — more dust, more dimension — to give the sense of vast space.

**Frames 90–300 (0:03–0:10): Sister wikis emerge**
- 6 additional wiki structures fade in across the frame, in a loose hexagonal arrangement around the original (which is now at center).
- Each: simplified version of the Scene 3 wiki (Index Core + ~4 nodes), at small scale (~25% of original).
- Stagger fade-in: 25 frames between each, with `opacity: 0 → 0.85`, `scale: 0.7 → 1`, spring `gentle`.
- Labels under each:
  - Top: **CLAIMS**
  - Top-right: **CLINICAL**
  - Right: **OPTUM RX**
  - Bottom-right: **PROVIDER OPS**
  - Bottom: **ACTUARIAL**
  - Bottom-left: **NETWORK**
  - Left: **MEMBER EXP**
- Each label uses small caps, 18px, `textSecondary`.

**Frames 240–390 (0:08–0:13): Federation lines**
- Thin connection lines (`opacity 0.2`, color `brightBlue`) draw between adjacent wikis, suggesting interconnection.
- Stagger draw: each line animates over 30 frames, `stroke-dasharray` reveal.
- Result: a web of light connecting all wikis — a network, not isolated silos.

**Frames 300–450 (0:10–0:15): Satellite agents**
- Small agent icons (very small now — 20px) appear around 3–4 of the wikis, orbiting slowly.
- Each represents "a team building agents that use the wiki."
- Subtle continuous rotation around their parent wiki.

**Frames 360–480 (0:12–0:16): UHG canopy**
- A wide, very subtle radial gradient appears at top of frame — a soft "dome" of UHG blue light.
- The canopy doesn't have visible edges — it's just a presence, a sense of enclosure.
- All wikis appear to sit under this canopy without it explicitly framing them.

#### Wow factor
The pullback is the cinematic moment. Make it feel earned:
- During the pullback, briefly increase motion blur on the receding structure
- The reveal of the sister wikis should feel like *stars becoming visible as your eyes adjust* — gradual, soft, not punchy
- The connection lines forming a network is what sells "blueprint" — the audience should physically see the architecture replicating

#### Props interface
```ts
interface Scene05Props {
  sisterWikis?: { label: string; angle: number }[];  // override layout
  showSatelliteAgents?: boolean;  // default true
  canopyIntensity?: number;       // default 0.4
}
```

---

### SCENE 06 — *Close*
**File:** `scenes/Scene06_Close.tsx`
**Duration:** 150 frames (1:25 – 1:30)
**Narration:**
> "Knowledge, AI-native. Built for our people. Ready for our agents."

#### Visual Concept
The constellation from Scene 5 contracts inward into a single bright point of light at center. From that point, the tagline emerges. Below it, the UHG logomark appears. The whole frame settles into a quiet, confident close. Final fade.

#### Animation Breakdown

**Frames 0–45 (0:00–0:015): Contraction**
- All elements from Scene 5 fade out while simultaneously translating toward center, like a slow inhale.
- `opacity: 1 → 0`, `scale: 1 → 0.1`, eased `outExpo` over 45 frames.
- A single bright point of light remains at center at the end — `scale: 0 → 1`, `opacity: 0 → 1`, spring `snappy`.

**Frames 45–90 (0:015–0:030): Tagline emerges**
- From the point of light, three lines of text fade in, line by line:
  - F~50: **"Knowledge, AI-native."** — large, 64px, Inter Display 700
  - F~65: **"Built for our people."** — 36px, Inter 500
  - F~80: **"Ready for our agents."** — 36px, Inter 500
- Each line: `opacity: 0 → 1` over 18 frames, slight `translateY: 8 → 0`.
- Lines stack vertically, centered, with generous spacing (24px between).

**Frames 90–120 (0:030–0:040): UHG logomark**
- UHG logo (provided asset) fades in below the text at 40% size of typical brand usage.
- `opacity: 0 → 1` over 25 frames.
- Subtle blue underglow behind the logo.

**Frames 120–150 (0:040–0:050): Hold and fade**
- Everything holds for 18 frames.
- Final fade to deep navy: `opacity: 1 → 0` over 12 frames.

#### Wow factor
This is the *quiet* scene. After 85 seconds of motion and depth, this scene's power comes from stillness. Resist any urge to add motion here beyond the gentle fade-ins. The audience should feel they've arrived somewhere.

#### Props interface
```ts
interface Scene06Props {
  taglineLines?: string[];   // override the three lines
  showLogo?: boolean;        // default true
  logoSrc?: string;          // path to UHG logo asset
}
```

---

## 8. Narration & Audio

### 8.1 Voiceover
- **Voice:** professional female or male VO, warm-confident register, mid-Atlantic neutral accent
- **Pace:** ~140 words per minute
- **Recommended tools:** ElevenLabs (voice: "Adam" or "Bella"), or human VO via Voices.com
- **Delivery notes:** Read with conviction — this is *not* corporate-bland. Pauses should land naturally before and after the key phrases *"a quiet headwind,"* *"the same wall,"* *"a bigger question,"* *"truly transformative,"* and *"the structure is built to expand."*

### 8.2 Music
- **Genre:** cinematic ambient with a subtle pulse — think Hans Zimmer's quieter work or Olafur Arnalds
- **Suggested track style:** sparse piano + sustained synth pads + a low, slow heartbeat-like bass
- **Build:** starts soft (Scene 1), gradually builds tension through Scene 2, blossoms into a warm major-key resolution by Scene 5, lands gently in Scene 6
- **Source:** Artlist, Musicbed, or a custom commission
- **Volume:** ducked to -18dB under voiceover, raises to -10dB during instrumental moments

### 8.3 Sound design (subtle, used sparingly)
- Scene 2 collision: a soft *thud* with deep low-end, very brief reverb tail (2 hits)
- Scene 3 node materializations: a delicate *shimmer* (high-frequency, very short — like a single harp pluck) on each node entry
- Scene 4 pulses arriving at nodes: very subtle *tick* sounds, almost subliminal
- Scene 6 tagline: nothing — pure music, let it breathe

All SFX should be at -24dB or quieter — atmospheric, never distracting.

---

## 9. Build & Render

### 9.1 Local preview
```bash
npm run dev
# Opens Remotion Studio at http://localhost:3000
```

### 9.2 Render final
```bash
npx remotion render Main out/llm-wiki-explainer.mp4 \
  --codec=h264 \
  --crf=18 \
  --pixel-format=yuv420p
```

### 9.3 Render for 4K (if needed for projection)
```bash
npx remotion render Main out/llm-wiki-explainer-4k.mp4 \
  --scale=2 \
  --codec=h264 \
  --crf=16
```

### 9.4 Audio integration
After rendering video, mix audio in Adobe Audition / DaVinci Resolve / Premiere:
1. Drop VO on track 1, sync to scene starts (timestamps in `config/narration.ts`)
2. Drop music on track 2 with ducking
3. Drop SFX on track 3
4. Export final MP4 with H.264 + AAC audio

---

## 10. Edit Workflow (for future changes)

| To change… | Edit only this file |
|---|---|
| Scene timing | `config/timing.ts` |
| Colors, fonts, easings | `config/tokens.ts` |
| Any narration line | `config/narration.ts` |
| Scene 1's fragment text | `scenes/Scene01_TheHeadwind.tsx` |
| Scene 3's node labels or layout | `scenes/Scene03_TheIndex.tsx` (props) |
| Scene 5's sister wiki list | `scenes/Scene05_Blueprint.tsx` (props) |
| The closing tagline | `scenes/Scene06_Close.tsx` (props) |

Each scene is fully isolated. No scene reads state from another. The only shared dependency is the design system in `config/tokens.ts`.

---

## 11. Quality Bar — What "Done" Means

Before declaring complete, verify:
- [ ] Every scene plays in isolation in Remotion Studio without errors
- [ ] No frame in the video is completely static — there is always at least one element in motion (particles, drift, glow oscillation)
- [ ] Camera moves are subtle and continuous, never abrupt
- [ ] Node materializations in Scene 3 are time-synced to narration (±5 frames acceptable)
- [ ] The "Tom" callback in Scene 4 is present and readable for ≥45 frames
- [ ] The pullback in Scene 5 feels earned — not too fast, not lingering
- [ ] Scene 6 has zero unnecessary motion — restraint is the point
- [ ] Final render at 1080p is under 50MB; at 4K under 200MB
- [ ] Color consistency across all scenes — no scene should feel like a different video
