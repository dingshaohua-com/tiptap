import './style.scss';
import axios from 'axios';
import { Divider } from 'antd';
import TiptapEditor, {Feature} from '@repo/tiptap-editor';
import { useEffect, useRef, useState } from 'react';

const initContent = `
<p>Hell World ! 把集合用列举法表示，正确的是</p> 
`;
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

        {/* </textarea> */}
      </div>
    </div>
  );
};

export default Single;
