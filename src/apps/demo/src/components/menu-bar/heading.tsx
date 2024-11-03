import * as React from "react";
import type { Editor } from "@tiptap/react";
import type { Level } from "@tiptap/extension-heading";
import type { FormatAction } from "./types";
import type { VariantProps } from "class-variance-authority";
import type { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { CaretDownIcon, LetterCaseCapitalizeIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "./button";

interface TextStyle
  extends Omit<
    FormatAction,
    "value" | "icon" | "action" | "isActive" | "canExecute"
  > {
  element: keyof JSX.IntrinsicElements;
  level?: Level;
  className: string;
}

const formatActions: TextStyle[] = [
  {
    label: "正文",
    element: "span",
    className: "grow",
  },
  {
    label: "标题 1",
    element: "h1",
    level: 1,
    className: "m-0 grow text-3xl font-extrabold",
  },
  {
    label: "标题 2",
    element: "h2",
    level: 2,
    className: "m-0 grow text-xl font-bold",
  },
  {
    label: "标题 3",
    element: "h3",
    level: 3,
    className: "m-0 grow text-lg font-semibold",
  },
];

interface Props extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeLevels?: Level[];
}

export const Heading: React.FC<Props> = ({ // 原来的 Minimal Tiptap 写法 此组件为memo，但是会导致 activeLevels默认参数实效
  editor,
  activeLevels = [1, 2, 3],
  size,
  variant,
}) => {
  const filteredActions = formatActions.filter(
    (action) => !action.level || activeLevels.includes(action.level)
  );

  const handleStyleChange = React.useCallback(
    (level?: Level) => {
      if (level) {
        editor.chain().focus().toggleHeading({ level }).run();
      } else {
        editor.chain().focus().setParagraph().run();
      }
    },
    [editor]
  );

  const renderMenuItem = React.useCallback(
    ({ label, element: Element, level, className }: TextStyle) => (
      <DropdownMenuItem
        key={label}
        onClick={() => handleStyleChange(level)}
        className={cn("flex flex-row items-center justify-between gap-4", {
          "bg-accent": level
            ? editor.isActive("heading", { level })
            : editor.isActive("paragraph"),
        })}
        aria-label={label}
      >
        <Element className={className}>{label}</Element>
      </DropdownMenuItem>
    ),
    [editor, handleStyleChange]
  );

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            isActive={editor.isActive("heading")}
            tooltip="标题"
            aria-label="Text styles"
            pressed={editor.isActive("heading")}
            className="w-12"
            disabled={editor.isActive("codeBlock")}
            size={size}
            variant={variant}
          >
            <LetterCaseCapitalizeIcon className="size-5" />
            <CaretDownIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-full">
          {filteredActions.map(renderMenuItem)}
        </DropdownMenuContent>
      </DropdownMenu>
  );
};

Heading.displayName = "Heading";

export default Heading;
