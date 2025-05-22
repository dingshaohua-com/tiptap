import './style.scss';
import ColorPicker from './color-picker';
import { useEffect, useState } from 'react';
import { useEditorConfig } from '../../../config-ctx';
import { Button, Tooltip, Popover, Input } from 'antd';
import { RiFontColor, RiPaletteFill } from '@remixicon/react';

const imgUpload = () => {
  const config = useEditorConfig();
  const editor = config.editor!;

  const [textColorOpen, setTextColorOpen] = useState(false);
  const [backgroundColorOpen, setBackgroundColorOpen] = useState(false);

  const buttonGroup: Array<any> = [
    {
      value: 'textColor',
      label: 'TextColor',
      icon: RiFontColor,
      action: (editor) => {
        // editor.chain().focus().toggleBold().run();
        // editor.commands.focus();
      },
      isActive: (editor) => false,
      // canExecute: (editor) => editor.can().chain().focus().toggleBold().run() && !editor.isActive('codeBlock'),
      tooltip: '字体颜色',
      open: textColorOpen,
      setOpen: setTextColorOpen,
    },
    {
      value: 'backgroundColor',
      label: 'BackgroundColor',
      icon: RiPaletteFill,
      action: (editor) => {
        // editor.chain().focus().toggleBold().run();
        // editor.commands.focus();
      },
      isActive: (editor) => false,
      // canExecute: (editor) => editor.can().chain().focus().toggleBold().run() && !editor.isActive('codeBlock'),
      tooltip: '背景色',
      open: backgroundColorOpen,
      setOpen: setBackgroundColorOpen,
    },
  ];

  return (
    <div className="itemsStyle color-picker">
      {buttonGroup.map(({ icon: Icon, tooltip, isActive, action, value, open, setOpen }) => (
        <Tooltip title={tooltip} key={value}>
          <Popover
            //  getPopupContainer={triggerNode => triggerNode.parentNode}
            content={<ColorPicker editor={editor} onClose={() => setOpen(false)} type={value} />}
            title=""
            open={open}
            trigger="click"
            onOpenChange={setOpen}
          >
            <Button
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => action(editor)}
              color="default"
              variant={isActive(editor) ? 'solid' : 'filled'}
              autoInsertSpace
            >
              <Icon />
            </Button>
          </Popover>
        </Tooltip>
      ))}
    </div>
  );
};

export default imgUpload;
