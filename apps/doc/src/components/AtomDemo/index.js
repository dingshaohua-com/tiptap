import { Node } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const CustomNode = Node.create({
  name: "custom-node-refer",
  group: "inline",
  content: "text*",
  inline: true,
  atom: true, // 将此标签内容作为一个整体
  parseHTML() { // 遇到什么标签会自动解析
    return [{ tag: "refer" }];
  },
  renderHTML({ HTMLAttributes }) { // 渲染成什么样子
    return ["refer", HTMLAttributes, 0];
  },
});

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, CustomNode],
    content: '具体参与人员有：<refer>小张</refer><refer>小李</refer>等人员',
  });
  return <EditorContent editor={editor} />;
};