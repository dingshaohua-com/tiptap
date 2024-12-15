import './style.scss';
import { Button } from '@mui/material';
import { useState } from 'react';

import { MathfieldElement } from "mathlive";

declare namespace JSX {
    interface IntrinsicElements {
      'math-field': React.DetailedHTMLProps<
        React.HTMLAttributes<MathfieldElement>,
        MathfieldElement
      >;
    }
  }


const TooltipCont = ({ editor, handleTooltipClose }) => {

  const [value, setValue] = useState("");
  const onSave = () => {
    const { from, to } = editor.state.selection;
    editor.commands.insertContentAt(to, value);
    handleTooltipClose();
  };
  return (
    <div className="tooltipCont">
      <math-field onInput={evt => setValue(evt.target.value)}>f(x)=</math-field>
      <div className="">
        <Button variant="contained" onClick={onSave}>
          确定
        </Button>
      </div>
    </div>
  );
};
export default TooltipCont;
