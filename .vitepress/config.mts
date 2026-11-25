import { defineConfig, createContentLoader, type SiteConfig } from 'vitepress';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SITE = 'https://patched.network';
const isBuild = process.argv.includes('build');

// Posts with `draft: true` in their frontmatter are served by `dev` but left out of builds.
const drafts = readdirSync('content/blog')
  .filter((f) => f.endsWith('.md'))
  .filter((f) => /^draft:\s*true\s*$/m.test(readFileSync(`content/blog/${f}`, 'utf8').split(/^---$/m)[1] ?? ''))
  .map((f) => `blog/${f}`);

export default defineConfig({
  title: 'patched.network',
  description: 'Open tools for building adaptive tutoring systems.',
  lang: 'en',
  srcDir: 'content',
  cleanUrls: true,
  outDir: 'dist',
  srcExclude: isBuild ? drafts : [],
  // Archived posts link to the retired /contact page; netlify.toml redirects it.
  ignoreDeadLinks: ['/contact'],
  appearance: false,
  sitemap: { hostname: SITE },
  lastUpdated: true, // git timestamps -> sitemap <lastmod>
  // Per-page description, canonical URL and Open Graph basics, so crawlers and link
  // unfurlers get a real summary instead of the site-wide description on every page.
  transformPageData(pageData) {
    if (pageData.isNotFound) return;
    const fm = pageData.frontmatter;
    if (!fm.description) {
      const src = readFileSync(path.join('content', pageData.filePath), 'utf8').split(/^---$/m).slice(2).join('---');
      const ex = fm.summary || fm.tagline || fm.intro || excerpt(src.replace(/<!--[\s\S]*?-->/g, ''), 200);
      if (ex) fm.description = ex;
    }
    if (fm.description) pageData.description = fm.description; // what VitePress puts in <meta name=description>
  },
  transformHead({ pageData, siteData }) {
    if (pageData.isNotFound) return [];
    const route = pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '/');
    const url = `${SITE}/${route}`;
    const isPost = !!pageData.frontmatter.date;
    const title = pageData.frontmatter.title || siteData.title;
    const desc = pageData.frontmatter.description || siteData.description;
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:site_name', content: 'patched.network' }],
      ['meta', { property: 'og:type', content: isPost ? 'article' : 'website' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: desc }],
      ...(isPost
        ? [
            ['meta', { property: 'article:published_time', content: new Date(pageData.frontmatter.date).toISOString() }],
            ['link', { rel: 'alternate', type: 'text/markdown', href: `${SITE}/${route.replace(/\/$/, '.md')}` }],
          ]
        : []),
    ] as any;
  }, // custom theme follows prefers-color-scheme itself
  // Gridsome served posts as /blog/<slug>/ — keep those URLs.
  rewrites: (id) => id.replace(/^blog\/(?!index\.md$)([^/]+)\.md$/, 'blog/$1/index.md'),
  head: [
    // Apply a pinned theme before first paint (see ThemeToggle.vue).
    [
      'script',
      {},
      "try{var t=localStorage.getItem('pn-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}",
    ],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['link', { rel: 'alternate', type: 'text/markdown', title: 'llms.txt', href: '/llms.txt' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'patched.network', href: '/rss.xml' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400..700&display=swap' },
    ],
  ],
  async buildEnd(config: SiteConfig) {
    for (const [f, body] of Object.entries(await feedFiles())) writeFileSync(path.join(config.outDir, f), body);
  },
  // `buildEnd` only runs on build; serve the same generated files from the dev server.
  vite: {
    plugins: [
      {
        name: 'pn-feed-files',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const f = decodeURIComponent((req.url ?? '').split('?')[0]).replace(/^\//, '');
            if (!/^(rss\.xml|llms(-full)?\.txt|blog\/[^/]+\.md)$/.test(f)) return next();
            const body = (await feedFiles())[f];
            if (body === undefined) return next();
            res.setHeader('Content-Type', f.endsWith('.xml') ? 'application/rss+xml; charset=utf-8' : 'text/markdown; charset=utf-8');
            res.end(body);
          });
        },
      },
    ],
  },
});

/** Generated non-page files, keyed by path under outDir. */
async function feedFiles(): Promise<Record<string, string>> {
  return { 'rss.xml': await rssXml(), ...llmsFiles() };
}

