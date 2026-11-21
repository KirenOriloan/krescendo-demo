const evidencePost = (platform, title, comments, url) => ({ platform, title, comments, url });

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
      { title: 'Choreography and learning', text: 'Viewers asked how to learn the routine they saw. One viewer reported trying Kevin’s choreography.', evidence: ['tutorials', 'practice'] },
      { title: 'Bridge and chorus', text: 'Listeners singled out the bridge across several posts. A separate reaction compares the runway chorus with the studio version.', evidence: ['bridge', 'chorus'] },
      { title: 'Clues in the music video', text: 'Viewers compared readings of the book title and other lettering. They also corrected one another’s interpretations.', evidence: ['props'] },
    ],
    primary: { title: 'Check which choreography people are trying to learn', text: 'Keep the creator and routine attached to each request. When a slow tutorial is available, check whether people still struggle with a specific step.', check: 'Look for an unresolved step in the same routine.', evidence: ['tutorials', 'practice'] },
    secondary: { title: 'Keep the bridge and chorus as separate clip candidates', text: 'Compare the two only after setting a goal and finding comparable source footage.', evidence: ['bridge', 'chorus'] },
    evidence: {
      tutorials: {
        title: 'Requests for dance instruction', topic: 'dance',
        note: 'People asked about the version they saw. One creator posted a slower tutorial. Requests for other routines need their own follow-up.',
        followUp: { title: 'Watch the published slow tutorial', url: 'https://www.tiktok.com/@gabriellllaaaar/video/7699339272603716878' },
        posts: [
          evidencePost('youtube', 'Dance challenge', 3, 'https://www.youtube.com/watch?v=PXWhxugwJoo'),
          evidencePost('tiktok', 'Gabriella’s dance challenge', 2, 'https://www.tiktok.com/@gabriellllaaaar/video/7697493880253533453'),
          evidencePost('instagram', 'Kevin’s choreography Reel', 1, 'https://www.instagram.com/p/Dejz2VRuTwS/'),
          evidencePost('instagram', 'Independent choreography Reel', 1, 'https://www.instagram.com/p/DfXRtmDOX4a/'),
          evidencePost('instagram', 'Independent duo choreography Reel', 1, 'https://www.instagram.com/p/DfCtSWaONWc/'),
          evidencePost('youtube', 'Independent dance cover', 1, 'https://www.youtube.com/watch?v=8VdiUo8tUAc'),
          evidencePost('youtube', 'Second dance-trend video', 1, 'https://www.youtube.com/watch?v=Hxfw95d_ZLI'),
        ],
      },
      practice: {
        title: 'Reported attempt to learn Kevin’s routine', topic: 'dance',
        note: 'One viewer said they tried the routine. The specific step they found difficult is unknown.',
        posts: [evidencePost('instagram', 'Kevin’s choreography Reel', 1, 'https://www.instagram.com/p/Dejz2VRuTwS/')],
      },
      bridge: {
        title: 'Praise for the bridge', topic: 'music',
        note: 'Some listeners singled out the bridge even while expressing reservations about the song as a whole.',
        posts: [
          evidencePost('reddit', 'r/popheads music video discussion', 2, 'https://www.reddit.com/r/popheads/comments/1x71kht/tate_mcrae_housewife_official_video/'),
          evidencePost('youtube', 'Official music video', 1, 'https://www.youtube.com/watch?v=DPEodkHzH-s'),
          evidencePost('reddit', 'Discussion of the release direction', 1, 'https://www.reddit.com/r/tatemcrae/comments/1x7eccn/im_so_confused_on_the_direction_of_tm4_after/'),
          evidencePost('reddit', 'Fan community music video discussion', 1, 'https://www.reddit.com/r/tatemcrae/comments/1x71l63/tate_mcrae_housewife_official_video/'),
          evidencePost('x', 'Fan post about the bridge', 1, 'https://x.com/byerudy/status/2110886374144692309'),
          evidencePost('x', 'Separate fan reaction to the bridge', 1, 'https://x.com/t8shousewife/status/2111088094686629971'),
        ],
      },
      chorus: {
        title: 'Clarity of the runway chorus', topic: 'music',
        note: 'One viewer found the chorus easier to hear in the runway performance. A clip comparison would require comparable versions and a goal.',
        posts: [evidencePost('youtube', 'Official runway live version', 1, 'https://www.youtube.com/watch?v=GpVM-FITRv4')],
      },
      props: {
        title: 'Interpretations of written props', topic: 'video',
        note: 'Three discussions in the same fan community and the official video contain observations about the wording on props.',
        posts: [
          evidencePost('reddit', 'Discussion of the book in the video', 2, 'https://www.reddit.com/r/tatemcrae/comments/1x76wtf/i_looked_up_la_vagabonde_the_book_she_was_reading/'),
          evidencePost('reddit', 'Music video Easter eggs', 2, 'https://www.reddit.com/r/tatemcrae/comments/1x87doi/housewife_easter_eggs_what_did_i_miss/'),
          evidencePost('reddit', 'Discussion of lettering on a prop', 1, 'https://www.reddit.com/r/tatemcrae/comments/1x9b9i0/another_possible_easter_egg_already_hinting_new/'),
          evidencePost('youtube', 'Official music video', 1, 'https://www.youtube.com/watch?v=DPEodkHzH-s'),
        ],
      },
    },
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
      { title: 'Clues in the music video', text: 'Viewers discussed name badges and other written details on YouTube, Reddit and the official Instagram Reel.', evidence: ['props'] },
      { title: 'Vocals across versions', text: 'Listeners commented on the lower register, the rehearsal, a backing-vocal edit and the a cappella release.', evidence: ['register', 'versions'] },
      { title: 'Reservations about the production', text: 'Two listeners under one TikTok reaction video wanted more development in the production or found the track too safe.', evidence: ['production'] },
    ],
    primary: { title: 'Check how easily someone can find a description of the music video', text: 'Review the official assets and see whether a viewer can locate a clear account of the key scenes.', check: 'Confirm what description already exists and where it can be found before suggesting a new one.', evidence: ['accessibility'] },
    secondary: { title: 'Keep a vocal passage as an alternative material test', text: 'If the team pursues an audio clip, test a passage that highlights the lower register.', evidence: ['register'] },
    evidence: {
      props: {
        title: 'Interest in written details', topic: 'video',
        note: 'The posts discuss the same music video. Listeners offered their own readings of the props.',
        posts: [
          evidencePost('youtube', 'Official music video', 2, 'https://www.youtube.com/watch?v=82-jTNka3uc'),
          evidencePost('reddit', 'r/popheads music video discussion', 2, 'https://www.reddit.com/r/popheads/comments/1ttuyl9/ariana_grande_hate_that_i_made_you_love_me/'),
          evidencePost('reddit', 'r/ariheads music video discussion', 2, 'https://www.reddit.com/r/ariheads/comments/1ttv2vn/hate_that_i_made_you_love_me_official_music_video/'),
          evidencePost('instagram', 'Official music video Reel', 1, 'https://www.instagram.com/reel/DZD_-82Cmr1/'),
        ],
      },
      register: {
        title: 'Praise for the lower register', topic: 'music',
        note: 'The lyric video contributed most of this feedback. Ten comments came from the two separate Reddit discussions.',
        posts: [
          evidencePost('youtube', 'Official lyric video', 16, 'https://www.youtube.com/watch?v=v1t4MTqdfyI'),
          evidencePost('reddit', 'Single release discussion', 9, 'https://www.reddit.com/r/popheads/comments/1tqpv5u/ariana_grande_hate_that_i_made_you_love_me/'),
          evidencePost('reddit', 'Music video discussion', 1, 'https://www.reddit.com/r/popheads/comments/1ttuyl9/ariana_grande_hate_that_i_made_you_love_me/'),
        ],
      },
      versions: {
        title: 'Reactions to alternate vocal versions', topic: 'music',
        note: 'One listener compared rehearsal notes with the studio recording, another wanted the backing vocals louder, and another praised the a cappella version.',
        posts: [
          evidencePost('x', 'Rehearsal performance clip', 1, 'https://x.com/PopBase/status/2062160618656874988'),
          evidencePost('x', 'Isolated backing vocals', 1, 'https://x.com/arianafeeds/status/2060272333130961184'),
          evidencePost('x', 'Fan post about the a cappella version', 1, 'https://x.com/AriGrandeStats/status/2060363930627699001'),
        ],
      },
      production: {
        title: 'Production reservations', topic: 'music',
        note: 'Both comments are from a single release-day reaction video.',
        posts: [evidencePost('tiktok', 'Release-day reaction video', 2, 'https://www.tiktok.com/@willtalksmusic/video/7645461565906406686')],
      },
      accessibility: {
        title: 'Request for a description of the music video', topic: 'video',
        note: 'One listener asked what happens in the video. A reply in the same discussion provides context. The request is enough to check what is already available.',
        posts: [evidencePost('reddit', 'Music video discussion', 1, 'https://www.reddit.com/r/popheads/comments/1ttuyl9/ariana_grande_hate_that_i_made_you_love_me/')],
      },
    },
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
      { title: 'Merchandise availability', text: 'Listeners asked where to buy the heart keyring, including whether online orders and international shipping were available.', evidence: ['merch'] },
      { title: 'Key change', text: 'Listeners singled out the key change. The caption of one lyric edit had already drawn attention to it.', evidence: ['key-change'] },
      { title: 'Choreography praise', text: 'Two viewers praised the choreography under the artist’s Reel.', evidence: ['choreography'] },
    ],
    primary: { title: 'Verify current keyring purchase and shipping options', text: 'Check inventory, the point of sale and delivery coverage. If the question is still open, share the confirmed details.', check: 'Verify the current offer before answering purchase questions.', evidence: ['merch'] },
    secondary: { title: 'Keep the key change as a clip candidate', text: 'If the team wants a music-led asset, test an excerpt around the key change.', evidence: ['key-change'] },
    evidence: {
      merch: {
        title: 'Questions about getting the heart keyring', topic: 'request',
        note: 'Both posts came from Cody. The count covers questions about availability, including online sales and shipping.',
        posts: [
          evidencePost('instagram', 'Official release announcement', 4, 'https://www.instagram.com/codyjon/p/DRg1nRmgb8t/'),
          evidencePost('instagram', 'Release teaser', 3, 'https://www.instagram.com/codyjon/reel/DRTME7vARQ4/'),
        ],
      },
      'key-change': {
        title: 'Praise for the key change', topic: 'music',
        note: 'All three posts came from Cody. Two comments were on a lyric edit whose caption called out the key change.',
        posts: [
          evidencePost('instagram', 'Official release announcement', 2, 'https://www.instagram.com/codyjon/p/DRg1nRmgb8t/'),
          evidencePost('instagram', 'Key-change lyric edit', 2, 'https://www.instagram.com/reel/DajhR_PhXZF/'),
          evidencePost('tiktok', 'Song scenario video', 1, 'https://www.tiktok.com/@c0dyjon/video/7577176153119624455'),
        ],
      },
      choreography: {
        title: 'Praise for the choreography', topic: 'dance',
        note: 'Both comments refer to the same routine on the same Reel.',
        posts: [evidencePost('instagram', 'Artist choreography Reel', 2, 'https://www.instagram.com/reel/DfyJXTiBRY5/')],
      },
    },
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
