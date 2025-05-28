import './style.scss';
import axios from 'axios';
import { Divider } from 'antd';
import { useEffect, useRef, useState } from 'react';
import TiptapEditor, { Feature } from '@repo/tiptap-editor';
import katex from 'katex';

// const initContent = `
// <p>这是一个公式 \\(\\frac{d^2y}{dx^2}\\Big|_{x=1}\\)</p>
// `;

const initContent = `你的内容，包含 \\(\\frac{d^2y}{dx^2}\\Big|_{x=1}\\)这样的公式`;
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
      <p>
        这是一个公式{' '}
        <span
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(`\\(\\frac{d^2y}{dx^2}\\Big|_{x=1}\\)`, {
              throwOnError: false,
            }),
          }}
        ></span>
      </p>
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

        {/* </textarea> */}
      </div>
    </div>
  );
};

export default Single;
