import React from 'react';

const ContextMenu = ({ x, y, visible, onInsertRow, onDeleteRow }) => {
  if (!visible) return null;

  const menuStyle = {
    position: 'absolute',
    top: y,
    left: x,
    background: 'white',
    border: '1px solid #ccc',
    padding: '8px',
    zIndex: 1000,
  };

  return (
    <div style={menuStyle}>
      <div onClick={onInsertRow}>插入行</div>
      <div onClick={onDeleteRow}>删除行</div>
    </div>
  );
};

export default ContextMenu;
