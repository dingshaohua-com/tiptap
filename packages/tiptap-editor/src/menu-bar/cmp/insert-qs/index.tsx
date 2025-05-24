import { useState } from 'react';
import ohmImg from '../../../assets/ohm.svg';
import { Feature } from '../../../utils/enum';
import { useEditorConfig } from '../../../config-ctx';
import { Button, Tooltip, Popover, Input } from 'antd';

const InsertQs = () => {
  const config = useEditorConfig();
  const editor = config.editor!;
  if (!config.features.includes(Feature.insertQs)) return null;
  const [open, setOpen] = useState(false);

  const ok = () => {
    // @ts-ignore
    editor.chain().focus().insertQs().run();
    config.onInsertQs && config.onInsertQs();
  };

  return (
    <Tooltip title="插入填空">
      <Button onMouseDown={(e) => e.preventDefault()} onClick={ok} color="default" variant="filled" autoInsertSpace>
        <img src={ohmImg} style={{ width: 18 }} />
      </Button>
    </Tooltip>
  );
};
InsertQs.id = 'insertQs';
export default InsertQs;
