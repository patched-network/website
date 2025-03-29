// website/gridsome.config.js
// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "patched.network",
  siteUrl: "https://patched.network", // Add your site URL here (required for RSS feed)
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/blog/**/*.md",
        typeName: "BlogPost",
        remark: {
          // remark options
        },
        slugify: {
          use: "@gridsome/source-filesystem",
          options: {
            field: "title",
          },
        },
      },
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "BlogPost",
        latest: true,
        feedOptions: {
          title: "patched.network Blog",
          feed_url: "https://patched.network/rss.xml",
          site_url: "https://patched.network",
        },
        feedItemOptions: (node) => ({
          title: node.title,
          description: node.content, // You may want to use a summary field if available
          url: `https://patched.network${node.path}`,
          date: node.date,
        }),
        output: {
          dir: "./static",
          name: "rss.xml",
        },
      },
    },
  ],
  templates: {
    BlogPost: "/blog/:title",
  },
};
