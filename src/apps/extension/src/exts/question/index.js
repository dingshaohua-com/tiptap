import { Node, mergeAttributes } from "@tiptap/core";
import styleInject from "../../utils/style-inject";
import { ReactNodeViewRenderer } from '@tiptap/react';
import NodeView from "./node-view";

const css = `.solid {
    border-top: 1px solid black!important;
}
.dashed{
    border-top: 1px dashed black!important;
}`;
styleInject(css);

const styleString = 'display:inline-block;width:20px;height:10px;margin:0 4px;border-bottom:1px solid black;';

export const Question = Node.create({
  name: "question",
  group: "inline",
  inline: true,
  content: 'text*',

  // 关键设置：标记为 void 节点
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      'data-type': {
        default: "question",
        
      },
      style:{
        default: styleString
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-type="question"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),0];
  },

  // 使用ReactNodeViewRenderer包装你的组件
  addNodeView() {
    return ReactNodeViewRenderer(NodeView);
  },

  addCommands() {
    return {
      insertQs:
        (arg = "solid") =>
        (editor) => {
          const myNode = {
            type: 'question', // 这个名称最好和节点的 name 保持一致，否则如果自定义nodeview 可能会导致无法解析
            // attrs: {
            //   class: arg,
            // },
          };

          const { from, to } = editor.state.selection;
          console.log(111, myNode);
          // return editor
          //   .chain()
          //   .insertContentAt(to + 1, myNode)
          //   // .setTextSelection(to + 1)
          //   // .insertContentAt(to + 2, {
          //   //   type: "paragraph",
          //   // })
          //   .run();

          return editor.chain().insertContent(myNode).run();
        },
    };
  },

  // 确保被视为 void 节点
  atom: true,
  selectable: false,
  draggable: false,
});
