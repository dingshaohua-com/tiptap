import { Button, Tooltip } from 'antd';
import { useEditorConfig } from '../../../config-ctx';
import { RiBold, RiItalic, RiUnderline, RiStrikethrough, RiEmphasisCn } from '@remixicon/react';

const buttonGroup: Array<any> = [
  {
    value: 'bold',
    label: 'Bold',
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
    value: 'italic',
    label: 'Italic',
    icon: RiItalic,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
    canExecute: (editor) => editor.can().chain().focus().toggleItalic().run() && !editor.isActive('codeBlock'),
    tooltip: '斜体',
  },
  {
    value: 'underline',
    label: 'Underline',
    icon: RiUnderline,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive('underline'),
    canExecute: (editor) => editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
    tooltip: '下划线',
  },
  {
    value: 'strike',
    label: 'Strike',
    icon: RiStrikethrough,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
    canExecute: (editor) => editor.can().chain().focus().toggleStrike().run() && !editor.isActive('codeBlock'),
    tooltip: '删除线',
  },
  //   {
  //     value: 'color',
  //     label: 'Color',
  //     icon: RiFontColor,
  //     action: editor => editor.chain().focus().toggleStrike().run(),
  //     isActive: editor => editor.isActive('strike'),
  //     canExecute: editor => editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
  //     tooltip:"颜色",
  //   },
  {
    value: 'dot',
    label: 'Dot',
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

  return (
    <div className="itemsStyle">
      {buttonGroup.map(({ icon: Icon, tooltip, isActive, action, value }) => (
        <Tooltip title={tooltip} key={value}>
          <Button onClick={() => action(editor)} color="default" variant={isActive(editor) ? 'solid' : 'filled'} autoInsertSpace>
            <Icon />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default FontStyle;
