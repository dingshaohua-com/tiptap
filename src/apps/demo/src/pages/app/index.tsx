import './style.scss';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import MenuBar from '@/components/menu-bar';
import Button from '@mui/material/Button';

const App = () => {
  const editor: any = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
      }),
    ],
    content: '<p>Hello World!</p>',
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
