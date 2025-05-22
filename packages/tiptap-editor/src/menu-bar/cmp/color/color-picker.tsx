import './style.scss'; // 引入全局样式
import { useState } from 'react';
import { Sketch } from '@uiw/react-color';

const presetColors = ['#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#9900FF', '#FF00FF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#CFE2F3', '#D9D2E9'];

const ColorPickerMenu = ({ editor, onClose, type }) => {
  const [customColor, setCustomColor] = useState('#DF2A3F');

  const applyColor = (color) => {
    if (type === 'textColor') {
      editor?.chain().focus().setColor(color).run();
    } else {
      editor?.chain().focus().toggleHighlight({ color }).run();
    }
    // onClose?.();
  };

  return (
    <div className="color-menu">
      {/*         
      <div className="color-grid">
        {presetColors.map((color) => (
          <div
            key={color}
            className="color-swatch"
            style={{ backgroundColor: color }}
            onClick={() => applyColor(color)}
          />
        ))}
      </div> */}

      <Sketch
        className="no-blur"
        color={customColor}
        onChange={(color) => {
          console.log(1122);

          setCustomColor(color.hex);
          applyColor(color.hex);
        }}
        style={{ width: '100%' }}
        presetColors={presetColors} // 去掉底部预设色条
      />
    </div>
  );
};

export default ColorPickerMenu;
