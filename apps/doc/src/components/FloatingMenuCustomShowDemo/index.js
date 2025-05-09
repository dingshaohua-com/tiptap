import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
export default () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
    <p>
    输入新行（换行），将显示一些按钮。
    </p>
    <p></p>
  `,
  });

  const shouldShow = ({ editor, view, state, oldState, from, to }) => {
    // 任何段落均会展示浮动菜单
    return editor.isActive("paragraph");
  };

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} shouldShow={shouldShow}>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            标题1
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};
