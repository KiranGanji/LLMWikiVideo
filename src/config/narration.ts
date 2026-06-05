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
      "This is what sets it apart from traditional RAG. In a traditional setup, documents sit as vectors in a store, and the connections between them are computed at query time - every question kicks off a similarity search, hoping the right context surfaces. We've inverted that. The connections are made the moment new information arrives. As policies shift, as SMEs share context, as systems evolve - the agent wires each new piece into the index right then, linking it to the nodes it affects. By the time a query lands, the work is already done. It's not a search, it's a lookup. Vector-less by design - structured, current, and built for agents.",
    captions: [
      {
        start: 102,
        end: 405,
        text: 'Traditional RAG computes connections at query time.',
      },
      {
        start: 438,
        end: 698,
        text: 'This index wires connections the moment information arrives.',
      },
      {
        start: 709,
        end: 889,
        text: 'It is not a search. It is a lookup.',
      },
    ],
  },
  scene06: {
    voiceover:
      'Knowledge, AI-native. Built for our people. Ready for our agents.',
    captions: [],
  },
};
