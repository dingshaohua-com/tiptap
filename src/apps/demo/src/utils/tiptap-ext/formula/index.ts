import { Node } from '@tiptap/core';

export const Formula = Node.create({
  name: 'mathField',
  selected: true,
  atom: true,
  group: 'inline',
  inline: true,
  content: 'text*',

   // 定义属性（
   // 只有提前定义了属性， renderHTML才能接收到， 
   // 否则insertContentAt 插入node时候 即便声明了该属性，它也拿不到）
   addAttributes() {
    return {
      content: {
        default: '', // 默认值为空
      },
    };
  },

  // 解析规则（回显的时候，遇到什么要的规则需要解析 调用本扩展插件）
  parseHTML() {
    return [{ tag: 'math-field' }];
  },
 
  // 渲染和提交（即调用getHtml）的时候的最终代码
  renderHTML({ node, HTMLAttributes }) {
    return ['math-field', HTMLAttributes, node.attrs.content||''];
  },

  // @ts-ignore
  addCommands() {
    return {
      insertFormula: (arg) => (editor) => {
        const currentNode = {
          type: this.name,
          attrs: {
            content: arg || '',
          },
        };
        console.log(currentNode);
        const { from } = editor.state.selection;
        editor.commands.insertContentAt(from, currentNode);
        return true;
      },
    };
  },
});
