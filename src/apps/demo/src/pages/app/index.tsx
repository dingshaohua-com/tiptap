import './style.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import MenuBar from '@/components/menu-bar';
import Button from '@mui/material/Button';
import { Formula } from '@/utils/tiptap-ext';
import { Dot, Horizontal } from '@tiptap/extension';
import TextAlign from '@tiptap/extension-text-align';

const App = () => {
  const editor: any = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
      // @ts-ignore
      Formula,
      Dot,
      Horizontal,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
        defaultAlignment: 'left',
      }),
    ],
    content: '<p>Hello World! <math-field>\\frac{x}{y}</math-field></p>',
  });

  const onSave = () => {
    const json = editor.getJSON(); //获取json格式的内容
    const html = editor.getHTML(); //获取html格式的内容
    console.log(json, html);
  };

  return (
    <div className="app">
      <div className="myEdit">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} className="editorContent" />
      </div>
      <div className="actionBtn">
        <Button variant="contained" onClick={onSave}>
          保存
        </Button>
      </div>
    </div>
  );
};

export default App;
