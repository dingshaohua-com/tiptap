import './style.scss';
import presets from './latex-presets';
import { useEffect, useState } from 'react';
import { RiFormula } from '@remixicon/react';
import emitter from '../../../utils/emitter';
import { useEditorConfig } from '../../../config-ctx';
import { Button, Popover, Tabs, TabsProps } from 'antd';

const FormulaContent = ({ editor, onClose }) => {
  const [mfPreviewVal, setMfPreviewVal] = useState('');
  const [pos, setPos] = useState(0);

  const onChange = (key: string) => {
    console.log(key);
  };

  const onClickItem = (value) => {
    setMfPreviewVal(mfPreviewVal + value.latex);
  };

  const insertFormula = () => {
    if (pos) {
      editor.commands.updateFormula(pos, mfPreviewVal);
    } else {
      editor.commands.insertFormula(mfPreviewVal);
    }
    onClose();
  };

  useEffect(() => {
    const handleFormulaClick = ({ content, pos }) => {
      if (Boolean(editor.isEditable)) {
        setPos(pos);
        setMfPreviewVal(content);
      }
    };

    emitter.on('formula-click', handleFormulaClick);
    return () => {
      emitter.off('formula-click', handleFormulaClick);
    };
  }, [editor]);

  const items: TabsProps['items'] = presets.map((item) => ({
    key: item.key,
    label: item.label,
    children: (
      <div className="custom-tabpanel" key={item.key}>
        {item.content.map((it) => (
          <div className="formula-item" key={it.latex}>
            <div className="formula-item-mask" onClick={() => onClickItem(it)}></div>
            <math-field contentEditable={false}>{it.latex}</math-field>
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      <div className="mf-preview">
        <div className="mf-preview-title">预览：</div>
        <div className="mf">
          <math-field onInput={(evt) => setMfPreviewVal((evt.target as HTMLInputElement)?.value)}>{mfPreviewVal}</math-field>
        </div>
      </div>
      <div className="mf-preview-input">
        <div className="mf-preview-input-title">源码：</div>
        <input type="text" value={mfPreviewVal} onChange={(evt) => setMfPreviewVal(evt.target.value)} />
      </div>
      <div className="mf-preview-input-btn">
        <Button type="primary" onClick={insertFormula}>
          插入
        </Button>
      </div>
    </div>
  );
};

const Shape = () => {
  const config = useEditorConfig();
  const editor = config.editor!;

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <div className="itemsStyle">
      <Popover content={<FormulaContent editor={editor} onClose={() => setOpen(false)} />} open={open} trigger="click" destroyOnHidden={true} onOpenChange={handleOpenChange}>
        <Button onClick={() => setOpen(true)} color="default" variant="filled" autoInsertSpace>
          <RiFormula />
        </Button>
      </Popover>
    </div>
  );
};

export default Shape;
