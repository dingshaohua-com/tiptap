import { Mark, mergeAttributes } from '@tiptap/core';

export const Dot = Mark.create({
  name: 'dot',
  addAttributes() {
    return {
      class: {
        default: 'dot',
      },
    };
  },
  // @ts-ignore
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (element) => {
          return element.getAttribute('class')?.indexOf('dot') > -1;
        },
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
 // @ts-ignore
  addCommands() {
    return {
      setDot:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleDot:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetDot:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});
