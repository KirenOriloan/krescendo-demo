const portfolioCases = [
  {
    id: 'housewife',
    title: 'Housewife',
    artist: 'Tate McRae',
    year: '2026',
    reviewed: 1074,
    archived: 1346,
    posts: 192,
    platforms: ['YouTube', 'Instagram', 'TikTok', 'Reddit', 'X'],
    question: 'Which choreography feedback gives the release team something concrete to follow up on?',
    findings: [
      { topic: 'dance', title: 'Choreography and learning', text: 'The case separates praise, requests for instruction, plans to try a dance and first-hand reports of practicing. Each is tied to a specific version of the choreography.' },
      { topic: 'music', title: 'Bridge and chorus', text: 'The analysis keeps the song’s bridge and chorus separate and distinguishes the official video from live and cover versions.' },
      { topic: 'video', title: 'Visual and performance feedback', text: 'Comments about the music video and its performance are separated from reactions to fan edits and other creators.' },
    ],
    primary: { title: 'Check which choreography people are trying to learn', text: 'Keep the creator and routine attached to each request. Where a slow tutorial already exists, point people to it and look for a specific step they still struggle with.', check: 'A follow-up needs evidence of an unresolved step in the same routine.', topic: 'dance' },
    secondary: { title: 'Keep the bridge and chorus as separate clip candidates', text: 'Compare the two only after setting a goal and finding comparable source footage.', topic: 'music' },
    links: [
      { title: 'Official music video', url: 'https://www.youtube.com/watch?v=DPEodkHzH-s' },
      { title: 'Official release notes', url: 'https://www.sonymusic.ca/press_release/tate-mcrae-releases-housewife' },
    ],
  },
  {
    id: 'hate-that-i-made-you-love-me',
    title: 'hate that i made you love me',
    artist: 'Ariana Grande',
    year: '2026',
    reviewed: 977,
    archived: 1070,
    posts: 7,
    platforms: ['YouTube', 'Reddit'],
    question: 'What should the team check about the video and the recording after seeing how people respond?',
    findings: [
      { topic: 'video', title: 'Visual storytelling and accessibility', text: 'The case separates interpretation of the restaurant scene and props from the practical question of how to find a description of the visuals.' },
      { topic: 'music', title: 'Vocal details', text: 'The review records reactions to particular changes in register and layers of vocals alongside reservations about the mix and chorus.' },
      { topic: 'theme', title: 'Lyrics and personal experiences', text: 'Personal interpretations are attributed to the listener and kept separate from claims about the story or the artist’s intent.' },
    ],
    primary: { title: 'Check how easily someone can find a description of the music video', text: 'Review the official assets and see whether a viewer can locate a clear account of the key scenes.', check: 'Confirm what description already exists and where it can be found before suggesting a new one.', topic: 'video' },
    secondary: { title: 'Keep a vocal passage as an alternative material test', text: 'If the team pursues an audio clip, compare how clearly the vocal layers come through on a phone.', topic: 'music' },
    links: [
      { title: 'Official music video', url: 'https://www.youtube.com/watch?v=82-jTNka3uc' },
      { title: 'Official lyric video', url: 'https://www.youtube.com/watch?v=v1t4MTqdfyI' },
    ],
  },
  {
    id: 'keyring',
    title: 'Keyring',
    artist: 'Cody Jon',
    year: '2025',
    reviewed: 275,
    archived: 734,
    posts: 29,
    platforms: ['Instagram', 'TikTok', 'YouTube'],
    question: 'Which listener questions can the team answer, and which musical observations are worth keeping for later?',
    findings: [
      { topic: 'request', title: 'Merchandise availability', text: 'Requests about the heart keyring are kept separate from general praise. The review distinguishes finding a seller from purchase intent.' },
      { topic: 'music', title: 'Key change and chorus piano', text: 'The review distinguishes remarks that arise without prompting from remarks on posts where the caption already points to the musical moment.' },
      { topic: 'theme', title: 'Personal use of the song', text: 'Comments about relationships, singing along or returning to the recording are recorded as individual reports.' },
    ],
    primary: { title: 'Verify current keyring purchase and shipping options', text: 'Check inventory, the point of sale and delivery coverage. If the question is still open, a short, current answer is an actionable follow-up.', check: 'Check the current merch offer. The feedback does not measure sales or demand.', topic: 'request' },
    secondary: { title: 'Keep the key change as a clip candidate', text: 'If the team sets a goal for a music-led asset, compare the key change and chorus piano under that goal.', topic: 'music' },
    links: [
      { title: 'Original recording on Apple Music', url: 'https://music.apple.com/us/song/1851752560' },
      { title: 'Official audio', url: 'https://www.youtube.com/watch?v=Aa_6GJstPe4' },
    ],
  },
];

const topics = {
  music: 'Music & production',
  video: 'Visual storytelling',
  dance: 'Dance & choreography',
  theme: 'Lyrics & themes',
  request: 'Requests & access',
  engagement: 'Listener behavior',
  styling: 'Styling & performance',
  reservations: 'Reservations',
};

const sentiments = {
  positive: 'Positive',
  neutral: 'Neutral',
  mixed: 'Mixed',
  negative: 'Negative',
  uncertain: 'Uncertain',
};
