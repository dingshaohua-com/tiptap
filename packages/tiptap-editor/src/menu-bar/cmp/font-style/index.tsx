import { Button, Tooltip } from 'antd';
import { useEditorConfig } from '../../../config-ctx';
import { RiBold, RiItalic, RiUnderline, RiStrikethrough, RiEmphasisCn } from '@remixicon/react';

const buttonGroupTemp: Array<any> = [
  {
    id: 'bold',
    icon: RiBold,
    action: (editor) => {
      editor.chain().focus().toggleBold().run();
      // editor.commands.focus();
    },
    isActive: (editor) => editor.isActive('bold'),
    canExecute: (editor) => editor.can().chain().focus().toggleBold().run() && !editor.isActive('codeBlock'),
    tooltip: '粗体',
  },
  {
    id: 'italic',
    icon: RiItalic,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
    canExecute: (editor) => editor.can().chain().focus().toggleItalic().run() && !editor.isActive('codeBlock'),
    tooltip: '斜体',
  },
  {
    id: 'underline',
    icon: RiUnderline,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive('underline'),
    canExecute: (editor) => editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
    tooltip: '下划线',
  },
  {
    id: 'strike',
    icon: RiStrikethrough,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
    canExecute: (editor) => editor.can().chain().focus().toggleStrike().run() && !editor.isActive('codeBlock'),
    tooltip: '删除线',
  },
  {
    id: 'dot',
    icon: RiEmphasisCn,
    action: (editor) => editor.chain().focus().toggleDot().run(),
    isActive: (editor) => editor.isActive('dot'),
    canExecute: (editor) => editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
    tooltip: '强调',
  },
];

const FontStyle = () => {
  const config = useEditorConfig();
  const editor = config.editor!;

  const buttonGroup = buttonGroupTemp.filter((item) => config.features.includes(item.id));
  if (!buttonGroup.length) return null;

  return (
    <div className="group">
      {buttonGroup.map(({ icon: Icon, tooltip, isActive, action, id }) => (
        <Tooltip title={tooltip} key={id}>
          <Button onMouseDown={(e) => e.preventDefault()} onClick={() => action(editor)} color="default" variant={isActive(editor) ? 'solid' : 'filled'} autoInsertSpace>
            <Icon />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default FontStyle;
