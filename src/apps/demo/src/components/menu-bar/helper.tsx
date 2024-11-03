import { FontBoldIcon, FontItalicIcon, UnderlineIcon, StrikethroughIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

export const buttonGroup1= [
  {
    value: "bold",
    label: "Bold",
    icon: <FontBoldIcon className="size-5" />,
    action: editor => editor.chain().focus().toggleBold().run(),
    isActive: editor => editor.isActive("bold"),
    canExecute: editor =>
      editor.can().chain().focus().toggleBold().run() &&
      !editor.isActive("codeBlock"),
      tooltip:"粗体",
  },
  {
    value: "italic",
    label: "Italic",
    icon: <FontItalicIcon className="size-5" />,
    action: editor => editor.chain().focus().toggleItalic().run(),
    isActive: editor => editor.isActive("italic"),
    canExecute: editor =>
      editor.can().chain().focus().toggleItalic().run() &&
      !editor.isActive("codeBlock"),
    tooltip:"斜体",
  },
  {
    value: 'underline',
    label: 'Underline',
    icon: <UnderlineIcon className="size-5" />,
    action: editor => editor.chain().focus().toggleUnderline().run(),
    isActive: editor => editor.isActive('underline'),
    canExecute: editor => editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
    tooltip:"下划线",
  },
  {
    value: 'strike',
    label: 'Strike',
    icon: <StrikethroughIcon className="size-5" />,
    action: editor => editor.chain().focus().toggleStrike().run(),
    isActive: editor => editor.isActive('strike'),
    canExecute: editor => editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
    tooltip:"删除线",
  },

  {
    value: 'dot',
    label: 'Dot',
    icon: <DotsHorizontalIcon className="size-5" />,
    action: editor => editor.chain().focus().toggleDot().run(),
    isActive: editor => editor.isActive('dot'),
    canExecute: editor => editor.can().chain().focus().toggleUnderline().run() && !editor.isActive('codeBlock'),
    tooltip:"强调",
  },

  

  
];
