import "./style.scss";
import { buttonGroup1 } from "./helper";
import Button from "./button";
import { Separator } from "@/components/ui/separator";
import Heading from "./heading";
import TextAlign from "./text-align";
import { RiCircleLine,RiTriangleLine , RiSquareLine} from "@remixicon/react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <Heading editor={editor} />
      <Separator orientation="vertical" className="mx-2 h-7" />
      {buttonGroup1.map((item) => (
        <Button
          key={item.value}
          tooltip={item.tooltip}
          aria-label={item.label}
          onClick={() => item.action(editor)}
          isActive={item.isActive(editor)}
        >
          {item.icon}
        </Button>
      ))}
      <Separator orientation="vertical" className="mx-2 h-7" />
      <TextAlign editor={editor} />
      <Separator orientation="vertical" className="mx-2 h-7" />
      <Button
        tooltip="圆"
        aria-label="circle"
        onClick={() => editor.chain().focus().inertCircle().run()}
        isActive={editor.isActive("circle")}
      >
        <RiCircleLine size={20}/>
      </Button>
      <Button
        tooltip="三角"
        aria-label="triangle"
        onClick={() => editor.chain().focus().inertTriangle().run()}
        isActive={editor.isActive("triangle")}
      >
        <RiTriangleLine size={20} />
      </Button>
      <Button
        tooltip="正方形"
        aria-label="square"
        onClick={() => editor.chain().focus().inertSquare().run()}
        isActive={editor.isActive("square")}
      >
        <RiSquareLine size={20} />
      </Button>
    </div>
  );
};

export default MenuBar;
