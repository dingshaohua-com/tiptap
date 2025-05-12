import './style.scss';
import cs from 'classnames';
import MenuBar from './menu-bar';
import { handleOldData } from './utils';
import Table from '@tiptap/extension-table';
import StarterKit from '@tiptap/starter-kit';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import { useEditor, EditorContent } from '@tiptap/react';
import TableHeader from '@tiptap/extension-table-header';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Dot, Horizontal, Question, Formula, Img, Span } from './extensions';

interface CustomEditorProps {
  content?: string;
  onSave?: (content: string) => void;
  [str: string]: any;
}

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
      Span,
    ],
    content: handleOldData(props.content) || '',
    onCreate({ editor }) {
      Question.descendants(editor);
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      const json = editor.getJSON();
      props?.onUpdate && props.onUpdate({ html, json });
      props?.onChange && props.onChange(html);
    },
    editable: Boolean(props.editable),
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
  delete arrt.editable;

  useEffect(() => {
    editor.setEditable(Boolean(props.editable));
    if (props.editable) {
      // 聚焦到最后一位字符
      editor.commands.focus(); // 先聚焦编辑器
      const docSize = editor.state.doc.content.size;
      editor.commands.setTextSelection(docSize); // 将光标移到文档的最后
    }
    // 获取所有 <math-field> 元素，设置为只读
    const mathFields = document.querySelectorAll('math-field');
    mathFields.forEach((field: any) => {
      field.readonly = true;
    });
  }, [props.editable]);

  return (
    <div className={cs(['myEdit', { editable: props.editable }])}>
      {props.editable && <MenuBar editor={editor} handlers={handlers} />}
      <EditorContent editor={editor} className="editorContent" {...arrt} />
    </div>
  );
};

export default forwardRef<HTMLDivElement, CustomEditorProps>(CustomEditor);
