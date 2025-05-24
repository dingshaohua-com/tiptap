import './style.scss';
import { useEffect, useState } from 'react';
import TableSelector from './table-selector';
import { Feature } from '../../../utils/enum';
import { RiTableLine } from '@remixicon/react';
import { useEditorConfig } from '../../../config-ctx';
import { Button, Tooltip, Popover, Input } from 'antd';

const Table = () => {
  const config = useEditorConfig();
  const editor = config.editor!;
  if (!config.features.includes(Feature.table)) return null;

  const [open, setOpen] = useState(false);

  const ok = () => {};

  function showCustomContextMenu() {
    // 如果菜单已经存在，不再重复创建
    if (document.getElementById('custom-context-menu')) return;

    // 创建菜单容器
    const menu = document.createElement('div');
    menu.id = 'custom-context-menu';
    menu.className = 'no-blur';
    Object.assign(menu.style, {
      position: 'absolute',
      display: 'none',
      background: 'white',
      border: '1px solid #ccc',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
      padding: '8px',
      zIndex: 9999,
      fontSize: '12px',
      minWidth: '60px',
      cursor: 'default',
    });

    // 菜单项配置
    const actions = [
      {
        label: '插入行',
        action: () => {
          editor.commands.addRowAfter();
          editor.commands.focus();
        },
      },
      { label: '删除行', action: () => editor.commands.deleteRow() },
      { label: '插入列', action: () => editor.commands.addColumnAfter() },
      { label: '删除列', action: () => editor.commands.deleteColumn() },
    ];

    // 创建并插入菜单项
    actions.forEach(({ label, action }) => {
      const item = document.createElement('div');
      item.textContent = label;
      Object.assign(item.style, {
        padding: '4px 8px',
      });
      item.onmouseenter = () => (item.style.background = '#eee');
      item.onmouseleave = () => (item.style.background = 'white');
      item.onclick = () => {
        action();
        hideMenu();
      };
      menu.appendChild(item);
    });

    // 添加到页面
    document.body.appendChild(menu);

    // 显示菜单
    function showMenu(x: number, y: number) {
      menu.style.left = `${x}px`;
      menu.style.top = `${y}px`;
      menu.style.display = 'block';
    }

    // 隐藏菜单
    function hideMenu() {
      menu.style.display = 'none';
    }

    // 监听右键事件
    editor.view.dom.addEventListener('contextmenu', (event: any) => {
      const cell = event.target.closest('td, th');
      if (cell) {
        event.preventDefault();
        showMenu(event.clientX, event.clientY);
      } else {
        hideMenu();
      }
    });

    // 点击任意位置关闭菜单
    document.addEventListener('click', hideMenu);
  }

  useEffect(() => {
    editor.view.dom.addEventListener('contextmenu', (event: any) => {
      const target = event.target;

      // 判断是否在表格单元格中（<td> 或 <th>）
      if (target.closest('td') || target.closest('th')) {
        event.preventDefault();

        // 获取鼠标位置
        const x = event.clientX;
        const y = event.clientY;

        // 显示自定义菜单
        showCustomContextMenu();
      }
    });
  }, []);

  const show = () => {
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
      <Tooltip title="插入表格">
        <Popover content={<TableSelector />} title="" open={open} trigger="click" onOpenChange={handleOpenChange}>
          <Button onClick={ok} color="default" variant="filled" autoInsertSpace onMouseDown={(e) => e.preventDefault()}>
            <RiTableLine style={{ width: 18 }} />
          </Button>
        </Popover>
      </Tooltip>
  );
};

export default Table;
