import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Link from "@tiptap/extension-link";

export default () => {
  const editor = useEditor({
    // 默认编辑器不支持a标签，官方提供了扩展Link支持 这里先不要细究
    extensions: [StarterKit, Link],
    content: '<p> 嘿，我是普通文本,<a href="/">是有链接选中才显示菜单</a> </p>',
  });

  const shouldShow = ({ editor, view, state, oldState, from, to }) => {
    // 仅在链节节点被选中的时候才显示 气泡菜单
    return editor.isActive("link");
  };

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor} shouldShow={shouldShow}>
          <button>移除链接地址?</button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
};