'use strict';

const storagePrefix = 'krescendo.public-trial.wildest-dreams.v1.';
const reviewBase = 'https://critiquebrainz.org/review/';
const licenseUrl = 'https://creativecommons.org/licenses/by-sa/3.0/';
const reviewsById = new Map(trialReviews.map(review => [review.id, review]));
const findingsById = new Map(trialFindings.map(finding => [finding.id, finding]));
const topicEntries = Object.entries(trialTopics);
const sentimentEntries = Object.entries(trialSentiments);
const dateFormat = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
});
const nav = [...document.querySelectorAll('.nav a')];
const pages = new Map(nav.map(link => [link.hash.slice(1), { label: link.textContent, link }]));
const feedbackTopics = document.querySelector('#feedback-topics');
const topicResults = document.querySelector('#topic-results');
const reviewList = document.querySelector('#review-list');
const reviewSearch = document.querySelector('#review-search');
const reviewTopic = document.querySelector('#review-topic');
const reviewStatus = document.querySelector('#review-status');

function readEdit(id) {
  try {
    const edit = JSON.parse(localStorage.getItem(storagePrefix + id));
    if (Array.isArray(edit?.topics)
      && edit.topics.every(topic => Object.hasOwn(trialTopics, topic))
      && Object.hasOwn(trialSentiments, edit.sentiment)
      && ['included', 'excluded'].includes(edit.status)) {
      return { ...edit, topics: [...new Set(edit.topics)] };
    }
  } catch {
    // Unavailable storage or an unreadable edit can use the baseline labels.
  }
  return null;
}

const edits = new Map(trialReviews.flatMap(review => {
  const edit = readEdit(review.id);
  return edit ? [[review.id, edit]] : [];
}));

function currentLabels(review) {
  return edits.get(review.id) ?? { ...review, status: 'included' };
}

