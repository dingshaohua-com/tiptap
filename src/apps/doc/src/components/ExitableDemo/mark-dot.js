import { Mark } from "@tiptap/core";

export default Mark.create({
  name: "dot",
  // 标记的光标是否可以在头尾离开 -默认为false(不离开)
  exitable: false,
  parseHTML() {
    return [
      {
        tag: "text-dot",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["text-dot", HTMLAttributes, 0];
  },
  addCommands() {
    return {
      toggleDot:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});