import { Node } from '@tiptap/core';

export const Formula = Node.create({
  name: 'mathField',
  atom: true,
  group: 'inline',
  inline: true,
  content: 'text*',

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
