import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './style.scss';

const Heading = ({ editor }) => {
  const handleChange = (event) => {
    const level = Number(event.target.value);
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: level }).run();
    }
  };

  const options = [
    {
      label: '正文',
      className: 'span',
      level: 0,
    },
    {
      label: '标题 1',
      className: 'h1',
      level: 1,
    },
    {
      label: '标题 2',
      className: 'h2',
      level: 2,
    },
    {
      label: '标题 3',
      className: 'h3',
      level: 3,
    },
  ];

  /**
   * 获取当前激活的标题或段落的级别
   *
   * @returns 如果当前激活的节点是标题或段落，则返回其级别；否则返回undefined
   */
  const getActiveLeave = () => {
    if (editor.isActive('paragraph')) return 0;
    for (const { level } of options) {
      if (editor.isActive('heading', { level })) return level;
    }
  };
  const activeLeave = getActiveLeave();

  return (
    <Select
      className="menubarSelect"
      value={activeLeave || 0}
      label="字体大小"
      onChange={handleChange}
    >
      {options.map(({ level, label, className }) => (
        <MenuItem value={String(level)} key={label}>
          <div className={'menubarSelect' + className}>{label}</div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default Heading;
