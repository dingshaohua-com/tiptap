import { Button, Tooltip, Popover, Input } from 'antd';
import { useState } from 'react';
import ohmImg from '../../../assets/ohm.svg';
import { useEditorConfig } from '../../../config-ctx';


const imgUpload = () => {
  const config = useEditorConfig();
  const editor = config.editor!;
  const [open, setOpen] = useState(false);

  const ok = () => {
    editor.chain().focus().insertQs().run();
    config.onInsertQs && config.onInsertQs();
  };

  return (
    <div className="itemsStyle">
      <Tooltip title="插入填空">
          <Button
            onClick={ok}
            color="default"
            variant="filled"
            autoInsertSpace
          >
            <img src={ohmImg} style={{ width: 18 }}/>
          </Button>
      </Tooltip>
    </div>
  );
};

export default imgUpload;
