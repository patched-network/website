<template>
  <Layout>
    <div>
      <div v-if="latestPost">
        <h1>{{ latestPost.title }}</h1>
        <div v-html="latestPost.content"></div>
      </div>
      <p v-else>No posts found.</p>
    </div>
  </Layout>
</template>

<page-query>
query {
  posts: allBlogPost(sortBy: "date", order: DESC, limit: 1) {
    edges {
      node {
        id
        title
        path
        content
        date
      }
    }
  }
}
</page-query>

<script>
export default {
  computed: {
    latestPost() {
      if (this.$page.posts.edges.length > 0) {
        return this.$page.posts.edges[0].node;
      }
      return null;
    },
  },
};
</script>
