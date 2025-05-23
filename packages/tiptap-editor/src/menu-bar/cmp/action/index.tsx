import { Button, Tooltip } from 'antd';
import { Feature } from '../../../utils/enum';
import { RiSave3Line } from '@remixicon/react';
import { stripOuterNode } from '../../../utils';
import { useEditorConfig } from '../../../config-ctx';

const buttonGroupTemp: Array<any> = [
  {
    id: 'save',
    icon: RiSave3Line,
    style: { width: 20 },
    action: (editor, config) => {
      if (!config.onSave) {
        return false;
      }
      let html = editor.getHTML();
      const json = editor.getJSON();
      // 清除空段落
      if (json.content.length === 1) {
        const firstNode = json.content[0];
        if (firstNode.type === 'paragraph' && !firstNode.content) {
          delete json.content;
          html = '';
        }
        if (config.stripOuterNode) {
          html = stripOuterNode(html);
        }
      }

      // html = unwrapMathFieldToLatex(html);

      // 将 math-field转换为 latex 字符串
      config.onSave({ html, json });
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
      {buttonGroup.map(({ icon: Icon, tooltip, action, id, style }) => (
        <Tooltip title={tooltip} key={id}>
          <Button onClick={() => action(editor, config)} color="default" variant="filled" autoInsertSpace>
            <Icon style={style} />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default FontStyle;
