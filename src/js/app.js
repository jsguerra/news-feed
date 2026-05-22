// Shared news feed application logic
// Each page must define: FEEDS, KEYWORDS, isRelevant(text), EMPTY_EMOJI, EMPTY_TEXT

const PROXY_URL = '/proxy';

let allArticles = [];
let activeSource = 'All';
let sortOrder = 'desc';
const PAGE_SIZE = 9;
let visibleCount = PAGE_SIZE;
let filteredArticles = [];

function handleImgError(img) {
  const div = document.createElement('div');
  div.className = 'card-image card-placeholder';
  img.replaceWith(div);
}

function sanitize(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function sanitizeUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return sanitize(url);
  } catch {}
  return '';
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function relativeTime(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return '';
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return date.toLocaleDateString();
}

async function fetchWithProxy(url) {
  const res = await fetch(`${PROXY_URL}?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(15000) });
  if (res.ok) return await res.text();
  throw new Error(`Proxy fetch failed for ${url}: ${res.status}`);
}

function parseRSS(xmlText, sourceName) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');
  const items = [...doc.querySelectorAll('item'), ...doc.querySelectorAll('entry')];
  return items.map(item => {
    const title = item.querySelector('title')?.textContent?.trim() || '';
    const link = item.querySelector('link')?.textContent?.trim()
      || item.querySelector('link')?.getAttribute('href') || '';
    const desc = stripHtml(
      item.querySelector('description')?.textContent
      || item.querySelector('summary')?.textContent
      || item.querySelector('content')?.textContent
      || ''
    ).trim();
    const pubDate = item.querySelector('pubDate')?.textContent
      || item.querySelector('published')?.textContent
      || item.querySelector('updated')?.textContent
      || '';
    const enclosure = item.querySelector('enclosure')?.getAttribute('url') || '';
    const mediaThumbnail = item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'thumbnail')[0]?.getAttribute('url') || '';
    const mediaContent = item.getElementsByTagNameNS('http://search.yahoo.com/mrss/', 'content')[0]?.getAttribute('url') || '';
    let imgFromHtml = '';
    if (!enclosure && !mediaThumbnail && !mediaContent) {
      const rawHtml = item.querySelector('description')?.textContent
        || item.querySelector('content')?.textContent
        || item.querySelector('summary')?.textContent || '';
      const imgMatch = rawHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) imgFromHtml = imgMatch[1];
    }
    const image = enclosure || mediaThumbnail || mediaContent || imgFromHtml;
    return { title, link, desc, pubDate, image, source: sourceName };
  });
}

async function fetchFeed(feed) {
  try {
    const xml = await fetchWithProxy(feed.rss);
    let articles = parseRSS(xml, feed.name);
    if (feed.filterRequired) {
      articles = articles.filter(a => isRelevant(a.title + ' ' + a.desc));
    }
    return articles;
  } catch (e) {
    console.warn(`Failed to fetch ${feed.name}:`, e.message);
    return [];
  }
}

function renderSkeletons() {
  const grid = document.getElementById('newsGrid');
  grid.innerHTML = Array(6).fill('').map(() => `
    <div class="skeleton-card">
      <div class="skeleton skeleton-line w60" style="height:12px"></div>
      <div class="skeleton skeleton-line w100 h20"></div>
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-line w80"></div>
      <div class="skeleton skeleton-line w60"></div>
    </div>
  `).join('');
}

function renderArticles(articles) {
  filteredArticles = articles;
  const grid = document.getElementById('newsGrid');
  const wrap = document.getElementById('loadMoreWrap');
  if (articles.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <p style="font-size:2rem;margin-bottom:0.5rem">${EMPTY_EMOJI}</p>
        <p>${EMPTY_TEXT}</p>
        <p style="margin-top:0.5rem;font-size:0.8rem">Try adjusting your search or filters.</p>
      </div>`;
    document.getElementById('articleCount').textContent = '0 articles';
    wrap.style.display = 'none';
    return;
  }

  const shown = articles.slice(0, visibleCount);
  document.getElementById('articleCount').textContent = `${articles.length} article${articles.length !== 1 ? 's' : ''}`;
  grid.innerHTML = shown.map(a => {
    const safeLink = sanitizeUrl(a.link);
    const safeImage = a.image ? sanitizeUrl(a.image) : '';
    return `
    <article class="card">
      <div class="card-source">
        <span class="source-badge">${sanitize(a.source)}</span>
        <span class="card-date">${relativeTime(a.pubDate)}</span>
      </div>
      ${safeImage ? `<img class="card-image" src="${safeImage}" alt="" loading="lazy" onerror="handleImgError(this)"/>` : '<div class="card-image card-placeholder"></div>'}
      <h2 class="card-title">
        ${safeLink ? `<a href="${safeLink}" target="_blank" rel="noopener noreferrer">${sanitize(a.title)}</a>` : sanitize(a.title)}
      </h2>
      <p class="card-desc">${sanitize(a.desc)}</p>
    </article>`;
  }).join('');

  wrap.style.display = visibleCount < articles.length ? 'flex' : 'none';
}

function buildSourceFilters() {
  const container = document.getElementById('sourceFilters');
  const sources = ['All', ...FEEDS.map(f => f.name)];
  container.innerHTML = sources.map(s =>
    `<button class="filter-btn ${s === activeSource ? 'active' : ''}" data-source="${s}">${s}</button>`
  ).join('');
  container.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    activeSource = btn.dataset.source;
    container.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.source === activeSource));
    applyFilters();
  });
}

function applyFilters() {
  visibleCount = PAGE_SIZE;
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  let filtered = allArticles;
  if (activeSource !== 'All') {
    filtered = filtered.filter(a => a.source === activeSource);
  }
  if (query) {
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(query) || a.desc.toLowerCase().includes(query)
    );
  }
  filtered = [...filtered].sort((a, b) => {
    const da = new Date(a.pubDate), db = new Date(b.pubDate);
    return sortOrder === 'desc' ? db - da : da - db;
  });
  renderArticles(filtered);
}

async function loadAll() {
  const btn = document.getElementById('refreshBtn');
  btn.classList.add('loading');
  renderSkeletons();
  document.getElementById('articleCount').textContent = 'Loading…';
  document.getElementById('lastUpdated').textContent = '';

  const results = await Promise.allSettled(FEEDS.map(f => fetchFeed(f)));
  allArticles = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value);

  const seen = new Set();
  allArticles = allArticles.filter(a => {
    const key = a.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  btn.classList.remove('loading');
  document.getElementById('lastUpdated').textContent = `Updated ${new Date().toLocaleTimeString()}`;
  applyFilters();
}

// Wire up events
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('refreshBtn').addEventListener('click', loadAll);
document.getElementById('loadMoreBtn').addEventListener('click', () => {
  visibleCount += PAGE_SIZE;
  renderArticles(filteredArticles);
});
document.getElementById('loadAllBtn').addEventListener('click', () => {
  visibleCount = filteredArticles.length;
  renderArticles(filteredArticles);
});
document.getElementById('sortSelect').addEventListener('change', e => {
  sortOrder = e.target.value;
  applyFilters();
});
buildSourceFilters();
loadAll();
