import './style.scss';
import Heading from './cmp/heading';
import FontStyle from './cmp/font-style';
import AlignStyle from './cmp/align-style';
import Shape from './cmp/shape';
import Formula from './cmp/formula';
import ImgUpload from './cmp/img-upload';
import InsertSome from './cmp/insert-some';
import InsertQs from './cmp/insert-qs';
import { Divider, Button } from "antd";
import Action from './cmp/action';

const MenuBar = ({ editor, handlers }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <Heading editor={editor} />
      <Divider
        type="vertical"
        className="menuBarDivider"
      />
      <FontStyle editor={editor} />
      <Divider
        type="vertical"
        className="menuBarDivider"
      />
      <InsertSome editor={editor} />
      <Divider
        type="vertical"
        className="menuBarDivider"
      />
      <AlignStyle editor={editor} />

      <Divider
        type="vertical"
        className="menuBarDivider"
      />
      <Shape editor={editor} />
      <Formula editor={editor} />
      <ImgUpload editor={editor} />
      <InsertQs editor={editor} />    
      <Divider
        type="vertical"
        className="menuBarDivider"
      />
      <Action editor={editor} handlers={handlers}/>
    </div>
  );
};

export default MenuBar;
