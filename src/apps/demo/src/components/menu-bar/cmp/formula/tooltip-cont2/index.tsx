import './style.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Button } from '@mui/material';
import { useState } from 'react';
import presets from '../latex-presets';
import 'mathlive';



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

const TooltipCont = ({ editor }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const onClickItem = (item) => {
    editor.commands.setImage({ src: item });
  };

  const [value, setValue] = useState("");
  const onSave = () => {
    console.log(value);
    
  };
  return (
    <div className="tooltipCont">
      {/* @ts-ignore */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="数学" id="simple-tab-1" ariaControls="simple-tabpanel-1" />
        <Tab label="化学" id="simple-tab-2" ariaControls="simple-tabpanel-2" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <div>
          {presets[1].content.map((item) => {
            return (
              <div
                key={item}
                className="shapItem"
                onClick={() => {
                  onClickItem(item);
                }}
              >
                <math-field>f(x)=</math-field>
              </div>
            );
          })}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <div className="">
        <Button variant="contained" onClick={onSave}>
          确定
        </Button>
      </div>
    </div>
  );
};
export default TooltipCont;