function escapeHtml(value) {
  const escaped = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return value.replace(/[&<>"']/g, char => escaped[char]);
}

function reviewCount(count) {
  return `${count} ${count === 1 ? 'review' : 'reviews'}`;
}

function pageUrl(view, params = {}) {
  const query = new URLSearchParams(params).toString();
  return `#${view}${query && '?' + query}`;
}

function readRoute(hash = location.hash) {
  const [view, query] = hash.slice(1).split('?');
  const record = view.startsWith('review-') ? reviewsById.get(view.slice('review-'.length)) : null;
  const page = record ? 'reviews' : pages.has(view) ? view : 'overview';
  return { page, record, params: new URLSearchParams(query) };
}

function reviewLinks(items, page, group, params = {}) {
  return `<ul class="evidence-links">${items.map(({ id }) => {
    const anchor = `evidence-${page}-${group}-${id}`;
    const back = pageUrl(page, { ...params, at: anchor });
    const href = pageUrl('review-' + id, { back });
    const author = escapeHtml(reviewsById.get(id).author);
    return `<li><a id="${anchor}" href="${escapeHtml(href)}" aria-label="Review excerpt by ${author}">${author}</a></li>`;
  }).join('')}</ul>`;
}

function countList(entries, counts) {
  return `<dl>${entries.map(([key, label]) => `
    <div><dt>${escapeHtml(label)}</dt><dd data-count="${key}">${counts[key]}</dd></div>`).join('')}</dl>`;
}

function setCounts(id, entries, counts) {
  document.getElementById(id).innerHTML = countList(entries, counts);
}

function supportingCount(finding) {
  return finding.evidence.filter(({ id, topic }) => {
    const labels = currentLabels(reviewsById.get(id));
    return labels.status === 'included' && labels.topics.includes(topic);
  }).length;
}

function needsReview(finding) {
  return supportingCount(finding) < finding.evidence.length;
}

function evidenceStatus(finding) {
  const count = supportingCount(finding);
  const changed = count < finding.evidence.length;
  return `<p class="evidence-status ${changed ? 'needs-review' : ''}">${changed
    ? `Review this finding. ${count} of ${finding.evidence.length} cited reviews still carry the supporting labels and are included.`
    : `Based on ${reviewCount(count)}`}</p>`;
}

function findingHtml(finding, page) {
  return `<section class="finding" id="${page}-${finding.id}">
    <h3>${escapeHtml(finding.title)}</h3>
    <p>${escapeHtml(finding.text)}</p>
    ${evidenceStatus(finding)}
    ${reviewLinks(finding.evidence, page, finding.id)}
  </section>`;
}

function optionNeedsReview(option) {
  return option.findings.some(id => needsReview(findingsById.get(id)));
}

function renderOptions() {
  document.querySelector('#options').innerHTML = trialOptions.map(option => {
    const findings = option.findings.map(id => findingsById.get(id));
    const changed = optionNeedsReview(option);
    return `<section class="finding option" aria-labelledby="option-${option.id}">
      <h3 id="option-${option.id}">${escapeHtml(option.title)}</h3>
      <p>${escapeHtml(option.rationale)}</p>
      <p><strong>How to check</strong> ${escapeHtml(option.test)}</p>
      <p><strong>What would change the next step</strong> ${escapeHtml(option.gap)}</p>
      ${changed ? '<p class="evidence-status needs-review">Review this option before using it. A supporting finding changed.</p>' : ''}
      <div class="option-evidence">${findings.map(finding => `<div>
        <p class="option-finding">${escapeHtml(finding.title)}</p>
        ${evidenceStatus(finding)}
        ${reviewLinks(finding.evidence, 'next', option.id + '-' + finding.id)}
      </div>`).join('')}</div>
    </section>`;
  }).join('');
}

function showTopicEvidence() {
  const { page, params } = readRoute();
  const requested = params.get('topic');
  const selected = page === 'feedback' && Object.hasOwn(trialTopics, requested) ? requested : '';
  for (const button of feedbackTopics.querySelectorAll('button')) {
    button.setAttribute('aria-pressed', String(button.dataset.topic === selected));
  }
  topicResults.hidden = !selected;
  if (!selected) return;

  const matching = trialReviews.filter(review => {
    const labels = currentLabels(review);
    return labels.status === 'included' && labels.topics.includes(selected);
  });
  const filter = pageUrl('reviews', { topic: selected, status: 'included' });
  topicResults.innerHTML = `
    <h3>${escapeHtml(trialTopics[selected])} · ${reviewCount(matching.length)}</h3>
    ${matching.length
      ? `${reviewLinks(matching, 'feedback', 'topic-' + selected, { topic: selected })}
        <a class="section-link" href="${escapeHtml(filter)}">View matching reviews in Review Text</a>`
      : '<p class="fine">No included reviews currently use this label.</p>'}`;
}

function updateSummaries() {
  const topicCounts = Object.fromEntries(topicEntries.map(([topic]) => [topic, 0]));
  const sentimentCounts = Object.fromEntries(sentimentEntries.map(([sentiment]) => [sentiment, 0]));
  const included = trialReviews.filter(review => currentLabels(review).status === 'included');

  for (const review of included) {
    const { topics, sentiment } = currentLabels(review);
    for (const topic of topics) topicCounts[topic] += 1;
    sentimentCounts[sentiment] += 1;
  }

  const counts = {
    screened: trialSource.screened,
    matched: trialReviews.length,
    included: included.length,
    excluded: trialReviews.length - included.length,
  };
  const coverage = [['included', 'Included in analysis'], ['excluded', 'Excluded by review']];
  setCounts('overview-coverage', coverage, counts);
  setCounts('source-coverage', [['screened', 'Album reviews screened'], ['matched', 'Discussed this song'], ...coverage], counts);
  setCounts('sentiments', sentimentEntries, sentimentCounts);
  setCounts('source-sentiments', sentimentEntries, sentimentCounts);
  setCounts('live-topics', topicEntries, topicCounts);
  setCounts('brief-topics', topicEntries, topicCounts);

  for (const button of feedbackTopics.querySelectorAll('button')) {
    const topic = button.dataset.topic;
    const count = topicCounts[topic];
    button.querySelector('strong').textContent = count;
    button.setAttribute('aria-label', `${trialTopics[topic]}, ${reviewCount(count)}`);
  }

  const shared = trialFindings.filter(finding => finding.evidence.length > 1);
  const individual = trialFindings.filter(finding => finding.evidence.length === 1);
  document.querySelector('#highlights').innerHTML = shared.map(finding => findingHtml(finding, 'overview')).join('');
  document.querySelector('#individual-findings').innerHTML = individual.map(finding => findingHtml(finding, 'feedback')).join('');
  document.querySelector('#findings').innerHTML = trialFindings.map(finding => findingHtml(finding, 'brief')).join('');
  document.querySelector('#brief-scope').textContent = `${reviewCount(included.length)} included from ${trialReviews.length} track-relevant CritiqueBrainz reviews of 1989. Findings reflect this historical sample.`;
  const lead = trialOptions[0];
  document.querySelector('#follow-up').innerHTML = `
    <h3>Possible follow-up</h3>
    <p>${optionNeedsReview(lead)
      ? 'Recheck the evidence for the music-first and story-first comparison before choosing what to test.'
      : 'If the team needs an introduction for new listeners, compare music-first and story-first framing. The sample gives enough to define a test. Listener response would guide the choice.'}</p>
    <a class="section-link" href="#next">See options and supporting reviews</a>`;
  renderOptions();
  showTopicEvidence();
  return { topicCounts, sentimentCounts };
}

function labelsHtml(review) {
  const { topics, sentiment, status } = currentLabels(review);
  const chips = topics.map(topic => `<li class="chip">${escapeHtml(trialTopics[topic])}</li>`);
  const excluded = status === 'excluded' ? '<li class="chip">Excluded from analysis</li>' : '';
  return `${excluded}<li class="chip mood ${sentiment}">${trialSentiments[sentiment]}</li>${chips.join('')}`;
}

function renderReview(review) {
  const { id, author, date, excerpts } = review;
  const { topics, sentiment, status } = currentLabels(review);
  return `<article class="review-record" id="review-${id}" tabindex="-1" aria-labelledby="author-${id}">
    <p class="evidence-return" hidden></p>
    <div class="record-header">
      <h3 id="author-${id}">${escapeHtml(author)}</h3>
      <time datetime="${date}">${dateFormat.format(new Date(date))}</time>
    </div>
    <div class="excerpts">${excerpts.map(({ subject, text }) => `
      <figure>
        <figcaption>${escapeHtml(subject)}</figcaption>
        <blockquote>${escapeHtml(text)}</blockquote>
      </figure>`).join('')}
    </div>
    <p class="attribution">
      <a href="${reviewBase + id}" target="_blank" rel="noopener">Original review<span class="sr-only"> by ${escapeHtml(author)} (opens in a new tab)</span></a>
      <span>${trialSource.name} · 1989 album review</span>
      <a href="${licenseUrl}">CC BY-SA 3.0</a>
      <span>Excerpted</span>
    </p>
    <ul class="labels" aria-label="Current labels">${labelsHtml(review)}</ul>
    <details class="editor">
      <summary>Edit labels</summary>
      <form data-review="${id}">
        <fieldset>
          <legend>Topics</legend>
          <div class="topic-options">${topicEntries.map(([topic, label]) => `
            <label><input type="checkbox" name="topic" value="${topic}" ${topics.includes(topic) ? 'checked' : ''}>
              ${escapeHtml(label)}</label>`).join('')}</div>
        </fieldset>
        <div class="editor-fields">
          <label>Sentiment
            <select name="sentiment">${sentimentEntries.map(([key, label]) => `
              <option value="${key}" ${key === sentiment ? 'selected' : ''}>${label}</option>`).join('')}</select>
          </label>
          <label>Feedback status
            <select name="status">
              <option value="included" ${status === 'included' ? 'selected' : ''}>Included</option>
              <option value="excluded" ${status === 'excluded' ? 'selected' : ''}>Excluded from analysis</option>
            </select>
          </label>
        </div>
        <div class="editor-actions">
          <button class="action" type="submit">Save labels</button>
          <p class="save-status" role="status"></p>
        </div>
      </form>
    </details>
    <p class="record-state" ${edits.has(id) ? '' : 'hidden'}>Browser edits saved</p>
  </article>`;
}

function filterReviews({ params, record }, keepVisible = '') {
  const query = params.get('q') ?? '';
  const requestedTopic = params.get('topic');
  const requestedStatus = params.get('status');
  const topic = Object.hasOwn(trialTopics, requestedTopic) ? requestedTopic : '';
  const status = ['included', 'excluded'].includes(requestedStatus) ? requestedStatus : '';
  const source = params.get('source') === trialSource.id;
  const filterActive = Boolean(query || topic || status || source);
  reviewSearch.value = query;
  reviewTopic.value = topic;
  reviewStatus.value = status;
  document.querySelector('#review-filters').hidden = Boolean(record);
  document.querySelector('#filter-summary').hidden = Boolean(record);
  document.querySelector('#clear-filters').hidden = !filterActive;

  const needle = query.trim().toLowerCase();
  let count = 0;
  let retained = false;
  for (const review of trialReviews) {
    const labels = currentLabels(review);
    const searchable = [review.author, ...review.excerpts.map(({ subject, text }) => subject + ' ' + text)].join(' ').toLowerCase();
    const match = record ? review.id === record.id
      : (!topic || labels.topics.includes(topic)) && (!status || labels.status === status) && searchable.includes(needle);
    const keep = !match && review.id === keepVisible;
    retained ||= keep;
    document.getElementById('review-' + review.id).hidden = !match && !keep;
    if (match) count += 1;
  }
  document.querySelector('#review-results').textContent = `${reviewCount(count)}${source ? ' from ' + trialSource.name : ''}`;
  document.querySelector('#no-reviews').hidden = count > 0 || retained;
  return retained;
}

function updateFilters() {
  const { params } = readRoute();
  const values = { q: reviewSearch.value, topic: reviewTopic.value, status: reviewStatus.value };
  if (params.get('source') === trialSource.id) values.source = trialSource.id;
  const applied = Object.fromEntries(Object.entries(values).filter(([, value]) => value));
  history.replaceState(null, '', pageUrl('reviews', applied));
  filterReviews(readRoute());
}

function showLocation({ initial = false } = {}) {
  const route = readRoute();
  const { page, record, params } = route;
  for (const [id, { link }] of pages) {
    if (id === page) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
    document.getElementById(id).hidden = id !== page;
  }
  showTopicEvidence();
  if (page === 'reviews') filterReviews(route);

  const requestedAnchor = params.get('at');
  const anchor = requestedAnchor && document.getElementById(requestedAnchor);
  const section = document.getElementById(page);
  if (record) {
    const card = document.getElementById('review-' + record.id);
    const back = params.get('back');
    const backRoute = back?.startsWith('#') ? readRoute(back) : null;
    const targetPage = backRoute && ['overview', 'feedback', 'next', 'brief'].includes(backRoute.page) ? backRoute.page : '';
    const backLink = card.querySelector('.evidence-return');
    const href = targetPage ? pageUrl(targetPage, backRoute.params) : '#reviews';
    const label = targetPage ? pages.get(targetPage).label : 'Review Text';
    backLink.innerHTML = `<a href="${escapeHtml(href)}">Back to ${label}</a>`;
    backLink.hidden = false;
    card.focus({ preventScroll: true });
    card.scrollIntoView({ block: 'start' });
  } else {
    section.querySelectorAll('.evidence-return').forEach(link => { link.hidden = true; });
    const fallback = requestedAnchor && page === 'feedback'
      ? document.getElementById('topic-' + params.get('topic'))
      : null;
    const destination = anchor && section.contains(anchor) && !anchor.closest('[hidden]') ? anchor : fallback;
    if (destination) {
      destination.focus({ preventScroll: true });
      destination.scrollIntoView({ block: 'nearest' });
    } else if (!initial) {
      document.getElementById(page + '-heading').focus({ preventScroll: true });
      window.scrollTo(0, 0);
    }
  }
}

document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#workspace').focus();
});

