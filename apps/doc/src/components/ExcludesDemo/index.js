import { Mark } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const CustomMark = Mark.create({
  name: "dot",
  // 不能和粗体标记同时使用
  excludes: "bold",
  parseHTML() {
    return [
      {
        tag: "text-dot",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["text-dot", HTMLAttributes, 0];
  },
  addCommands() {
    return {
      toggleDot:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, CustomMark],
    content: "我是<text-dot>最棒</text-dot>的",
  });

  if (!editor) {
    return null;
  }
  return (
    <>
      <button
        className={editor.isActive("bold") ? "is-active" : ""}
        onClick={() => editor.commands.toggleBold()}
      >
        粗体
      </button>
      <button
        className={editor.isActive("dot") ? "is-active" : ""}
        onClick={() => editor.commands.toggleDot()}
      >
        重点
      </button>
      <EditorContent editor={editor} />
    </>
  );
};
