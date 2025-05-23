import { Button, Tooltip } from 'antd';
import { RiSave3Line } from '@remixicon/react';
import { useEditorConfig } from '../../../config-ctx';
import { Feature } from '../../../utils/enum';


const buttonGroupTemp: Array<any> = [
  {
    value: 'save',
    icon: RiSave3Line,
    style: { width: 20 },
    action: (editor, config) => {
      if(!config.onSave){return false};
      let html = editor.getHTML();
      const json = editor.getJSON();
      // 清除空段落
      if(json.content.length === 1 ){
        const firstNode = json.content[0];
        if(firstNode.type === 'paragraph' && !firstNode.content){
          delete json.content;
          html = '';
        }
      }
      config.onSave({html, json});
    },
    tooltip: '保存',
  },
];

const FontStyle = () => {
  const config = useEditorConfig();
  const editor = config.editor!;
  const buttonGroup = buttonGroupTemp.filter((item) => config.features.includes(item.id));
  if (!buttonGroup.length) return null;

  return (
    <div className="group">
      {buttonGroup.map(({ icon: Icon, tooltip, action, value, style }) => (
        <Tooltip title={tooltip} key={value}>
          <Button
            onClick={() => action(editor, config)}
            color="default"
            variant="filled"
            autoInsertSpace
          >
            <Icon style={style} />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default FontStyle;
