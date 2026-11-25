<script setup lang="ts">
import { ref, onMounted } from 'vue';

// LettersPractice wordmark as static SVG. lp-wordmark.html is a copy of
// ~/pn/cm/main/lp-blog/.vitepress/theme/letterpeople/wordmark.html (cm 9aa3a29), a frozen
// render of the app header's WordDisplay. No letterpeople/animejs code is pulled in here.
//
// As in the app, each letter gets a random vibrant hue per page load
// (ColorPresets.vibrancyHigh: oklch L 0.7, C 0.15). Letter bodies are fill="currentColor".
import wordmark from './lp-wordmark.html?raw';

const root = ref<HTMLElement | null>(null);

onMounted(() => {
  root.value?.querySelectorAll<HTMLElement>('.letterpeople-letter-wrapper').forEach((el) => {
    el.style.color = `oklch(0.7 0.15 ${Math.random() * 360}deg)`;
  });
});
</script>

<template>
  <span ref="root" class="lp-wordmark">
    <span class="sr-only">LettersPractice</span>
    <span class="art" aria-hidden="true" v-html="wordmark" />
  </span>
</template>

<style scoped>
.lp-wordmark {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
/* The capture has no inline sizing; the svg height sets the scale. Its viewBox has
   descender headroom, so cap height is about 60% of this. */
.art :deep(.letterpeople-word) {
  display: flex;
  align-items: flex-end;
  gap: 2px;
}
.art :deep(.letterpeople-letter-wrapper) {
  color: var(--brand); /* pre-hydration tint, re-rolled on mount */
}
.art :deep(svg) {
  display: block;
  height: 34px;
  width: auto;
  overflow: visible;
}
.art :deep(.letterpeople-spacer) {
  width: 8px;
}
@media (max-width: 30rem) {
  .art :deep(svg) {
    height: 28px;
  }
}
</style>
