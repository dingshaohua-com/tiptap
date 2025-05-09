---
title: 节点
---
## 介绍
如果将文档看做一棵树，那么节点只是这颗树中的一种内容。   
例如：`段落`、`标题`或`代码块`。   
但节点不一定是块的形式，也可能是内联的形式，例如提及`@mentions`。

## 支持的节点列表
|title|名称|StarterKit包中是否包含|源码|
|---| --- | --- | --- |
|Blockquote| 引用 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-blockquote) |
|BulletList| 无序列表 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-bullet-list) |
|CodeBlock| 代码块 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-code-block) |
|Document| 文档 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-document) |
|Emoji| 表情符号 | - | 需要订阅Tiptap Pro |
|HardBreak| br换行 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-hard-break) |
|Heading| 标题 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-heading) |
|HorizontalRule| 分隔线 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-horizontal-rule) |
|Image| 图片 | - | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-image) |
|ListItem| 列表组 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-list-item) |
|Mention| 提及 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-mention) |
|OrderedList| 有序列表 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-ordered-list) |
|Paragraph| 段落 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-paragraph) |
|Table| 表格 | - | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-table) |
|TableRow| 表格行 | - | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-table-row) |
|TableCell| 表格单元格 | - | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-table-cell) |
|TaskList| 任务列表 | - | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-task-list) |
|TaskItem| 任务项 | - | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-task-item) |
|Text| 文本 | 包含 | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-text) |
|YouTube| 油管 | - | [GitHub](https://github.com/ueberdosis/tiptap/tree/main/packages/extension-youtube) |

## 创建自定义节点
您可以随意的为TipTap创建自定义节点。下面是创建和注册自定义节点的示例代码：
```js
import { Node } from '@tiptap/core'

// 定义扩展
const CustomNode = Node.create({
  // 您的代码实现
})

const editor = new Editor({
  extensions: [
    // 注册您的扩展到编辑器
    CustomNode,
    // 不要忘了其他扩展.
    Document,
    Paragraph,
    Text,
    // …
  ],
})
```

<!-- [了解有关自定义扩展的更多信息。]() -->