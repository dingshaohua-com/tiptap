---
title: 前言
sidebar_position: 1
---

官方文档晦涩，因此总结笔记

tiptap 内置了一些常用的扩展，如加粗、斜体、下划线、列表、表格等。  
但是很多标签他也没支持，比如最基本的 div、span、img 等，因为它认为这是 html 布局标签，写文章一般用不到，这就需要我们自己去扩展了。

我记得以前三大件是 mark、node、extension 后来改成了 mark、node、functionality。  
其实这样也好，因为 mark、node、extension 都属于 extensions，容易把 extension 和 extensions 搞混淆。  
三者的配置项一样，之所以用不同的方式创建，就是为了区分。

## renderHTML

就是你审查编辑显示 元素看到什么样，保存下来的（既 getHtml） 就是什么样，所见即所得。

## addNodeView

如果你的展示内容比较丰富甚至还带一点交互功能，renderHTML 显然是满足不了的，如果同时存在 则 addNodeView 决定所见(编辑器中展示的样式效果)，而 renderHTML 决定所得（getHtml）。

```js
export default Node.create({
  name: "circle",
  // ... 其它配置项省略
  renderHTML({ HTMLAttributes }) {
    return ["circle", HTMLAttributes, 0];
  },
  addNodeView() {
    return ({ node, updateAttributes }) => {
      const element = document.createElement("img");
      element.src = triangleImg;
      return {
        dom: element,
        contentDOM: null, // 不允许插入子节点（原子节点）
      };
    };
  }
});
```
以上 相当于自定义标签circle 标签 ，而renderHTML决定所得（getHtml），如上 返回 `<circle></circle>`，但是编辑器中`<circle></circle>`具体如呈现，确实由addNodeView的返回决定，相当于增强了renderHTML 的显示功能。

所以，如果你保存的内容如果需要放到别的地方展示（不在tiptap中），请最好不要使用addNodeView，因为需要tiptap来处理。
