import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'

// 为Bold节点 添加一些额外默认属性（这里是class）
const MyBold = Bold.configure({
  HTMLAttributes: {
    class: 'my-custom-class'
  }
})

export default () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, MyBold],
    content: `
        <p>这不是粗体。</p>
        <p><strong>这是粗体。</strong></p>
        <p><b>还有这个也是。</b></p>
        <p style="font-weight: bold">这依然是.</p>
        <p style="font-weight: bolder">哦, 还有这行!</p>
        <p style="font-weight: 500">酷, 这难道不是吗!?</p>
        <p style="font-weight: 999">粗到飞起的999!!!</p>
      `,
  })

  if (!editor) {
    return null
  }

  return editor && <EditorContent editor={editor} />
}