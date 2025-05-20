import { useEffect, useState } from 'react';
import { RiTableLine } from '@remixicon/react';
import { Button, Tooltip, Popover, Input } from 'antd';

const imgUpload = ({ editor, handlers }) => {
  const [open, setOpen] = useState(false);

  const ok = () => {
    // editor.chain().focus().insertQs().run();
    // handlers.onInsertQs && handlers.onInsertQs();
    // editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    editor.commands.setColor('#ff0000');  // 设置为红色
  };


  // useEffect(() => {
  //   editor.view.dom.addEventListener('contextmenu', (event) => {
  //     const target = event.target;

  
  //   });
  // }, []);

  return (
    <div className="fontStyle">
      <Tooltip title="插入表格">
        <Button onClick={ok} color="default" variant="filled" autoInsertSpace>
          <RiTableLine style={{ width: 18 }} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default imgUpload;
