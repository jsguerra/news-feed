const FEEDS = [
  { name: 'CSS-Tricks', rss: 'https://css-tricks.com/feed/', color: '#f7c948' },
  { name: 'Smashing Magazine', rss: 'https://www.smashingmagazine.com/feed/', color: '#e74c3c' },
  { name: 'Dev.to', rss: 'https://dev.to/feed', color: '#3b49df' },
  { name: 'Hacker News', rss: 'https://hnrss.org/frontpage', color: '#ff6600' },
  { name: 'JavaScript Weekly', rss: 'https://cprss.s3.amazonaws.com/javascriptweekly.com.xml', color: '#f0db4f' },
  { name: 'React Blog', rss: 'https://react.dev/rss.xml', color: '#61dafb' },
  { name: 'Node Weekly', rss: 'https://cprss.s3.amazonaws.com/nodeweekly.com.xml', color: '#68a063' },
  { name: 'Frontend Focus', rss: 'https://cprss.s3.amazonaws.com/frontendfoc.us.xml', color: '#e535ab' },
  { name: 'web.dev', rss: 'https://web.dev/feed.xml', color: '#1a73e8' }
];

const KEYWORDS = [
  'react', 'vue', 'angular', 'svelte', 'next.js', 'nextjs', 'nuxt',
  'astro', 'remix', 'gatsby', 'vite', 'webpack', 'rollup', 'esbuild',
  'javascript', 'typescript', 'ecmascript', 'node.js', 'nodejs', 'deno', 'bun',
  'css', 'tailwind', 'sass', 'scss', 'html', 'dom', 'browser',
  'frontend', 'front-end', 'web dev', 'web app', 'web component',
  'pwa', 'service worker', 'web worker', 'webassembly', 'wasm',
  'npm', 'yarn', 'pnpm', 'package manager',
  'api', 'rest', 'graphql', 'fetch', 'axios',
  'testing', 'jest', 'vitest', 'cypress', 'playwright',
  'accessibility', 'a11y', 'aria', 'wcag',
  'performance', 'core web vitals', 'lighthouse',
  'security', 'xss', 'csrf', 'csp', 'cors', 'oauth', 'vulnerability',
  'responsive', 'mobile', 'progressive',
  'component', 'hook', 'state management', 'redux', 'zustand', 'pinia',
  'ssr', 'server-side rendering', 'static site', 'jamstack',
  'shadcn', 'radix', 'headless ui', 'ui library',
  'htmx', 'alpine', 'solid', 'qwik', 'preact', 'lit',
  'turbopack', 'rspack', 'swc', 'babel'
];

const EMPTY_EMOJI = '&lt;/&gt;';
const EMPTY_TEXT = 'No frontend development articles found matching your criteria.';

function isRelevant(text) {
  const lower = text.toLowerCase();
  return KEYWORDS.some(kw => lower.includes(kw));
}
