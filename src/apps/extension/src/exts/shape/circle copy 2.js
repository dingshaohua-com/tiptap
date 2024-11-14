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
        default: "circle",
      },
      src:{
        default: "https://homeworkdone-rtf.oss-cn-beijing.aliyuncs.com/circle.jpg"
      },
      style: {
        default: "vertical-align:middle;width:22px;height:22px;",
      },
      
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["img", HTMLAttributes, 0];
  },
  parseHTML() {
    return [
      {
        tag: "img.circle",
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