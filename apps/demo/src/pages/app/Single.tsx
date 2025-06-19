import './style.scss';
import axios from 'axios';
import { Divider } from 'antd';
import { useEffect, useRef, useState } from 'react';
import TiptapEditor, { Feature } from '@repo/tiptap-editor';
import katex from 'katex';

const initContent = `<p>方程组\\( \\begin{cases} x-y=3 \\\\ 2x-3y=1 \\end{cases} \\)的解的集合是( ) 6.(12分)设\n\\[\n\\begin{cases}\nx = (1+t)^{2+t}, & t > -1 \\\\\nye^t + \\arctan t = 1\n\\end{cases}\n\\]\n求 \\( \\left. \\frac{dy}{dx} \\right|_{x=1} \\) 以及 \\( \\left. \\frac{d^2y}{dx^2} \\right|_{x=1} \\) </p>`;
// const initContent = `<p>相同条件下，\\rm{NH_4Cl}  比\\rm{NH_4I} 的大 \\(\\frac{d^2y}{dx^2}\\Big|_{x=1}\\)</p>`;


const Single = () => {
  const [content, setContent] = useState(initContent);

  const [editable, setEditable] = useState(true);

  const onBlur = () => {
    console.log(8989);

    setEditable(false);
  };

  const onFocus = () => {
    setEditable(true);
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const onChange = (content: string) => {
    console.log('content', content);
    // setContent(content);
  };

  const onSave = (arg) => {
    console.log('onSave', arg);
  };

  return (
    <div className="app">
      <div className="my-edit">
        <div className="title">
          下方是一个实例编辑器，现在
          <span className="editable-btn" onClick={toggleEditable}>
            {editable ? '退出' : '开始'}编辑
          </span>
          (or 双击编辑器也能快速进入编辑状态)
        </div>

        <Divider />
        {/* <textarea > */}
        <form
          onBlur={() => {
            console.log('外层表单失焦了');
          }}
        >
          {/* includeFeatures={[Feature.heading, Feature.bold]}  */}
          <TiptapEditor editable={editable} content={content} onChange={onChange} onSave={onSave} stripOuterNode={false} />
        </form>
      </div>
    </div>
  );
};

export default Single;
