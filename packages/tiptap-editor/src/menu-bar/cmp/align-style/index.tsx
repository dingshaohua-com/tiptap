import { Button, Tooltip } from 'antd';
import { useEditorConfig } from '../../../config-ctx';
import { RiMenu2Fill, RiMenu5Line, RiMenu3Line } from '@remixicon/react';

const buttonGroupTemp: Array<any> = [
  {
    id: 'alignLeft',
    icon: RiMenu2Fill,
    action: (editor) => editor.chain().focus().toggleTextAlign('left').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'left' }),
    canExecute: (editor) => editor.can().chain().focus().toggleTextAlign('left').run() && !editor.isActive('codeBlock'),
    tooltip: '居左',
  },

  {
    id: 'alignCenter',
    icon: RiMenu3Line,
    action: (editor) => editor.chain().focus().toggleTextAlign('center').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'center' }),
    canExecute: (editor) => editor.can().chain().focus().toggleTextAlign('center').run() && !editor.isActive('codeBlock'),
    tooltip: '居中',
  },
  {
    id: 'alignRight',
    icon: RiMenu5Line,
    action: (editor) => editor.chain().focus().toggleTextAlign('right').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'right' }),
    canExecute: (editor) => editor.can().chain().focus().toggleTextAlign('right').run() && !editor.isActive('codeBlock'),
    tooltip: '居右',
  },
];

const AlignStyle = () => {
  const config = useEditorConfig();
  const editor = config.editor!;
  const buttonGroup = buttonGroupTemp.filter((item) => config.features.includes(item.id));
  if (!buttonGroup.length) return null;
  return (
    <div className="group">
      {buttonGroup.map(({ icon: Icon, tooltip, isActive, action, id }) => (
        <Tooltip title={tooltip} key={id}>
          <Button onClick={() => action(editor)} color="default" variant={isActive(editor) ? 'solid' : 'filled'} autoInsertSpace>
            <Icon />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default AlignStyle;
