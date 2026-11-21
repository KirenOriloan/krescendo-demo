# Krescendo

[Open the case library](https://kirenoriloan.github.io/krescendo-demo/)

Krescendo is a noncommercial portfolio project for reviewing audience feedback around music releases. The site presents three cases from local research.

| Case | Reviewed | Direct links | Video links only | Saved | Posts | Platforms with reviewed feedback |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Housewife · Tate McRae](https://kirenoriloan.github.io/krescendo-demo/#housewife/sources) | 1,083 | 1,074 | 9 | 1,346 | 192 | YouTube, Instagram, TikTok, Reddit, X |
| [hate that i made you love me · Ariana Grande](https://kirenoriloan.github.io/krescendo-demo/#hate-that-i-made-you-love-me/sources) | 1,005 | 1,001 | 4 | 1,101 | 14 | YouTube, Instagram, TikTok, Reddit, X |
| [Keyring · Cody Jon](https://kirenoriloan.github.io/krescendo-demo/#keyring/sources) | 323 | 275 | 48 | 734 | 29 | YouTube, Instagram, TikTok |

The Keyring searches yielded no eligible listener feedback on Reddit or X in this pass. Each Sources page shows the counts for all five platforms.

Open a track and follow **Overview**, **Sources**, **Audience Feedback**, **What to Try Next**, and **Feedback Brief**. These pages describe the analysis and the follow-up questions it produced.

## Case findings

- **Housewife.** Check which version of the choreography people are trying to learn and which steps still give them trouble. The slow tutorial is already available. [Feedback brief](https://kirenoriloan.github.io/krescendo-demo/#housewife/brief)
- **hate that i made you love me.** The expanded sample shows how reactions differed across the music video, rehearsal and a cappella version. One Reddit request is a reason to check how readily viewers can find a description of the visuals. [Feedback brief](https://kirenoriloan.github.io/krescendo-demo/#hate-that-i-made-you-love-me/brief)
- **Keyring.** Questions about how to get the heart keyring appeared under two release posts. Confirm purchase and shipping options. Keep the key change as a candidate for a music-led clip. [Feedback brief](https://kirenoriloan.github.io/krescendo-demo/#keyring/brief)

## Review a local snapshot

In **Review Text**, open a reviewed Krescendo snapshot from your device. The browser reads the file locally. You can filter by platform or topic, open the original comment or video, view available parent context and edit topic labels or sentiment. Reopen the snapshot after refreshing to see your saved labels. The page retains only label edits in browser storage.

The counts above describe the audited local snapshots. The case library and briefs are available without a snapshot. Original comment archives are stored separately from this repository. The [project progress page](https://kirenoriloan.github.io/krescendo-demo/#progress) documents what is public and which data permissions are still being reviewed.

## Run locally

From the root of the repository, start a static server:

```sh
python3 -m http.server 8789 --bind 127.0.0.1
```

Open [the local case library](http://127.0.0.1:8789/). The site uses plain HTML, CSS and JavaScript.
