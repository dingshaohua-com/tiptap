import './style.scss';
import axios from 'axios';
import { Divider } from 'antd';
import TiptapEditor from '@repo/tiptap-editor';
import { useEffect, useRef, useState } from 'react';

const initContent = `
<p>Hell World ! 把集合用列举法表示，正确的是</p> 
`;
const Single = () => {
  const [content, setContent] = useState(initContent);

  const [editable, setEditable] = useState(false);

  const onBlur = () => {
    setEditable(false);
  };

  const onFocus = () => {
    setEditable(true);
  };

  const toggleEditable = () => {
    setEditable(!editable);
  };

  const onChange = (content: string) => {
    // console.log('content', content);
    // setContent(content);
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
        <TiptapEditor editable={editable} content={content} onBlur={onBlur} onFocus={onFocus} onChange={onChange} />
      </div>
    </div>
  );
};

export default Single;
