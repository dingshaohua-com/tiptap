import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import NodeView from "./node-view";
import { Plugin } from "prosemirror-state";

/**
 * 插件：在每次文档变动后，统一更新指定类型节点的 data-index
 */
function IndexUpdatePlugin(nodeTypeName = "question") {
  return new Plugin({
    appendTransaction(transactions, oldState, newState) {
      const docChanged = transactions.some((tr) => tr.docChanged);
      if (!docChanged) return null;

      const tr = newState.tr;
      let index = 1;

      newState.doc.descendants((node, pos) => {
        if (node.type.name === nodeTypeName) {
          const currentIndex = node.attrs["data-index"];
          if (currentIndex !== index) {
            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              "data-index": index,
            });
          }
          index++;
        }
        return true;
      });

      return tr.docChanged ? tr : null;
    },
  });
}

// 初始化的时候调用
export const descendants = (editor) => {
  // 手动派发 transaction，让插件工作一次
  const { state, view } = editor;
  const tr = state.tr;

  let index = 1;
  state.doc.descendants((node, pos) => {
    if (node.type.name === "question") {
      tr.setNodeMarkup(pos, undefined, {
        ...node.attrs,
        "data-index": index,
      });
      index++;
    }
  });

  if (tr.docChanged) {
    view.dispatch(tr);
  }
};

export const Question:any = Node.create({
  name: "question",
  group: "inline",
  inline: true,
  content: "text*", //节点内是否允许有内容

  // 关键设置：标记为 void 节点
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      "data-tiptype": {
        default: "question-blank_filling", // question-cloze_test 完型
      },
      "data-index": {
        default: "",
      },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-tiptype]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
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
            type: "question", // 这个名称最好和节点的 name 保持一致，否则如果自定义nodeview ,会导致无法解析
          };
          return editor.chain().insertContent(myNode).run();
        },
    };
  },

  addProseMirrorPlugins() {
    return [IndexUpdatePlugin("question")];
  },

  // 确保被视为 void 节点
  atom: true,
  selectable: false,
  draggable: false,
});


Question.descendants = descendants;