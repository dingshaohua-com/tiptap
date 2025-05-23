import { Button, Tooltip } from 'antd';
import { Editor } from '@tiptap/react';
import Solid from '../../../assets/solid.svg';
import Dashed from '../../../assets/dashed.svg';
import { useEditorConfig } from '../../../config-ctx';

const buttonGroupTemp: Array<any> = [
  {
    id: 'lineSolid',
    icon: Solid,
    action: (editor: Editor) => editor.chain().focus().insertHr().run(),
    tooltip: '下划线-细线',
  },
  {
    id: 'lineDashed',
    icon: Dashed,
    action: (editor: Editor) => editor.chain().focus().insertHr('dashed').run(),
    tooltip: '下划线-虚线',
  },
];

const InsertLine = () => {
  const config = useEditorConfig();
  const editor = config.editor!;
  const buttonGroup = buttonGroupTemp.filter((item) => config.features.includes(item.id));
  if (!buttonGroup.length) return null;
  return (
    <div className="group">
      {buttonGroup.map(({ icon: Icon, tooltip, action, id }) => (
        <Tooltip title={tooltip} key={id}>
          <Button onClick={() => action(editor)} color="default" variant="filled" autoInsertSpace onMouseDown={(e) => e.preventDefault()}>
            <img src={Icon} />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default InsertLine;
