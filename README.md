# Krescendo

[Open the interactive demo](https://kirenoriloan.github.io/krescendo-demo/)

Krescendo helps music teams turn track feedback into findings they can check against the original evidence. This noncommercial portfolio demo shows the workflow on Taylor Swift’s original recording of “Wildest Dreams.”

1. Start in **Overview** and open a finding. Follow **Original review** to check the evidence.
2. In **Review Text**, open **Edit labels**, then save a change. Refresh to see that it stays in your browser.
3. Open **What to Try Next** and **Feedback Brief** to see how topic counts and evidence checks follow your edits.

The demo runs in your browser. It uses a fixed set of annotated reviews and recomputes summaries from their labels. It takes no account or API key.

## Sample and attribution

The sample contains excerpts from four reviews of the 2014 album *1989*. Each excerpt specifically addresses the original recording of “Wildest Dreams” or its music video. Findings describe those four reviewers.

| Author | Published | Source |
| --- | --- | --- |
| gawwee | January 20, 2016 | [Original review](https://critiquebrainz.org/review/0f5d4bf4-5c2d-4621-8af3-1d08788ed915) |
| ana14 | January 7, 2016 | [Original review](https://critiquebrainz.org/review/81f0aa06-8b9c-4490-b090-7e54614fe59e) |
| Samarpita Gulati | December 20, 2015 | [Original review](https://critiquebrainz.org/review/5449549a-3845-4169-a1a1-0c00a876be7d) |
| Daksh | December 3, 2015 | [Original review](https://critiquebrainz.org/review/a64e7c44-00fb-47d8-bb75-f57da58d6bf7) |

All four reviews are from [CritiqueBrainz’s *1989* collection](https://critiquebrainz.org/release-group/4d9ec1c2-58ec-48a4-aa0a-916718adead0). The original authors’ wording is preserved in the excerpts, and the excerpts retain their [CC BY-SA 3.0 license](https://creativecommons.org/licenses/by-sa/3.0/). The topic annotations and brief are by Krescendo. Links to Apple Music and YouTube are provided for reference.

## Run locally

From the root of this repository, start a static server:

```sh
python3 -m http.server 8788 --bind 127.0.0.1
```

Then open [the local demo](http://127.0.0.1:8788/).
