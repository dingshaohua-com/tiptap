import './style.scss';
import Heading from './cmp/heading'
import FontStyle from './cmp/font-style'
import Shape from './cmp/shape';
import Formula from './cmp/formula';
import Divider from '@mui/material/Divider';
import { Button } from "antd";


const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <Heading editor={editor}/>
      <Divider orientation="vertical" variant="middle" flexItem className='menuBarDivider' />
      <FontStyle editor={editor}/>
      <Divider orientation="vertical" variant="middle" flexItem className='menuBarDivider' />
      <Shape editor={editor}/>
      <Formula editor={editor}/>
    </div>
  );
};

export default MenuBar;
