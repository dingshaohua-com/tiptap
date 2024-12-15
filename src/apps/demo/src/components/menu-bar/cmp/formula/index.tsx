import './style.scss';
import { useState } from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import MenuBtn from '@/components/menu-btn';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { RiFormula } from '@remixicon/react';
import { styled } from '@mui/material/styles';
import TooltipCont from './tooltip-cont';

const slotProps = {
  popper: {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -10],
        },
      },
    ],
  },
};

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    minWidth: 300,
    maxWidth: 500,
    minHeight: 100,
    maxHeight: 160,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const Formula = ({ editor }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const onClickAwayHandler = (e) => {
    const mathKeyboard = document.querySelector('.ML__keyboard');
    const parent = document.querySelector('.MuiTooltip-popper');
    const child = e.target;
    if (parent?.contains(child) || mathKeyboard?.contains(child)) {
      return;
    }
    handleTooltipClose();
  };

  return (
    <div className="shap">
      <ClickAwayListener onClickAway={onClickAwayHandler}>
        <CustomTooltip
          arrow={true}
          title={
            <TooltipCont
              editor={editor}
              handleTooltipClose={handleTooltipClose}
            />
          }
          placement="bottom"
          slotProps={slotProps}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          onClose={handleTooltipClose}
          open={open}
        >
          <div>
            <MenuBtn active={false} onClick={handleTooltipOpen}>
              {/* @ts-ignore */}
              <RiFormula />
            </MenuBtn>
          </div>
        </CustomTooltip>
      </ClickAwayListener>
    </div>
  );
};

export default Formula;
