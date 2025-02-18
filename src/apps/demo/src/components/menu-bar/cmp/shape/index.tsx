import './style.scss';
import { Button, Popconfirm } from 'antd';

import { useState } from 'react';
import { RiShapesLine } from '@remixicon/react';
// import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
// import MenuBtn from '@/components/menu-btn';
// import ClickAwayListener from '@mui/material/ClickAwayListener';
// import { RiShapesLine } from '@remixicon/react';
// import { styled } from '@mui/material/styles';

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

// const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: '#f5f5f9',
//     color: 'rgba(0, 0, 0, 0.87)',
//     with:'80%',
//     maxWidth: 260,
//     minHeight: 100,
//     maxHeight: 160,
//     fontSize: theme.typography.pxToRem(12),
//     border: '1px solid #dadde9'
//   },
// }));

const Shape = ({ editor }) => {
  const showPopconfirm = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const Description = () => {
    console.log(999, import.meta.env.BASE_URL);
    
    const urlBase = import.meta.env.BASE_URL+'/assets/shape/';
    const items = [
      'circle',
      'square',
      'triangle',
      'trapezoid',
      'iphone',
      'star',
      'kefu',
    ];
    const onClickItem = (item) => {
      editor.commands.setImage({ src: item });
    };

    return (
      <div className="shapItems">
        {items.map((item) => {
          const imgFullUrl = urlBase + item + '.svg';
          return (
            <div
              key={item}
              className="shapItem"
              onClick={() => {
                onClickItem(imgFullUrl);
              }}
            >
              <img src={imgFullUrl} alt={item} width={24} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="shap">
      <Popconfirm
        icon={null}
        title={null}
        description={<Description />}
        open={open}
        onConfirm={handleOk}
        onCancel={handleCancel}
      >
        <Button
          onClick={showPopconfirm}
          color="default"
          variant="filled"
          autoInsertSpace
        >
          <RiShapesLine />
        </Button>
      </Popconfirm>
    </div>
  );
};

export default Shape;
