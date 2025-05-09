import './style.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import MenuBar from './menu-bar';
import { Dot, Horizontal, Question, Formula } from './extensions';
import TextAlign from '@tiptap/extension-text-align';
import { forwardRef, useImperativeHandle } from 'react';

const CustomEditor = (props, ref) => {
  const editor: any = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
      Formula,
      Dot,
      Horizontal,
      Question,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
    ],
    content: '',
    onCreate({ editor }) {
      Question.descendants(editor);
    },
  });

  useImperativeHandle(ref, () => {
    return {
      editor,
    };
  });

  return (
    <div className="myEdit" >
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="editorContent" {...props}/>
    </div>
  );
};

export default forwardRef(CustomEditor);
