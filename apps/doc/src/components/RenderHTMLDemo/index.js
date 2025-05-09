import { Mark, mergeAttributes } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const CustomMark = Mark.create({
  name: "test",
  // 通过设置项 配置一些下边用到的 常量
  addOptions() {
    return {
      herf: '/',
      target: 'blank'
    }
  },
  renderHTML({ HTMLAttributes }) {
    // 通过mergeAttributes来合并 回显的内容中接收到的标签带的属性（这个
    // 例子中没有，因为解析HTML需要用到下节的parseHTML）和额外添加的属性
    return ["abc", mergeAttributes(HTMLAttributes, { ...this.options }), 0];
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
    content: "这是一些普通文本，标记完后按下f12审查下我吧",
  });

  if (!editor) {
    return null;
  }
  return (
    <>
      <button
        className={editor.isActive("test") ? "is-active" : ""}
        onClick={() => editor.chain().focus().toggleDot().run()}
      >
        test标记
      </button>
      <EditorContent editor={editor} />
    </>
  );
};
