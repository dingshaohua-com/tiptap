import { Node } from '@tiptap/core';

export const Formula = Node.create({
  name: 'mathField',
  selected: true,
  atom: true,
  group: 'inline',
  inline: true,
  content: 'text*',

  // 解析规则（回显的时候，遇到什么要的规则需要解析 调用本扩展插件）
  parseHTML() {
    return [{ tag: 'math-field' }];
  },
 
  // 渲染（文档初始化和变动就会被渲染 执行此函数）和提交（即调用getHtml）的时候的最终代码
  renderHTML({ node, HTMLAttributes }) {
    return ['math-field', HTMLAttributes, 0];
  },

  // @ts-ignore
  addCommands() {
    return {
      insertFormula: (arg) => (editor) => {
        const currentNode = {
          type: this.name,
          content: [{ type: 'text', text: arg || '' }],
        };
        const { from } = editor.state.selection;
        editor.commands.insertContentAt(from, currentNode);
        return true;
      },
    };
  },
});
