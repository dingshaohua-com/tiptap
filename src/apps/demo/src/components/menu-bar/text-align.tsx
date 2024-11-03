import * as React from "react";
import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import {
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  CaretDownIcon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "./button";

const formatActions = [
  {
    label: "左对齐",
    icon: <TextAlignLeftIcon className="size-5" />,
    isActive: (editor) => editor.isActive({ textAlign: "left" }),
    action: (editor) => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    label: "剧中",
    icon: <TextAlignCenterIcon className="size-5" />,
    isActive: (editor) => editor.isActive({ textAlign: "center" }),
    action: (editor) => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    label: "右对齐",
    icon: <TextAlignRightIcon className="size-5" />,
    isActive: (editor) => editor.isActive({ textAlign: "right" }),
    action: (editor) => editor.chain().focus().setTextAlign("right").run()
  },
];

interface Props extends VariantProps<typeof toggleVariants> {
  editor: Editor;
}

export const TextAlign: React.FC<Props> = ({ editor, size, variant }) => {
  const renderMenuItem = React.useCallback(
    ({ label, icon, action, isActive }) => (
      <DropdownMenuItem
        key={label}
        onClick={() => action(editor)}
        className={cn("flex flex-row items-center justify-between gap-4", {
          "bg-accent": isActive(editor),
        })}
        style={{}}
        aria-label={label}
      >
        {icon}
      </DropdownMenuItem>
    ),
    [editor]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          isActive={
            editor.isActive({ textAlign: "center" }) ||
            editor.isActive({ textAlign: "right" })
          }
          tooltip="对齐方式"
          aria-label="Text styles"
          className="w-12"
          disabled={editor.isActive("codeBlock")}
          size={size}
          variant={variant}
        >
          <TextAlignJustifyIcon className="size-5" />
          <CaretDownIcon className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" style={{minWidth:'48px'}}>
        {formatActions.map(renderMenuItem)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

TextAlign.displayName = "TextAlign";

export default TextAlign;
