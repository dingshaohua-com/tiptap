import './style.scss';
import ColorPicker from './color-picker';
import { useEffect, useState } from 'react';
import { RiFontColor, RiPaletteFill } from '@remixicon/react';
import { Button, Tooltip, Popover, Input } from 'antd';

const imgUpload = ({ editor, handlers }) => {
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
    <div className="fontStyle color-picker">
      {buttonGroup.map(({ icon: Icon, tooltip, isActive, action, value, open, setOpen }) => (
        <Tooltip title={tooltip} key={value}>
          <Popover 
            content={<ColorPicker editor={editor} onClose={() => setOpen(false)} type={value} />} 
            title="" 
            open={open} 
            trigger="click" 
            getPopupContainer={(trigger) => trigger.parentNode as HTMLElement} 
            onOpenChange={setOpen}
          >
            <Button onClick={() => action(editor)} color="default" variant={isActive(editor) ? 'solid' : 'filled'} autoInsertSpace>
              <Icon />
            </Button>
          </Popover>
        </Tooltip>
      ))}
    </div>
  );
};

export default imgUpload;
