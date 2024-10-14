import { Node } from '@tiptap/core';

export default Node.create({
  name: 'CircleIpt',

  group: 'inline',

  inline: true,

  draggable: true,
  

  addAttributes() {
    return {
      text: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.circle-ipt',
      },
    ];
  },

  renderHTML({ node }) {
    return [
      'div',
      {
        class: 'circle-ipt',
        style: 'width: 20px; height: 20px; border-radius: 50%; border: 1px solid black; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;',
      },
      [
        'input',
        {
          type: 'text',
          value: node.attrs.text,
          style: 'width: 80%; border: none; outline: none; text-align: center; background: transparent;',
          oninput: (e) => {
            this.editor.commands.updateAttributes('CircleIpt', { text: e.target.value });
          },
        },
      ],
    ];
  },

  addCommands() {
    return {
      setCircleIpt: () => ({ commands }) => {
        return commands.insertContent({ type: this.name });
      },
    };
  },
});
