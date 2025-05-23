import './style.scss';
import cs from 'classnames';
import MenuBar from './menu-bar';
import { v4 as uuidv4 } from 'uuid';
import { Feature } from './utils/enum';
import { EditorConfig } from '../global';
import Table from '@tiptap/extension-table';
import Color from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import TableRow from '@tiptap/extension-table-row';
import { useEffect, useRef, useState } from 'react';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TableCell from '@tiptap/extension-table-cell';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import TableHeader from '@tiptap/extension-table-header';
import { calculateFeatures, handleOldData, stripOuterNode } from './utils';
import { useEditorDefaultConfig, EditorConfigProvider } from './config-ctx';
import { Dot, Formula, Horizontal, Question, Span, ResizableImg } from './extensions';

const CustomEditor = (props: EditorConfig) => {
  const features: Feature[] = calculateFeatures(props.includeFeatures, props.excludeFeatures);
  const defaultConfig = useEditorDefaultConfig();
  const config = { ...defaultConfig, ...props };

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
      Highlight.configure({
        multicolor: true, // 允许多种颜色
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
    editorProps: {
      attributes: { 'data-id': uniqueId },
      handleDOMEvents: {
        // 点击工具栏的时候阻止失焦
        blur: (view, event) => {
          console.log('哈哈哈', event.relatedTarget);

          const editorId = view.dom.getAttribute('data-id');
          const relatedTarget = (event as FocusEvent).relatedTarget as HTMLElement;
          const noBlur = relatedTarget?.closest('.no-blur');
          const toolBar = relatedTarget?.closest('#' + editorId);
          if (toolBar || noBlur) return true;
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
      if (json?.content?.length === 1) {
        const firstNode = json.content[0];
        if (firstNode.type === 'paragraph' && !firstNode.content) {
          delete json.content;
          html = '';
        }

        if(config.stripOuterNode){
          html = stripOuterNode(html);
        }
      }
      // html = unwrapMathFieldToLatex(html);

      //onUpdate 在 Tiptap 中的触发机制：哪怕你只是点击编辑器、没有改变内容，但如果 Tiptap 在内部调整了文档结构（比如补全空段落、自动清理节点等），也会触发
      const newHTML = editor.getHTML();
      if (newHTML !== lastHTMLRef.current) {
        lastHTMLRef.current = newHTML;
        props?.onUpdate && props.onUpdate({ html, json });
        props?.onChange && props.onChange(html);
      }
    },
    onFocus(arg) {
      if (config.clickToEdit) {
        startEdit();
      }
      config.onFocus && config.onFocus(arg);
    },
    onBlur(arg) {
      console.log('失焦啦');
      editor.setEditable(false);
      config.onBlur && config.onBlur(arg);

      // 为了解决外部onBlur事件，万一重新赋值引发的赋值冲突
      // if (config.clickToEdit) {
      //   setTimeout(() => {
      //     editor.setEditable(false);
      //     config.onBlur && config.onBlur(arg);
      //   }, 130);
      // } else {
      //   editor.setEditable(false);
      //   config.onBlur && config.onBlur(arg);
      // }
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

  const startEdit = () => {
    if (!editor.isEditable) {
      editor.setEditable(true);
      editor.commands.focus(); // 先聚焦编辑器
      const docSize = editor.state.doc.content.size;
      editor.commands.setTextSelection(docSize); // 将光标移到文档的最后
    }
  };

  const stopEdit = () => {
    editor.setEditable(false);
    editor.commands.blur();
  };

  useEffect(() => {
    console.log('接收到的editable', props.editable, editor.isEditable);
    if (props.editable === editor.isEditable) return;
    if (props.editable) {
      startEdit();
    } else {
      stopEdit();
    }
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

  // onPointerDownCapture 是因为 math-field 的点击事件会冒泡到父级，导致无法执行
  return (
    <EditorConfigProvider {...{ ...config, editor, features }}>
      <div className={cs(['tiptap-editor', { editable: editor.isEditable }])} id={uniqueId} onPointerDownCapture={startEdit}>
        {editor.isEditable && <MenuBar />}
        <EditorContent editor={editor} className="editorContent" />
      </div>
    </EditorConfigProvider>
  );
};

export default CustomEditor;
