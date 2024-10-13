import { Node } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const CustomNode = Node.create({
  name: "custom-node-draggable",
  group: "inline",
  content: "text*",
  inline: true,
  draggable: true,
  parseHTML() { 
    return [{ tag: "draggable" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["draggable", HTMLAttributes, 0];
  },
});

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, CustomNode],
    content: '拖拽右边的小方块-><draggable/>',
  });
  return <EditorContent editor={editor} />;
};