import React, { useState } from "react";
import { useEditorConfig } from '../../../config-ctx';

interface TableSelectorProps {
  maxRows?: number;
  maxCols?: number;
  onSelect?: (rows: number, cols: number) => void;
}

const TableSelector: React.FC<TableSelectorProps> = ({
  maxRows = 10,
  maxCols = 10,
  onSelect,
}) => {
  const config = useEditorConfig();
  const editor = config.editor!;
  const [hoverRow, setHoverRow] = useState(0);
  const [hoverCol, setHoverCol] = useState(0);

  const handleMouseMove = (row: number, col: number) => {
    setHoverRow(row);
    setHoverCol(col);
  };

  const handleClick = () => {
    if (onSelect) onSelect(hoverRow, hoverCol);
    editor.chain().focus().insertTable({ rows: hoverRow, cols: hoverCol, withHeaderRow: true }).run();
  };

  return (
    <div className="table-selector">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${maxCols}, 20px)` }}
      >
        {Array.from({ length: maxRows * maxCols }).map((_, index) => {
          const row = Math.floor(index / maxCols) + 1;
          const col = (index % maxCols) + 1;
          const selected = row <= hoverRow && col <= hoverCol;

          return (
            <div
              key={index}
              onMouseEnter={() => handleMouseMove(row, col)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleClick}
              className={`cell ${selected ? "selected" : ""}`}
            />
          );
        })}
      </div>
      <div className="dimensions">
        {hoverRow} x {hoverCol}
      </div>
    </div>
  );
};

export default TableSelector;