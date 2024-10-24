import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useRef } from "react";
import "./style.css";

const ImgCmp = (props) => {
  return (
    <>
      <NodeViewWrapper className="imgCmp">
        <img {...props.node.attrs}/>
      </NodeViewWrapper>
    </>
  );
};

export default ImgCmp;
