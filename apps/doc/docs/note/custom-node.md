---
sidebar_position: 2
---

# 自定义节点

我用一个例子说明

## web展示公式

项目可以使用了 mathlive ，便于让编辑器支持公式。
[mathlive文档说明](https://cortexjs.io/mathlive/guides/react)，要想使用它，只需要安装插件 `npm install mathlive`, 然后在页面中使用即可。

```js
import "mathlive";
function App() {
  const mathField = "\\frac{1}{2}"; // 公式内容
  return (
    <div className="App">
      <math-field>{mathField}</math-field>
    </div>
  );
}
export default App;
```

这样即可展示了公式。

## 编辑器支持

但是如上，仅仅是在页面展示公式，编辑器中无法使用。  
默认情况下 tiptap 编辑器不支持 mathlive 公式（既 `<math-field>xxx</math-field>`）。

假设后端给你的富文本编辑器返回了要展示的内容，如下：

```js
const content: '<p>Hello World! <math-field>\\frac{x}{y}</math-field></p>'
```

那你就要手写一个扩展，让编辑器支持这个节点。

```ts
import { Node } from "@tiptap/core";

export const Formula = Node.create({
  name: "mathField",
  atom: true,
  group: "inline",
  inline: true,
  content: "text*",
  parseHTML() {
    return [{ tag: "math-field" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return ["math-field", HTMLAttributes, 0];
  },
  addCommands() {
    return {
      insertFormula: (arg) => (editor) => {
        const currentNode = {
          type: this.name,
          content: [{ type: "text", text: arg || "" }], 
        };
        const { from } = editor.state.selection;
        editor.commands.insertContentAt(from, currentNode);
        return true;
      },
    };
  },
});
```

### name

扩展名称，随意，尽量和标签名称对应。  
比如： `<math-field>`, 对应 mathField。

### atom

是否原子节点，
若是则代表为一个整体，如不能选择公式中的某一部分。  
图片 视频都是原子节点！

### group

节点所属组，默认有 block、inline、text 等。  
通过它可控制该节点在编辑器中的表现和约束，由 starter-kit 预定义

### inline

是否是行内元素，false会独占一行。  
必须和group保持一致，block对应false，inline对应true。

### content

定义的当前节点是否可以包含子元素。  
以及包含什么类型或多少个元素。

### parseHTML

解析规则  
回显的时候，遇到什么要的规则需要解析 调用本扩展插件

### renderHTML

最终渲染  
文档初始化和变动就会被渲染 执行此函数，  
也是提交（即调用getHtml）的时候的最终代码。

### addCommands
自定义命令，  
当组件被注册到tiptap的编辑器中后，  
起自定义的命令方法会被添加到编辑器实例的的命令属性上，  

比如上边的命令我可以在任意时候调用
```js
editor.commands.insertFormula("\\frac{x}{y}")
```

其中 `{ type: "text", text: arg || "" }` 为定义了一个文本节点实例对象,
currentNode 定义了一个当前节点实例对象，并包含了如上的文本节点。