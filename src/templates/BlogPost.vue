<template>
  <Layout>
    <h1>{{ $page.blogPost.title }}</h1>
    <div v-html="$page.blogPost.content" />
  </Layout>
</template>

<page-query>
query BlogPost ($id: ID!) {
  blogPost(id: $id) {
    title
    content
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.blogPost.title,
    };
  },
};
</script>
