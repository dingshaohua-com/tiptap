import './style.scss';
import axios from 'axios';
import { Divider } from 'antd';
import TiptapEditor from '@repo/tiptap-editor';
import { useEffect, useRef, useState } from 'react';

const initContent = `
<p>Hell<span style="color:red">o</span>  <math-field>\\frac{x}{y}</math-field> World <span data-tiptype="question-blank_filling"></span>! 把集合 $\{x | x^2 - 4x + 3 = 0\}$ 用列举法表示，正确的是（ ）．</p> 
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
const Single = () => {
  const [content, setContent] = useState(initContent);
  
  // 手动获取结果
  const onSave = (result) => {
    console.log(result);
  };


  const onChange = (content: string) => {
    setContent(content);
    console.log(content);
  };
  const [editable, setEditable] = useState(false);
  const onDoubleClick = (e) => {
    setEditable(true);
  };

  const onClickEditor = (isClickEditor, isEditable, event) => {
    const isEditableBtn = event?.target?.closest('.editable-btn');
    if (!isClickEditor && isEditable && !isEditableBtn) {
      setEditable(false);
    }
  };

  return (
    <div className="app">
      <div className="my-edit">
        <div className="title">
          下方是一个实例编辑器，现在{' '}
          {editable ? (
            <span className="editable-btn" onClick={() => setEditable(false)}>
              退出编辑
            </span>
          ) : (
            <span className="editable-btn" onClick={() => setEditable(true)}>
              开始编辑
            </span>
          )}
        </div>
        <div className="title">(or 双击编辑器也能快速进入编辑状态)</div>

        <Divider />
        <div className="editor-container" onDoubleClick={onDoubleClick}>
          <TiptapEditor onSave={onSave} onChange={onChange} editable={editable} content={content} placeholder="请输入内容" onClickEditor={onClickEditor} />
        </div>
      </div>
    </div>
  );
};

export default Single;
