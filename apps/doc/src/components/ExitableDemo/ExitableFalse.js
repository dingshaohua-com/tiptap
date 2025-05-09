import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MarkDot from "./mark-dot";

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, MarkDot],
    content: "我是<text-dot>最棒的</text-dot>",
  });
  if (!editor) {
    return null;
  }
  return (
    <>
      <button
        className={editor.isActive("dot") ? "is-active" : ""}
        onClick={() => editor.chain().focus().toggleDot().run()}
      >
        重点
      </button>
      <EditorContent editor={editor} />
    </>
  );
};
