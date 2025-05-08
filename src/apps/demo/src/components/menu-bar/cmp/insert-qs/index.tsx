import { Button, Tooltip, Popover, Input } from 'antd';
import { useState } from 'react';
import ohmImg from '@/assets/ohm.svg';

const DesCmp = ({ editor, setOpen }) => {
 
    

  const [netImg, setNetImg] = useState();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      
    </div>
  );
};

const imgUpload = ({ editor }) => {
  const [open, setOpen] = useState(false);

  const show = () => {
    // setOpen(true);
    editor.chain().focus().insertQs().run();
  };
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="fontStyle">
      <Tooltip title="问题">
        {/* <Popover
          content={<DesCmp editor={editor} setOpen={setOpen}/>}
          title=""
          open={open}
          trigger="click"
          destroyTooltipOnHide={true}
          onOpenChange={handleOpenChange}
        > */}
          <Button
            onClick={show}
            color="default"
            variant="filled"
            autoInsertSpace
          >
            <img src={ohmImg}/>
          </Button>
        {/* </Popover> */}
      </Tooltip>
    </div>
  );
};

export default imgUpload;
