import QuestionView from "./view";
import React, { useEffect } from "react";
import { NodeViewWrapper } from "@tiptap/react";



const NodeView = ({ view, node, updateAttributes, getPos }) => {

  return (
    <NodeViewWrapper as="span">
      <QuestionView index={node.attrs["data-index"]} />
    </NodeViewWrapper>
  );
};

export default NodeView;