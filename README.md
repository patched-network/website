# patched-network

The website for https://patched.network. VitePress with a small custom theme (no default theme).

```sh
yarn          # install
yarn dev      # local server; drafts are shown, marked "draft"
yarn build    # -> dist/ (Netlify publishes this), plus rss.xml, llms.txt, llms-full.txt, blog/<slug>.md
```

## Layout

- `content/index.md`: the landing page. Headline, tagline and the two link cards are frontmatter;
  the markdown body is the "longer bet" section.
- `content/blog/<slug>.md`: posts, served at `/blog/<slug>/` (the old Gridsome URLs).
  Frontmatter: `title`, `date`, and optionally `summary`, `draft: true` (left out of builds and
  RSS), `historical: true|false` (overrides the archive note).
- `.vitepress/theme/`: Layout, Home, BlogIndex, Post, Subscribe (Netlify form), tokens in `style.css`.
  Posts dated before `HISTORICAL_BEFORE` in `dates.ts` get an "early post" note.
- `netlify.toml`: `/vue-skuilder/*` proxies the docs on GitHub Pages; `/contact` and `/about` are
  retired and redirect.
- `llms.txt` is a hub: it points at letterspractice.com/llms.txt and the skuilder docs' own
  llms.txt (served here through the `/vue-skuilder/` proxy), then lists the posts. Its prose lives
  in `writeLlms()` in `.vitepress/config.mts`; edit it when the projects' framing changes.
