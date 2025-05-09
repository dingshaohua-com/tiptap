---
title: 节点视图
sidebar_position: 9
---

## 介绍
renderHTML渲染出的还是过于简单了，比如您的节点和复杂您可以使用节点视图`addNodeView`。

节点视图允许您定制自己的节点展示形式。  
使用节点视图，您还可以向编辑器添加交互式节点。

## 节点视图类型
### 可编辑文本
节点视图可以有可编辑的文本，就像常规节点一样。
```html
<div class="Prosemirror" contenteditable="true">
  <p>文本</p>
  <node-view>文本</node-view>
  <p>文本</p>
</div>
```

### 不可编辑的文本
光标不能跳到那些不可编辑的文本上进行操作（不过它们仍然在可编辑内容中使用粗体和斜体等标记）   

默认Tiptap之node-view的contenteditable为false。
```html
<div class="Prosemirror" contenteditable="true">
  <p>文本</p>
  <node-view contenteditable="false">文本</node-view>
  <p>文本</p>
</div>
```
比如【提及节点】，用户可以添加或删除它们，但不能删除单个字符。

### 混合内容
您甚至可以混合不可编辑和可编辑的文本。这对于构建复杂的东西非常有用。
```html
<div class="Prosemirror" contenteditable="true">
  <p>文本</p>
  <node-view>
    <div contenteditable="false">
      不可编辑文本
    </div>
    <div>
      可编辑文本
    </div>
  </node-view>
  <p>文本</p>
</div>
```

## Markup

### renderHTML和parseHTML
假设您有一个节点视图，有一个按钮的弹窗事件。   
您的预期肯定不想把这所有的内容全部输出保存到数据库：编辑器的输出应该只有节点本身标记，这些js（事件）、属性、方法却是不应该输出。

这刚好就是会用到学到过的[renderHTML](/guide/custom-extensions#呈现-html)和[parseHTML](/guide/custom-extensions#解析html)，节点视图标记只需提供一些必要的信息，然后会通过这两个来进行自动恢复。

为什么这里将这个，因为节点视图核心功能就是辅助 renderHTML和parseHTML的。

### 框架
但是如果你想渲染你实际的 JavaScript/Vue/React 代码怎么办，只需将编辑器设置为editable: false即可
