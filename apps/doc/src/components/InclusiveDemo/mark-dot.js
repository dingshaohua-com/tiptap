import { Mark } from "@tiptap/core";

export default Mark.create({
  name: "dot",
  // 光标结束时标记是否需要处于活动状态（即决定editor.isActive("dot")的值）
  inclusive: true,
  // 反显的时候是否解析此标签（还是直接扔掉）
  parseHTML() {
    return [
      {
        tag: "text-dot",
      },
    ];
  },
  // 控制扩展如何呈现为 HTML
  renderHTML({ HTMLAttributes }) {
    return ["text-dot", HTMLAttributes, 0];
  },
  // 标记对外提供的命令
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