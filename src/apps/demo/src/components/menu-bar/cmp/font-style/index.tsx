import './style.scss';
import MenuBtn from '@/components/menu-btn';
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
} from '@remixicon/react';

const buttonGroup: Array<any> = [
  {
    value: 'bold',
    label: 'Bold',
    icon: RiBold,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive('bold'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleBold().run() &&
      !editor.isActive('codeBlock'),
    tooltip: '粗体',
  },
  {
    value: 'italic',
    label: 'Italic',
    icon: RiItalic,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleItalic().run() &&
      !editor.isActive('codeBlock'),
    tooltip: '斜体',
  },
  {
    value: 'underline',
    label: 'Underline',
    icon: RiUnderline,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive('underline'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleUnderline().run() &&
      !editor.isActive('codeBlock'),
    tooltip: '下划线',
  },
  {
    value: 'strike',
    label: 'Strike',
    icon: RiStrikethrough,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
    canExecute: (editor) =>
      editor.can().chain().focus().toggleUnderline().run() &&
      !editor.isActive('codeBlock'),
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
  //   {
  //     value: 'dot',
  //     label: 'Dot',
  //     icon: <DotsHorizontalIcon className="size-5" />,
  //     action: editor => editor.chain().focus().toggleDot().run(),
  //     isActive: editor => editor.isActive('dot'),
  //     canExecute: editor => editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
  //     tooltip:"强调",
  //   },
];

const FontStyle = ({ editor }) => {
  return (
    <div className="fontStyle">
      {buttonGroup.map(({ icon: Icon, tooltip, isActive, action, value }) => (
        <MenuBtn
          tooltip={tooltip}
          active={isActive(editor)}
          onClick={() => action(editor)}
          key={value}
        >
          <Icon />
        </MenuBtn>
      ))}
    </div>
  );
};

export default FontStyle;
