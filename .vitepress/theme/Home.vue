<script setup lang="ts">
import { useData } from 'vitepress';
import { data as posts } from './posts.data';
import PostList from './PostList.vue';
import LpWordmark from './LpWordmark.vue';
import SkMark from './SkMark.vue';

const { frontmatter: fm } = useData();
const recent = posts.slice(0, 4);
</script>

<template>
  <div class="home">
    <section class="hero container">
      <h1 class="headline">{{ fm.headline }}</h1>
      <p class="tagline">{{ fm.tagline }}</p>
    </section>

    <section class="links container" aria-label="Projects">
      <div v-for="l in fm.links" :key="l.href" class="link-card">
        <span class="eyebrow">{{ l.eyebrow }}</span>
        <a class="main-link" :href="l.href" :rel="l.external ? 'noopener' : undefined">
          <span v-if="l.wordmark === 'lp'" class="title wordmark"><LpWordmark /></span>
          <span v-else-if="l.wordmark === 'sk'" class="title with-mark"><SkMark />{{ l.title }}</span>
          <span v-else class="title">{{ l.title }}</span>
        </a>
        <span class="blurb">{{ l.body }}</span>
        <span class="foot">
          <span class="cta">{{ l.cta }} <span aria-hidden="true">→</span></span>
          <a v-if="l.source" class="source" :href="l.source.href" rel="noopener">{{ l.source.label }}</a>
        </span>
      </div>
    </section>

    <section class="container narrow prose mission">
      <Content />
    </section>

    <section v-if="recent.length" class="container narrow recent">
      <div class="recent-head">
        <h2>Recent writing</h2>
        <a href="/blog/">All posts</a>
      </div>
      <PostList :posts="recent" />
    </section>
  </div>
</template>

<style scoped>
.hero {
  max-width: var(--wide);
  padding-top: clamp(3rem, 9vw, 6rem);
  padding-bottom: 2.5rem;
}
.headline {
  font-size: clamp(2.1rem, 6vw, 3.5rem);
  line-height: 1.1;
  margin: 0 0 1.25rem;
  max-width: 18ch;
}
.tagline {
  font-size: clamp(1.1rem, 2.2vw, 1.3rem);
  line-height: 1.55;
  color: var(--muted);
  margin: 0;
  max-width: 38rem;
}

.links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
  margin-bottom: 3.5rem;
}
.link-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem 1.5rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow);
  color: var(--text);
  text-decoration: none;
  transition:
    border-color 0.15s,
    transform 0.15s;
}
.link-card:hover,
.link-card:focus-within {
  border-color: var(--brand);
  transform: translateY(-2px);
}
/* The title link covers the whole card; the source link sits above it. */
.main-link {
  color: inherit;
  text-decoration: none;
}
.main-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}
.main-link:focus-visible {
  outline: none;
}
.foot {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
}
.source {
  position: relative;
  z-index: 1;
  font-size: 0.9rem;
  color: var(--muted);
}
.source:hover {
  color: var(--text);
}
.eyebrow {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}
.title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
}
.with-mark {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}
.wordmark {
  display: block;
  margin: 0.15rem 0 0.1rem;
}
.blurb {
  color: var(--muted);
  flex: 1;
}
.cta {
  font-weight: 600;
  color: var(--brand-text);
}

.mission :deep(h2) {
  margin-top: 0;
}

.recent {
  margin-top: 3rem;
}
.recent-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}
.recent-head h2 {
  font-size: 1.1rem;
  margin: 0;
}
.recent-head a {
  font-size: 0.9rem;
}
</style>
