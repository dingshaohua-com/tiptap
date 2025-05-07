import './style.scss';
import Heading from './cmp/heading';
import FontStyle from './cmp/font-style';
import AlignStyle from './cmp/align-style';
import Shape from './cmp/shape';
import Formula from './cmp/formula';
import Divider from '@mui/material/Divider';
import ImgUpload from './cmp/img-upload';
import InsertSome from './cmp/insert-some';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <Heading editor={editor} />
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className="menuBarDivider"
      />
      <FontStyle editor={editor} />
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className="menuBarDivider"
      />
      <InsertSome editor={editor} />
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className="menuBarDivider"
      />
      <AlignStyle editor={editor} />

      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        className="menuBarDivider"
      />
      <Shape editor={editor} />
      <Formula editor={editor} />
      <ImgUpload editor={editor} />
      
    </div>
  );
};

export default MenuBar;
