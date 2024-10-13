import { Node } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const CustomNode = Node.create({
  name: "custom-node-mycode",
  group: "inline",
  content: "text*",
  inline: true,
  defining: false,
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
    content: `尝试替换右侧内容：<mycode>
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