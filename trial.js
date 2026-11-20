'use strict';

const views = {
  overview: 'Overview',
  sources: 'Sources',
  feedback: 'Audience Feedback',
  reviews: 'Review Text',
  next: 'What to Try Next',
  brief: 'Feedback Brief',
};
const platformNames = { youtube: 'YouTube', instagram: 'Instagram', tiktok: 'TikTok', reddit: 'Reddit', x: 'X' };
const stage = document.getElementById('workspace-content');
const caseById = new Map(portfolioCases.map(item => [item.id, item]));
const localCases = new Map();
const format = new Intl.NumberFormat('en-US');
const pageSize = 15;

function escapeHtml(value) {
  const encoded = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(value ?? '').replace(/[&<>"']/g, character => encoded[character]);
}

function href(item, view = 'overview', params = {}) {
  const query = new URLSearchParams(params).toString();
  return `#${item.id}/${view}${query && '?' + query}`;
}

function route() {
  const [path, query] = location.hash.slice(1).split('?');
  const [id, destination] = path.split('/');
  return { item: caseById.get(id), view: Object.hasOwn(views, destination) ? destination : 'overview',
    params: new URLSearchParams(query), progress: id === 'progress' };
}

function openLink(url, label) {
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
}

function listStats(entries) {
  return `<dl>${entries.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>`;
}

function scope(item) {
  return listStats([
    ['Verified feedback records', format.format(item.reviewed)],
    ['Saved records', format.format(item.archived)],
    ['Source posts in archive', format.format(item.posts)],
  ]);
}

function renderLibrary() {
  stage.innerHTML = `
    <header class="release"><h1>Release feedback</h1><p>Three cases from source collection to a reviewable next step.</p></header>
    <section class="panel library">
      <div class="library-title"><h2>Case library</h2><p class="lede">Sample sizes are from the reviewed local archives.</p></div>
      <ul class="case-list">${portfolioCases.map(item => `<li><div>
          <h3><a href="${href(item)}">${escapeHtml(item.title)}</a></h3>
          <p>${escapeHtml(item.artist)} · ${item.year} single</p>
          <p class="case-question">${escapeHtml(item.question)}</p>
        </div><div class="case-size">
          <strong>${format.format(item.reviewed)}</strong>
          <span>verified feedback records</span>
          <span>${item.platforms.length} platforms in archive</span>
        </div></li>`).join('')}</ul>
    </section>`;
}

function renderProgress() {
  stage.innerHTML = `
    <header class="release"><h1>Project progress</h1><p>Case review, the public site and data permissions.</p></header>
    <section class="panel library">
      <a href="#library">Back to case library</a>
      <section class="finding"><h2>Completed locally</h2>
        <p>Three release cases have been collected, deduplicated and reviewed. Housewife has 1,074 verified feedback records. The full workspace supports review, source context and corrected label counts.</p></section>
      <section class="finding"><h2>Available on GitHub</h2>
        <p>Case summaries, links to official release material and the review interface. You can open a Krescendo review snapshot from your device to work with its contents in your browser.</p></section>
      <section class="finding"><h2>Public data permissions</h2>
        <p>Permission to redistribute the original comment archives is still under review. The public site shows the size of each local case and the questions it explored. Records and original comment links load from the snapshot you select.</p></section>
    </section>`;
}

function findingsHtml(item) {
  return item.findings.map(finding => `<section class="finding">
    <h3>${escapeHtml(finding.title)}</h3><p>${escapeHtml(finding.text)}</p>
    <a class="section-link" href="${escapeHtml(href(item, 'reviews', { topic: finding.topic, from: 'feedback' }))}">Review this topic</a>
  </section>`).join('');
}

function optionHtml(item, option, primary) {
  return `<section class="finding">
    <h3>${escapeHtml(option.title)}</h3>
    <p>${escapeHtml(option.text)}</p>
    ${primary ? `<p class="fine"><strong>What to check</strong> ${escapeHtml(option.check)}</p>` : ''}
    <a class="section-link" href="${escapeHtml(href(item, 'reviews', { topic: option.topic, from: 'next' }))}">Review supporting feedback</a>
  </section>`;
}

function localTopicSummary(item, records) {
  if (!records) return '';
  const groups = Object.keys(topics).map(topic => {
    const entries = records.rows.filter(row => row.included && row.tags.includes(topic));
    const posts = new Map();
    for (const row of entries) posts.set(row.postId, (posts.get(row.postId) ?? 0) + 1);
    return { topic, entries: entries.length, posts: posts.size,
      largest: entries.length ? Math.round(100 * Math.max(...posts.values()) / entries.length) : 0 };
  });
  return `<section class="finding"><h3>Topics in the local snapshot</h3>
    <p class="fine">Each review counts once in a topic. A review can appear in multiple topics.</p>
    <ul class="case-topics">${groups.map(({ topic, entries, posts, largest }) => `<li>
      <a href="${escapeHtml(href(item, 'reviews', { topic, from: 'feedback' }))}">${escapeHtml(topics[topic])}</a>
      <span>${format.format(entries)} records · ${posts} posts${entries ? ` · largest post ${largest}%` : ''}</span>
    </li>`).join('')}</ul></section>`;
}

function renderPanel(item, view, params, records) {
  if (view === 'overview') return `<p class="lede">${escapeHtml(item.question)}</p>
    ${findingsHtml(item)}
    <a class="action section-action" href="${href(item, 'feedback')}">Explore audience feedback</a>`;
  if (view === 'sources') return `<p class="lede">The local archive includes ${escapeHtml(item.platforms.join(', '))}.</p>
    <section class="finding"><h3>Official release material</h3>
      <ul class="evidence-links">${item.links.map(link => `<li>${openLink(link.url, link.title)}</li>`).join('')}</ul></section>
    <section class="finding"><h3>Feedback archive</h3>
      <p>The public case shows archival coverage. Open the local snapshot to filter the individual records and return to their original sources.</p>
      ${records ? `<ul class="case-topics">${item.platforms.map(platform => {
        const key = Object.keys(platformNames).find(id => platformNames[id] === platform);
        const count = records.rows.filter(row => row.platform === key && row.included).length;
        return `<li><a href="${escapeHtml(href(item, 'reviews', { platform: key, from: 'sources' }))}">${platform}</a><span>${format.format(count)} included</span></li>`;
      }).join('')}</ul>` : ''}
      <a class="section-link" href="${href(item, 'reviews')}">Open Review Text</a>
    </section>`;
  if (view === 'feedback') return `<p class="lede">The case groups feedback by what it refers to and what the reviewer expresses.</p>
    ${findingsHtml(item)}${localTopicSummary(item, records)}
    <a class="action section-action" href="${href(item, 'next')}">Explore possible next steps</a>`;
  if (view === 'next') return `<p class="lede">Possible follow-ups for the team to check.</p>
    ${optionHtml(item, item.primary, true)}${optionHtml(item, item.secondary, false)}
    <a class="action section-action" href="${href(item, 'brief')}">Open the feedback brief</a>`;
  if (view === 'brief') return `<p class="lede">${escapeHtml(item.question)}</p>
    ${findingsHtml(item)}
    <div class="brief-action"><h3>${escapeHtml(item.primary.title)}</h3>
      <p>${escapeHtml(item.primary.check)}</p>
      <a class="section-link" href="${href(item, 'next')}">See the follow-up and alternatives</a></div>`;
  const from = params.get('from');
  const back = ['overview', 'sources', 'feedback', 'next', 'brief'].includes(from)
    ? `<a class="section-link" href="${href(item, from)}">Back to ${views[from]}</a>` : '';
  return `${back}<p class="lede">Open a reviewed Krescendo snapshot from your device to inspect evidence, edit labels and see counts update.</p>
    <label class="file-input">Open local review snapshot
      <input id="review-file" type="file" accept=".json,.js,application/json">
    </label>
    <p class="fine">The file is read in your browser. Only label edits are retained in browser storage. Reopen the file after refreshing.</p>
    <p id="load-message" class="fine" role="status">${records ? 'Snapshot loaded.' : ''}</p>
    ${records ? renderArchiveControls(params) : ''}`;
}

function renderArchiveControls(params) {
  const options = (choices, value, label) => `<option value="">${label}</option>${Object.entries(choices).map(([key, name]) =>
    `<option value="${key}"${value === key ? ' selected' : ''}>${escapeHtml(name)}</option>`).join('')}`;
  return `<div class="review-filters">
    <label>Search <input id="record-search" type="search" placeholder="Search review text"></label>
    <label><span id="record-topic-label">Topic</span><select id="record-topic" aria-labelledby="record-topic-label">${options(topics, params.get('topic'), 'All topics')}</select></label>
    <label><span id="record-platform-label">Platform</span><select id="record-platform" aria-labelledby="record-platform-label">${options(platformNames, params.get('platform'), 'All platforms')}</select></label>
  </div><div id="record-results"></div>`;
}

function render({ moveFocus = false } = {}) {
  const { item, view, params, progress } = route();
  if (!item) {
    if (progress) renderProgress();
    else renderLibrary();
  } else {
    const records = localCases.get(item.id);
    stage.innerHTML = `
      <div class="case-breadcrumb"><a href="#library">Case library</a></div>
      <header class="release"><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.artist)} · ${item.year} single</p></header>
      <nav class="nav" aria-label="Release workspace">${Object.entries(views).map(([key, title]) =>
        `<a href="${href(item, key)}"${view === key ? ' aria-current="page"' : ''}>${title}</a>`).join('')}</nav>
      <section class="view layout">
        <div class="panel"><h2 tabindex="-1">${views[view]}</h2>${renderPanel(item, view, params, records)}</div>
        <aside class="panel sidebar live"><h3>Reviewed local case</h3>
          <p class="lede">Snapshot audited November 17, 2026.</p>
          <div class="count-list">${scope(item)}</div>
          ${records ? '<div id="live-counts" class="count-list"></div>' : '<p class="fine">Original comment archives are kept outside the public site.</p>'}
          <a class="section-link" href="#progress">View data usage status</a>
        </aside>
      </section>`;
    if (records) {
      updateLiveCounts(records);
      if (view === 'reviews') bindArchive(records);
    }
  }
  if (moveFocus) {
    stage.querySelector('h1')?.setAttribute('tabindex', '-1');
    (stage.querySelector('.view h2') ?? stage.querySelector('h1'))?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
}

function httpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

function storedLabels(key, baseline) {
  try {
    const edit = JSON.parse(localStorage.getItem(key));
    if (Array.isArray(edit?.tags) && edit.tags.every(tag => Object.hasOwn(topics, tag))
      && Object.hasOwn(sentiments, edit.sentiment) && typeof edit.included === 'boolean') {
      return { ...edit, tags: [...new Set(edit.tags)] };
    }
  } catch {
    // A browser without storage can still open the archived labels.
  }
  return baseline;
}

function parseSnapshot(text, item) {
  const wrapped = /^window\.[A-Za-z][A-Za-z0-9_]*\s*=\s*/.test(text.trim());
  const json = wrapped ? text.trim().replace(/^window\.[A-Za-z][A-Za-z0-9_]*\s*=\s*/, '').replace(/;$/, '') : text;
  const payload = JSON.parse(json);
  if (!Array.isArray(payload?.samples)) throw new Error('Choose a Krescendo review snapshot.');
  if ((payload.release && payload.release !== item.id) || (!payload.release && (!wrapped || item.id !== 'housewife'))) {
    throw new Error('This snapshot belongs to a different release.');
  }
  const nativeId = row => row.platform + ':' + row.sourceCommentId;
  const parentById = new Map(payload.samples.filter(row => typeof row?.text === 'string' && row.sourceCommentId).map(row => [nativeId(row), row]));
  const rows = [];
  const seen = new Set();
  for (const row of payload.samples) {
    const original = httpsUrl(row?.commentUrl);
    if (!original || !row.topicReview || row.contextOnly || ['excluded', 'pending'].includes(row.topicReview.status)
      || !Object.hasOwn(platformNames, row.platform) || typeof row.text !== 'string'
      || !row.sourceCommentId || !row.postId || (row.expiresAt && Date.parse(row.expiresAt) <= Date.now())) continue;
    const id = nativeId(row);
    if (seen.has(id)) continue;
    seen.add(id);
    const key = `krescendo.portfolio.v1.${item.id}.${id}`;
    const tags = [...new Set((Array.isArray(row.topicReview.tags) ? row.topicReview.tags : []).filter(tag => Object.hasOwn(topics, tag)))];
    const sentiment = Object.hasOwn(sentiments, row.sentiment) ? row.sentiment : 'uncertain';
    rows.push({ id, key, postId: row.postId, platform: row.platform, text: row.text, original,
      parent: row.parentCommentId ? parentById.get(row.platform + ':' + row.parentCommentId) : null,
      ...storedLabels(key, { tags, sentiment, included: true }) });
  }
  if (!rows.length) throw new Error('This file has no verified records with a current original link.');
  return { rows };
}

function updateLiveCounts(records) {
  const included = records.rows.filter(row => row.included);
  document.getElementById('live-counts').innerHTML = `<h3>Current local labels</h3>${listStats([
    ['Included', format.format(included.length)],
    ...Object.entries(sentiments).map(([key, name]) => [name, format.format(included.filter(row => row.sentiment === key).length)]),
    ...Object.entries(topics).map(([key, name]) => [name, format.format(included.filter(row => row.tags.includes(key)).length)]),
  ])}`;
}

function renderRecord(row, position) {
  return `<article class="review-record">
    <div class="record-header"><h3>${platformNames[row.platform]} feedback</h3>${openLink(row.original, 'Original comment')}</div>
    <p class="review-text">${escapeHtml(row.text)}</p>
    ${row.parent ? `<details><summary>Read parent context</summary><p>${escapeHtml(row.parent.text)}</p></details>` : ''}
    <ul class="labels" aria-label="Current labels">
      ${row.included ? '' : '<li class="chip">Excluded</li>'}<li class="chip mood ${row.sentiment}">${sentiments[row.sentiment]}</li>
      ${row.tags.map(topic => `<li class="chip">${escapeHtml(topics[topic])}</li>`).join('')}
    </ul>
    <details class="editor"><summary>Edit labels</summary><form data-row="${position}">
      <fieldset><legend>Topics</legend><div class="topic-options">${Object.entries(topics).map(([key, name]) =>
        `<label><input type="checkbox" name="topic" value="${key}" ${row.tags.includes(key) ? 'checked' : ''}>${escapeHtml(name)}</label>`).join('')}</div></fieldset>
      <div class="editor-fields"><label>Sentiment <select name="sentiment">${Object.entries(sentiments).map(([key, name]) =>
        `<option value="${key}" ${row.sentiment === key ? 'selected' : ''}>${name}</option>`).join('')}</select></label>
      <label><input type="checkbox" name="included" ${row.included ? 'checked' : ''}> Include in analysis</label></div>
      <button class="action" type="submit">Save labels</button>
      <p class="save-status" role="status"></p>
    </form></details>
  </article>`;
}

function bindArchive(records) {
  const reviewResults = document.getElementById('record-results');
  const search = document.getElementById('record-search');
  const topic = document.getElementById('record-topic');
  const platform = document.getElementById('record-platform');
  let page = 1;
  function updateResults() {
    const query = search.value.trim().toLowerCase();
    const matches = records.rows.filter(row => row.text.toLowerCase().includes(query)
      && (!topic.value || row.tags.includes(topic.value)) && (!platform.value || row.platform === platform.value));
    const pages = Math.max(1, Math.ceil(matches.length / pageSize));
    page = Math.min(page, pages);
    const visible = matches.slice((page - 1) * pageSize, page * pageSize);
    reviewResults.innerHTML = `<p class="fine" aria-live="polite">${format.format(matches.length)} matching records · Page ${page} of ${pages}</p>
      ${visible.length ? visible.map(row => renderRecord(row, records.rows.indexOf(row))).join('') : '<p>No matching records.</p>'}
      <div class="archive-pagination">
        <button type="button" class="action" data-page="previous" ${page === 1 ? 'disabled' : ''}>Previous</button>
        <button type="button" class="action" data-page="next" ${page === pages ? 'disabled' : ''}>Next</button>
      </div>`;
  }
  function resetPage() { page = 1; updateResults(); }
  search.addEventListener('input', resetPage);
  topic.addEventListener('change', resetPage);
  platform.addEventListener('change', resetPage);
  reviewResults.addEventListener('click', event => {
    const direction = event.target.closest('[data-page]')?.dataset.page;
    if (!direction) return;
    page += direction === 'next' ? 1 : -1;
    updateResults();
    search.focus();
  });
  reviewResults.addEventListener('submit', event => {
    const form = event.target;
    if (!form.matches('form[data-row]')) return;
    event.preventDefault();
    const row = records.rows[Number(form.dataset.row)];
    const fields = new FormData(form);
    const edit = { tags: fields.getAll('topic'), sentiment: fields.get('sentiment'), included: fields.has('included') };
    let saved = true;
    try { localStorage.setItem(row.key, JSON.stringify(edit)); } catch { saved = false; }
    Object.assign(row, edit);
    updateLiveCounts(records);
    const article = form.closest('article');
    article.outerHTML = renderRecord(row, Number(form.dataset.row));
    const savedForm = reviewResults.querySelector(`form[data-row="${form.dataset.row}"]`);
    savedForm.closest('details').open = true;
    savedForm.querySelector('button').focus({ preventScroll: true });
    savedForm.querySelector('.save-status').textContent = saved
      ? 'Labels saved in this browser.' : 'Labels updated for this session. Browser storage is unavailable.';
  });
  updateResults();
}

stage.addEventListener('change', async event => {
  if (!event.target.matches('#review-file') || !event.target.files[0]) return;
  const { item } = route();
  const message = document.getElementById('load-message');
  try {
    const records = parseSnapshot(await event.target.files[0].text(), item);
    localCases.set(item.id, records);
    if (route().item === item && route().view === 'reviews') render();
  } catch (error) {
    message.textContent = error instanceof SyntaxError ? 'Choose a valid Krescendo JSON or archived snapshot file.' : error.message;
  }
});

document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#workspace').focus();
});
window.addEventListener('hashchange', () => render({ moveFocus: true }));
render();
