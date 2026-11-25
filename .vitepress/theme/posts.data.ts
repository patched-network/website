import { createContentLoader } from 'vitepress';

export interface Post {
  title: string;
  url: string;
  date: string; // YYYY-MM-DD, or '' if unparseable
  summary: string;
  draft: boolean;
}

declare const data: Post[];
export { data };

const isBuild = process.argv.includes('build');

function isoDate(raw: unknown): string {
  const d = new Date(raw as string);
  return isNaN(+d) ? '' : d.toISOString().slice(0, 10);
}

export default createContentLoader('blog/*.md', {
  transform(raw): Post[] {
    return raw
      .filter((p) => p.url !== '/blog/')
      .filter((p) => !(isBuild && p.frontmatter.draft))
      .map((p) => ({
        title: p.frontmatter.title,
        url: p.url.replace(/(\.html)?$/, '').replace(/\/?$/, '/'), // see postUrl in config
        date: isoDate(p.frontmatter.date),
        summary: p.frontmatter.summary ?? '',
        draft: !!p.frontmatter.draft,
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
  },
});
