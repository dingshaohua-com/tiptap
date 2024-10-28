import "./App.scss";
import MenuBar from "./components/menu-bar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Dot from "@tiptap/extension/dot";
import Img from "@tiptap/extension/image";

const App = () => {
  const editor: any = useEditor({
    extensions: [StarterKit, Dot, Img],
    content: `
      <h2>
        嗨,
      </h2>
      <p>
        这是一个<strong>tiptap</strong>的<em>基础</em> 示例。
      </p>
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
        <EditorContent editor={editor} className="editorContent"/>
      </div>
      <div className="actionBtn">
        <button className="save" onClick={onSave}>
          保存
        </button>
      </div>
    </div>
  );
};

export default App;
