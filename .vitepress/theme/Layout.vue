<script setup lang="ts">
import { useData, withBase } from 'vitepress';
import Home from './Home.vue';
import BlogIndex from './BlogIndex.vue';
import Post from './Post.vue';
import Subscribe from './Subscribe.vue';
import GradCap from './GradCap.vue';
import ThemeToggle from './ThemeToggle.vue';

const { frontmatter, page } = useData();
</script>

<template>
  <div class="shell">
    <header class="site-header">
      <div class="container bar">
        <a class="logo" :href="withBase('/')">
          <GradCap class="logo-mark" />
          <span>patched.network</span>
        </a>
        <nav class="nav" aria-label="Main">
          <a href="/blog/">Blog</a>
          <a href="/vue-skuilder/">Docs</a>
          <a class="sponsor" href="https://github.com/sponsors/patched-network" rel="noopener">
            <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden="true">
              <path d="M7.655 14.916v-.001h-.002l-.006-.003-.018-.01a22.066 22.066 0 0 1-3.744-2.584C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.044 5.231-3.886 6.818a22.094 22.094 0 0 1-3.433 2.414 7.152 7.152 0 0 1-.31.17l-.018.01-.008.004a.75.75 0 0 1-.69 0Z" />
            </svg>
            Sponsor
          </a>
          <a href="https://github.com/patched-network" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>

    <main class="main">
      <div v-if="page.isNotFound" class="container narrow notfound">
        <h1>Not found</h1>
        <p>Nothing lives here. Try the <a href="/">home page</a> or the <a href="/blog/">blog</a>.</p>
      </div>
      <Home v-else-if="frontmatter.layout === 'home'" />
      <BlogIndex v-else-if="frontmatter.layout === 'blog'" />
      <Post v-else />
    </main>

    <footer class="site-footer">
      <div class="container narrow">
        <Subscribe />
        <p class="fine muted">
          <a href="/rss.xml">RSS</a>
          <span aria-hidden="true">·</span>
          <a href="https://github.com/patched-network" rel="noopener">GitHub</a>
          <span aria-hidden="true">·</span>
          <a href="https://letterspractice.com" rel="noopener">LettersPractice</a>
          <span aria-hidden="true">·</span>
          <a href="https://github.com/sponsors/patched-network" rel="noopener">Sponsor</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
}

.site-header {
  border-top: 4px solid var(--brand);
  border-bottom: 1px solid var(--border);
  background: var(--bg);
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4rem;
}
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
}
.logo-mark {
  height: 1.3rem;
  width: auto;
  color: var(--brand);
}
.nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.nav a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
}
.nav a:hover {
  color: var(--text);
}
.nav .sponsor {
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 999px;
}
.nav .sponsor svg {
  color: var(--brand);
}
.nav .sponsor:hover {
  border-color: var(--brand);
}

.notfound {
  padding: 4rem var(--gutter);
}

.site-footer {
  margin-top: 5rem;
  border-top: 1px solid var(--border);
  padding: 2.5rem 0 3rem;
}
.fine {
  margin: 1.5rem 0 0;
  font-size: 0.875rem;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.fine a {
  color: var(--muted);
}

@media (max-width: 30rem) {
  .bar {
    flex-wrap: wrap;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }
  .logo span {
    font-size: 1.05rem;
  }
  .nav {
    gap: 1rem;
  }
}
</style>
