import React from "react";
import DemoNode from './extension';
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, DemoNode],
    content: "下边是个例子：<node-view/>",
  });

  return <EditorContent editor={editor} />;
};
