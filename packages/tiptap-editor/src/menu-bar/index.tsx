import { Divider } from 'antd';
import Table from './cmp/table';
import Color from './cmp/color';
// import Shape from './cmp/shape';
import Action from './cmp/action';
import Heading from './cmp/heading';
import Formula from './cmp/formula';
import InsertQs from './cmp/insert-qs';
import ImgUpload from './cmp/img-upload';
import FontStyle from './cmp/font-style';
import InsertSome from './cmp/insert-some';
import AlignStyle from './cmp/align-style';
import { useEditorConfig } from '../config-ctx';
import { useState, useEffect, useRef } from 'react';

const MenuBar = () => {
  const config = useEditorConfig();
  const toolbarRef = useRef<HTMLDivElement>(null);

  const [toolbarHeight, setToolbarHeight] = useState(0);

  useEffect(() => {
    if (toolbarRef.current) {
      setToolbarHeight(toolbarRef.current.offsetHeight);
    }
  }, []);

  if (!config.editor) return null;

  return (
    <div className="menuBar" ref={toolbarRef} style={{ top: `-${toolbarHeight}px` }}>
      <Heading />
      <Divider type="vertical" />
      <FontStyle />
      <Divider type="vertical" />
      <InsertSome />
      <Divider type="vertical" />
      <Color />
      <Divider type="vertical" />
      <AlignStyle />
      <Divider type="vertical" />
      {/* <Shape/> */}
      <Table />
      <Formula />
      <ImgUpload />
      <InsertQs />
      <Divider type="vertical" />
      <Action />
    </div>
  );
};

export default MenuBar;