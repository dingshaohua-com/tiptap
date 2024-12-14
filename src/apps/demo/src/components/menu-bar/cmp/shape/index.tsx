import './style.scss';
import { useState } from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import MenuBtn from '@/components/menu-btn';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { RiShapesLine } from '@remixicon/react';
import { styled } from '@mui/material/styles';

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
    with:'80%',
    maxWidth: 260,
    minHeight: 100,
    maxHeight: 160,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  },
}));

const Shape = ({ editor }) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const ShapItems = () => {
    const urlBase = 'http://img.dingshaohua.com/editor/shape/';
    const items = ['circle', 'square', 'triangle', 'trapezoid'];
    const onClickItem = (item) => {
      editor.commands.setImage({ src: item});
    };
    return (
      <div className="shapItems">
        {items.map((item) => {
          return (
            <div
              key={item}
              className="shapItem"
              onClick={() => {
                onClickItem(urlBase+item+'.png');
              }}
            >
              <img src={urlBase+item+'.png'} alt={item} width={24} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="shap">
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <CustomTooltip
          arrow={true}
          title={<ShapItems />}
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
              <RiShapesLine />
            </MenuBtn>
          </div>
        </CustomTooltip>
      </ClickAwayListener>
    </div>
  );
};

export default Shape;
