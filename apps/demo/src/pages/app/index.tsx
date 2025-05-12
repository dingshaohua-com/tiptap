import './style.scss';
import { Divider } from 'antd';
import TiptapEditor from '@repo/tiptap-editor';
import { useEffect, useRef, useState } from 'react';

const initContent = `
<p>Hell<span style="color:red">o</span>  <math-field>\\frac{x}{y}</math-field> World <span data-tiptype="question-blank_filling"></span>!</p> 
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
      </tbody>
    </table>
`;
const App = () => {
  const editorRef = useRef(null);

  // 手动获取结果
  const onSave = (result) => {
    console.log(result);
  };

  // 监听编辑变化
  useEffect(() => {
    if (editorRef) {
      const editor = editorRef.current.editor;
      // editor.commands.setContent(initContent);
      // editor.on('update', ({ editor, transaction }) => {
      //   const html = editor.getHTML();
      //   const json = editor.getJSON();
      //   console.log(html);
      //   console.log(json);
      // });
    }
  }, [editorRef]);

  const onChange = (content: string) => {
    console.log(content);
  };
  const [editable, setEditable] = useState(false);
  return (
    <div className="app">
      <div className="my-edit">
        <div className="title">下方是一个实例编辑器，现在 {editable ? <span onClick={() => setEditable(false)}>退出编辑</span> : <span onClick={() => setEditable(true)}>开始编辑</span>}</div>
        <Divider />
        <TiptapEditor ref={editorRef} onSave={onSave} onChange={onChange} editable={editable} content={initContent} />
      </div>
    </div>
  );
};

export default App;
