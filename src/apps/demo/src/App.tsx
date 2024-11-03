import "./App.scss";
import MenuBar from "./components/menu-bar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align'
import { Button } from "@/components/ui/button";
import Dot from "@tiptap/extension/dot";
// import Img from "@tiptap/extension/image";

const App = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
      },
    },
    extensions: [StarterKit, Dot, TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),],
    content: `
      嗨,
      <p>
        这是一个<strong>tiptap</strong>的<em>基础</em> 示例。
      </p>
      <h2>你好啊</h2>
    `,
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
        <Button onClick={onSave}>保存</Button>
      </div>
    </div>
  );
};

export default App;
