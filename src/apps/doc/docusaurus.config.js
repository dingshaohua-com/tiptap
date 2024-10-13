const { pluginContentDocs, navbarItems } = require("./nav-route");
const {themes} = require('prism-react-renderer');
const lightTheme = themes.github;
const darkTheme = themes.dracula;

const config = {
  title: "我的生活分享",
  tagline: "Tiptap are cool",
  favicon: "img/favicon.svg",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },
  plugins: ["docusaurus-plugin-sass", ...pluginContentDocs],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          path: "docs/overview",
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig: {
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        { type: "doc", docId: "introduction", label:'概述' },
        ...navbarItems,
      ],
    },
    prism: {
      theme: lightTheme,
      darkTheme: darkTheme,
      defaultLanguage: "javascript",
    },
    algolia: {
      appId: "OE0YZ9O2TX",
      apiKey: "fcaabd624ef0e209b633935f37377fca",
      indexName: "tiptap",
      // https://github.com/facebook/docusaurus/issues/3805
      // https://docsearch.algolia.com/docs/templates
      contextualSearch: false,
      searchParameters: {
        facetFilters: []
      },
    },
  },
};

module.exports = config;
