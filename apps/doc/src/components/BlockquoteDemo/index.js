import Blockquote from '@tiptap/extension-blockquote'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'

export default () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Blockquote,
    ],
    content: `
      <blockquote>
      没有什么是不可能的，这个词本身就说“我是可能的！”
      </blockquote>
      <p>奥黛丽·赫本</p>
    `,
  })

  if (!editor) {
    return null
  }

  return (
    <div>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        切换
      </button>
      <button
        onClick={() => editor.chain().focus().setBlockquote().run()}
        disabled={!editor.can().setBlockquote()}
      >
        设置为引用
      </button>
      <button
        onClick={() => editor.chain().focus().unsetBlockquote().run()}
        disabled={!editor.can().unsetBlockquote()}
      >
        取消引用
      </button>

      <EditorContent editor={editor} />
    </div>
  )
}