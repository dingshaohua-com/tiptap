import './style.scss';
import MenuBar from './menu-bar';
import { handleOldData } from './utils';
import Table from '@tiptap/extension-table';
import StarterKit from '@tiptap/starter-kit';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TableCell from '@tiptap/extension-table-cell';
import { useEditor, EditorContent } from '@tiptap/react';
import TableHeader from '@tiptap/extension-table-header';
import { Dot, Horizontal, Question, Formula, Img } from './extensions';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface CustomEditorProps {
  content?: string;
  onSave?: (content: string) => void;
  [str: string]: any;
}

const CustomEditor = (props, ref) => {
  const [isFocus, setIsFocus] = useState(false);
  const onBlurOrFocus = () => {
    editor.on('transaction', ({ transaction }) => {
      if (transaction.getMeta('focus')) {
        console.log('编辑器获得焦点');
        setIsFocus(true);
      }
      if (transaction.getMeta('blur')) {
        console.log('编辑器失去焦点');
        setIsFocus(false);
      }
    });
  };

    // 监听鼠标点击，判断是否点击了工具栏
    const handleMouseDown = (e: React.MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('.toolbar')) {
        // 如果点击了工具栏，阻止失去焦点
        e.preventDefault()
      }
    }

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
    content: handleOldData(props.content) || '',
    onCreate({ editor }) {
      Question.descendants(editor);
      onBlurOrFocus();
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      const json = editor.getJSON();
      props?.onUpdate && props.onUpdate({ html, json });
      props?.onChange && props.onChange(html);
    },
  });

  useImperativeHandle(ref, () => {
    return {
      editor,
    };
  });

  const handlers = {
    onSave: props.onSave,
  };

  // 透传过来的有些方法， tiptap 不需要
  const arrt = {
    ...props,
  };
  delete arrt.onSave;
  delete arrt.onUpdate;
  delete arrt.onChange;

  return (
    <div className="myEdit">
      {isFocus && (
        <div onMouseDown={handleMouseDown}>
          {' '}
          <MenuBar editor={editor} handlers={handlers} />
        </div>
      )}
      {/* <MenuBar editor={editor} handlers={handlers} /> */}

      <EditorContent editor={editor} className="editorContent" {...arrt} />
    </div>
  );
};

export default forwardRef<HTMLDivElement, CustomEditorProps>(CustomEditor);
