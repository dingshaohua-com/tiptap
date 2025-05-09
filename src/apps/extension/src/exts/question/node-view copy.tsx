import QuestionView from "./view";
import React, { useEffect } from "react";
import { NodeViewWrapper } from "@tiptap/react";

function getNodeIndexInDoc(view, getPos, typeName: string): number | null {
  const targetPos = getPos();
  let index = 0;
  let found = false;

  view.state.doc.descendants((node, pos) => {
    if (node.type.name === typeName) {
      if (pos === targetPos) {
        found = true;
        return false;
      }
      index++;
    }
    return true;
  });

  return found ? index + 1 : null;
}

const NodeView = ({ view, node, updateAttributes, getPos }) => {
  useEffect(() => {
    const order = getNodeIndexInDoc(view, getPos, node.type.name);

    if (order !== node.attrs["data-index"]) {
      // 微任务调度，避免 flushSync 错误
      queueMicrotask(() => {
        updateAttributes({ "data-index": order });
      });
    }
  }, [view.state.doc.content]); // 更细粒度依赖

  return (
    <NodeViewWrapper as="span">
      <QuestionView index={node.attrs["data-index"]} />
    </NodeViewWrapper>
  );
};

export default NodeView;