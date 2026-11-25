<script setup lang="ts">
import { ref } from 'vue';

// Netlify Forms: the form is prerendered into every page's HTML, which is how Netlify
// detects it at deploy. Submission is posted with fetch so the page doesn't navigate.
const email = ref('');
const state = ref<'idle' | 'sending' | 'done' | 'error'>('idle');

async function submit() {
  state.value = 'sending';
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'subscribe', email: email.value }).toString(),
    });
    if (!res.ok) throw new Error(String(res.status));
    state.value = 'done';
    email.value = '';
  } catch {
    state.value = 'error';
  }
}
</script>

<template>
  <div class="subscribe">
    <p class="lede"><strong>Updates by email.</strong> <span class="muted">New posts, rarely. No other mail.</span></p>
    <form
      v-if="state !== 'done'"
      name="subscribe"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      @submit.prevent="submit"
    >
      <input type="hidden" name="form-name" value="subscribe" />
      <p hidden><label>Don't fill this out: <input name="bot-field" /></label></p>
      <label class="sr-only" for="sub-email">Email address</label>
      <input
        id="sub-email"
        v-model="email"
        type="email"
        name="email"
        placeholder="you@example.com"
        autocomplete="email"
        required
        :disabled="state === 'sending'"
      />
      <button type="submit" :disabled="state === 'sending'">
        {{ state === 'sending' ? 'Subscribing…' : 'Subscribe' }}
      </button>
    </form>
    <p v-if="state === 'done'" class="msg">Thanks, you're on the list.</p>
    <p v-if="state === 'error'" class="msg err">That didn't go through. Please try again later.</p>
  </div>
</template>

<style scoped>
.lede {
  margin: 0 0 0.75rem;
}
form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
input[type='email'] {
  flex: 1 1 14rem;
  min-width: 0;
  padding: 0.65rem 0.9rem;
  font: inherit;
  color: var(--text);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
}
input[type='email']:focus {
  outline: none;
  border-color: var(--brand);
}
button {
  padding: 0.65rem 1.1rem;
  font: inherit;
  font-weight: 600;
  color: var(--on-brand);
  background: var(--brand);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}
button:hover:not(:disabled) {
  filter: brightness(1.05);
}
button:disabled {
  opacity: 0.7;
  cursor: default;
}
.msg {
  margin: 0.5rem 0 0;
}
.err {
  color: var(--brand-text);
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@media (max-width: 30rem) {
  button {
    flex: 1 1 100%;
  }
}
</style>
