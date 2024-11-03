import "./style.scss";
import { buttonGroup1 } from "./helper";
import Button from "./button";
import { Separator } from "@/components/ui/separator";
import Heading from "./heading";
import TextAlign from "./text-align";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <Heading editor={editor}/>
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
     <TextAlign editor={editor}/>

      {/*<button onClick={() => editor.chain().focus().uploadImg().run()}>
        图
      </button> */}
    </div>
  );
};

export default MenuBar;
