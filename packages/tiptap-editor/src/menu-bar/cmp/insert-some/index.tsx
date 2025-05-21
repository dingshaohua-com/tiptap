import { Button, Tooltip } from 'antd';
import { Editor } from '@tiptap/react';
import Solid from '../../../assets/solid.svg';
import Dashed from '../../../assets/dashed.svg';
import { useEditorConfig } from '../../../config-ctx';

const buttonGroup: Array<any> = [
  {
    value: 'lineSolid',
    label: 'LineSolid',
    icon: Solid,
    action: (editor: Editor) => editor.chain().focus().insertHr().run(),
    tooltip: '下划线-细线',
  },
  {
    value: 'lineDashed',
    label: 'LineDashed',
    icon: Dashed,
    action: (editor: Editor) => editor.chain().focus().insertHr('dashed').run(),
    tooltip: '下划线-虚线',
  },
];

const FontStyle = () => {
  const config = useEditorConfig();
  const editor = config.editor!;

  return (
    <div className="itemsStyle">
      {buttonGroup.map(({ icon: Icon, tooltip, action, value }) => (
        <Tooltip title={tooltip} key={value}>
          <Button onClick={() => action(editor)} color="default" variant="filled" autoInsertSpace>
            <img src={Icon} />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

export default FontStyle;
