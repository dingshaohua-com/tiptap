import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MarkDot from './mark-dot';


export default () => {
  const editor = useEditor({
    extensions: [StarterKit, MarkDot.extend({
        inclusive: false
    })],
    content: "我是<text-dot>最棒</text-dot>的",
  });
  if (!editor) { return null;}
  return (
    <>
      <button className={editor.isActive("dot") ? "is-active" : ""} onClick={()=>editor.commands.setDot()}>
        划重点
      </button>
      <button onClick={()=>editor.commands.toggleDot()}>
        重点切换
      </button>
      <button disabled={!editor.isActive("dot")} onClick={()=>editor.commands.unsetDot()}>
        移除重点
      </button>
      <EditorContent editor={editor} />
    </>
  );
};
