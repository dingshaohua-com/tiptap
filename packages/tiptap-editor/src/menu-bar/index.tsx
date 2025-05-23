import { Divider } from 'antd';
import Color from './cmp/color';
import Table from './cmp/table';
// import Shape from './cmp/shape';
import Action from './cmp/action';
import GroupCmp from './group-cmp';
import Formula from './cmp/formula';
import Heading from './cmp/heading';
import InsertQs from './cmp/insert-qs';
import { Feature } from '../utils/enum';
import FontStyle from './cmp/font-style';
import ImgUpload from './cmp/img-upload';
import AlignStyle from './cmp/align-style';
import InsertLine from './cmp/insert-line';
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
  {
    /* <Divider type="vertical" /> */
  }
  return (
    <div className="menuBar" ref={toolbarRef} style={{ top: `-${toolbarHeight}px` }}>
      <Heading />
      <FontStyle />
      <InsertLine />
      <Color />
      <AlignStyle />
      {/* <Shape/> */}
      <GroupCmp>
        <Table />
        <Formula />
        <ImgUpload />
        <InsertQs />
      </GroupCmp>
      <Action />
    </div>
  );
};

export default MenuBar;
