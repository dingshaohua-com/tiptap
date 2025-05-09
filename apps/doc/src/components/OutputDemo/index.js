import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

export default () => {
  const editor = useEditor({
    editable: false,
    content: `
        <p>
          这段文本是 <strong>只读的</strong>。 一点都看不出来我的真身是个编辑器吧！
        </p>
      `,
    extensions: [StarterKit],
  });

  return <EditorContent editor={editor} />;
};
