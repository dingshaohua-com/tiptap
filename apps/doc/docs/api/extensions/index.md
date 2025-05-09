---
title: 扩展
---

## 介绍
扩展会为 Tiptap 添加了新功能。这些扩展不会影响到编辑器，但是会为您增加新功能。   

我们已经为一些最常见的功能如 加粗 斜体等 封装了一个扩展StarterKit，您如何直接使用它。
```js
import StarterKit from '@tiptap/starter-kit'

new Editor({
  extensions: [
    StarterKit
  ]
})
```

除此之外，我们还为您编写了一些其它比较常用的扩展，将在本章的小结里一一列出。


## 扩展的工作原理
我们一直在提 我们是基于ProseMirror，所以扩展的底层 我们依然是基于ProseMirror。

如果您需要了解更底层的扩展知识，建议您直接阅读对应的ProseMirror扩展文档即可。


## 自定义一个新的扩展
您可以自由地为 Tiptap 创建自己的扩展。以下是创建和注册您自己的扩展所需的样板代码：
```js
import { Extension } from '@tiptap/core'

// 定义扩展
const CustomExtension = Extension.create({
  // 您的代码实现
})

const editor = new Editor({
  extensions: [
    // 注册您的扩展到编辑器
    CustomExtension,
    ...
  ],
})
```