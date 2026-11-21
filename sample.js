const portfolioCases = [
  {
    id: 'housewife',
    title: 'Housewife',
    artist: 'Tate McRae',
    year: '2026',
    audited: 'November 17, 2026',
    coverage: {
      youtube: { posts: 23, saved: 340, direct: 297 },
      instagram: { posts: 25, saved: 267, direct: 235 },
      tiktok: { posts: 7, saved: 129, direct: 0, postOnly: 9 },
      reddit: { posts: 32, saved: 356, direct: 326 },
      x: { posts: 105, saved: 254, direct: 216 },
    },
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
    audited: 'November 20, 2026',
    coverage: {
      youtube: { posts: 3, saved: 736, direct: 683 },
      instagram: { posts: 3, saved: 14, direct: 14 },
      tiktok: { posts: 1, saved: 4, direct: 0, postOnly: 4 },
      reddit: { posts: 4, saved: 334, direct: 294 },
      x: { posts: 3, saved: 13, direct: 10 },
    },
    question: 'What should the team check about the video and the recording after seeing how people respond?',
    findings: [
      { topic: 'video', title: 'Visual storytelling and accessibility', text: 'Viewers discussed the diner scene and props on YouTube, Reddit and the official Instagram Reel. A separate request to describe the visuals came from one Reddit thread.' },
      { topic: 'music', title: 'Vocals across versions', text: 'The review tracks reactions to the studio performance, rehearsal, backing-vocal edit and a cappella version. Comments under one TikTok reaction video raised reservations about the production.' },
      { topic: 'theme', title: 'Lyrics and personal experiences', text: 'Personal interpretations are attributed to the listener and kept separate from claims about the story or the artist’s intent.' },
    ],
    primary: { title: 'Check how easily someone can find a description of the music video', text: 'Review the official assets and see whether a viewer can locate a clear account of the key scenes.', check: 'Confirm what description already exists and where it can be found before suggesting a new one.', topic: 'video' },
    secondary: { title: 'Keep a vocal passage as an alternative material test', text: 'If the team pursues an audio clip, compare how clearly the vocal layers come through on a phone.', topic: 'music' },
    links: [
      { title: 'Official music video', url: 'https://www.youtube.com/watch?v=82-jTNka3uc' },
      { title: 'Official lyric video', url: 'https://www.youtube.com/watch?v=v1t4MTqdfyI' },
      { title: 'Official MV release Reel', url: 'https://www.instagram.com/reel/DZD_-82Cmr1/' },
    ],
  },
  {
    id: 'keyring',
    title: 'Keyring',
    artist: 'Cody Jon',
    year: '2025',
    audited: 'November 20, 2026',
    coverage: {
      youtube: { posts: 2, saved: 57, direct: 6 },
      instagram: { posts: 14, saved: 555, direct: 269 },
      tiktok: { posts: 13, saved: 122, direct: 0, postOnly: 48 },
      reddit: { posts: 0, saved: 0, direct: 0, note: 'The release thread contained automated replies.' },
      x: { posts: 0, saved: 0, direct: 0, note: 'The searches found no track-specific listener feedback.' },
    },
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
