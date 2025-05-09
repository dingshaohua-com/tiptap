---
title: 外观
sidebar_position: 4
---

## 介绍

Tiptap 是无头的，这意味着没有提供样式，您可以完全控制编辑器的外观。

## 通过最外部容器控制
编辑器最外层的容器中为`.ProseMirror`。您可以设置它来控制样式
```css
/* 只作用在编辑器中 */
.ProseMirror p {
  margin: 1em 0;
}
```

## 添加自定义样式
在渲染的时候，向内容注入class

### 自定义样式注入节点
HTMLAttributes大多数扩展允许您通过选项向呈现的 HTML 添加属性。您可以使用它来添加自定义类（或任何其他属性）。
```js
new Editor({
  extensions: [
    Paragraph.configure({
      HTMLAttributes: {
        class: 'my-custom-paragraph',
      },
    }),
    Heading.configure({
      HTMLAttributes: {
        class: 'my-custom-heading',
      },
    })
    ...
  ]
})
```
渲染的 HTML 将如下所示：
```
<h1 class="my-custom-heading">标题上已经被注入了my-custom-heading类</p>
<p class="my-custom-paragraph">段落上也已经被注入了my-custom-paragraph类</p>
```

其它小结里有[示例Demo](/api/marks/bold#htmlattributes)，这里不再赘述！

### 自定义样式注入编辑器
[通过最外部容器控制](#通过最外部容器控制) 这里讲到了：每个编辑器实例的最外部容器 都有一个样式类 `.ProseMirror`。 那我们能不能向编辑器注入一个同等级的样式呢？答案当然是可以的！
```js
new Editor({
  editorProps: {
    attributes: {
      class: 'MyProseMirror',
    },
  },
})
```


## 自定义标记(mark)
通过自定义标记来将节点内容标记为自己的样式。
```js
import Bold from '@tiptap/extension-bold'

const CustomBold = Bold.extend({
  renderHTML({ HTMLAttributes }) {
    return ['b', HTMLAttributes, 0]  //'b'也可以是'strong'
  },
})
new Editor({
  extensions: [
    // …
    CustomBold,
  ],
})
```
具体请到[标记](/guide/custom-extensions#创建标记)这一章节。


