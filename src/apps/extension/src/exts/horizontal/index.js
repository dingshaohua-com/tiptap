import { Node, mergeAttributes } from "@tiptap/core";
import styleInject from "../../utils/style-inject";

const css = `.solid {
    border-top: 1px solid black!important;
}
.dashed{
    border-top: 1px dashed black!important;
}`;
styleInject(css);

export const Horizontal = Node.create({
  name: "horizontalRule",
  group: "block",

  addAttributes() {
    return {
      class: {
        default: "solid",
      },
    };
  },

  parseHTML() {
    return [{ tag: "hr" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      insertHr:
        (arg = "solid") =>
        (editor) => {
          const myNode = {
            type: this.name,
            attrs: {
              class: arg,
            },
          };

          const { from, to } = editor.state.selection;
          console.log(111, myNode);
          return editor
            .chain()
            .insertContentAt(to + 1, myNode)
            // .setTextSelection(to + 1)
            .insertContentAt(to + 2, {
              type: "paragraph",
            })
            .run();
        },
    };
  },

  // 确保被视为 void 节点
  atom: true,
  selectable: false,
  draggable: false,
});
