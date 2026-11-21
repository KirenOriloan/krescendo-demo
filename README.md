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

## Try it without signing in

1. Open [Housewife’s recommendations](https://kirenoriloan.github.io/krescendo-demo/#housewife/next) and select **View supporting evidence**.
2. Read what the reviewed feedback contributed at each source. Filter by platform or open the original post.
3. Uncheck the largest source and see the count and share change in the preview. Use **Back to What to Try Next** to return to the same recommendation.

## How the analysis works

1. **Collect and deduplicate.** Save a dated snapshot of related release posts, fan videos and discussions. Track each comment or reply by platform and native ID. Keep the original post and enough reply context to review what the person meant.
2. **Label and review.** Use rule-based suggestions for an initial pass where available. Review the original wording and post context before using a record as evidence. Separate a request, a reported action, a specific opinion and general praise. Set aside spam, off-topic entries, unresolved cases and text kept only for context when counting support.
3. **Turn a finding into a follow-up.** Count the reviewed comments behind a specific finding, then count the distinct posts and calculate the largest post’s share. For Housewife, 10 tutorial requests across 7 posts support checking which routines people want to learn. A separate report of trying one routine leaves the actual sticking point open.

The public site uses reviewed snapshots of this analysis. Its preview recalculates support when you exclude a source. The published counts describe the collected sample, and the follow-ups are questions or tests for a release team.

## Case findings

- **Housewife.** Check which version of the choreography people are trying to learn and which steps still give them trouble. The slow tutorial is already available. [Feedback brief](https://kirenoriloan.github.io/krescendo-demo/#housewife/brief)
- **hate that i made you love me.** The expanded sample shows how reactions differed across the music video, rehearsal and a cappella version. One Reddit request is a reason to check how readily viewers can find a description of the visuals. [Feedback brief](https://kirenoriloan.github.io/krescendo-demo/#hate-that-i-made-you-love-me/brief)
- **Keyring.** Questions about how to get the heart keyring appeared under two release posts. Confirm purchase and shipping options. Keep the key change as a candidate for a music-led clip. [Feedback brief](https://kirenoriloan.github.io/krescendo-demo/#keyring/brief)

## Review a local snapshot

In **Review Text**, open a reviewed Krescendo snapshot from your device. The browser reads the file locally. You can filter by platform or topic, open the original comment or video, view available parent context and edit topic labels or sentiment. Reopen the snapshot after refreshing to see your saved labels. The page retains only label edits in browser storage.

The public evidence pages show counts, summaries of the reviewed feedback and source-post links. The summaries remain readable if an external site asks you to sign in or verify access. The individual comments are stored separately from this repository and can be opened in Review Text from an authorized local snapshot. The [project progress page](https://kirenoriloan.github.io/krescendo-demo/#progress) documents what is public and which data permissions are still being reviewed.

## Run locally

From the root of the repository, start a static server:

```sh
python3 -m http.server 8789 --bind 127.0.0.1
```

Open [the local case library](http://127.0.0.1:8789/). The site uses plain HTML, CSS and JavaScript.
