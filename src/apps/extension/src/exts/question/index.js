import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from '@tiptap/react';
import NodeView from "./node-view";


export const Question = Node.create({
  name: "question",
  group: "inline",
  inline: true,
  content: 'text*', //节点内是否允许有内容

  // 关键设置：标记为 void 节点
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      'data-tiptype': {
        default: "question-blank_filling", // question-cloze_test 完型
      },
      'data-index': {
        default: '',
      },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-tiptype]' }];
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
            type: 'question', // 这个名称最好和节点的 name 保持一致，否则如果自定义nodeview ,会导致无法解析
          };
          return editor.chain().insertContent(myNode).run();
        },
    };
  },

  // 确保被视为 void 节点
  atom: true,
  selectable: false,
  draggable: false,
});
