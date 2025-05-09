import { Node, mergeAttributes } from '@tiptap/core';

export const Horizontal = Node.create({
  name: 'horizontal',
  group: 'block',

  addAttributes() {
    return {
      class: {
        default: 'solid',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'hr' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['hr', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      insertHr:
        (arg = 'solid') =>
        (editor) => {
          const myNode = {
            type: this.name,
            attrs: {
              class: arg,
            },
          };

          const { from, to } = editor.state.selection;
          return editor
            .chain()
            .insertContent([
              myNode,
              { type: 'paragraph' }, // 可选：添加段落用于继续编辑
            ])
            .run();
        },
    };
  },

  // 确保被视为 void 节点
  atom: true,
  selectable: false,
  draggable: false,
});