feedbackTopics.innerHTML = topicEntries.map(([topic, label]) => `
  <button id="topic-${topic}" type="button" data-topic="${topic}" aria-pressed="false" aria-controls="topic-results">
    <span>${escapeHtml(label)}</span><strong></strong>
  </button>`).join('');
feedbackTopics.addEventListener('click', event => {
  const button = event.target.closest('button[data-topic]');
  if (!button) return;
  const topic = button.dataset.topic;
  const selected = readRoute().params.get('topic') === topic;
  location.hash = pageUrl('feedback', selected ? { at: button.id } : { topic, at: button.id });
});

reviewTopic.insertAdjacentHTML('beforeend', topicEntries.map(([key, label]) => `
  <option value="${key}">${escapeHtml(label)}</option>`).join(''));
reviewSearch.addEventListener('input', updateFilters);
reviewTopic.addEventListener('change', updateFilters);
reviewStatus.addEventListener('change', updateFilters);
reviewList.innerHTML = trialReviews.map(renderReview).join('');

reviewList.addEventListener('submit', event => {
  const form = event.target;
  if (!form.matches('form[data-review]')) return;
  event.preventDefault();

  const review = reviewsById.get(form.dataset.review);
  const before = currentLabels(review);
  const fields = new FormData(form);
  const edit = { topics: fields.getAll('topic'), sentiment: fields.get('sentiment'), status: fields.get('status') };
  const status = form.querySelector('.save-status');
  const card = form.closest('article');

  try {
    localStorage.setItem(storagePrefix + review.id, JSON.stringify(edit));
  } catch {
    status.textContent = 'This browser could not save the edit. Enable local storage and try again.';
    status.classList.add('needs-review');
    return;
  }

  edits.set(review.id, edit);
  card.querySelector('.labels').innerHTML = labelsHtml(review);
  card.querySelector('.record-state').hidden = false;
  const { topicCounts, sentimentCounts } = updateSummaries();
  const differences = topicEntries.filter(([key]) =>
    (before.status === 'included' && before.topics.includes(key)) !== (edit.status === 'included' && edit.topics.includes(key)))
    .map(([key, label]) => `${label} now has ${reviewCount(topicCounts[key])}.`);
  if (before.sentiment !== edit.sentiment && edit.status === 'included') {
    differences.push(`${trialSentiments[edit.sentiment]} now has ${reviewCount(sentimentCounts[edit.sentiment])}.`);
  }
  status.classList.remove('needs-review');
  if (filterReviews(readRoute(), review.id)) {
    differences.push('This review no longer matches the current filters.');
  }
  status.textContent = ['Saved in this browser.', ...differences].join(' ');
});

window.addEventListener('hashchange', () => showLocation());
updateSummaries();
showLocation({ initial: true });
