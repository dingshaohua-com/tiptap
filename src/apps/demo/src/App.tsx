import "./App.scss";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Dot from "@tiptap/extension/dot";
import SquareInput from "@tiptap/extension/square-input";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        加粗
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        斜体
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        删除线
      </button>
      <button
        onClick={() => editor.chain().focus().toggleDot().run()}
        disabled={!editor.can().chain().focus().toggleDot().run()}
        className={editor.isActive("dot") ? "is-active" : ""}
      >
        强调
      </button>

      <button onClick={() => editor.chain().focus().setSquareInput().run()}>
        ⭕️
      </button>
    </>
  );
};

const App = () => {
  const editor: any = useEditor({
    extensions: [StarterKit, Dot, SquareInput],
    content: `
      <h2>
        嗨,
      </h2>
      <p>
        这是一个<strong>tiptap</strong>的<em>基础</em> 示例。 当然 文本编辑器会提供各种文本样式:
      </p>
    `,
  });

  const onSave = () => {
    const json = editor.getJSON(); //获取json格式的内容
    const html = editor.getHTML(); //获取html格式的内容
    console.log(json, html);
    
  };

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <button onClick={onSave}>保存</button>
    </div>
  );
};

export default App;
