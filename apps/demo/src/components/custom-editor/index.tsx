import './style.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import MenuBar from './menu-bar';
import { Dot, Horizontal, Question, Formula,Img } from './extensions';
import TextAlign from '@tiptap/extension-text-align';
import { forwardRef, useImperativeHandle } from 'react';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

const CustomEditor = (props, ref) => {
  const editor: any = useEditor({
    extensions: [
      StarterKit,
      Img.configure({
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
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: props.content || '',
    onCreate({ editor }) {
      Question.descendants(editor);
    },
  });

  useImperativeHandle(ref, () => {
    return {
      editor,
    };
  });

  const handlers = {
    onSave: props.onSave,
  }

  return (
    <div className="myEdit" >
      <div className="saveBtn">
       
      </div>
      <MenuBar editor={editor} handlers={handlers}/>
      <EditorContent editor={editor} className="editorContent" {...props}/>
    </div>
  );
};

export default forwardRef(CustomEditor);
