import React, { useEffect, useState } from "react";
import "./style.scss";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

function getNodeIndexInDoc(view, getPos, typeName: string): number | null {
    const targetPos = getPos()
    let index = 0
    let found = false
  
    view.state.doc.descendants((node, pos) => {
      if (node.type.name === typeName) {
        if (pos === targetPos) {
          found = true
          return false
        }
        index++
      }
      return true
    })
  
    return found ? index + 1 : null
  }

const NodeView = ({ view,node, updateAttributes, getPos, editor }) => {
    const [index, setIndex] = useState<number | null>(null)

    useEffect(() => {
      const order = getNodeIndexInDoc(view, getPos, node.type.name)
      setIndex(order)
    }, [view.state])

  // 从节点属性获取数据
  const { title = "", color = "#ffffff" } = node.attrs;

  const handleTitleChange = (e) => {
    updateAttributes({ title: e.target.value });
  };

  const handleColorChange = (e) => {
    updateAttributes({ color: e.target.value });
  };

  return (
    <NodeViewWrapper as={"span"} className="custom-node">
      {/* <div className="node-controls" contentEditable={false}>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="节点标题"
          className="title-input"
        />
        
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="color-picker"
        />
      </div> */}
      {/* <NodeViewContent className="node-content" /> */}
      <div className="question">
        <div> {index}</div>
       
      </div>
    </NodeViewWrapper>
  );
};

export default NodeView;
