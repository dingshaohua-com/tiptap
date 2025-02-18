import './style.scss';
import { Button, Popover } from 'antd';
import { useState } from 'react';
import { RiFormula } from '@remixicon/react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import presets from './latex-presets';

const Shape = ({ editor }) => {
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };



  const description = () => {
    const [mfPreviewVal, setMfPreviewVal] = useState('');
    const onChange = (key: string) => {
      console.log(key);
    };

    const onClickItem = (value) => {
      setMfPreviewVal(mfPreviewVal + value.latex)

    }
    const insertFormula = () => {
      editor.commands.insertFormula(mfPreviewVal)
      hide();
    }

    const items: TabsProps['items'] = presets.map((item, index) => (
      {
        key: item.key,
        label: item.label,
        children: (<div className="custom-tabpanel" key={item.key}>
          {item.content.map((it) => (
            <div className="formula-item" key={it.latex} >
              {/* https://github.com/arnog/mathlive/issues/2102 */}
              <div className='formula-item-mask' onClick={() => { onClickItem(it) }}></div>
              <math-field contentEditable={false} >{it.latex}</math-field>
            </div>
          ))}
        </div>)
      }
    ));
    return (

      <div>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <div className='mf-preview'>
          <div className='mf'>
            <math-field
              onInput={evt => setMfPreviewVal(evt.target.value)}
            >
              {mfPreviewVal}
            </math-field>
          </div>

          <Button type="primary" onClick={insertFormula}>插入</Button>
        </div>
      </div>
    );
  };

  return (
    <div className="formula">
      <Popover content={description} title="" open={open} trigger="click" destroyTooltipOnHide={true}
        onOpenChange={handleOpenChange}>
        <Button
          onClick={show}
          color="default"
          variant="filled"
          autoInsertSpace
        >
          <RiFormula />
        </Button>
      </Popover>
    </div>
  );
};

export default Shape;
