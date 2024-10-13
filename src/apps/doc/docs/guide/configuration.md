---
title: 配置
sidebar_position: 1
---

## 介绍
在大多数情况下，只需说明 Tiptap 应在何处呈现 ( element)、您要启用哪些功能 ( extensions) 以及初始文档应该是什么 ( content)。

不过，Tiptap还可以配置更多的东西。跟随文档让我们继续深入！

## 如何配置
要添加您的配置，请将具有设置的对象传递给Editor类即可，如下所示：
```js
import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

new Editor({
  element: document.querySelector('.element'),
  extensions: [
    Document,
    Paragraph,
    Text,
  ],
  content: '<p>Example Text</p>',
  autofocus: true,
  editable: true,
  injectCSS: false,
})
```
这将执行以下操作：
* 将 Tiptap 绑定到`.element`
* 加载Document和Paragraph，Text这3个`extensions` 
* 设置初始内容
* 初始化后将光标放在编辑器中
* 使文本可编辑（这是默认设置）
* 禁用默认 CSS的加载（这是默认设置）

## 节点、标记和扩展
大多的功能依赖于[node](https://tiptap.dev/api/nodes)、[mark](https://tiptap.dev/api/marks)或[extension](https://tiptap.dev/api/extensions)这个3个模块。

比如，下边的new Editor的参数extensions配置里 包含3个`node`的例子：
```js
import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

new Editor({
  element: document.querySelector('.element'),
  extensions: [
    Document,
    Paragraph,
    Text,
  ],
})
```