// createContentLoader reports source paths, not rewritten ones: /blog/x(.html) -> /blog/x/
export const postUrl = (u: string) => u.replace(/(\.html)?$/, '').replace(/\/?$/, '/');

// ---- RSS ------------------------------------------------------------------

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function rssXml(): Promise<string> {
  const posts = (
    await createContentLoader('blog/*.md', { render: true, excerpt: false }).load()
  )
    .filter((p) => p.url !== '/blog/' && !p.frontmatter.draft)
    .sort((a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));

  const items = posts
    .map((p) => {
      const url = SITE + postUrl(p.url);
      return `    <item>
      <title>${esc(p.frontmatter.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
      <description>${esc(p.html ?? '')}</description>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>patched.network</title>
    <link>${SITE}</link>
    <description>Notes on building skuilder and LettersPractice.</description>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

// ---- llms.txt (https://llmstxt.org) ----------------------------------------
// A hub: LettersPractice and the skuilder docs publish their own llms.txt, so this one
// points at them, lists the blog, and mirrors each post as plain markdown at /blog/<slug>.md.

interface RawPost {
  slug: string;
  title: string;
  date: string;
  body: string;
}

function rawPosts(): RawPost[] {
  return readdirSync('content/blog')
    .filter((f) => f.endsWith('.md') && f !== 'index.md' && !drafts.includes(`blog/${f}`))
    .map((f) => {
      const src = readFileSync(`content/blog/${f}`, 'utf8');
      const [, fm = '', ...rest] = src.split(/^---$/m);
      const field = (k: string) => fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'))?.[1].trim() ?? '';
      return {
        slug: f.replace(/\.md$/, ''),
        title: field('title').replace(/^["']|["']$/g, ''),
        date: field('date'),
        body: rest.join('---').replace(/<!--[\s\S]*?-->/g, '').trim(),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** First prose paragraph, de-marked and clipped, for the link description. */
function excerpt(md: string, max = 180): string {
  const para =
    md
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .find((p) => p && !/^(#|>|```|[-*] |\d+\. |<)/.test(p)) ?? '';
  const text = para
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]+/g, '')
    .replace(/\s+/g, ' ');
  return text.length > max ? text.slice(0, max).replace(/\s+\S*$/, '') + '…' : text;
}

function llmsFiles(): Record<string, string> {
  const posts = rawPosts();
  const files: Record<string, string> = {};
  const out = (f: string, s: string) => (files[f] = s);

  for (const p of posts) out(`blog/${p.slug}.md`, `# ${p.title}\n\n_${p.date}_\n\n${p.body}\n`);

  const index = `# patched.network

> patched.network builds skuilder, an open-source (AGPL) engine for adaptive tutoring, and LettersPractice, an open-source early-literacy app built on it. LettersPractice is also a paid hosted product at letterspractice.com.

The two projects document themselves; start from their own llms.txt files below. This site holds the
landing page and a development blog. Posts dated 2025 predate the current direction and are kept as
a record; the skuilder docs describe how things work now.

## LettersPractice

- [LettersPractice llms.txt](https://letterspractice.com/llms.txt): What the app teaches, how sessions work, pricing and access, and its public pages.
- [Source](https://github.com/patched-network/letterspractice): App code, AGPL-3.0. Runs without a backend on a bundled static course. Recordings are a separate repo under CC BY-NC 4.0.

## Skuilder

- [Skuilder docs llms.txt](${SITE}/vue-skuilder/llms.txt): Index of the framework docs, each page available as markdown.
- [Skuilder docs, full text](${SITE}/vue-skuilder/llms-full.txt): All framework docs in one file.
- [Source](https://github.com/patched-network/vue-skuilder): Monorepo of npm packages, app shells and CLI, AGPL-3.0.

## Blog

${posts.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}.md): ${p.date}. ${excerpt(p.body)}`).join('\n')}

## Optional

- [RSS feed](${SITE}/rss.xml)
- [GitHub organization](https://github.com/patched-network)
`;
  out('llms.txt', index);
  out(
    'llms-full.txt',
    index + posts.map((p) => `\n---\n\n# ${p.title}\n\n_${p.date}_\n\n${p.body}\n`).join(''),
  );
  return files;
}
