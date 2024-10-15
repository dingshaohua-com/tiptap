import { Node } from "@tiptap/core";
import styleInject from "./style-inject";
import triangleImg from "./assets/triangle.svg";
import { TextSelection } from "@tiptap/pm/state";

const style = `.triangle {
display: inline-block;
width: 28px;
height: 28px;
position: relative;
top: 6px;
margin:0 4px;}`;
styleInject(style);

export default Node.create({
  name: "triangle",
  group: "inline",
  inline: true,
  atom: true,
  content: "text*", // 允许插入文本

  renderHTML({ HTMLAttributes }) {
    return ["triangle", HTMLAttributes, 0];
  },
  parseHTML() {
    return [
      {
        tag: "triangle",
      },
    ];
  },
  addNodeView() {
    return ({ node, updateAttributes }) => {
      const element = document.createElement("img");
      element.className = "triangle";
      element.src = triangleImg;

      return {
        dom: element,
        contentDOM: null, // 不允许插入子节点（原子节点）
      };
    };
  },
  addCommands() {
    return {
      inertTriangle:
        () =>
        ({ commands }) => {
          commands.insertContent({ type: this.name });
          // 获取当前文档和光标位置
          const { state, view } = this.editor;
          const { from, to } = state.selection;

          // 计算新内容的结束位置
          const newPos = to + 1; // 根据需要调整

          // 设置新的光标位置
          view.dispatch(
            view.state.tr.setSelection(TextSelection.create(state.doc, newPos))
          );
        },
    };
  },
});
