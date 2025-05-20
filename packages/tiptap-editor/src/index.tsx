import './style.scss';
import cs from 'classnames';
import MenuBar from './menu-bar';
import { v4 as uuidv4 } from 'uuid';
import { handleOldData } from './utils';
import Color from '@tiptap/extension-color';
import Table from '@tiptap/extension-table';
import StarterKit from '@tiptap/starter-kit';
import TableRow from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import TableCell from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import TableHeader from '@tiptap/extension-table-header';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
// import { uploadQuestionAttachHelper } from '@/services/api/question';
import { Dot, Formula, Horizontal, Img, Question, Span, ResizableImg } from './extensions';

const uploadQuestionAttachHelper = (file: File) => {
  console.log('uploadQuestionAttachHelper', file);
};

interface CustomEditorProps {
  content?: string;
  onSave?: (content: string) => void;
  placeholder?: string;
  [str: string]: any;
}

const CustomEditor = (props, ref) => {
  const [uniqueId] = useState('tiptap_' + uuidv4().replace(/-/g, ''));
  const lastHTMLRef = useRef<string>('');
  const editor: any = useEditor({
    extensions: [
      StarterKit,
      Underline,
      ResizableImg.configure({
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
      Color,
      TextStyle,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Span,
      Placeholder.configure({
        placeholder: props.placeholder || '请输入 …',
      }),
    ],
    editorProps: {
      attributes: { 'data-id': uniqueId },
      handleDOMEvents: {
        // 点击工具栏的时候阻止失焦
        blur: (view, event) => {
          const editorId = view.dom.getAttribute('data-id');
          const relatedTarget = (event as FocusEvent).relatedTarget as HTMLElement;
          if (relatedTarget?.closest('#' + editorId)) return true;
          return false;
        },
      },
    },
    content: handleOldData(props.content) || '',
    onCreate({ editor }) {
      Question.descendants(editor);
    },
    onUpdate({ editor }) {
      let html = editor.getHTML();
      const json = editor.getJSON();
      // 清除空段落
      if (json.content.length === 1) {
        const firstNode = json.content[0];
        if (firstNode.type === 'paragraph' && !firstNode.content) {
          delete json.content;
          html = '';
        }
      }

      //onUpdate 在 Tiptap 中的触发机制：哪怕你只是点击编辑器、没有改变内容，但如果 Tiptap 在内部调整了文档结构（比如补全空段落、自动清理节点等），也会触发
      const newHTML = editor.getHTML();
      if (newHTML !== lastHTMLRef.current) {
        lastHTMLRef.current = newHTML;
        props?.onUpdate && props.onUpdate({ html, json });
        props?.onChange && props.onChange(html);
      }
    },
    onBlur(arg) {
      // arg.editor.setEditable(false);
      // props.onBlur && props.onBlur(arg);
    },
    editable: Boolean(props.editable),
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  useImperativeHandle(ref, () => {
    return {
      editor,
    };
  });

  const handlers = {
    onSave: props.onSave,
    onInsertQs: props.onInsertQs,
  };

  // 透传过来的有些方法， tiptap 不需要
  const arrt = {
    ...props,
  };
  delete arrt.onSave;
  delete arrt.onUpdate;
  delete arrt.onChange;
  delete arrt.editable;
  delete arrt.uploadFileConfig;
  delete arrt.isTextarea;
  delete arrt.onInsertQs;
  delete arrt.onBlur;

  useEffect(() => {
    // 如果不一样，再覆盖，否则插入的横线有问题，未知原因
    if (props.content !== editor.getHTML()) {
      editor.commands.setContent(handleOldData(props.content));
    }
    const mathFields = document.querySelectorAll('math-field');
    mathFields.forEach((field: any) => {
      field.readonly = true;
    });
  }, [props.content]);

  // 给一个默认的uploadFileConfig的handler
  let uploadFileConfig = props.uploadFileConfig;
  if (!uploadFileConfig) {
    uploadFileConfig = {
      transformBase64: true,
      handler: uploadQuestionAttachHelper,
    };
  } else if (!uploadFileConfig.handler) {
    uploadFileConfig.handler = uploadQuestionAttachHelper;
  }

  const onClick = () => {
    if (!editor.isEditable) {
      editor.setEditable(true);
      editor.commands.focus(); // 先聚焦编辑器
      const docSize = editor.state.doc.content.size;
      editor.commands.setTextSelection(docSize); // 将光标移到文档的最后
    }
  };

  // onPointerDownCapture 是因为 math-field 的点击事件会冒泡到父级，导致无法执行
  return (
    <div className={cs(['tiptap-editor', { editable: true, 'is-input': !props.isTextarea && !editor.isEditable, 'is-textarea': props.isTextarea && !editor.isEditable }])} id={uniqueId} onPointerDownCapture={onClick}>
      {editor.isEditable && <MenuBar editor={editor} handlers={handlers} uploadFileConfig={uploadFileConfig} />}
      <EditorContent editor={editor} className="editorContent" {...arrt} />
    </div>
  );
};

export default forwardRef<HTMLDivElement, CustomEditorProps>(CustomEditor);
