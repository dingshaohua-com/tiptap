// 都有那些模块
const ctxModules = [{ id: "guide", label: "教程", docId:'configuration'},{ id: "api", label: "API"}];
 // 多实例路由
 exports.pluginContentDocs = ctxModules.map(({ id }) => [
    "@docusaurus/plugin-content-docs",
    {
      id: `${id}-module`,
      path: `docs/${id}`,
      routeBasePath: id,
      sidebarPath: require.resolve("./sidebars.js"),
    },
  ]);

  // 顶部导航栏
  exports.navbarItems = ctxModules.map(({ id, label, docId }) =>{
    return {
        docsPluginId: `${id}-module`,
        type: "doc",
        docId: docId??"introduction",
        label,
    }
  })