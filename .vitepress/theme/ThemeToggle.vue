<script setup lang="ts">
// Flips between light and dark and pins the choice in localStorage. With nothing
// pinned the site follows the OS. Which icon shows is decided in CSS from the same
// state, so the server render and the client agree.
function toggle() {
  const root = document.documentElement;
  const pinned = root.dataset.theme;
  const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = pinned ? pinned === 'dark' : osDark;
  const next = isDark ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    // Choosing the OS's own scheme un-pins, so later OS changes are followed again.
    if ((next === 'dark') === osDark) {
      localStorage.removeItem('pn-theme');
      delete root.dataset.theme;
    } else {
      localStorage.setItem('pn-theme', next);
    }
  } catch {
    /* storage blocked: the choice lasts for this page only */
  }
}
</script>

<template>
  <button type="button" class="theme-toggle" aria-label="Toggle light and dark theme" title="Toggle theme" @click="toggle">
    <!-- moon: shown in light mode (click for dark) -->
    <svg class="moon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
    <!-- sun: shown in dark mode (click for light) -->
    <svg class="sun" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: none;
  color: var(--muted);
  cursor: pointer;
}
.theme-toggle:hover {
  color: var(--text);
  background: var(--surface-2);
}
.sun {
  display: none;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) .sun {
    display: block;
  }
  :root:not([data-theme='light']) .moon {
    display: none;
  }
}
:root[data-theme='dark'] .sun {
  display: block;
}
:root[data-theme='dark'] .moon {
  display: none;
}
</style>
