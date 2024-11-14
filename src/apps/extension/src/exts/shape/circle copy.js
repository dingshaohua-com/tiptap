import { Node } from "@tiptap/core";
export default Node.create({
  name: "circle",
  group: "inline",
  inline: true,
  addAttributes() {
    return {
      class: {
        default: "circle",
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["div",HTMLAttributes,  0];
  },
  addCommands() {
    return {
      inertCircle:
        () =>
        ({ commands }) => commands.insertContent({ type: this.name }),
    };
  },
});
