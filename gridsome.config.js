// website/gridsome.config.js
// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: "patched.network",
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
  ],
  templates: {
    BlogPost: "/blog/:title",
  },
};
