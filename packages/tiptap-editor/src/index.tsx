import './style.scss';
import cs from 'classnames';
import MenuBar from './menu-bar';
import { v4 as uuidv4 } from 'uuid';
import { handleOldData } from './utils';
import Table from '@tiptap/extension-table';
import StarterKit from '@tiptap/starter-kit';
import TableRow from '@tiptap/extension-table-row';
import Underline from '@tiptap/extension-underline';
import TableCell from '@tiptap/extension-table-cell';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import TableHeader from '@tiptap/extension-table-header';
import { Dot, Horizontal, Question, Formula, Img, Span } from './extensions';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';


interface CustomEditorProps {
  content?: string;
  onSave?: (content: string) => void;
  onClickEditor?: (result: boolean) => void;
  placeholder?: string;
  [str: string]: any;
}

const CustomEditor = (props, ref) => {
  // 更新 `editableRef` 的值，以确保它总是保存最新的 `props.editable`
  const editableRef = useRef(Boolean(props.editable));
  useEffect(() => {
    editableRef.current = Boolean(props.editable);
  }, [props.editable]);

  const editor: any = useEditor({
    extensions: [
      StarterKit,
      Underline,
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
      Placeholder.configure({
        placeholder: props.placeholder || '请输入 …',
      }),
    ],
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
  delete arrt.onClickEditor;
  delete arrt.uploadFileConfig;

  useEffect(() => {
    editor.setEditable(Boolean(props.editable));
    if (props.editable) {
      // 聚焦到最后一位字符
      editor.commands.focus(); // 先聚焦编辑器
      const docSize = editor.state.doc.content.size;
      editor.commands.setTextSelection(docSize); // 将光标移到文档的最后
    }
    // // 获取所有 <math-field> 元素，设置为只读
    // const mathFields = document.querySelectorAll('math-field');
    // mathFields.forEach((field: any) => {
    //   field.readonly = true;
    // });

    // if(Boolean(props.editable)){
    //   const mathFields = document.querySelectorAll('math-field');
    //   // mathFields.forEach((field: any) => {
    //   //   field.readonly = true;
    //   //   // field.setAttribute('caneditable', true);
    //   // });
    //   mathFields.forEach((field: any) => {
    //     field.addEventListener('click', (e) => {
    //       e.stopPropagation();
    //       const latex = handleOldData(e.target.innerHTML)
    //       console.log(latex);
          
    //     });
    //   });
    // }
    
  }, [props.editable]);

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

  const [uniqueId, setUniqueId] = useState('tiptap_' + uuidv4().replace(/-/g, ''));
  const onClickBodyListener = () => {
    window.addEventListener('click', function (event) {
      const target = event.target as HTMLElement;
      // 判断点击的元素是否在编辑器内
      if (target.closest('#' + uniqueId)) {
        // console.log('点击发生在编辑器内');
        props.onClickEditor && props.onClickEditor(true, editableRef.current, event);
      } else {
        // console.log('点击发生在编辑器外');
        props.onClickEditor && props.onClickEditor(false, editableRef.current, event);
      }
    });
  };

  useEffect(() => {
    onClickBodyListener();
  }, []);

  return (
    <div className={cs(['tiptap-editor', { editable: props.editable }])} id={uniqueId}>
      {props.editable && <MenuBar editor={editor} handlers={handlers} uploadFileConfig={props.uploadFileConfig}/>}
      <EditorContent editor={editor} className="editorContent" {...arrt} />
    </div>
  );
};

export default forwardRef<HTMLDivElement, CustomEditorProps>(CustomEditor);
