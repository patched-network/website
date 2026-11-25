<script setup lang="ts">
import { useData } from 'vitepress';
import { data as posts } from './posts.data';
import PostList from './PostList.vue';

const { frontmatter: fm } = useData();
</script>

<template>
  <div class="container narrow blog">
    <h1>{{ fm.title }}</h1>
    <p v-if="fm.intro" class="muted intro">{{ fm.intro }}</p>
    <PostList :posts="posts" />
  </div>
</template>

<style scoped>
.blog {
  padding-top: 3rem;
}
h1 {
  font-size: 2rem;
  margin: 0 0 0.5rem;
}
.intro {
  margin: 0 0 1.5rem;
}
</style>
