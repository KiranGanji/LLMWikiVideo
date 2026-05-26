export interface WikiNodeData {
  label: string;
  cluster: 'business' | 'data' | 'other';
  position: {x: number; y: number};
  appearAtFrame: number;
}

export const primaryNodeData: WikiNodeData[] = [
  {
    label: 'Adjudication logic',
    cluster: 'business',
    position: {x: 25, y: 28},
    appearAtFrame: 75,
  },
  {
    label: 'Policy intent',
    cluster: 'business',
    position: {x: 20, y: 50},
    appearAtFrame: 120,
  },
  {
    label: 'Edit rationale',
    cluster: 'business',
    position: {x: 25, y: 72},
    appearAtFrame: 165,
  },
  {
    label: 'System mappings',
    cluster: 'data',
    position: {x: 75, y: 28},
    appearAtFrame: 210,
  },
  {
    label: 'Table definitions',
    cluster: 'data',
    position: {x: 80, y: 50},
    appearAtFrame: 255,
  },
  {
    label: 'Filters',
    cluster: 'data',
    position: {x: 75, y: 72},
    appearAtFrame: 300,
  },
  {
    label: 'Exclusions',
    cluster: 'data',
    position: {x: 88, y: 60},
    appearAtFrame: 345,
  },
];

export const placeholderAngles = [35, 78, 122, 198, 252, 314];

export const sisterWikiLabels = [
  {label: 'CLAIMS', angle: -90, radius: 280},
  {label: 'CLINICAL', angle: -40, radius: 330},
  {label: 'OPTUM RX', angle: 0, radius: 345},
  {label: 'PROVIDER OPS', angle: 48, radius: 310},
  {label: 'ACTUARIAL', angle: 90, radius: 285},
  {label: 'NETWORK', angle: 140, radius: 320},
  {label: 'MEMBER EXP', angle: 180, radius: 340},
] as const;
