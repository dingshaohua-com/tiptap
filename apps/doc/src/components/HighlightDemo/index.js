import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'

export default () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Highlight.configure({ multicolor: true })],
    content: `
        <p>这个没有高亮。</s></p>
        <p><mark>这是一个高亮。</mark></p>
        <p><mark style="background-color: red;">这也是一个高亮，但颜色不同。</mark></p>
        <p><mark data-color="#ffa8a8">这是通过属性来控制颜色的高亮。</mark></p>
      `,
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive('highlight') ? 'is-active' : ''}
      >
        高亮切换
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()}
        className={editor.isActive('highlight', { color: '#ffc078' }) ? 'is-active' : ''}
      >
        橘黄
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#8ce99a' }).run()}
        className={editor.isActive('highlight', { color: '#8ce99a' }) ? 'is-active' : ''}
      >
        绿色
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#74c0fc' }).run()}
        className={editor.isActive('highlight', { color: '#74c0fc' }) ? 'is-active' : ''}
      >
        蓝色
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#b197fc' }).run()}
        className={editor.isActive('highlight', { color: '#b197fc' }) ? 'is-active' : ''}
      >
        紫色
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: 'red' }).run()}
        className={editor.isActive('highlight', { color: 'red' }) ? 'is-active' : ''}
      >
        红色 ('red')
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run()}
        className={editor.isActive('highlight', { color: '#ffa8a8' }) ? 'is-active' : ''}
      >
        红色 (#ffa8a8)
      </button>
      <button
        onClick={() => editor.chain().focus().unsetHighlight().run()}
        disabled={!editor.isActive('highlight')}
      >
        删除高亮
      </button>

      <EditorContent editor={editor} />
    </>
  )
}