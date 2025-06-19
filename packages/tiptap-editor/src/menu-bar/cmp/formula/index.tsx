import './style.scss';
import presets from './latex-presets';
import { useEffect, useState } from 'react';
import { RiFormula } from '@remixicon/react';
import emitter from '../../../utils/emitter';
import { Feature } from '../../../utils/enum';
import { useEditorConfig } from '../../../config-ctx';
import { Button, Popover, Tabs, TabsProps } from 'antd';

// @ts-ignore
const FormulaContent = ({ editor, onClose, pos, end, mfPreviewVal, setMfPreviewVal }) => {
  const onChange = (key: string) => {
    // console.log(key);
  };

  const onClickItem = (value: any) => {
    setMfPreviewVal(mfPreviewVal + value.latex);
  };

  const insertFormula = () => {
    try {
      if (pos) {
        editor.commands.updateFormula(pos, end, mfPreviewVal);
      } else {
        editor.commands.insertFormula(mfPreviewVal);
      }
    } catch (error) {
      // console.log(error);
    }
    onClose();
  };

  const items: TabsProps['items'] = presets.map((item) => ({
    key: item.key,
    label: item.label,
    children: (
      <div className="custom-tabpanel" key={item.key}>
        {item.content.map((it) => (
          <div className="formula-item" key={it.latex}>
            <div className="formula-item-mask" onClick={() => onClickItem(it)} onMouseDown={(e) => e.preventDefault()}></div>
            <math-field contentEditable={false}>{it.latex}</math-field>
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} onMouseDown={(e) => e.preventDefault()} />
      <div className="mf-preview">
        <div className="mf-preview-title">预览：</div>
        <div className="mf">
          <math-field onInput={(evt) => setMfPreviewVal((evt.target as HTMLInputElement)?.value)}>{mfPreviewVal}</math-field>
        </div>
      </div>
      <div className="mf-preview-input no-blur">
        <div className="mf-preview-input-title">源码：</div>
        <textarea value={mfPreviewVal} onChange={(evt) => setMfPreviewVal(evt.target.value)} />
      </div>
      <div className="mf-preview-input-btn">
        <Button type="primary" onClick={insertFormula} onMouseDown={(e) => e.preventDefault()}>
          插入
        </Button>
      </div>
    </div>
  );
};

const Formula = () => {
  const config = useEditorConfig();
  const editor = config.editor!;
  if (!config.features.includes(Feature.formula)) return null;

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState(0);
  const [end, setEnd] = useState(0);
  const [mfPreviewVal, setMfPreviewVal] = useState('');

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleFormulaClick = ({ content, pos, end }: any) => {
    if (Boolean(editor.isEditable)) {
      setOpen(true);
      setPos(pos);
      setEnd(end);
      setMfPreviewVal(content);
    }
  };

  useEffect(() => {
    emitter.on('formula-click', handleFormulaClick);
    return () => {
      emitter.off('formula-click', handleFormulaClick);
    };
  }, [editor]);

  return (
    <Popover getPopupContainer={(e) => e.parentNode as HTMLElement} content={<FormulaContent pos={pos} end={end} mfPreviewVal={mfPreviewVal} setMfPreviewVal={setMfPreviewVal} editor={editor} onClose={() => setOpen(false)} />} open={open} trigger="click" destroyOnHidden={true} onOpenChange={handleOpenChange}>
      <Button onClick={() => setOpen(true)} color="default" variant="filled" autoInsertSpace>
        <RiFormula />
      </Button>
    </Popover>
  );
};
Formula.id = 'formula';

export default Formula;
