import { Node } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const CustomNode = Node.create({
  name: "custom-node-mycode",
  group: "inline",
  content: "text*",
  inline: true,
  code: false,
  parseHTML() { 
    return [{ tag: "mycode" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["mycode", HTMLAttributes, 0];
  }
});

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, CustomNode],
    content: `<mycode>
      const json = {
        name: '张三',
        age: 20
      }
    </mycode>`,
  });

  return <>
  <EditorContent editor={editor} />
  </>;
};