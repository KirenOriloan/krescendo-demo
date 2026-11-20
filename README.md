# Krescendo

[Open the case library](https://kirenoriloan.github.io/krescendo-demo/)

Krescendo is a noncommercial portfolio project for reviewing audience feedback around music releases. The site presents three completed local cases.

| Case | Verified feedback | Saved records | Source posts |
| --- | ---: | ---: | ---: |
| [Housewife · Tate McRae](https://kirenoriloan.github.io/krescendo-demo/#housewife/overview) | 1,074 | 1,346 | 192 |
| [hate that i made you love me · Ariana Grande](https://kirenoriloan.github.io/krescendo-demo/#hate-that-i-made-you-love-me/overview) | 977 | 1,070 | 7 |
| [Keyring · Cody Jon](https://kirenoriloan.github.io/krescendo-demo/#keyring/overview) | 275 | 734 | 29 |

Open a track and follow **Overview**, **Sources**, **Audience Feedback**, **What to Try Next**, and **Feedback Brief**. These pages describe the analysis and the follow-up questions it produced.

## Review a local snapshot

In **Review Text**, open a reviewed Krescendo snapshot from your device. The browser reads the file locally. You can filter by platform or topic, inspect the native permalink, view available parent context and edit topic labels or sentiment. Reopen the snapshot after refreshing to see your saved labels. The page retains only label edits in browser storage.

The verified totals above describe the audited local archives. Original comment archives are stored separately from this repository. The [project progress page](https://kirenoriloan.github.io/krescendo-demo/#progress) documents what is public and which data permissions are still being reviewed.

## Run locally

From the root of the repository, start a static server:

```sh
python3 -m http.server 8789 --bind 127.0.0.1
```

Open [the local case library](http://127.0.0.1:8789/). The site uses plain HTML, CSS and JavaScript.
