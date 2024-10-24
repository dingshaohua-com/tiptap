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

```js
const Paragraph = Node.create({
  name: 'paragraph',
  group: 'block',
  content: 'inline*',
  parseHTML() {
    return [
      { tag: 'p' },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['p', HTMLAttributes, 0]
  },
})
```

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
  },
});
```

以上 相当于自定义标签 circle 标签 ，而 renderHTML 决定所得（getHtml），如上 返回 `<circle></circle>`，但是编辑器中`<circle></circle>`具体如呈现，确实由 addNodeView 的返回决定，相当于增强了 renderHTML 的显示功能。

所以，如果你保存的内容如果需要放到别的地方展示（不在 tiptap 中），请最好不要使用 addNodeView，因为需要 tiptap 来处理。

---

name: "customBlock", // 自定义节点名称， 可以让其它节点的内容设置为仅包含你这个 比如 content: "customBlock\*"

group 属性确实只是用于将节点分组，甚至你可以自定义
它没有直接影响节点的功能或行为。它主要用于组织和管理节点类型，方便控制哪些节点可以在一起使用。

inline 属性才是真正决定节点是否为内联节点的关键。如果设置为 true，节点可以在文本中间插入而不换行；如果设置为 false，节点会作为块级元素存在，并在新行开始。

在 TipTap 和 ProseMirror 中，content 属性用于定义节点可以包含的具体内容类型。以下是一些常见的节点类型及其表示方式：

常见的节点类型
文本 (text)：

表示文本节点。
例如：content: "text\*" 表示可以包含任意数量的文本节点。
内联节点 (inline)：

表示内联节点，比如链接、图像等。
例如：content: "inline\*" 表示可以包含任意数量的内联节点。
块级节点 (block)：

表示块级节点，比如段落、列表等。
例如：content: "block\*" 表示可以包含任意数量的块级节点。
组合模式：

可以组合不同类型的节点：
content: "inline* block*" 表示可以包含任意数量的内联和块级节点。
content: "paragraph block\*" 表示必须至少包含一个段落，并可以有任意数量的块级节点。
特定节点：

你可以指定只能包含特定类型的节点：
content: "paragraph" 表示只能包含一个段落。
混合节点：

可以定义混合结构，例如：
content: "block* inline*" 表示可以包含任意数量的块级和内联节点。

content: "\*", 表示该节点支持任意类型的内容，
content 值可以是具体某一种节点，也可以是某一分组的节点，还可以是组合，也可以是任意

如果您希望将 circle 节点设置为一个整体，不允许包含任何内容，并且保持其为内联元素，您可以将 atom 属性设置为 true。这意味着该节点将作为一个原子节点存在，不能包含子节点。下面是如何实现这一点的代码示例：

如果需要自定义渲染 需要使用 nodeViews，否则 tiptap 将采用 renderHTML 来解析呈现效果 对吗
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

---

## addCommands

是沟通 编辑器和 插件的桥梁， 插件可以通过 addCommands 来调用编辑器的方法。

比如新增一个文本节点

```js
{
  // ...
  addCommands() {
    return {
      inserText: (content) => (arg) => {
        const { tr, dispatch, state } = arg;
        // 创建节点
        const node = state.schema.text(content);
        // 创建事务
        const transaction = tr.insert(0, node);
        // 提交事务
        dispatch(transaction);
        return true;
      },
    };
  },
}
```

需要注意的是：

在 Tiptap 中，text 节点是一个特殊的节点类型，它并不需要通过 state.schema.nodes['text'] 来创建，而是使用 state.schema.text 方法。你可以直接调用这个方法来创建包含文本的文本节点。

在 Tiptap 中，文本节点通常嵌套在其他节点（如段落节点）中。单独插入文本节点并不常见，因为文本节点没有自身的容器。

如果你直接插入文本节点而没有容器节点，Tiptap 通常会创建一个段落节点来包含这个文本。

插入一个 段落节点，并填充文本

```js
{
  // ...
  addCommands() {
    return {
      inserText: (content) => (arg) => {
        const { tr, dispatch, state } = arg;
        // 获取段落节点类型
        const paragraphNodeType = state.schema.nodes["paragraph"];
        // 创建一个包含文本的文本节点
        const textNode = state.schema.text("哈哈");
        // 创建段落节点并包含文本节点
        const paragraphNode = paragraphNodeType.create(null, textNode); // this.type.create 代表创建当前节点
        // 创建事务
        const transaction = tr.insert(0, paragraphNode);
        // 提交事务
        dispatch(transaction);
        return true;
      },
    };
  }
}
```

在你的 addCommands 函数中，返回值 的作用是指示 ProseMirror 命令执行后的状态。这通常用于处理命令链中的下一个操作。

这里可以访问相关 api https://tiptap.dev/docs/editor/api/commands

editor.commands.insertContentAt:  
这是 Tiptap 提供的一个高层 API，用于在指定位置插入内容。它封装了对底层 ProseMirror 事务的操作，提供了更简洁的接口。
使用这个方法时，Tiptap 会自动处理事务的创建、更新状态、和视图的渲染等。

tr.insert(...):  
这是 ProseMirror 提供的低级 API，用于在指定位置插入节点。这个方法本身不会自动提交事务，也不会更新视图。
你需要手动创建事务并调用 dispatch 来使更改生效。

对于大多数简单的插入操作，建议使用 editor.commands.insertContentAt，而在需要复杂控制的场景中，使用 tr.insert(...) 会更合适。根据你的具体需求选择即可。

editor.commands.insertContentAt 插入的节点格式和 tr.insert 不一样，请注意
editor.commands.insertContent 支持在异步中执行，而 tr.insert 不可

## ReactNodeViewRenderer

默认情况下，渲染的节点视图ReactNodeViewRenderer始终会有一个包装div，为什么要多这个没用的包裹，请看说明：
https://github.com/ueberdosis/tiptap/pull/3984#issuecomment-1668520002


你可以自定义包裹容器的属性

```js
return ReactNodeViewRenderer(MyCmp, { // 作用到最外层
  contentDOMElementTag: "span",
  className: "span-wrapper",
});
```
但是我尝试了，没有生效。


还有另一个组件NodeViewContent可以帮助您向节点视图添加可编辑内容。以下是示例：
```jsx
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export default () => {
  return (
    //  作用到第二层
    <NodeViewWrapper className="react-component">  
      <label contentEditable={false}>React Component</label>

      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  )
}
```

NodeViewContent呈现`<div>`HTML 标记,但您可以更改它。例如，`<NodeViewContent as="p">`应呈现一个段落。但有一个限制：该标记在运行时不得更改。


## addOptions
该方法为三大件添加设置项（也可理解为内部变量/属性），添加的内部属性可以在parseHTML，renderHTML方法中使用，可以通过this.options.xxx访问


## addAttributes
给节点添加自定义属性，添加后 后续无论是保存还是呈现，才可以显示出来


## addProseMirrorPlugins
tiptap并没有对ProseMirror所有的api进行封装， 如果现有的功能无法满足你自定义扩展，你可以借助此属性，完成更高级的扩展能力，比如监听复制粘贴等等
官方说：毕竟，Tiptap 是基于 ProseMirror 构建的，而 ProseMirror 也拥有非常强大的插件 API。要直接访问它，请使用addProseMirrorPlugins()。

https://tiptap.dev/docs/editor/extensions/custom-extensions/extend-existing#prosemirror-plugins-advanced


https://tiptap.dev/docs/editor/extensions/functionality/filehandler#onpaste tiptap也封装了诸如粘贴或拖拽的操作，可那是回调，意味着你只能知道 但是不能干预这个过程

以下为gpt所言：是的，正如你所说，使用 onPaste 只能让你获取粘贴的内容，而不能干预这个过程。在 onPaste 中，你只能读取事件并执行某些操作，但无法控制内容如何被插入或是否被插入。

相对而言，使用 addProseMirrorPlugins 中的 handlePaste 则可以更灵活地控制粘贴行为。你可以选择如何处理粘贴的内容，例如修改内容、阻止默认行为或决定是否将其插入到编辑器中。

简而言之，onPaste 适用于简单的监听和处理，而 handlePaste 适用于更复杂的自定义需求。