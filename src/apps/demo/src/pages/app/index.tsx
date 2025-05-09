import './style.scss';
import { Button } from 'antd';
import CustomEditor from '@/components/custom-editor';
import { useEffect, useRef } from 'react';

const App = () => {
  const editorRef = useRef(null);

  // 手动获取结果
  const onSave = () => {
    const editor = editorRef.current.editor;
    const html = editor.getHTML();
    const json = editor.getJSON();
    console.log(html);
    console.log(json);
  };
  

  // 监听编辑变化
  useEffect(() => {
    if (editorRef) {
      const editor = editorRef.current.editor;
      editor.commands.setContent('<p>Hello  <math-field>\\frac{x}{y}</math-field> World <span data-tiptype="question-blank_filling"></span>!</p> ')
      editor.on('update', ({ editor, transaction }) => {
        const html = editor.getHTML();
        const json = editor.getJSON();
        console.log(html);
        console.log(json);
      });
    }
  }, [editorRef]);

  return (
    <div className="app">
      <div className="my-edit">
        <CustomEditor ref={editorRef} style={{height: '200px'}}/>
      </div>
      <div className="actionBtn">
        <Button type="primary" onClick={onSave}>
          保存
        </Button>
      </div>
    </div>
  );
};

export default App;
