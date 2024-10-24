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



---

name: "customBlock", // 自定义节点名称， 可以让其它节点的内容设置为仅包含你这个 比如 content: "customBlock*"

group 属性确实只是用于将节点分组，甚至你可以自定义
它没有直接影响节点的功能或行为。它主要用于组织和管理节点类型，方便控制哪些节点可以在一起使用。

inline 属性才是真正决定节点是否为内联节点的关键。如果设置为 true，节点可以在文本中间插入而不换行；如果设置为 false，节点会作为块级元素存在，并在新行开始。

在 TipTap 和 ProseMirror 中，content 属性用于定义节点可以包含的具体内容类型。以下是一些常见的节点类型及其表示方式：

常见的节点类型
文本 (text)：

表示文本节点。
例如：content: "text*" 表示可以包含任意数量的文本节点。
内联节点 (inline)：

表示内联节点，比如链接、图像等。
例如：content: "inline*" 表示可以包含任意数量的内联节点。
块级节点 (block)：

表示块级节点，比如段落、列表等。
例如：content: "block*" 表示可以包含任意数量的块级节点。
组合模式：

可以组合不同类型的节点：
content: "inline* block*" 表示可以包含任意数量的内联和块级节点。
content: "paragraph block*" 表示必须至少包含一个段落，并可以有任意数量的块级节点。
特定节点：

你可以指定只能包含特定类型的节点：
content: "paragraph" 表示只能包含一个段落。
混合节点：

可以定义混合结构，例如：
content: "block* inline*" 表示可以包含任意数量的块级和内联节点。

content: "*",  表示该节点支持任意类型的内容，
content值可以是具体某一种节点，也可以是某一分组的节点，还可以是组合，也可以是任意


如果您希望将 circle 节点设置为一个整体，不允许包含任何内容，并且保持其为内联元素，您可以将 atom 属性设置为 true。这意味着该节点将作为一个原子节点存在，不能包含子节点。下面是如何实现这一点的代码示例：



如果需要自定义渲染 需要使用nodeViews，否则tiptap将采用renderHTML来解析呈现效果 对吗
ChatGPT 说：
ChatGPT
是的，您说得对。以下是对这一点的详细解释：

自定义渲染与 nodeViews
使用 nodeViews：

当您希望为特定节点提供自定义渲染和交互时，可以使用 nodeViews。这允许您完全控制该节点在 DOM 中的表现，包括如何处理用户输入和交互事件。
通过 nodeViews，您可以使用自定义 HTML 结构、事件监听器和其他复杂的逻辑来呈现节点。
使用 renderHTML：

如果您不使用 nodeViews，Tiptap 将默认使用 renderHTML 方法来渲染节点。此方法定义了如何将节点转换为 HTML 格式。
renderHTML 主要用于简单的渲染需求，通常适用于不需要复杂交互的节点。
总结
使用 nodeViews 适用于需要自定义呈现、交互和更复杂逻辑的节点。
使用 renderHTML 适用于较简单的节点，不需要额外的交互处理。
因此，根据您的需求选择合适的方式来渲染节点。如果您需要更细致的控制和交互，使用 nodeViews 是更好的选择。