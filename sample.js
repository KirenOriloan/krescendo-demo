const trialSource = {
  id: 'critiquebrainz',
  name: 'CritiqueBrainz',
  screened: 6,
};

const trialTopics = {
  melody: 'Melody & rhythm',
  story: 'Lyrics & story',
  connection: 'Personal connection',
  video: 'Music video',
};

const trialSentiments = {
  positive: 'Positive',
  mixed: 'Mixed',
  neutral: 'Neutral',
  negative: 'Negative',
};

const trialReviews = [
  {
    id: '0f5d4bf4-5c2d-4621-8af3-1d08788ed915',
    author: 'gawwee',
    date: '2016-01-20',
    excerpts: [
      { subject: 'Personal connection to the song', text: '"Wildest Dreams" is a song that personally relates to me quite well too.' },
    ],
    topics: ['connection'],
    sentiment: 'positive',
  },
  {
    id: '81f0aa06-8b9c-4490-b090-7e54614fe59e',
    author: 'ana14',
    date: '2016-01-07',
    excerpts: [
      { subject: 'Musical feel', text: 'an incredible song and original with a peaceful rhythm.' },
      { subject: 'Writing', text: 'The lines are so good written and so well done' },
    ],
    topics: ['melody', 'story'],
    sentiment: 'positive',
  },
  {
    id: '5449549a-3845-4169-a1a1-0c00a876be7d',
    author: 'Samarpita Gulati',
    date: '2015-12-20',
    excerpts: [
      { subject: 'Lyrics and story', text: 'the story and lyrics were fabulous.' },
      { subject: 'Music video', text: 'The guest appearance of wild animals too was fascinating.' },
    ],
    topics: ['story', 'video'],
    sentiment: 'positive',
  },
  {
    id: 'a64e7c44-00fb-47d8-bb75-f57da58d6bf7',
    author: 'Daksh',
    date: '2015-12-03',
    excerpts: [
      { subject: 'Melody, in a comment about two tracks', text: '"I Know Places", and "Wildest Dreams" are just mesmerizing and their tunes so addicting' },
    ],
    topics: ['melody'],
    sentiment: 'positive',
  },
];

const trialFindings = [
  {
    id: 'musical-feel',
    title: 'The track’s musical feel stood out in two reviews',
    text: 'One reviewer noticed the peaceful rhythm. Another found the tune memorable in a passage about two songs.',
    evidence: [
      { id: '81f0aa06-8b9c-4490-b090-7e54614fe59e', topic: 'melody' },
      { id: 'a64e7c44-00fb-47d8-bb75-f57da58d6bf7', topic: 'melody' },
    ],
  },
  {
    id: 'writing',
    title: 'Two reviewers singled out the writing',
    text: 'One praised the way the lines were written. Another praised the lyrics and story.',
    evidence: [
      { id: '81f0aa06-8b9c-4490-b090-7e54614fe59e', topic: 'story' },
      { id: '5449549a-3845-4169-a1a1-0c00a876be7d', topic: 'story' },
    ],
  },
  {
    id: 'resonance',
    title: 'The song felt personally relatable',
    text: 'One reviewer described a personal connection. Their review leaves the reason open.',
    evidence: [{ id: '0f5d4bf4-5c2d-4621-8af3-1d08788ed915', topic: 'connection' }],
  },
  {
    id: 'wildlife',
    title: 'The wildlife in the video caught one reviewer’s attention',
    text: 'The reviewer specifically mentioned the animals. This is a lead for further review of visual reactions.',
    evidence: [{ id: '5449549a-3845-4169-a1a1-0c00a876be7d', topic: 'video' }],
  },
];

const trialOptions = [
  {
    id: 'intro-framing',
    title: 'Compare a music-first and a story-first introduction',
    findings: ['musical-feel', 'writing'],
    rationale: 'Reviewers pointed to both the track’s sound and its writing. Each gives a different way to introduce the song.',
    test: 'If the team is introducing the track to new listeners, use short intros of equal length that lead with the music or the story. Ask what listeners remember unaided and whether they would keep listening.',
    gap: 'This sample does not identify a winning angle or a specific timestamp. Recheck the evidence if one of the two themes loses support, and use listener results before choosing an introduction.',
  },
  {
    id: 'video-lead',
    title: 'Check if the wildlife detail comes up elsewhere',
    findings: ['wildlife'],
    rationale: 'One reviewer called the animals’ appearance in the video fascinating.',
    test: 'If the team is revisiting the video, look for the same detail in other eligible MV feedback or ask viewers what visual they recall.',
    gap: 'One review gives this lead. Look for the detail across independent sources before considering a visual-only edit.',
  },
];
