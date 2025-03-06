<template>
  <Layout>
    <div>
      <div v-for="post in $page.posts.edges" :key="post.node.id">
        <h3>
          {{ post.node.date.split("T")[0] }}:
          <g-link :to="post.node.path">{{ post.node.title }}</g-link>
        </h3>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  posts: allBlogPost {
    edges {
      node {
        id
        title
        date
        path
        content
      }
    }
  }
}
</page-query>
