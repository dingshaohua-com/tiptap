---
title: 菜单
sidebar_position: 3
---

## 介绍

Tiptap 非常干净和纯粹，默认情况下 它只有一个光秃秃的输入框。  
菜单界面需要您自己去编写，我们对外暴漏了丰富的功能 api 供您菜单调用！

## 菜单 ui

菜单是编辑器必不可少的模块，接下来让我们了解如何编写菜单。

### 固定菜单

在第 2 章节的 tiptap 安装教程中，我们已经简单了解了如何在编辑器顶部固定几个菜单（这也是大部分编辑器的做法）。  
比较简单 就是几个 button！

### 气泡菜单

选择文本时会出现气泡菜单，这个也比较常用，我们[提供了该扩展](/api/extensions/bubble-menu)。

### 浮动菜单

选择文本时会出现气泡菜单，这个也比较常用，我们[提供了该扩展](/api/extensions/floating-menu)。

## 菜单和内容的连通

如上 你已经学会了如何定制自己的菜单 ui，那怎么和你的编辑器内容做关联呢？

比如：你有了`加粗`的菜单，那当点击时候 如何将执行选中文本变粗的能力、以及选中变粗的时候，顶部菜单处于激活状态呢？

### 命令（功能）

如下 给菜单按钮点击事件 执行以下命令即可达到`选中文本变粗`的能力

```jsx
<button onclick="editor.chain().focus().toggleBold().run()">加粗</button>
```

这是一个很长的命令，对吧？实际上，它是一个命令链。让我们拆开理解

- editor 是一个 Tiptap 实例
- chain()用于告诉编辑器你要执行多个命令（即命令链）
- focus()将焦点设置回编辑器 （当您单击该按钮时，浏览器会聚焦该 DOM 元素，而编辑器会失去焦点，进而需要使用 focus 方法）
- toggleBold()将所选文本标记为粗体/或清除已有粗体
- run()将执行链

### 激活状态

编辑器提供了一种 isActive()方法来检查是否已将某些内容应用于所选文本（即文本是否被[标记](https://tiptap.dev/api/marks)）。

```jsx
// .is-active是您自己定义的class样式
<button
  onClick={() => editor.chain().focus().toggleBold().run()}
  className={editor.isActive("bold") ? "is-active" : ""}
>
  加粗
</button>
```


除了如上的加粗、斜体等基本的标记判断。您甚至可以根据以下进行检查。
```js
editor.isActive('highlight', { color: '#ffa8a8' }); // 根据【标记】给定的【值】
editor.isActive('textStyle', { color: /.*/ }) // 根据【标记】给定的【值正则】
editor.isActive({ textAlign: 'right' }) // 甚至只根据【标记】的【值】，而不用提供其【标记本身类型】
```

如果您选择的内容跨越多个标记，或者只有部分选择有标记，isActive()将返回false。      
因为这就是它应该的样子。
