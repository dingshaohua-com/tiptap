import { Node, mergeAttributes } from "@tiptap/core";


export default Node.create({
  name: "SquareInput",
  group: "inline",
  inline: true,
  draggable: true,
  atom: true,
  content: "text*", // 允许包含文本内容

  addAttributes() {
    
    return {
      ...this.parent?.(),
      dname: {
        default: "",
      },
      id: {
        default: "",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'abc',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    console.log(node, HTMLAttributes );
    
    return ['abc', { dname: node.attrs.dname, ...HTMLAttributes }, node.textContent]; // 使用 node.textContent 来填充文本内容
  },

  addCommands() {
    return {
      setSquareInput:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { dname: "123", dada:"444" }, // 设置 dname 属性
            content: [{ type: 'text', text: "嘻嘻" }], 
          });
        },
    };
  },
});
