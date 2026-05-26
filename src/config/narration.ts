export interface CaptionSegment {
  start: number;
  end: number;
  text: string;
  align?: 'left' | 'center';
}

interface SceneNarration {
  voiceover: string;
  captions: CaptionSegment[];
}

export const narration: Record<string, SceneNarration> = {
  scene01: {
    voiceover:
      "Every day, our Payment Integrity teams work against a quiet headwind. The knowledge we need - claim adjudication logic, edit rules, exclusion criteria, where the data actually lives - is real. It's just scattered. Across decks, wikis, tickets, and the heads of a few people who've been here long enough to remember.",
    captions: [
      {
        start: 12,
        end: 120,
        text: 'A quiet headwind slows down every investigation.',
      },
      {
        start: 126,
        end: 255,
        text: 'The knowledge is real. The problem is where it lives.',
      },
      {
        start: 270,
        end: 372,
        text: 'Decks. Wikis. Tickets. Tribal memory.',
      },
    ],
  },
  scene02: {
    voiceover:
      "This became especially clear as we built automations under AI Defense to identify fraud. The models and agents were capable - but they kept hitting the same wall. They didn't have the right context. They didn't know the nuance of a policy, the exception buried in an edit, or which table actually held the truth. So we stopped trying to patch context in case by case, and asked a bigger question: what if we structured our knowledge from the ground up so agents could work with it natively?",
    captions: [
      {
        start: 28,
        end: 138,
        text: 'Capable agents still stall when context arrives fragmented.',
      },
      {
        start: 150,
        end: 252,
        text: "The wall isn't intelligence. It's access to the right nuance.",
      },
      {
        start: 320,
        end: 388,
        text: 'What if knowledge was built for agents?',
        align: 'center',
      },
    ],
  },
  scene03: {
    voiceover:
      "That's the LLM Wiki. At its core sits an index - a map that knows where every piece of knowledge lives and how to retrieve it. Adjudication logic, policy intent, edit rationale, system mappings, table definitions, filters, exclusions - each becomes a node the index can point an agent to, instantly. Today the wiki organizes this knowledge across two aspects: the business and the data. Tomorrow it can grow to three, five, ten - whatever the work demands. The structure is built to expand.",
    captions: [
      {
        start: 18,
        end: 144,
        text: 'An index sits at the core: a map to every piece of knowledge.',
      },
      {
        start: 195,
        end: 372,
        text: 'Each concept becomes a node an agent can retrieve instantly.',
      },
      {
        start: 510,
        end: 672,
        text: 'Two aspects today. Many more tomorrow.',
      },
    ],
  },
  scene04: {
    voiceover:
      "And here's where it becomes truly transformative. A dedicated agent continuously ingests new signal - policy changes, system migrations, new exclusions, SME conversations - and rewrites the affected nodes in real time. The wiki maintains itself. Documentation stops aging the moment it's written. Tribal knowledge stops being tribal.",
    captions: [
      {
        start: 20,
        end: 156,
        text: 'A write agent continuously ingests new signal.',
      },
      {
        start: 162,
        end: 342,
        text: 'Affected nodes refresh in real time as the wiki maintains itself.',
      },
      {
        start: 432,
        end: 582,
        text: 'Documentation stops aging. Tribal knowledge stops being tribal.',
      },
    ],
  },
  scene05: {
    voiceover:
      "We're starting in Payment Integrity because the impact is immediate - faster investigations, fewer false positives, analysts productive in days instead of months. But the capability we've built can reach much further. It can serve as the blueprint for an organization-wide wiki at UHG, the foundation for any complex business use case, and a context engineering layer for every team building agents of their own.",
    captions: [
      {
        start: 28,
        end: 168,
        text: 'Payment Integrity is the first proof point, not the final boundary.',
      },
      {
        start: 186,
        end: 324,
        text: 'The architecture can scale across the enterprise.',
      },
      {
        start: 330,
        end: 470,
        text: 'A context layer for every team building agents.',
      },
    ],
  },
  scene06: {
    voiceover:
      'Knowledge, AI-native. Built for our people. Ready for our agents.',
    captions: [],
  },
};
