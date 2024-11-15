import { Node, mergeAttributes } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

export default Node.create({
  name: "square",
  group: "inline",
  inline: true,
  atom: true,
  selected: true,
  content: "text*", // 允许插入文本

  addAttributes() {
    return {
      class: {
        default: "square",
      },
      style: {
        default: "box-sizing: border-box; padding: 2px; display: inline-block; width: 20px; height: 20px; position: relative; top: 4px; border: 1px solid black; margin: 0 4px;",
      },
    };
  },

  // 定义如何渲染 HTML
  renderHTML({ HTMLAttributes }) {
    console.log(8989);
    
    return ["span", HTMLAttributes, 0];
  },

  // 定义如何解析 HTML
  parseHTML() {
    return [
      {
        tag: "span.square",
      },
    ];
  },

  // 增加自定义命令
  addCommands() {
    return {
      inertSquare:
        () =>
        ({ commands }) => {
          commands.insertContent({ type: this.name });
          commands.insertContent(" ");
          const { state, view } = this.editor;
          const { from, to } = state.selection;

          const newPos = to + 1;
          view.dispatch(
            view.state.tr.setSelection(TextSelection.create(state.doc, newPos))
          );
        },
    };
  },

  // 自定义扩展，确保不会被TextStyle覆盖
  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          square: {
            default: false,
            parseHTML: (element) => {
              const res = element.classList.contains('square')
              console.log(8989, res);
            },
            renderHTML: (attributes) => {
              console.log(6666, attributes);
              if (attributes.square) {
                console.log(7777, res);
                return { class: 'square' };
              }
              return {};
            },
          },
        },
      },
    ];
  },
});
