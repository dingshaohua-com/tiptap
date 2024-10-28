import "./style.scss";

const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }
  
    return (
      <div className="menuBar">
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
  
        <button onClick={() => editor.chain().focus().uploadImg().run()}>
          图
        </button>
      </div>
    );
  };

  export default MenuBar;