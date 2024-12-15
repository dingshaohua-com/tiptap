import './style.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import presets from '../latex-presets';



interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TooltipCont = ({ editor, handleTooltipClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const onClickItem = (item) => {
    editor.commands.insertFormula(item.latex)
    console.log(item.latex);
    handleTooltipClose();
  };

  const onSave = () => {
    console.log(value);
  };
  return (
    <div className="tooltipCont">
      <div className="tooltipContTab">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {presets.map((item, index) => (
            <Tab
              label={item.label}
              id={`simple-tab-${item.key}`}
              aria-controls={`simple-tabpanel-${index}`}
              key={item.key}
            />
          ))}
        </Tabs>
        {presets.map((item, index) => (
          <CustomTabPanel value={value} index={index} key={item.key}>
            <div className="customTabPanel" key={item.key}>
              {item.content.map((it) => (
                <div className="formulaItem" key={it.latex}>
                  <math-field contentEditable={false} onFocus={()=>{onClickItem(it)}}>{it.latex}</math-field>
                </div>
              ))}
            </div>
          </CustomTabPanel>
        ))}
      </div>

      <div className="footer">
        <Button variant="contained" onClick={onSave}>
          确定
        </Button>
      </div>
    </div>
  );
};
export default TooltipCont;
