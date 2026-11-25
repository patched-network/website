<script setup lang="ts">
import type { Post } from './posts.data';
import { fmtDate } from './dates';

defineProps<{ posts: Post[] }>();
</script>

<template>
  <ul class="post-list">
    <li v-for="p in posts" :key="p.url">
      <a :href="p.url" class="row">
        <span class="title">
          {{ p.title }}
          <span v-if="p.draft" class="draft">draft</span>
        </span>
        <time :datetime="p.date" class="date">{{ fmtDate(p.date) }}</time>
      </a>
      <p v-if="p.summary" class="summary">{{ p.summary }}</p>
    </li>
  </ul>
</template>

<style scoped>
.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--border);
}
li:last-child {
  border-bottom: 0;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  text-decoration: none;
  color: var(--text);
}
.row:hover .title {
  color: var(--brand-text);
}
.title {
  font-weight: 600;
}
.date {
  flex-shrink: 0;
  font-size: 0.875rem;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.summary {
  margin: 0.25rem 0 0;
  color: var(--muted);
  font-size: 0.95rem;
}
.draft {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.1rem 0.4rem;
  margin-left: 0.4rem;
  border-radius: 4px;
  background: var(--surface-2);
  color: var(--brand-text);
  vertical-align: middle;
}
@media (max-width: 30rem) {
  .row {
    flex-direction: column;
    gap: 0.1rem;
  }
}
</style>
