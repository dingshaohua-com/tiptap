import './style.scss';
import cs from 'classnames';
import { Button, Tooltip } from 'antd';

const slotProps = {
  popper: {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -6],
        },
      },
    ],
  },
};

const MenuBtn = (props) => {
  const { tooltip, onClick, active } = props;
  return tooltip ? (
    <Tooltip title={tooltip} placement="top" slotProps={slotProps} arrow>
      <Button
        className={cs('menuBtn', {
          menuBtnActive: active,
        })}
        onClick={onClick}
      >
        {props.children}
      </Button>
    </Tooltip>
  ) : (
    <Button
      className={cs('menuBtn', {
        menuBtnActive: active,
      })}
      onClick={onClick}
    >
      {props.children}
    </Button>
  );
};

export default MenuBtn;
