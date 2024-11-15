import "./App.scss";
import MenuBar from "./components/menu-bar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align'
import { Button } from "@/components/ui/button";
import Dot from "@tiptap/extension/src/exts/dot";
import Circle from "@tiptap/extension/src/exts/shape/circle";
import Triangle from "@tiptap/extension/src/exts/shape/triangle";
import Square from "@tiptap/extension/src/exts/shape/square";
import CustomTextStyle from '@tiptap/extension/src/exts/custom-text-style'



const App = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc",
      },
    },
    extensions: [StarterKit, Dot, TextAlign.configure({
      types: ['heading', 'paragraph'],
    }), 
    Circle, Triangle, 
    CustomTextStyle,
    Square,
    
     ],
    // content: `
    //   嗨,
    //   <p>
    //     这是一个<strong>tiptap</strong>的<em>基础</em> 示例。
    //   </p>
    //   <h2>你好啊</h2>
    // `,

    
    content: `<p><span>This has a &lt;span&gt; tag without a style attribute, so it’s thrown away.</span></p>
        <p><span style="">But this one is wrapped in a &lt;span&gt; tag with an inline style attribute, so it’s kept - even if it’s empty for now.</span></p>
        <p>语文<span class="ignore-text-style square" style="box-sizing:border-box; padding:2px; display: inline-block; width: 20px; height: 20px; position: relative; top: 4px; border: 1px solid black; margin:0 4px;"></span> </p><p></p>`
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
