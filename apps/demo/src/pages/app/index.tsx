import './style.scss';
// import CustomEditor from '@/components/custom-editor';
import { useEffect, useRef } from 'react';
import CustomEditor from '@repo/tiptap-editor';

const initContent = `
<p>Hello  <math-field>\\frac{x}{y}</math-field> World <span data-tiptype="question-blank_filling"></span>!</p> 
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

  return (
    <div className="app">
      <div className="my-edit">
        <CustomEditor ref={editorRef} onSave={onSave} onChange={onChange}/>
      </div>
    </div>
  );
};

export default App;
