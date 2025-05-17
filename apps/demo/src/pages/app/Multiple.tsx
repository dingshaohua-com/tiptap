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

const questionsInit = [
  {
    editable: false,
    content: initContent,
  },
  {
    editable: false,
    content: '哈哈',
  },
];
const Multiple = () => {
  const [questions, setQuestions] = useState(questionsInit);
  // 手动获取结果
  const onSave = (result) => {
    console.log(result);
  };

  const onChange = (content: string) => {
    console.log(content);
  };

  const onDoubleClick = (index) => {
    questions[index].editable = true;
    setQuestions([...questions]);
  };

  const onClickEditor = (index, isClickEditor, isEditable, event) => {
    const isEditableBtn = event?.target?.closest('.editable-btn');
    if (!isClickEditor && isEditable && !isEditableBtn) {
      questions[index].editable = false;
      setQuestions([...questions]);
    }
  };

  return (
    <div className="app">
      <div className="my-edit">
        {questions.map((item, index) => (
          <div key={index}>
            <Divider />
            <div className="editor-container" onDoubleClick={() => onDoubleClick(index)}>
              <TiptapEditor onSave={onSave} editable={item.editable} content={item.content} placeholder="请输入内容" onClickEditor={onClickEditor.bind(null, index)} onChange={onChange}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Multiple;
