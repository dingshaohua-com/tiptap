import './style.scss';
import axios from 'axios';
import { Divider } from 'antd';
import TiptapEditor from '@repo/tiptap-editor';
import { useEffect, useRef, useState } from 'react';

const initContent = `
<p>Hell<span style="color:red">o</span>  把集合 $\{x | x^2 - 4x + 3 = 0\}$ 用列举法表示，正确的是（ ）．</p> 
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
    content: initContent,
  },
  {
    editable: false,
    content: '相同条件下 大, <br> 我是新的段落',
  },
];
const Multiple = () => {
  const [questions, setQuestions] = useState(questionsInit);
  // 手动获取结果
  const onSave = (result) => {
    console.log(result);
  };

  const onChange = (content: string) => {
    // console.log(content);
  };

  return (
    <div className="app">
      {questions.map((item, index) => (
        <div key={index}>
          <Divider />
            <TiptapEditor onSave={onSave} content={item.content} onChange={onChange} />
        </div>
      ))}
    </div>
  );
};

export default Multiple;
