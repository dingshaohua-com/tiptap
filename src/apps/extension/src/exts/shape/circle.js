import { Node } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";


export default Node.create({
  name: "circle",
  group: "inline",
  inline: true,
  atom: true,
  selected: true,
  content: "text*", // 允许插入文本

  addAttributes() {
    return {
      class: {
        default: "ignore-text-style circle",
      },
      style: {
        default: "box-sizing:border-box; padding:2px; display: inline-block; width: 20px; height: 20px; position: relative; top: 4px; border: 1px solid black; margin:0 4px; border-radius: 50%;",
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },
  parseHTML() {
    return [
      {
        tag: "span.circle",
      },
    ];
  },
  addCommands() {
    return {
      inertCircle:
        () =>
        ({ commands }) => {
          commands.insertContent({ type: this.name });
          commands.insertContent(" ");
          // 获取当前文档和光标位置
          const { state, view } = this.editor;
          const { from, to } = state.selection;

          // 计算新内容的结束位置
          const newPos = to + 1; // 根据需要调整
          console.log("newPos", newPos);

          // 设置新的光标位置
          view.dispatch(
            view.state.tr.setSelection(TextSelection.create(state.doc, newPos))
          );
        },
    };
  },
});
