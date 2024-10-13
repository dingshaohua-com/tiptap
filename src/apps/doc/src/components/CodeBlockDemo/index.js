import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'

export default () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, CodeBlock],
    content: `
        <p>
        这个没用的段落后是一个封闭的代码块
        </p>
        <pre>
          <code>
          for (var i=1; i <= 20; i++)
            {
              if (i % 15 == 0)
                console.log("FizzBuzz");
              else if (i % 3 == 0)
                console.log("Fizz");
              else if (i % 5 == 0)
                console.log("Buzz");
              else
                console.log(i);
            }
            </code>
          </pre>
        <p>
        按Command/Ctrl+Enter推出代码块，继续这个没用的段落。
        </p>
      `,
  })

  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        切换
      </button>
      <button
        onClick={() => editor.chain().focus().setCodeBlock().run()}
        disabled={editor.isActive('codeBlock')}
      >
        设置
      </button>

      <EditorContent editor={editor} />
    </>
  )
}