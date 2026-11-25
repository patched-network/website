<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { HISTORICAL_BEFORE, fmtDate } from './dates';

const { frontmatter: fm } = useData();

const iso = computed(() => {
  const d = new Date(fm.value.date);
  return isNaN(+d) ? '' : d.toISOString().slice(0, 10);
});
const isPost = computed(() => !!fm.value.date);
const historical = computed(() => fm.value.historical ?? (!!iso.value && iso.value < HISTORICAL_BEFORE));
</script>

<template>
  <article class="container narrow post prose">
    <header v-if="isPost" class="post-head">
      <a href="/blog/" class="back">← Blog</a>
      <h1>{{ fm.title }}</h1>
      <p class="meta muted">
        <time :datetime="iso">{{ fmtDate(iso) }}</time>
        <span v-if="fm.draft" class="draft">draft, not published</span>
      </p>
    </header>
    <aside v-if="isPost && historical" class="archived">
      An early post, kept as a record. Some details have since moved on; the
      <a href="/vue-skuilder/">docs</a> describe how things work now.
    </aside>
    <Content />
  </article>
</template>

<style scoped>
.post {
  padding-top: 2.5rem;
}
.post-head {
  margin-bottom: 1.75rem;
}
.back {
  display: inline-block;
  font-size: 0.9rem;
  text-decoration: none;
  margin-bottom: 1.25rem;
}
.post-head h1 {
  font-size: clamp(1.8rem, 4.5vw, 2.4rem);
}
.meta {
  margin: 0;
  font-size: 0.95rem;
}
.draft {
  margin-left: 0.6rem;
  color: var(--brand-text);
  font-weight: 600;
}
.archived {
  margin: 0 0 2rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background: var(--surface-2);
  font-size: 0.925rem;
  color: var(--muted);
}
</style>
